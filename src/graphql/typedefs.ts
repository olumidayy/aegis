const typeDefs = `#graphql
  type User {
    id: String
    user_account_number: String
    user_bank_code: String
    user_account_name: String
    is_verified: Boolean
  }

  type FetchUserOutput {
    account_name: String
  }

  type Query {
    fetchUser(account_number: String!, bank_code: String!): FetchUserOutput
  }

  type Mutation { 
    addUser(
      user_account_number: String!,
      user_bank_code: String!,
      user_account_name: String!
    ): User
  }
`;

export default typeDefs;
