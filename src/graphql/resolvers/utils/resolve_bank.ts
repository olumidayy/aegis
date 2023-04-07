import axios from 'axios';
import { GraphQLError } from 'graphql';
import config from '../../../config';

export default async function resolveBank(accountNumber, bankCode) {
  try {
    const url = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${config.paystackPrivateKey}`,
      },
    });
    return res?.data?.data;
  } catch (error) {
    throw new GraphQLError('Bank details could not be resolved.', {
      extensions: { code: 'BAD_REQUEST' },
    });
  }
}
