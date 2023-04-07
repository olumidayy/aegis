import mutations from './mutations';
import queries from './queries';

const resolvers = {
  Query: {
    fetchUser: (_, userData) => queries.getUserName(userData),
  },
  Mutation: {
    addUser: (_, userData) => mutations.addUser(userData),
  },
};

export default resolvers;
