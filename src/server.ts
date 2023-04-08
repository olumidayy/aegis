import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import pino from 'pino';
import app from './app';
import config from './config';
import connection from './db/config';

const logger = pino();

async function startServer(server: ApolloServer) {
  connection
    .sync()
    .then(() => {
      logger.info('Database successfully connected');
    })
    .catch((err) => {
      logger.info('Error', err);
    });
  const { url } = await startStandaloneServer(server, {
    listen: { port: config.port },
  });

  logger.info(`🚀  Server ready at: ${url}`);
}

startServer(app);
