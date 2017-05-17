import Sequelize from 'sequelize';
import uuid from 'uuid';
import schema from './sequelize.schema';

const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_URL,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql'
});

const mRefs = {
  user: {
    root: {},
    userPaymentInfo: {},
    runnerPaymentInfo: {},
    userAddress: {},
    help: {}
  },

  order: {
    root: {},
    regItems: {},
    customItems: {}
  },

  node: {
    root: {},
    nodeItems: {}
  },

  partner: {
    root: {},
    partnerPaymentInfo: {}
  }
};

const mDefaultSchema = {
  user: {
    root: {
      idUrl: null,
      pUrl: null,
      isPV: false,
      p: null,
      r: 5,
      dt: null,
      isRA: null,
      rAAt: null,
      isWJ: false,
      isB: false,
      isSA: false,
      sAAt: null
    }
  },
  order: {
    root: {
      rId: null,
      rImg: null,
      RDP: null,
      uM: 3,
      uComm: null,
      rM: 3,
      rComm: null
    }
  },
  node: {
    root: {
      like: 0
    },
    nodeItems: {
      iImgUrl: null
    }
  },
  partner: {
    root: {
    },
    partnerQualification: {
      isA: false,
      aAt: null,
      isFA: false,
      fAAt: null
    }
  }
};

const createData = (table, properties, id) => new Promise((resolve, reject) => {
  const newId = uuid.v1();
  if (table.root_id) {
    return db.transaction(t => table.root_id.create({ v: newId }, { transaction: t })
      .then(() => Promise.all(
        Object.keys(properties).map((key) => {
          if (table[key]) return table[key].create({ root_id: newId, v: properties[key] }, { transaction: t });
          return null;
        })
      )))
      .then(() => resolve(newId))
      .catch(reject);
  }
  return db.transaction(t => table.sub_id.create({ root_id: id, v: newId }, { transaction: t })
    .then(() => Promise.all(
      Object.keys(properties).map((key) => {
        if (table[key]) return table[key].create({ root_id: id, sub_id: newId, v: properties[key] }, { transaction: t });
        return null;
      })
    ))).then(() => resolve(newId))
    .catch(reject);
});

const updateData = (table, properties, condition) => new Promise((resolve, reject) => Promise.all(
    Object.keys(condition.where).map(key => table[key].findAll({ where: { v: condition.where[key] } }))
  ).then((instances) => {
    let ids = [];
    instances.map(a => a.map((val) => {
      if (table.root_id) {
        if (val.root_id) ids.push({ root_id: val.root_id });
        else ids.push({ root_id: val.v });
      } else if (val.sub_id) ids.push({ root_id: val.root_id, sub_id: val.sub_id });
      else ids.push({ root_id: val.root_id, sub_id: val.v });
      return true;
    }));
    ids = ids.filter((v, i, self) => i === self.indexOf(v));
    return db.transaction(t => Promise.all(
      ids.map(id => Promise.all(
        Object.keys(properties).map((key) => {
          if (table.root_id) {
            return table[key].findOne({ where: { root_id: id.root_id } }, { transaction: t })
            .then((data) => {
              if (data) return table[key].update({ v: properties[key] }, { where: { root_id: id.root_id } }, { transaction: t });
              return table[key].create({ root_id: id.root_id, v: properties[key] }, { transaction: t });
            });
          }
          return table[key].findOne({ where: { sub_id: id.sub_id } }, { transaction: t })
          .then((data) => {
            if (data) return table[key].update({ v: properties[key] }, { where: { sub_id: id.sub_id } }, { transaction: t });
            return table[key].create({ root_id: id.root_id, sub_id: id.sub_id, v: properties[key] }, { transaction: t });
          });
        })
      )))
      .then(() => resolve(ids.map(v => Object.assign(v, properties)))));
  })
  .catch(reject)
);

// If array column, searching by sub_id, while root_id for root column.
const findDataById = (table, properties, id) => new Promise((resolve, reject) => {
  let idType = 'root_id';
  if (table.sub_id) idType = 'sub_id';
  return table[idType].findOne({ where: { v: id } })
    .then((instance) => {
      if (instance) {
        return Promise.all(
          properties.map((key) => {
            if (table.root_id) {
              return table[key].findOne({ where: { root_id: id } })
              .then((instance2) => {
                if (instance2) return instance2.dataValues;
                return null;
              });
            }
            return table[key].findOne({ where: { sub_id: id } })
            .then((instance2) => {
              if (instance2) return instance2.dataValues;
              return null;
            });
          })
        ).then((result) => {
          const result2 = {};
          if (table.root_id) {
            result2.root_id = id;
          } else {
            result2.sub_id = id;
            result2.root_id = result[0].root_id;
          }
          properties.map((key, i) => {
            if (result[i]) result2[key] = result[i].v;
            return true;
          });
          return result2;
        });
      }
      return reject('No results');
    })
    .then(result => resolve(result))
    .catch(reject);
});

