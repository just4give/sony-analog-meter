/* Mithun Das
 * MIT License
 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/* Includes ---------------------------------------------------------------- */
#include "config.h"
#include <sony-analog-meter_inferencing.h>
#include <Camera.h>
#include <LowPower.h>
#include <LTE.h>
#include <ArduinoMqttClient.h>
#include <SDHCI.h>
#include <RTC.h>

#define SAVE_TO_SD false
#define SCALE_FACTOR 4
#define RAW_WIDTH  CAM_IMGSIZE_QVGA_H 
#define RAW_HEIGHT CAM_IMGSIZE_QVGA_V 
#define CLIP_WIDTH (EI_CLASSIFIER_INPUT_WIDTH * SCALE_FACTOR)
#define CLIP_HEIGHT (EI_CLASSIFIER_INPUT_HEIGHT * SCALE_FACTOR)
#define OFFSET_X  ((RAW_WIDTH - CLIP_WIDTH) / 2)
#define OFFSET_Y  ((RAW_HEIGHT - CLIP_HEIGHT) / 2)



#define DEBUG_NN true

#define DEBUG true
#define SAMPLE_COUNT 2
#define DEEP_SLEEP_TIME_MINUTE (60*24)


#define APP_LTE_APN "iot.truphone.com"


/* APN authentication settings
 * Ignore these parameters when setting LTE_NET_AUTHTYPE_NONE.
 */
#define APP_LTE_USER_NAME "" // replace with your username
#define APP_LTE_PASSWORD  "" // replace with your password

// APN IP type
#define APP_LTE_IP_TYPE (LTE_NET_IPTYPE_V4V6) // IP : IPv4v6
// #define APP_LTE_IP_TYPE (LTE_NET_IPTYPE_V4) // IP : IPv4
// #define APP_LTE_IP_TYPE (LTE_NET_IPTYPE_V6) // IP : IPv6

// APN authentication type
//#define APP_LTE_AUTH_TYPE (LTE_NET_AUTHTYPE_CHAP) // Authentication : CHAP
// #define APP_LTE_AUTH_TYPE (LTE_NET_AUTHTYPE_PAP) // Authentication : PAP
#define APP_LTE_AUTH_TYPE (LTE_NET_AUTHTYPE_NONE) // Authentication : NONE

/* RAT to use
 * Refer to the cellular carriers information
 * to find out which RAT your SIM supports.
 * The RAT set on the modem can be checked with LTEModemVerification::getRAT().
 */

#define APP_LTE_RAT (LTE_NET_RAT_CATM) // RAT : LTE-M (LTE Cat-M1)
// #define APP_LTE_RAT (LTE_NET_RAT_NBIOT) // RAT : NB-IoT



/** prototype **/
void ei_camera_start_continuous(bool debug);
void CamCB(CamImage img);
void ei_camera_classify(bool debug);
void printError(enum CamErr err);
int ei_camera_cutout_get_data(size_t offset, size_t length, float *out_ptr);
void ei_camera_connect_cellular(bool debug);
void ei_camera_connect_aws_iot(bool debug);
void ei_live_classification(bool debug);
void save_image( );
/** prototype end */

static CamImage sized_img;
int sum = 0;
int final_value = 0;
int sample_counter = 0;
long start_time = 0;

int batV =0;  
int batC = 0;

/* variables for LTE */
static LTE lteAccess;
static LTEClient client;

char payload[500];
static LTEModem modem;
String IMEI="";

String nmeaString="";
SDClass theSD;

// URL, path & port (for example: arduino.cc)
static char server[] =  "ingestion.edgeimpulse.com";
static char path[] = "/api/testing/files";
static int port = 80; // port 80 is the default for HTTP

/**
 * @brief      Arduino setup function
 */
void setup()
{
    // put your setup code here, to run once:
    start_time = millis();
    Serial.begin(115200);
    LowPower.begin();
    RTC.begin();

    ei_printf("Sony Spresence Analog meter reading application.\n");
    LowPower.clockMode(CLOCK_MODE_32MHz);
    
    
    
  
    while (!theSD.begin()) {
      ; /* wait until SD card is mounted. */
    }
    ei_printf("SD card mounted\n");

    batV = LowPower.getVoltage();  //Get the sensed battery voltage on CXD5247
    batC = LowPower.getCurrent();  //Get the sensed battery current on CXD5247
    ei_printf("ClockMode = %d , Bat V = %d mV , Bat Current = %d mA \n", LowPower.getClockMode(), batV, batC);
    
    ei_camera_start_continuous(DEBUG);

}


