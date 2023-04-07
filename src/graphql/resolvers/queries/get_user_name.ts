import { GraphQLError } from 'graphql';
import fetchUserByBankAndAccountNumber from '../utils/fetch_user';
import resolveBank from '../utils/resolve_bank';
import sentenceCase from '../utils/sentence_case';
import { GetUserNameDTO } from './dtos/get_user_name.dto.ts';

export default async function getUserName(userData: GetUserNameDTO) {
  const data = await resolveBank(
    userData.account_number,
    userData.bank_code,
  );
  const user = await fetchUserByBankAndAccountNumber(
    userData.account_number,
    userData.bank_code,
  );
  if (user || data) {
    return { account_name: sentenceCase(user?.user_account_name || data.account_name) };
  }
  throw new GraphQLError('Details do not match any user account.', {
    extensions: { code: 'BAD_USER_INPUT' },
  });
}
