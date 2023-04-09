import { ApolloServer } from '@apollo/server';
import { assert } from 'console';
import connection from '../utils/connection';
import resolvers from '../../../src/graphql/resolvers';
import typeDefs from '../../../src/graphql/typedefs';

describe('Test `add_user` mutation', () => {
  beforeAll(async () => {
    try {
      await connection.sync();
    } catch (error) {
      console.error(error);
    }
  });

  afterEach(async () => {
    await connection.models.Users.destroy({ where: {} });
  });

  afterAll(async () => {
    await connection?.close();
  });

  describe('Valid Name and account number', () => {
    it('verifies the user account and name, LD == 0', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
      });
      const variables = {
        user_account_number: '2136376079',
        user_account_name: 'Nwosu Olumide Ikechukwu',
        user_bank_code: '033',
      };
      const { body }: any = await testServer.executeOperation({
        query: `mutation AddUser ($user_account_number: String!, $user_bank_code: String!, $user_account_name: String!) {
                addUser (user_account_number: $user_account_number, user_bank_code: $user_bank_code, user_account_name: $user_account_name) {
                  id
                  user_account_name
                  user_account_number
                  user_bank_code
                  is_verified
                }
              }`,
        variables,
      });
      assert(body.kind === 'single');
      expect(body.singleResult.errors).toBeUndefined();
      expect(body.singleResult.data.addUser.user_account_name).toBe(variables.user_account_name);
      expect(body.singleResult.data.addUser.user_account_number).toBe(
        variables.user_account_number,
      );
      expect(body.singleResult.data.addUser.user_bank_code).toBe(variables.user_bank_code);
    });
  });

  describe('Valid account number & bank code, name with LD == 1', () => {
    it('verifies the user account and name', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
      });
      const variables = {
        user_account_number: '2136376079',
        user_account_name: 'Nwosu Olumide Ikechukuwu',
        user_bank_code: '033',
      };
      const { body }: any = await testServer.executeOperation({
        query: `mutation AddUser ($user_account_number: String!, $user_bank_code: String!, $user_account_name: String!) {
                addUser (user_account_number: $user_account_number, user_bank_code: $user_bank_code, user_account_name: $user_account_name) {
                  id
                  user_account_name
                  user_account_number
                  user_bank_code
                  is_verified
                }
              }`,
        variables,
      });
      assert(body.kind === 'single');
      expect(body.singleResult.errors).toBeUndefined();
      expect(body.singleResult.data.addUser.user_account_name).toBe(variables.user_account_name);
      expect(body.singleResult.data.addUser.user_account_number).toBe(
        variables.user_account_number,
      );
      expect(body.singleResult.data.addUser.user_bank_code).toBe(variables.user_bank_code);
      expect(body.singleResult.data.addUser.is_verified).toBe(true);
    });
  });

  describe('Valid account number & bank code, name with LD == 2', () => {
    it('verifies the user account and name', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
      });
      const variables = {
        user_account_number: '2136376079',
        user_account_name: 'Nwosu Olumde Ikechuku',
        user_bank_code: '033',
      };
      const { body }: any = await testServer.executeOperation({
        query: `mutation AddUser ($user_account_number: String!, $user_bank_code: String!, $user_account_name: String!) {
                addUser (user_account_number: $user_account_number, user_bank_code: $user_bank_code, user_account_name: $user_account_name) {
                  id
                  user_account_name
                  user_account_number
                  user_bank_code
                  is_verified
                }
              }`,
        variables,
      });
      assert(body.kind === 'single');
      expect(body.singleResult.errors).toBeUndefined();
      expect(body.singleResult.data.addUser.user_account_name).toBe(variables.user_account_name);
      expect(body.singleResult.data.addUser.user_account_number).toBe(
        variables.user_account_number,
      );
      expect(body.singleResult.data.addUser.user_bank_code).toBe(variables.user_bank_code);
      expect(body.singleResult.data.addUser.is_verified).toBe(true);
    });
  });

  describe('Valid account number & bank code, name with LD > 2', () => {
    it('returns an error', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
      });
      const variables = {
        user_account_number: '2136376079',
        user_account_name: 'Nwosu Olumde Ikechku',
        user_bank_code: '033',
      };
      const { body }: any = await testServer.executeOperation({
        query: `mutation AddUser ($user_account_number: String!, $user_bank_code: String!, $user_account_name: String!) {
                addUser (user_account_number: $user_account_number, user_bank_code: $user_bank_code, user_account_name: $user_account_name) {
                  id
                  user_account_name
                  user_account_number
                  user_bank_code
                  is_verified
                }
              }`,
        variables,
      });
      assert(body.kind === 'single');
      expect(body.kind).toStrictEqual('single');
      expect(body.singleResult.data.addUser).toBeNull();
      expect(body.singleResult.errors).toBeTruthy();
      expect(body.singleResult.errors[0].message).toEqual('Account name and provided name do not match.');
    });
  });

  describe('Invalid account number & bank code, name with LD > 2', () => {
    it('returns an error', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
      });
      const variables = {
        user_account_number: '2136376089',
        user_account_name: 'Nwosu Olumde Ikechku',
        user_bank_code: '033',
      };
      const { body }: any = await testServer.executeOperation({
        query: `mutation AddUser ($user_account_number: String!, $user_bank_code: String!, $user_account_name: String!) {
          addUser (user_account_number: $user_account_number, user_bank_code: $user_bank_code, user_account_name: $user_account_name) {
            id
            user_account_name
            user_account_number
            user_bank_code
            is_verified
          }
        }`,
        variables,
      });
      assert(body.kind === 'single');
      expect(body.kind).toStrictEqual('single');
      expect(body.singleResult.data.addUser).toBeNull();
      expect(body.singleResult.errors).toBeTruthy();
      expect(body.singleResult.errors[0].message).toEqual('Bank details could not be resolved.');
    });
  });
});
