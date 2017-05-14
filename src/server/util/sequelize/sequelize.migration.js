/* eslint-disable import/no-unresolved */
import {
  userSchema,
  userPaymentInfoSchema,
  runnerPaymentInfoSchema,
  userAddressSchema,
  helpSchema,
  orderSchema,
  regItemsSchema,
  customItemsSchema,
  nodeSchema,
  nodeItemsSchema,
  partnerSchema,
  partnerPaymentInfoSchema
} from '../schema/sequelize.schema';

/* eslint-enable import/no-unresolved */

const up = queryInterface => Promise.all([
  queryInterface.createTable('user', userSchema, { charset: 'utf8' }),
  queryInterface.createTable('userPaymentInfo', userPaymentInfoSchema, { charset: 'utf8' }),
  queryInterface.createTable('runnerPaymentInfo', runnerPaymentInfoSchema, { charset: 'utf8' }),
  queryInterface.createTable('userAddress', userAddressSchema, { charset: 'utf8' }),
  queryInterface.createTable('help', helpSchema, { charset: 'utf8' }),
  queryInterface.createTable('order', orderSchema, { charset: 'utf8' }),
  queryInterface.createTable('regItems', regItemsSchema, { charset: 'utf8' }),
  queryInterface.createTable('customItems', customItemsSchema, { charset: 'utf8' }),
  queryInterface.createTable('node', nodeSchema, { charset: 'utf8' }),
  queryInterface.createTable('nodeItems', nodeItemsSchema, { charset: 'utf8' }),
  queryInterface.createTable('partner', partnerSchema, { charset: 'utf8' }),
  queryInterface.createTable('partnerPaymentInfo', partnerPaymentInfoSchema, { charset: 'utf8' })
]);

const down = () => {

};

export {
  up,
  down
};
