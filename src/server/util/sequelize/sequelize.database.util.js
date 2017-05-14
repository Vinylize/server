import Sequelize from 'sequelize';
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
} from './sequelize.schema';

const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_URL,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql'
});

const user = db.define('user', userSchema, {
  timestamps: false,
  tableName: 'user',
  freezeTableName: true
});

const userPaymentInfo = db.define('userPaymentInfo', userPaymentInfoSchema, {
  timestamps: false,
  tableName: 'userPaymentInfo',
  freezeTableName: true
});

const runnerPaymentInfo = db.define('runnerPaymentInfo', runnerPaymentInfoSchema, {
  timestamps: false,
  tableName: 'runnerPaymentInfo',
  freezeTableName: true
});

const userAddress = db.define('userAddress', userAddressSchema, {
  timestamps: false,
  tableName: 'userAddress',
  freezeTableName: true
});

const help = db.define('help', helpSchema, {
  timestamps: false,
  tableName: 'help',
  freezeTableName: true
});

const order = db.define('order', orderSchema, {
  timestamps: false,
  tableName: 'order',
  freezeTableName: true
});

const customItems = db.define('customItems', customItemsSchema, {
  timestamps: false,
  tableName: 'customItems',
  freezeTableName: true
});

const regItems = db.define('regItems', regItemsSchema, {
  timestamps: false,
  tableName: 'regItems',
  freezeTableName: true
});

const node = db.define('node', nodeSchema, {
  timestamps: false,
  tableName: 'node',
  freezeTableName: true
});
const nodeItems = db.define('nodeItmes', nodeItemsSchema, {
  timestamps: false,
  tableName: 'nodeItems',
  freezeTableName: true
});

const partner = db.define('partner', partnerSchema, {
  timestamps: false,
  tableName: 'partner',
  freezeTableName: true
});

const partnerPaymentInfo = db.define('partnerPaymentInfo', partnerPaymentInfoSchema, {
  timestamps: false,
  tableName: 'partnerPaymentInfo',
  freezeTableName: true
});

user.hasMany(userPaymentInfo);
user.hasMany(runnerPaymentInfo);
user.hasMany(userAddress);
user.hasMany(help);
userPaymentInfo.belongsTo(user);
runnerPaymentInfo.belongsTo(user);
userAddress.belongsTo(user);
help.belongsTo(user);

order.hasMany(regItems);
order.hasMany(customItems);
regItems.belongsTo(order);
regItems.belongsTo(order);

node.hasMany(nodeItems);
nodeItems.belongsTo(node);

partner.hasMany(partnerPaymentInfo);
partnerPaymentInfo.belongsTo(partner);

const mRefs = {
  user: {
    root: user,
    userPaymentInfo,
    runnerPaymentInfo,
    userAddress,
    help
  },

  order: {
    root: order,
    regItems,
    customItems
  },

  node: {
    root: node,
    nodeItems
  },

  partner: {
    root: partner,
    partnerPaymentInfo
  }
};

export {
  mRefs,
  db
};
