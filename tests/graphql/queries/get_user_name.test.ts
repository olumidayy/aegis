import { ApolloServer } from '@apollo/server';
import { assert } from 'console';
import { randomUUID } from 'crypto';
import connection from '../../../src/db/config';
import resolvers from '../../../src/graphql/resolvers';
import typeDefs from '../../../src/graphql/typedefs';

describe('Test `get_user_name` mutation', () => {
  beforeAll(async () => {
    try {
      await connection.sync();
      await connection.models.Users.create({
        id: randomUUID(),
        user_account_number: '2136376079',
        user_account_name: 'Nwosu Olumide Ikechukwu',
        user_bank_code: '033',
      });
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    await connection.models.Users.destroy({ where: {} });
    await connection?.close();
  });

  describe('Valid account number and bank code, user exists in DB.', () => {
    it('returns the user account name', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
      });
      const variables = {
        account_number: '2136376079',
        bank_code: '033',
      };
      const { body }: any = await testServer.executeOperation({
        query: `query FetchUser($account_number: String!, $bank_code: String!) {
          fetchUser(account_number: $account_number, bank_code: $bank_code) {
            account_name
          } 
        }`,
        variables,
      });
      assert(body.kind === 'single');
      expect(body.singleResult.errors).toBeUndefined();
      expect(body.singleResult.data.fetchUser.account_name).toBe('Nwosu Olumide Ikechukwu');
    });
  });

  describe('Valid account number and bank code, user does not exist in DB.', () => {
    it('returns the user account name', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
      });
      const variables = {
        account_number: '0076647195',
        bank_code: '032',
      };
      const { body }: any = await testServer.executeOperation({
        query: `query FetchUser($account_number: String!, $bank_code: String!) {
          fetchUser(account_number: $account_number, bank_code: $bank_code) {
            account_name
          } 
        }`,
        variables,
      });
      assert(body.kind === 'single');
      expect(body.singleResult.errors).toBeUndefined();
      expect(body.singleResult.data.fetchUser.account_name).toBe('Shodipo John O');
    });
  });

  describe('Invalid account number and bank code.', () => {
    it('returns the user account name', async () => {
      const testServer = new ApolloServer({
        typeDefs,
        resolvers,
      });
      const variables = {
        account_number: '0076647196',
        bank_code: '039',
      };
      const { body }: any = await testServer.executeOperation({
        query: `query FetchUser($account_number: String!, $bank_code: String!) {
          fetchUser(account_number: $account_number, bank_code: $bank_code) {
            account_name
          } 
        }`,
        variables,
      });
      assert(body.kind === 'single');
      expect(body.singleResult.data.fetchUser).toBeNull();
      expect(body.singleResult.errors).toBeTruthy();
      expect(body.singleResult.errors[0].message).toEqual('Bank details could not be resolved.');
    });
  });
});