const findData = (table, properties, condition) => new Promise((resolve, reject) => Promise.all(
    Object.keys(condition.where).map(key => table[key].findAll({ where: { v: condition.where[key] } }))
  )
  .then((instances) => {
    let ids = [];
    instances.map((a) => {
      a.map((v) => {
        if (table.root_id) ids.push(v.root_id);
        else ids.push(v.sub_id);
        return true;
      });
      return true;
    });
    ids = ids.filter((v, i, self) => i === self.indexOf(v));
    return Promise.all(
      ids.map(id => findDataById(table, properties, id))
    ).then(result => resolve(result));
  })
  .catch(reject));

/* eslint-disable array-callback-return */

Object.keys(schema.user).map((key) => {
  mRefs.user.root[key] = db.define(`user_${key}`, schema.user[key], {
    timestamps: false,
    tableName: `user_${key}`,
    freezeTableName: true
  });
});

Object.keys(schema.userPaymentInfo).map((key) => {
  mRefs.user.userPaymentInfo[key] = db.define(`userPaymentInfo_${key}`, schema.userPaymentInfo[key], {
    timestamps: false,
    tableName: `userPaymentInfo_${key}`,
    freezeTableName: true
  });
});

Object.keys(schema.runnerPaymentInfo).map((key) => {
  mRefs.user.runnerPaymentInfo[key] = db.define(`runnerPaymentInfo_${key}`, schema.runnerPaymentInfo[key], {
    timestamps: false,
    tableName: `runnerPaymentInfo_${key}`,
    freezeTableName: true
  });
});

Object.keys(schema.userAddress).map((key) => {
  mRefs.user.userAddress[key] = db.define(`userAddress_${key}`, schema.userAddress[key], {
    timestamps: false,
    tableName: `userAddress_${key}`,
    freezeTableName: true
  });
});

Object.keys(schema.help).map((key) => {
  mRefs.user.help[key] = db.define(`help_${key}`, schema.help[key], {
    timestamps: false,
    tableName: `help_${key}`,
    freezeTableName: true
  });
});

Object.keys(schema.order).map((key) => {
  mRefs.order[key] = db.define(`order_${key}`, schema.order[key], {
    timestamps: false,
    tableName: `order_${key}`,
    freezeTableName: true
  });
});

Object.keys(schema.regItems).map((key) => {
  mRefs.order.regItems[key] = db.define(`regItems_${key}`, schema.regItems[key], {
    timestamps: false,
    tableName: `regItmes_${key}`,
    freezeTableName: true
  });
});

Object.keys(schema.customItems).map((key) => {
  mRefs.order.customItems[key] = db.define(`customItems_${key}`, schema.customItems[key], {
    timestamps: false,
    tableName: `customItems_${key}`,
    freezeTableName: true
  });
});

Object.keys(schema.node).map((key) => {
  mRefs.node.root[key] = db.define(`node_${key}`, schema.node[key], {
    timestamps: false,
    tableName: `node_${key}`,
    freezeTableName: true
  });
});

Object.keys(schema.nodeItems).map((key) => {
  mRefs.node.nodeItems[key] = db.define(`nodeItems_${key}`, schema.nodeItems[key], {
    timestamps: false,
    tableName: `nodeItems_${key}`,
    freezeTableName: true
  });
});

Object.keys(schema.partner).map((key) => {
  mRefs.partner.root[key] = db.define(`partner_${key}`, schema.partner[key], {
    timestamps: false,
    tableName: `partner_${key}`,
    freezeTableName: true
  });
});

Object.keys(schema.partnerPaymentInfo).map((key) => {
  mRefs.partner.partnerPaymentInfo[key] = db.define(`partnerPaymentInfo_${key}`, schema.partnerPaymentInfo[key], {
    timestamps: false,
    tableName: `partnerPaymentInfo_${key}`,
    freezeTableName: true
  });
});

/* eslint-enable array-callback-return */

export {
  mRefs,
  mDefaultSchema,
  createData,
  updateData,
  findData,
  findDataById,
  db
};
