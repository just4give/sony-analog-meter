/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateCustomer: OnCreateCustomerSubscription;
  onUpdateCustomer: OnUpdateCustomerSubscription;
  onDeleteCustomer: OnDeleteCustomerSubscription;
  onCreateTankLog: OnCreateTankLogSubscription;
  onUpdateTankLog: OnUpdateTankLogSubscription;
  onDeleteTankLog: OnDeleteTankLogSubscription;
};

export type CreateCustomerInput = {
  id?: string | null;
  name: string;
  addres: string;
  imei: string;
  latitude?: number | null;
  longitude?: number | null;
  oilLevel: number;
  customerEmail?: string | null;
  ts: number;
  online: boolean;
  _version?: number | null;
};

export type ModelCustomerConditionInput = {
  name?: ModelStringInput | null;
  addres?: ModelStringInput | null;
  imei?: ModelStringInput | null;
  latitude?: ModelFloatInput | null;
  longitude?: ModelFloatInput | null;
  oilLevel?: ModelIntInput | null;
  customerEmail?: ModelStringInput | null;
  ts?: ModelIntInput | null;
  online?: ModelBooleanInput | null;
  and?: Array<ModelCustomerConditionInput | null> | null;
  or?: Array<ModelCustomerConditionInput | null> | null;
  not?: ModelCustomerConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelFloatInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Customer = {
  __typename: "Customer";
  id: string;
  name: string;
  addres: string;
  imei: string;
  latitude?: number | null;
  longitude?: number | null;
  oilLevel: number;
  customerEmail?: string | null;
  ts: number;
  online: boolean;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateCustomerInput = {
  id: string;
  name?: string | null;
  addres?: string | null;
  imei?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  oilLevel?: number | null;
  customerEmail?: string | null;
  ts?: number | null;
  online?: boolean | null;
  _version?: number | null;
};

export type DeleteCustomerInput = {
  id: string;
  _version?: number | null;
};

export type CreateTankLogInput = {
  id?: string | null;
  imei: string;
  oilLevel: number;
  rawValue: number;
  ts: number;
  ttl: number;
  _version?: number | null;
};

export type ModelTankLogConditionInput = {
  imei?: ModelStringInput | null;
  oilLevel?: ModelIntInput | null;
  rawValue?: ModelIntInput | null;
  ts?: ModelIntInput | null;
  ttl?: ModelIntInput | null;
  and?: Array<ModelTankLogConditionInput | null> | null;
  or?: Array<ModelTankLogConditionInput | null> | null;
  not?: ModelTankLogConditionInput | null;
};

export type TankLog = {
  __typename: "TankLog";
  id: string;
  imei: string;
  oilLevel: number;
  rawValue: number;
  ts: number;
  ttl: number;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateTankLogInput = {
  id: string;
  imei?: string | null;
  oilLevel?: number | null;
  rawValue?: number | null;
  ts?: number | null;
  ttl?: number | null;
  _version?: number | null;
};

export type DeleteTankLogInput = {
  id: string;
  _version?: number | null;
};

export type ModelCustomerFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  addres?: ModelStringInput | null;
  imei?: ModelStringInput | null;
  latitude?: ModelFloatInput | null;
  longitude?: ModelFloatInput | null;
  oilLevel?: ModelIntInput | null;
  customerEmail?: ModelStringInput | null;
  ts?: ModelIntInput | null;
  online?: ModelBooleanInput | null;
  and?: Array<ModelCustomerFilterInput | null> | null;
  or?: Array<ModelCustomerFilterInput | null> | null;
  not?: ModelCustomerFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelCustomerConnection = {
  __typename: "ModelCustomerConnection";
  items: Array<Customer | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelTankLogFilterInput = {
  id?: ModelIDInput | null;
  imei?: ModelStringInput | null;
  oilLevel?: ModelIntInput | null;
  rawValue?: ModelIntInput | null;
  ts?: ModelIntInput | null;
  ttl?: ModelIntInput | null;
  and?: Array<ModelTankLogFilterInput | null> | null;
  or?: Array<ModelTankLogFilterInput | null> | null;
  not?: ModelTankLogFilterInput | null;
};

export type ModelTankLogConnection = {
  __typename: "ModelTankLogConnection";
  items: Array<TankLog | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type CreateCustomerMutation = {
  __typename: "Customer";
  id: string;
  name: string;
  addres: string;
  imei: string;
  latitude?: number | null;
  longitude?: number | null;
  oilLevel: number;
  customerEmail?: string | null;
  ts: number;
  online: boolean;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateCustomerMutation = {
  __typename: "Customer";
  id: string;
  name: string;
  addres: string;
  imei: string;
  latitude?: number | null;
  longitude?: number | null;
  oilLevel: number;
  customerEmail?: string | null;
  ts: number;
  online: boolean;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeleteCustomerMutation = {
  __typename: "Customer";
  id: string;
  name: string;
  addres: string;
  imei: string;
  latitude?: number | null;
  longitude?: number | null;
  oilLevel: number;
  customerEmail?: string | null;
  ts: number;
  online: boolean;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateTankLogMutation = {
  __typename: "TankLog";
  id: string;
  imei: string;
  oilLevel: number;
  rawValue: number;
  ts: number;
  ttl: number;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateTankLogMutation = {
  __typename: "TankLog";
  id: string;
  imei: string;
  oilLevel: number;
  rawValue: number;
  ts: number;
  ttl: number;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeleteTankLogMutation = {
  __typename: "TankLog";
  id: string;
  imei: string;
  oilLevel: number;
  rawValue: number;
  ts: number;
  ttl: number;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type GetCustomerQuery = {
  __typename: "Customer";
  id: string;
  name: string;
  addres: string;
  imei: string;
  latitude?: number | null;
  longitude?: number | null;
  oilLevel: number;
  customerEmail?: string | null;
  ts: number;
  online: boolean;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListCustomersQuery = {
  __typename: "ModelCustomerConnection";
  items: Array<{
    __typename: "Customer";
    id: string;
    name: string;
    addres: string;
    imei: string;
    latitude?: number | null;
    longitude?: number | null;
    oilLevel: number;
    customerEmail?: string | null;
    ts: number;
    online: boolean;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncCustomersQuery = {
  __typename: "ModelCustomerConnection";
  items: Array<{
    __typename: "Customer";
    id: string;
    name: string;
    addres: string;
    imei: string;
    latitude?: number | null;
    longitude?: number | null;
    oilLevel: number;
    customerEmail?: string | null;
    ts: number;
    online: boolean;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetTankLogQuery = {
  __typename: "TankLog";
  id: string;
  imei: string;
  oilLevel: number;
  rawValue: number;
  ts: number;
  ttl: number;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListTankLogsQuery = {
  __typename: "ModelTankLogConnection";
  items: Array<{
    __typename: "TankLog";
    id: string;
    imei: string;
    oilLevel: number;
    rawValue: number;
    ts: number;
    ttl: number;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncTankLogsQuery = {
  __typename: "ModelTankLogConnection";
  items: Array<{
    __typename: "TankLog";
    id: string;
    imei: string;
    oilLevel: number;
    rawValue: number;
    ts: number;
    ttl: number;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type OnCreateCustomerSubscription = {
  __typename: "Customer";
  id: string;
  name: string;
  addres: string;
  imei: string;
  latitude?: number | null;
  longitude?: number | null;
  oilLevel: number;
  customerEmail?: string | null;
  ts: number;
  online: boolean;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateCustomerSubscription = {
  __typename: "Customer";
  id: string;
  name: string;
  addres: string;
  imei: string;
  latitude?: number | null;
  longitude?: number | null;
  oilLevel: number;
  customerEmail?: string | null;
  ts: number;
  online: boolean;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteCustomerSubscription = {
  __typename: "Customer";
  id: string;
  name: string;
  addres: string;
  imei: string;
  latitude?: number | null;
  longitude?: number | null;
  oilLevel: number;
  customerEmail?: string | null;
  ts: number;
  online: boolean;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateTankLogSubscription = {
  __typename: "TankLog";
  id: string;
  imei: string;
  oilLevel: number;
  rawValue: number;
  ts: number;
  ttl: number;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateTankLogSubscription = {
  __typename: "TankLog";
  id: string;
  imei: string;
  oilLevel: number;
  rawValue: number;
  ts: number;
  ttl: number;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteTankLogSubscription = {
  __typename: "TankLog";
  id: string;
  imei: string;
  oilLevel: number;
  rawValue: number;
  ts: number;
  ttl: number;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateCustomer(
    input: CreateCustomerInput,
    condition?: ModelCustomerConditionInput
  ): Promise<CreateCustomerMutation> {
    const statement = `mutation CreateCustomer($input: CreateCustomerInput!, $condition: ModelCustomerConditionInput) {
        createCustomer(input: $input, condition: $condition) {
          __typename
          id
          name
          addres
          imei
          latitude
          longitude
          oilLevel
          customerEmail
          ts
          online
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCustomerMutation>response.data.createCustomer;
  }
  async UpdateCustomer(
    input: UpdateCustomerInput,
    condition?: ModelCustomerConditionInput
  ): Promise<UpdateCustomerMutation> {
    const statement = `mutation UpdateCustomer($input: UpdateCustomerInput!, $condition: ModelCustomerConditionInput) {
        updateCustomer(input: $input, condition: $condition) {
          __typename
          id
          name
          addres
          imei
          latitude
          longitude
          oilLevel
          customerEmail
          ts
          online
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCustomerMutation>response.data.updateCustomer;
  }
  async DeleteCustomer(
    input: DeleteCustomerInput,
    condition?: ModelCustomerConditionInput
  ): Promise<DeleteCustomerMutation> {
    const statement = `mutation DeleteCustomer($input: DeleteCustomerInput!, $condition: ModelCustomerConditionInput) {
        deleteCustomer(input: $input, condition: $condition) {
          __typename
          id
          name
          addres
          imei
          latitude
          longitude
          oilLevel
          customerEmail
          ts
          online
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCustomerMutation>response.data.deleteCustomer;
  }
  async CreateTankLog(
    input: CreateTankLogInput,
    condition?: ModelTankLogConditionInput
  ): Promise<CreateTankLogMutation> {
    const statement = `mutation CreateTankLog($input: CreateTankLogInput!, $condition: ModelTankLogConditionInput) {
        createTankLog(input: $input, condition: $condition) {
          __typename
          id
          imei
          oilLevel
          rawValue
          ts
          ttl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateTankLogMutation>response.data.createTankLog;
  }
  async UpdateTankLog(
    input: UpdateTankLogInput,
    condition?: ModelTankLogConditionInput
  ): Promise<UpdateTankLogMutation> {
    const statement = `mutation UpdateTankLog($input: UpdateTankLogInput!, $condition: ModelTankLogConditionInput) {
        updateTankLog(input: $input, condition: $condition) {
          __typename
          id
          imei
          oilLevel
          rawValue
          ts
          ttl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateTankLogMutation>response.data.updateTankLog;
  }
  async DeleteTankLog(
    input: DeleteTankLogInput,
    condition?: ModelTankLogConditionInput
  ): Promise<DeleteTankLogMutation> {
    const statement = `mutation DeleteTankLog($input: DeleteTankLogInput!, $condition: ModelTankLogConditionInput) {
        deleteTankLog(input: $input, condition: $condition) {
          __typename
          id
          imei
          oilLevel
          rawValue
          ts
          ttl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteTankLogMutation>response.data.deleteTankLog;
  }
  async GetCustomer(id: string): Promise<GetCustomerQuery> {
    const statement = `query GetCustomer($id: ID!) {
        getCustomer(id: $id) {
          __typename
          id
          name
          addres
          imei
          latitude
          longitude
          oilLevel
          customerEmail
          ts
          online
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCustomerQuery>response.data.getCustomer;
  }
  async ListCustomers(
    filter?: ModelCustomerFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCustomersQuery> {
    const statement = `query ListCustomers($filter: ModelCustomerFilterInput, $limit: Int, $nextToken: String) {
        listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            addres
            imei
            latitude
            longitude
            oilLevel
            customerEmail
            ts
            online
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCustomersQuery>response.data.listCustomers;
  }
  async SyncCustomers(
    filter?: ModelCustomerFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncCustomersQuery> {
    const statement = `query SyncCustomers($filter: ModelCustomerFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncCustomers(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            name
            addres
            imei
            latitude
            longitude
            oilLevel
            customerEmail
            ts
            online
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncCustomersQuery>response.data.syncCustomers;
  }
  async GetTankLog(id: string): Promise<GetTankLogQuery> {
    const statement = `query GetTankLog($id: ID!) {
        getTankLog(id: $id) {
          __typename
          id
          imei
          oilLevel
          rawValue
          ts
          ttl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTankLogQuery>response.data.getTankLog;
  }
  async ListTankLogs(
    filter?: ModelTankLogFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTankLogsQuery> {
    const statement = `query ListTankLogs($filter: ModelTankLogFilterInput, $limit: Int, $nextToken: String) {
        listTankLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            imei
            oilLevel
            rawValue
            ts
            ttl
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListTankLogsQuery>response.data.listTankLogs;
  }
  async SyncTankLogs(
    filter?: ModelTankLogFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncTankLogsQuery> {
    const statement = `query SyncTankLogs($filter: ModelTankLogFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncTankLogs(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            imei
            oilLevel
            rawValue
            ts
            ttl
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncTankLogsQuery>response.data.syncTankLogs;
  }
  OnCreateCustomerListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCustomer">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateCustomer {
        onCreateCustomer {
          __typename
          id
          name
          addres
          imei
          latitude
          longitude
          oilLevel
          customerEmail
          ts
          online
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateCustomer">>
  >;

  OnUpdateCustomerListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCustomer">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCustomer {
        onUpdateCustomer {
          __typename
          id
          name
          addres
          imei
          latitude
          longitude
          oilLevel
          customerEmail
          ts
          online
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateCustomer">>
  >;

  OnDeleteCustomerListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCustomer">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCustomer {
        onDeleteCustomer {
          __typename
          id
          name
          addres
          imei
          latitude
          longitude
          oilLevel
          customerEmail
          ts
          online
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteCustomer">>
  >;

  OnCreateTankLogListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateTankLog">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateTankLog {
        onCreateTankLog {
          __typename
          id
          imei
          oilLevel
          rawValue
          ts
          ttl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateTankLog">>
  >;

  OnUpdateTankLogListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateTankLog">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateTankLog {
        onUpdateTankLog {
          __typename
          id
          imei
          oilLevel
          rawValue
          ts
          ttl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateTankLog">>
  >;

  OnDeleteTankLogListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteTankLog">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteTankLog {
        onDeleteTankLog {
          __typename
          id
          imei
          oilLevel
          rawValue
          ts
          ttl
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteTankLog">>
  >;
}
