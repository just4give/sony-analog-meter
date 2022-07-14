const ListCustomers = `query ListCustomers($filter: ModelCustomerFilterInput, $limit: Int, $nextToken: String) {
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

const UpdateCustomer = `mutation UpdateCustomer($input: UpdateCustomerInput!, $condition: ModelCustomerConditionInput) {
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

  const CreateTankLog = `mutation CreateTankLog($input: CreateTankLogInput!, $condition: ModelTankLogConditionInput) {
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

  exports.ListCustomers = ListCustomers;
  exports.UpdateCustomer = UpdateCustomer;
  exports.CreateTankLog = CreateTankLog;
