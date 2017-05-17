import Sequelize from 'sequelize';

const schema = {
  user: {
    root_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    e: { v: { type: Sequelize.STRING } },
    pw: { v: { type: Sequelize.STRING } },
    n: { v: { type: Sequelize.STRING } },
    mode: { v: { type: Sequelize.INTEGER } },
    idUrl: { v: { type: Sequelize.STRING } },
    pUrl: { v: { type: Sequelize.STRING } },
    p: { v: { type: Sequelize.STRING } },
    isPV: { v: { type: Sequelize.BOOLEAN } },
    cAt: { v: { type: Sequelize.DATE } },
    r: { v: { type: Sequelize.INTEGER } },
    dt: { v: { type: Sequelize.STRING } },
    d: { v: { type: Sequelize.STRING } },
    isWJ: { v: { type: Sequelize.BOOLEAN } },
    isRA: { v: { type: Sequelize.BOOLEAN } },
    rAAt: { v: { type: Sequelize.INTEGER } },
    isB: { v: { type: Sequelize.BOOLEAN } },
    permission: { v: { type: Sequelize.STRING } },
    isUA: { v: { type: Sequelize.BOOLEAN } },
    uAAt: { v: { type: Sequelize.DATE } },
    isSA: { v: { type: Sequelize.BOOLEAN } },
    sAAt: { v: { type: Sequelize.DATE } },
    lat: { v: { type: Sequelize.FLOAT } },
    lon: { v: { type: Sequelize.FLOAT } },
    code: { v: { type: Sequelize.STRING } },
    vAt: { v: { type: Sequelize.DATE } },
    eAt: { v: { type: Sequelize.DATE } }
  },
  userPaymentInfo: {
    sub_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    type: { v: { type: Sequelize.STRING } },
    num: { v: { type: Sequelize.STRING } },
    provider: { v: { type: Sequelize.STRING } }
  },
  runnerPaymentInfo: {
    sub_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    type: { v: { type: Sequelize.STRING } },
    num: { v: { type: Sequelize.STRING } },
    provider: { v: { type: Sequelize.STRING } }
  },
  userAddress: {
    sub_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    name: { v: { type: Sequelize.STRING } },
    mAddr: { v: { type: Sequelize.STRING } },
    sAddr: { v: { type: Sequelize.STRING } },
    lat: { v: { type: Sequelize.FLOAT } },
    lon: { v: { type: Sequelize.FLOAT } }
  },
  help: {
    sub_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    comm: { v: { type: Sequelize.STRING } },
    cAt: { v: { type: Sequelize.DATE } },
    aAt: { v: { type: Sequelize.DATE } },
    ans: { v: { type: Sequelize.STRING } },
    ansAt: { v: { type: Sequelize.DATE } }
  },
  order: {
    root_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    oId: { v: { type: Sequelize.STRING } },
    rId: { v: { type: Sequelize.STRING } },
    nId: { v: { type: Sequelize.STRING } },
    dest: { v: { type: Sequelize.STRING } },
    dC: { v: { type: Sequelize.INTEGER } },
    rC: { v: { type: Sequelize.INTEGER } },
    rImg: { v: { type: Sequelize.STRING } },
    eDp: { v: { type: Sequelize.INTEGER } },
    rDp: { v: { type: Sequelize.INTEGER } },
    isIC: { v: { type: Sequelize.BOOLEAN } },
    tP: { v: { type: Sequelize.INTEGER } },
    curr: { v: { type: Sequelize.STRING } },
    cAt: { v: { type: Sequelize.DATE } },
    pSAt: { v: { type: Sequelize.DATE } },
    pFAt: { v: { type: Sequelize.DATE } },
    rSAt: { v: { type: Sequelize.DATE } },
    endAt: { v: { type: Sequelize.DATE } },
    n1: { v: { type: Sequelize.STRING } },
    n2: { v: { type: Sequelize.STRING } },
    lat: { v: { type: Sequelize.FLOAT } },
    lon: { v: { type: Sequelize.FLOAT } },
    calculateDetail: { v: { type: Sequelize.STRING } },
    paymentDetail: { v: { type: Sequelize.STRING } },
    rM: { v: { type: Sequelize.INTEGER } },
    rComm: { v: { type: Sequelize.STRING } },
    uM: { v: { type: Sequelize.INTEGER } },
    uComm: { v: { type: Sequelize.STRING } }
  },
  regItems: {
    sub_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    n: { v: { type: Sequelize.STRING } },
    p: { v: { type: Sequelize.INTEGER } },
    cnt: { v: { type: Sequelize.INTEGER } }
  },
  customItems: {
    sub_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    n: { v: { type: Sequelize.STRING } },
    manu: { v: { type: Sequelize.STRING } },
    cnt: { v: { type: Sequelize.INTEGER } }
  },
  node: {
    root_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    n: { v: { type: Sequelize.STRING } },
    p: { v: { type: Sequelize.STRING } },
    addr: { v: { type: Sequelize.STRING } },
    c1: { v: { type: Sequelize.STRING } },
    c2: { v: { type: Sequelize.STRING } },
    type: { v: { type: Sequelize.STRING } },
    pId: { v: { type: Sequelize.STRING } },
    imgUrl: { v: { type: Sequelize.STRING } },
    cAt: { v: { type: Sequelize.DATE } },
    like: { v: { type: Sequelize.INTEGER } },
    lat: { v: { type: Sequelize.FLOAT } },
    lon: { v: { type: Sequelize.FLOAT } }
  },
  nodeItems: {
    sub_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    name: { v: { type: Sequelize.STRING } },
    imgUrl: { v: { type: Sequelize.STRING } },
    price: { v: { type: Sequelize.INTEGER } },
    weight: { v: { type: Sequelize.INTEGER } }
  },
  partner: {
    root_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    pw: { v: { type: Sequelize.STRING } },
    name: { v: { type: Sequelize.STRING } },
    p: { v: { type: Sequelize.STRING } },
    cAt: { v: { type: Sequelize.DATE } },
    isA: { v: { type: Sequelize.BOOLEAN } },
    AAt: { v: { type: Sequelize.DATE } },
    isFA: { v: { type: Sequelize.BOOLEAN } },
    FAAt: { v: { type: Sequelize.DATE } }
  },
  partnerPaymentInfo: {
    sub_id: { v: { type: Sequelize.UUID, unique: true, allowNull: false } },
    type: { v: { type: Sequelize.INTEGER } },
    num: { v: { type: Sequelize.STRING } },
    provider: { v: { type: Sequelize.STRING } }
  }
};

/* eslint-disable array-callback-return */
Object.keys(schema).map((key1) => {
  Object.keys(schema[key1]).map((key2) => {
    schema[key1][key2].id = {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    };
    if (key1 === 'user' || key1 === 'order' || key1 === 'node' || key1 === 'partner') {
      if (key2 !== 'root_id') {
        schema[key1][key2].root_id = {
          type: Sequelize.UUID,
          primaryKey: true
        };
      }
    } else {
      schema[key1][key2].root_id = {
        type: Sequelize.UUID,
        allowNull: false
      };
      if (key2 !== 'sub_id') {
        schema[key1][key2].sub_id = {
          type: Sequelize.UUID,
          primaryKey: true
        };
      }
    }
  });
});
/* eslint-enable array-callback-return */

export default schema;