void loop()
{
   
}

void ei_camera_start_continuous(bool debug) {
  
  CamErr err;

  
  err = theCamera.begin(1, CAM_VIDEO_FPS_5, RAW_WIDTH, RAW_HEIGHT);

  if (err && debug) {
    printError(err);
  }else{
    ei_printf("Camera initiated successfully.\n");
  }

  err = theCamera.setAutoWhiteBalance(true);
  if (err && debug) {
    printError(err);
  }else{
    ei_printf("Camera white balanced set successfully.\n");
  }

  // start streaming the preview images to the classifier
   err = theCamera.startStreaming(true, CamCB);
   if (err && debug) {
     printError(err);
   }else{
     ei_printf("Camera stream srated successfully.\n");
   }
    
  // // still image format must be jpeg to allow for compressed storage/transmit
  err = theCamera.setStillPictureImageFormat(
    160,
    120,
    CAM_IMAGE_PIX_FMT_JPG);

  if (err && debug) {
    printError(err);
  }else{
    ei_printf("still picture formate set.\n");
  }

  if (debug) Serial.println("INFO: started camera recording");
}


void CamCB(CamImage img)
{

  /* Check the img instance is available or not. */
 if (!img.isAvailable()) return; // fast path if image is no longer ready
 CamErr err;

 Serial.printf("INFO: new frame processing  %d %d %d %d %d %d  \n", OFFSET_X
                                   , OFFSET_Y
                                   , OFFSET_X + CLIP_WIDTH - 1
                                   , OFFSET_Y + CLIP_HEIGHT - 1
                                   , EI_CLASSIFIER_INPUT_WIDTH, EI_CLASSIFIER_INPUT_HEIGHT);
 
 err = img.clipAndResizeImageByHW(sized_img
                                   , OFFSET_X, OFFSET_Y
                                   , OFFSET_X + CLIP_WIDTH - 1
                                   , OFFSET_Y + CLIP_HEIGHT - 1
                                   , EI_CLASSIFIER_INPUT_WIDTH, EI_CLASSIFIER_INPUT_HEIGHT);



if (err) {
  printError(err);
}
 
 err = sized_img.convertPixFormat(CAM_IMAGE_PIX_FMT_GRAY); 
 
if (err) {
  printError(err);
}

  Serial.printf("Resized image %d %d  %d \n", sized_img.getWidth(), sized_img.getHeight(), sized_img.getImgSize());
  
  ei_camera_classify(true);

  if(sample_counter > SAMPLE_COUNT){

    final_value = (int)(sum / SAMPLE_COUNT);
    Serial.printf("$$$$$ FINAL prediction value %d \n", final_value);
    save_image();
    //theCamera.end();
    sum = 0;
    sample_counter = 0;

    
    ei_camera_connect_cellular(DEBUG);
    
    int total_time = millis() - start_time;
    ei_printf("\n $$$ Total execution time %d. Going to sleep \n",  total_time);
    LowPower.deepSleep( 60 * DEEP_SLEEP_TIME_MINUTE);
    //LowPower.deepSleep(60);
   
        
  }  

 

}

