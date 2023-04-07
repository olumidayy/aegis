import Users from '../../../models/user';

export default async function fetchUserByBankAndAccountNumber(accountNumber, bankCode) {
  const user = await Users.findOne({
    where: {
      user_account_number: accountNumber,
      user_bank_code: bankCode,
    },
  });
  return user;
}
