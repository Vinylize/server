import {
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull
} from 'graphql';

import {
  mutationWithClientMutationId
} from 'graphql-relay';

import {
  refs
} from '../util/firebase/firebase.database.util';

import {
  mRefs,
  updateData
} from '../util/sequelize/sequelize.database.util';

import {
  userGeoFire
} from '../util/firebase/firebase.geofire.util';

const runnerAgreeMutation = {
  name: 'runnerAgree',
  description: 'runner agree agreement',
  inputFields: {
  },
  outputFields: {
    result: { type: GraphQLString, resolve: payload => payload.result }
  },
  mutateAndGetPayload: (_, { user }) => new Promise((resolve, reject) => {
    if (user) {
      return refs.user.runnerQualification.child(user.uid).update({
        isA: true,
        aAt: Date.now()
      })
      .then(() => updateData(mRefs.user.root, { isA: true, aAt: Date.now() }, { where: { row_id: user.uid } }))
      .then(() => resolve({ result: 'OK' }))
      .catch(reject);
    }
    return reject('This mutation needs accessToken.');
  })
};

const runnerApplyFirstJudgeMutation = {
  name: 'runnerApplyFirstJudge',
  description: 'runner apply at first judgement',
  inputFields: {
  },
  outputFields: {
    result: { type: GraphQLString, resolve: payload => payload.result }
  },
  mutateAndGetPayload: (_, { user }) => new Promise((resolve, reject) => {
    if (user) {
      return refs.user.root.child(user.uid).once('value')
      .then((snap) => {
        if (!snap.child('idUrl').val()) return reject('Upload identification image first.');
        if (!snap.child('isPV').val()) return reject('Verify your phone first.');
        if (snap.child('isRA').val()) return reject('You are already a runner.');
        return resolve();
      })
      .then(() => refs.user.root.child(user.uid).child('isWJ').set(true))
      // mysql
      // return findDataById(mRefs.user.root, ['idUrl', 'isPV', 'isRA'], user.uid)
      // .then((u) => {
      //   if (!u.idUrl) return reject('Upload identification image first.');
      //   if (!u.isPV) return reject('Verify your phone first.');
      //   if (u.isRA) return reject('You are already a runner.');
      //   return resolve();
      // })
      // mysql
      .then(() => updateData(mRefs.user.root, { isWJ: true }, { where: { row_id: user.uid } }))
      .then(() => resolve({ result: 'OK' }))
      .catch(reject);
    }
    return reject('This mutation needs accessToken.');
  })
};

const runnerUpdateCoordinateMutation = {
  name: 'runnerUpdateCoordinate',
  description: 'runner update coordinate',
  inputFields: {
    lat: { type: new GraphQLNonNull(GraphQLFloat) },
    lon: { type: new GraphQLNonNull(GraphQLFloat) }
  },
  outputFields: {
    result: { type: GraphQLString, resolve: payload => payload.result }
  },
  mutateAndGetPayload: ({ lat, lon }, { user }) => new Promise((resolve, reject) => {
    if (user) {
      return userGeoFire.set(user.uid, [lat, lon])
        .then(() => {
          resolve({ result: 'OK' });
        }, (error) => {
          reject(error);
        });
    }
    return reject('This mutation needs accessToken.');
  })
};

const RunnerMutation = {
  runnerAgree: mutationWithClientMutationId(runnerAgreeMutation),
  runnerApplyFirstJudge: mutationWithClientMutationId(runnerApplyFirstJudgeMutation),
  runnerUpdateCoordinate: mutationWithClientMutationId(runnerUpdateCoordinateMutation)
};

export default RunnerMutation;