void ei_camera_classify(bool debug){

  

    ei_impulse_result_t result = { 0 };

    // the features are stored into flash, and we don't want to load everything into RAM
    signal_t features_signal;
    
    features_signal.total_length = EI_CLASSIFIER_INPUT_WIDTH * EI_CLASSIFIER_INPUT_HEIGHT;
    features_signal.get_data = &ei_camera_cutout_get_data;

    

    // invoke the impulse
    EI_IMPULSE_ERROR res = run_classifier(&features_signal, &result, false /* debug */);
    ei_printf("run_classifier returned: %d\n", res);

    if (res != 0) return;

    // print the predictions
    ei_printf("Predictions ");
    ei_printf("(DSP: %d ms., Classification: %d ms., Anomaly: %d ms.)",
        result.timing.dsp, result.timing.classification, result.timing.anomaly);
    ei_printf(": \n");
    ei_printf("[");
    for (size_t ix = 0; ix < EI_CLASSIFIER_LABEL_COUNT; ix++) {
        ei_printf("%.5f", result.classification[ix].value);
        if(sample_counter !=0){ //ignore the 1st prediction
          int value = (int)result.classification[ix].value;
          if(value > 100){
            value = 100;
          }else if (value < 0 ){
            value = 0;
          }
          sum = sum + value;
        }
        
#if EI_CLASSIFIER_HAS_ANOMALY == 1
        ei_printf(", ");
#else
        if (ix != EI_CLASSIFIER_LABEL_COUNT - 1) {
            ei_printf(", ");
        }
#endif
    }
#if EI_CLASSIFIER_HAS_ANOMALY == 1
    ei_printf("%.3f", result.anomaly);
#endif
    ei_printf("]\n");

    // human-readable predictions
    for (size_t ix = 0; ix < EI_CLASSIFIER_LABEL_COUNT; ix++) {
        ei_printf("    %s: %.5f\n", result.classification[ix].label, result.classification[ix].value);
    }
#if EI_CLASSIFIER_HAS_ANOMALY == 1
    ei_printf("    anomaly score: %.3f\n", result.anomaly);
#endif

    
    sample_counter++;
    ei_printf("\nIteration %d with sum %d \n", sample_counter, sum);
    
}

/**
   Print error message
*/
void printError(enum CamErr err)
{
  Serial.print("Error: ");
  switch (err)
  {
    case CAM_ERR_NO_DEVICE:
      Serial.println("No Device");
      break;
    case CAM_ERR_ILLEGAL_DEVERR:
      Serial.println("Illegal device error");
      break;
    case CAM_ERR_ALREADY_INITIALIZED:
      Serial.println("Already initialized");
      break;
    case CAM_ERR_NOT_INITIALIZED:
      Serial.println("Not initialized");
      break;
    case CAM_ERR_NOT_STILL_INITIALIZED:
      Serial.println("Still picture not initialized");
      break;
    case CAM_ERR_CANT_CREATE_THREAD:
      Serial.println("Failed to create thread");
      break;
    case CAM_ERR_INVALID_PARAM:
      Serial.println("Invalid parameter");
      break;
    case CAM_ERR_NO_MEMORY:
      Serial.println("No memory");
      break;
    case CAM_ERR_USR_INUSED:
      Serial.println("Buffer already in use");
      break;
    case CAM_ERR_NOT_PERMITTED:
      Serial.println("Operation not permitted");
      break;
    default:
      break;
  }
}

static inline void mono_to_rgb(uint8_t mono_data, uint8_t *r, uint8_t *g, uint8_t *b) {
  uint8_t v = mono_data;
  *r = *g = *b = v;
}


int ei_camera_cutout_get_data(size_t offset, size_t length, float *out_ptr) {
  size_t bytes_left = length;
  size_t out_ptr_ix = 0;

  uint8_t *buffer = sized_img.getImgBuff();

  // read byte for byte
  while (bytes_left != 0) {

    // grab the value and convert to r/g/b
    uint8_t pixel = buffer[offset];

    uint8_t r, g, b;
    mono_to_rgb(pixel, &r, &g, &b);

    // then convert to out_ptr format
    float pixel_f = (r << 16) + (g << 8) + b;
    out_ptr[out_ptr_ix] = pixel_f;

    // and go to the next pixel
    out_ptr_ix++;
    offset++;
    bytes_left--;
  }

  // and done!
  return 0;
}



