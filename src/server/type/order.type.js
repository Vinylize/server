import {
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import {
  refs
} from '../util/firebase.util';

import UserType from './user.type';

const RegularItemType = new GraphQLObjectType({
  name: 'regularItem',
  description: 'Registerd item in node.',
  fields: () => ({
    iId: { type: GraphQLString },
    n: { type: GraphQLString },
    p: { type: GraphQLInt },
    cnt: { type: GraphQLInt },
  })
});

const CustomItemType = new GraphQLObjectType({
  name: 'customItem',
  description: 'User customed item.',
  fields: () => ({
    manu: { type: GraphQLString },
    n: { type: GraphQLString },
    cnt: { type: GraphQLInt }
  })
});

const ItemType = new GraphQLObjectType({
  name: 'Item',
  description: 'item of order.',
  fields: () => ({
    regItem: {
      type: new GraphQLList(RegularItemType),
      resolve: (source) => {
        console.log(source);
      }
    },
    customItem: {
      type: new GraphQLList(CustomItemType),
      resolve: (source) => {
        console.log(source);
      }
    }
  })
});

const PaymentDetailType = new GraphQLObjectType({
  name: 'paymentDetail',
  fields: () => ({
    m: { type: GraphQLInt },
    comm: { type: GraphQLString }
  })
});

const CalculateDetailType = new GraphQLObjectType({
  name: 'calculateDetail',
  fields: () => ({
    m: { type: GraphQLInt },
    comm: { type: GraphQLString }
  })
});

const EvalFromRunnerType = new GraphQLObjectType({
  name: 'evalFromRunner',
  fields: () => ({
    m: { type: GraphQLInt },
    comm: { type: GraphQLString }
  })
});

const EvalFromUserType = new GraphQLObjectType({
  name: 'evalFromUser',
  fields: () => ({
    m: { type: GraphQLInt },
    comm: { type: GraphQLString }
  })
});

const OrderType = new GraphQLObjectType({
  name: 'Connection',
  description: 'OrderType of User.',
  fields: () => ({
    id: { type: GraphQLString },
    nId: { type: GraphQLString },
    oId: {
      type: UserType,
      resolve: source => new Promise((resolve, reject) => {
        refs.user.root.child(source.oId).once('value')
          .then(snap => resolve(snap.val()))
          .catch(reject);
      })
    },
    rId: {
      type: UserType,
      resolve: source => new Promise((resolve, reject) => {
        if (!source.rId) {
          return resolve();
        }
        return refs.user.root.child(source.rId).once('value')
          .then(snap => resolve(snap.val()))
          .catch(reject);
      })
    },
    rSAt: { type: GraphQLFloat },
    dC: { type: GraphQLInt },
    rC: { type: GraphQLInt },
    rImg: { type: GraphQLString },
    items: { type: ItemType },
    eDP: { type: GraphQLInt },
    rDP: { type: GraphQLInt },
    tP: { type: GraphQLInt },
    cAt: { type: GraphQLFloat },
    paymentDetail: {
      type: PaymentDetailType,
      resolve: source => new Promise((resolve, reject) => {
        refs.user.paymentDetail.child(source.id).once('value')
            .then(snap => resolve(snap.val()))
            .catch(reject);
      })
    },
    calculateDetail: {
      type: CalculateDetailType,
      resolve: source => new Promise((resolve, reject) => {
        refs.user.calculateDetail.child(source.id).once('value')
            .then(snap => resolve(snap.val()))
            .catch(reject);
      })
    },
    evalFromRunner: {
      type: EvalFromRunnerType,
      resolve: source => new Promise((resolve, reject) => {
        refs.user.evalFromRunner.child(source.id).once('value')
            .then(snap => resolve(snap.val()))
            .catch(reject);
      })
    },
    evalFromUser: {
      type: EvalFromUserType,
      resolve: source => new Promise((resolve, reject) => {
        refs.user.evalFromUser.child(source.id).once('value')
            .then(snap => resolve(snap.val()))
            .catch(reject);
      })
    }
  })
});

export {
  OrderType,
  ItemType
};
