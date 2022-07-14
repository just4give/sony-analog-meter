import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CustomerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TankLogMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Customer {
  readonly id: string;
  readonly name: string;
  readonly addres: string;
  readonly imei: string;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly oilLevel: number;
  readonly customerEmail?: string | null;
  readonly ts: number;
  readonly online: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Customer, CustomerMetaData>);
  static copyOf(source: Customer, mutator: (draft: MutableModel<Customer, CustomerMetaData>) => MutableModel<Customer, CustomerMetaData> | void): Customer;
}

export declare class TankLog {
  readonly id: string;
  readonly imei: string;
  readonly oilLevel: number;
  readonly rawValue: number;
  readonly ts: number;
  readonly ttl: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TankLog, TankLogMetaData>);
  static copyOf(source: TankLog, mutator: (draft: MutableModel<TankLog, TankLogMetaData>) => MutableModel<TankLog, TankLogMetaData> | void): TankLog;
}