void ei_camera_connect_cellular(bool debug) {
  if ((lteAccess.begin() != LTE_SEARCHING) && debug) {
      Serial.println("ERROR: Could not start LTE modem to LTE_SEARCHING.");
      Serial.println("Please check the status of the LTE board.");
  }
  if (!(lteAccess.attach(APP_LTE_RAT,
                         APP_LTE_APN,
                         APP_LTE_USER_NAME,
                         APP_LTE_PASSWORD,
                         APP_LTE_AUTH_TYPE,
                         APP_LTE_IP_TYPE) == LTE_READY) && debug) {
      Serial.println("ERROR: Failed to attach to LTE network");
      Serial.println("Check SIM card, APN settings, and coverage in current area");
  }

  LTEModemStatus modemStatus = lteAccess.getStatus();

  if(LTE_READY == modemStatus){
    ei_printf("Modem connected successfully \n");

  }else{
    ei_printf("Modem failed with rc %d \n", modemStatus);
  }
  
  IMEI = modem.getIMEI();
  Serial.println("IMEI: " + IMEI);
  unsigned long currentTime;
  while(0 == (currentTime = lteAccess.getTime())) {
    sleep(1);
  }
  RtcTime rtc(currentTime);
  RTC.setTime(rtc);

  
    
  ei_camera_connect_aws_iot(DEBUG);
  //ei_live_classification(DEBUG);
  
}

void ei_camera_connect_aws_iot(bool debug){
  LTETLSClient sClient;
  sClient.setCACert(aws_root_ca_pem);
  sClient.setCertificate(certificate_pem_crt);
  sClient.setPrivateKey(private_pem_key);

  MqttClient mqttClient(sClient);

  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(BROKER_NAME);
  
  if (!mqttClient.connect(BROKER_NAME, BROKER_PORT)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());
    LowPower.reboot();
  }

  Serial.println("Connected to the AWS MQTT.");

  sprintf(payload, "{\"value\":\"%d\",\"imei\":\"%s\",\"vol\":\"%d\",\"curr\":\"%d\"}", final_value, IMEI.c_str(), batV, batC);
  mqttClient.beginMessage(MQTT_TOPIC);
  mqttClient.print(payload);
  int rc =  mqttClient.endMessage();
  Serial.println("Published Message to AWS IoT:");      


}



void ei_live_classification(bool debug){

  CamImage img = theCamera.takePicture();
  Serial.printf("Still image %d %d  %d \n", img.getWidth(), img.getHeight(), img.getImgSize());
 

  if (client.connect(server, port)) {
    if (debug) Serial.println("INFO: connected to network, attempting to transmit image....");
    client.print("POST ");
    client.print(path);
    client.print(" HTTP/1.1\r\n");
    client.print("Host: ");
    client.print(server);
    client.print("\r\n");
    client.print("User-Agent: curl/7.79.1\r\n");
    client.print("Accept: */*\r\n");
    client.print("x-api-key: ");
    client.print(EI_API_KEY);
    client.print("\r\n");
    client.print("Content-Length: ");
    client.print(186 + img.getImgSize(), DEC); // base content is 186 bytes + image jpg bytes
    client.print("\r\n"); // base content is 186 bytes + image jpg bytes

    client.print("Content-Type: multipart/form-data; boundary=------------------------50fe370e0890b48f\r\n");
    client.print("--------------------------50fe370e0890b48f\r\n");
    client.print("Content-Disposition: form-data; name=\"data\"; filename=\"animal.jpg\"\r\n");
    client.print("Content-Type: image/jpeg\r\n");
    client.print("\r\n");
    for (int i = 0; i < img.getImgSize(); i++) {
      client.write(img.getImgBuff()[i]);
    }
    client.print("\r\n--------------------------50fe370e0890b48f--\r\n");

  }

  ei_printf("Sent data to server. Waiting for response");

   // if there are incoming bytes available
  // from the server, read them and print them:
  if (int len = client.available() && debug) {
    char buff[len + 1];
    buff[len] = '\0';
    client.read((uint8_t*)buff, len);
    Serial.print(buff);
  }

}

void save_image( ){
      
    if (!SAVE_TO_SD){
      ei_printf("Ignore saving of the image to SD card \n");
      return;
    }

    CamErr err;
    CamImage img = theCamera.takePicture();
    

    char filename[400];
     if (img.isAvailable()) {
      RtcTime rtc = RTC.getTime();
      sprintf(filename, "%d.%02d%02d%02d.jpg",final_value, rtc.hour(), rtc.minute(), rtc.second());
      theSD.remove(filename);
      File myFile = theSD.open(filename, FILE_WRITE);
      myFile.write(img.getImgBuff(), img.getImgSize());
      myFile.close();  
      Serial.printf("Image saved as %s \n", filename);
     }else{
       Serial.println("failed to compress and save image, check that camera and SD card are connected properly");
     }

}
