import {
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';

import firebase from '../util/firebase.util';
import UserType from '../type/user.type';
import ConnectionType from '../type/connection.type';

const ConnectionMutation = {
  createConnection: mutationWithClientMutationId({
    name: 'createConnection',
    inputFields: {
      category: {type: new GraphQLNonNull(GraphQLString)},
      subCategory: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
      result: {
        type: GraphQLString,
        resolve: (payload) => payload.result
      }
    },
    mutateAndGetPayload: ({category, subCategory},{user}) => {
      return new Promise((resolve, reject) => {
        return firebase.refs.connection.push({
          port: user.uid,
          category,
          subCategory,
          ...firebase.defaultSchema.connection
        })
          .then(()=> {
            resolve({result: 'OK'});
          })
          .catch(reject);
      });
    }
  })
};

export default ConnectionMutation;
