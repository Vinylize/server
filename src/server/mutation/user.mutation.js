import {
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import {
  mutationWithClientMutationId
} from 'graphql-relay';

import firebase from '../util/firebase.util';

const createUserMutation = {
  name: 'createUser',
  inputFields: {
    email: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  outputFields: {
    result: {
      type: GraphQLString,
      resolve: (payload) => payload.result
    }
  },
  mutateAndGetPayload: ({email, password, name}) => {
    return new Promise((resolve, reject) => {
      firebase.admin.auth().createUser({
        email: email,
        emailVerified: false,
        password: password,
        displayName: name,
        disabled: false
      })
        .then((createdUser) => {
          return firebase.refs.user.child(createdUser.uid).set({
            ...firebase.defaultSchema.user
          })
            .then(() => {
              return firebase.refs.userPortQualification.child(createdUser.uid).set({
                ...firebase.defaultSchema.userPortQualification
              });
            })
            .then(() => {
              return firebase.refs.userShipQualification.child(createdUser.uid).set({
                ...firebase.defaultSchema.userShipQualification
              });
            });
        })
        .then(() => {
          resolve({result: 'OK'});
        })
        .catch(reject);
    });
  }
};

const userUpdateCoordinateMutation = {
  name: 'userUpdateCoordinate',
  inputFields: {
    lat: {type: new GraphQLNonNull(GraphQLFloat)},
    lon: {type: new GraphQLNonNull(GraphQLFloat)}
  },
  outputFields: {
    result: {
      type: GraphQLString,
      resolve: (payload) => payload.result
    }
  },
  mutateAndGetPayload: (args, { user }) => {
    return new Promise((resolve, reject) => {
      if (user) {
        return firebase.refs.userCoordinate.child(user.uid).set(args)
          .then(() => {
            resolve({result: 'OK'});
          })
          .catch(reject);
      }
      return reject('This mutation needs accessToken.');
    });
  }
};

const UserMutation = {
  createUser: mutationWithClientMutationId(createUserMutation),
  updateCoordinate: mutationWithClientMutationId(userUpdateCoordinateMutation)
};

export default UserMutation;
