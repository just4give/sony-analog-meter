/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_ETANK_GRAPHQLAPIIDOUTPUT
	API_ETANK_GRAPHQLAPIENDPOINTOUTPUT
	API_ETANK_GRAPHQLAPIKEYOUTPUT
	AWS_NODEJS_CONNECTION_REUSE_ENABLED
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 const https = require('https');
 const AWS = require('aws-sdk');
 const urlParse = require("url").URL;
 
 //environment variables
 const region = process.env.REGION
 const appsyncUrl = process.env.API_ETANK_GRAPHQLAPIENDPOINTOUTPUT;
 const endpoint = new urlParse(appsyncUrl).hostname.toString();

exports.handler = async (event) => {
    console.log('event received:' + JSON.stringify(event,null,2));

    const req = new AWS.HttpRequest(appsyncUrl, region);

    //define the graphql mutation to create the sensor values
  const mutationNameCreateTankLog = 'CreateTankLog';
  const mutationCreateTankLog = require('./mutations').CreateTankLog;

  const mutationNameListCustomers = 'ListCustomers';
  const mutationListCustomers = require('./mutations').ListCustomers;
  
  const mutationNameUpdateCustomer = 'UpdateCustomer';
  const mutationUpdateCustomer = require('./mutations').UpdateCustomer;

    try {


        const devices = await processGrahpQL(req,{
            query: mutationListCustomers,
            operationName: mutationNameListCustomers,
            variables: {
                filter: {  imei:{eq:event.imei}}
            }
        });
    
        console.log(JSON.stringify(devices));
        console.log(JSON.stringify(devices.data.listCustomers.items));

        if(devices.data.listCustomers.items.length>0){
            let device = devices.data.listCustomers.items[0];
            console.log(`Device id ${device.id}`);

            //update device with timestamp and oil level

            let updateInput = {
                id: device.id,
                _version: device._version,
                oilLevel: getRoundedOilLevel(event.value),
                name: device.name,
                addres: device.addres,
                imei: device.imei,
                latitude: device.latitude,
                longitude: device.longitude,
                ts: Math.floor(new Date().getTime()/1000) ,
                online: true

            }
            console.log("updateInput", updateInput);

            let updateResponse = await processGrahpQL(req,{
                query: mutationUpdateCustomer,
                operationName: mutationNameUpdateCustomer,
                variables: {
                    input: updateInput
                }
            });
            console.log("Customer table updated");
            console.log(updateResponse);
    
            const data = await processGrahpQL(req,{
                query: mutationCreateTankLog,
                operationName: mutationNameCreateTankLog,
                variables: {
                    input:{
                        imei: event.imei,
                        oilLevel: getRoundedOilLevel(event.value),
                        rawValue: event.value,
                        ts:  Math.floor(new Date().getTime()/1000) ,
                        ttl: Math.floor(new Date().getTime()/1000 + 3600*24*30)  //retain data for 30 days hours
                    }
                }
            })
            console.log("Successful logged data ", data);
    

        }


        return {
            statusCode: 200,
            body: {},
        };
        
    } catch (error) {
        console.log("error: " + error);
        throw new Error("Error creating sensor value " );
    }
    
};

var getRoundedOilLevel = (oilLevel) =>{
    return Math.round(oilLevel/10) * 10;

}
var processGrahpQL = async (req,body)=>{

    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.headers["x-api-key"] = process.env.API_ETANK_GRAPHQLAPIKEYOUTPUT;
    req.body = JSON.stringify(body);

    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    const data = await new Promise((resolve, reject) => {


      const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
          result.on('data', (data) => {
              resolve(JSON.parse(data.toString()));
          });
      });

      httpRequest.write(req.body);
      httpRequest.end();

    });

    return data;

}