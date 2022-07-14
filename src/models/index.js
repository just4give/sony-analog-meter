// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Customer, TankLog } = initSchema(schema);

export {
  Customer,
  TankLog
};