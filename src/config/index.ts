import * as dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file.");
}

const config = {

  paystackPrivateKey: process.env.PAYSTACK_SECRET_KEY,

  paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY,

  dbUser: process.env.DB_USER,

  dbPassword: process.env.DB_PASSWORD,

  dbHost: process.env.DB_HOST,

  dbName: process.env.DB_NAME,

};

const keys = Object.keys(config);
for (let i = 0; i < keys.length; i += 1) {
  if (!(config[keys[i]])) {
    throw new Error(`${keys[i]} is missing from .env file`);
  }
}

export default config;
