import { GraphQLError } from 'graphql';
import Users from '../../../models/user';
import fetchUserByBankAndAccountNumber from '../utils/fetch_user';
import getLevenshteinDistance from '../utils/levenshtein_distance';
import resolveBank from '../utils/resolve_bank';
import sentenceCase from '../utils/sentence_case';
import { AddUserDTO } from './dtos/add_user.dto';

const { randomUUID } = require('crypto');

export default async function addUser(userData: AddUserDTO) {
  let user = await fetchUserByBankAndAccountNumber(
    userData.user_account_number,
    userData.user_bank_code,
  );
  if (user) return user;
  const data = await resolveBank(
    userData.user_account_number,
    userData.user_bank_code,
  );
  if (!data) {
    throw new GraphQLError('Details do not match any valid account.', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
  const levenshteinDistance = getLevenshteinDistance(data.account_name, userData.user_account_name);
  if (levenshteinDistance > 2) {
    throw new GraphQLError('Account name and provided name do not match.', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }
  user = await Users.create({
    ...userData,
    id: randomUUID(),
    user_account_name: sentenceCase(userData.user_account_name),
    is_verified: true,
  });
  return user;
}
