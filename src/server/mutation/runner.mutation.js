import {
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId
} from 'graphql-relay';

import {
  refs
} from '../util/firebase/firebase.database.util';

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
        if (!snap.child('isPV').val()) return reject('Get phone verification first.');
        if (snap.child('isRA').val()) return reject('You are already a runner.');
        return resolve();
      })
      .then(() => refs.user.root.child(user.uid).child('isWJ').set(true))
      .catch(reject);
    }
    return reject('This mutation needs accessToken.');
  })
};

const RunnerMutation = {
  runnerAgree: mutationWithClientMutationId(runnerAgreeMutation),
  runnerApplyFirstJudge: mutationWithClientMutationId(runnerApplyFirstJudgeMutation)
};

export default RunnerMutation;
