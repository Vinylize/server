import Sequelize from 'sequelize';

const userSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  e: { type: Sequelize.STRING },
  pw: { type: Sequelize.STRING },
  n: { type: Sequelize.STRING },
  mode: { type: Sequelize.INTEGER },
  idUrl: { type: Sequelize.STRING },
  pUrl: { type: Sequelize.STRING },
  p: { type: Sequelize.STRING },
  isPV: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  cAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  r: {
    type: Sequelize.INTEGER,
    defaultValue: 5
  },
  dt: { type: Sequelize.STRING },
  isWJ: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isRA: { type: Sequelize.BOOLEAN },
  rAAt: { type: Sequelize.INTEGER },
  isB: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  permission: { type: Sequelize.STRING },
  isUA: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  uAAt: { type: Sequelize.DATE },
  isSA: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  sAAt: { type: Sequelize.DATE },
  lat: { type: Sequelize.FLOAT },
  lon: { type: Sequelize.FLOAT },
  code: { type: Sequelize.STRING },
  vAt: { type: Sequelize.DATE },
  eAt: { type: Sequelize.DATE }
};

const userPaymentInfoSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  type: { type: Sequelize.STRING },
  num: { type: Sequelize.STRING },
  provider: { type: Sequelize.STRING },
  uId: {
    type: Sequelize.UUID,
    references: {
      model: 'user',
      key: 'id'
    }
  }
};

const runnerPaymentInfoSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  type: { type: Sequelize.STRING },
  num: { type: Sequelize.STRING },
  provider: { type: Sequelize.STRING },
  uId: {
    type: Sequelize.UUID,
    references: {
      model: 'user',
      key: 'id'
    }
  }
};

const userAddressSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  name: { type: Sequelize.STRING },
  mAddr: { type: Sequelize.STRING },
  sAddr: { type: Sequelize.STRING },
  lat: { type: Sequelize.FLOAT },
  lon: { type: Sequelize.FLOAT },
  uId: {
    type: Sequelize.UUID,
    references: {
      model: 'user',
      key: 'id'
    }
  }
};

const helpSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  comm: { type: Sequelize.STRING },
  cAt: { type: Sequelize.DATE },
  aAt: { type: Sequelize.DATE },
  ans: { type: Sequelize.STRING },
  ansAt: { type: Sequelize.DATE },
  uId: {
    type: Sequelize.UUID,
    references: {
      model: 'user',
      key: 'id'
    }
  }
};

const orderSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  oId: { type: Sequelize.STRING },
  rId: { type: Sequelize.STRING },
  nId: { type: Sequelize.STRING },
  dest: { type: Sequelize.STRING },
  dC: { type: Sequelize.INTEGER },
  rC: { type: Sequelize.INTEGER },
  rImg: { type: Sequelize.STRING },
  eDp: { type: Sequelize.INTEGER },
  rDp: { type: Sequelize.INTEGER },
  isIC: { type: Sequelize.BOOLEAN },
  tP: { type: Sequelize.INTEGER },
  curr: { type: Sequelize.STRING },
  cAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  pSAt: { type: Sequelize.DATE },
  pFAt: { type: Sequelize.DATE },
  rSAt: { type: Sequelize.DATE },
  endAt: { type: Sequelize.DATE },
  mAddr: { type: Sequelize.STRING },
  sAddr: { type: Sequelize.STRING },
  lat: { type: Sequelize.FLOAT },
  lon: { type: Sequelize.FLOAT },
  calculateDetail: { type: Sequelize.STRING },
  paymentDetail: { type: Sequelize.STRING },
  rM: { type: Sequelize.INTEGER },
  rComm: { type: Sequelize.STRING },
  uM: { type: Sequelize.INTEGER },
  uComm: { type: Sequelize.STRING }
};

const regItemsSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  iId: { type: Sequelize.STRING },
  n: { type: Sequelize.STRING },
  p: { type: Sequelize.INTEGER },
  cnt: { type: Sequelize.INTEGER },
  oId: {
    type: Sequelize.UUID,
    references: {
      model: 'order',
      key: 'id'
    }
  }
};

const customItemsSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  n: { type: Sequelize.STRING },
  manu: { type: Sequelize.STRING },
  cnt: { type: Sequelize.INTEGER },
  oId: {
    type: Sequelize.UUID,
    references: {
      model: 'order',
      key: 'id'
    }
  }
};

const nodeSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  n: { type: Sequelize.STRING },
  p: { type: Sequelize.STRING },
  addr: { type: Sequelize.STRING },
  c1: { type: Sequelize.STRING },
  c2: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  pId: { type: Sequelize.STRING },
  imgUrl: { type: Sequelize.STRING },
  cAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  like: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  lat: { type: Sequelize.FLOAT },
  lon: { type: Sequelize.FLOAT },
};

const nodeItemsSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  name: { type: Sequelize.STRING },
  imgUrl: { type: Sequelize.STRING },
  price: { type: Sequelize.INTEGER },
  weight: { type: Sequelize.INTEGER },
  nId: {
    type: Sequelize.UUID,
    references: {
      model: 'node',
      key: 'id'
    }
  }
};

const partnerSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  pw: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  p: { type: Sequelize.STRING },
  cAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
};

const partnerPaymentInfoSchema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  type: { type: Sequelize.INTEGER },
  num: { type: Sequelize.STRING },
  provider: { type: Sequelize.STRING },
  pId: {
    type: Sequelize.UUID,
    references: {
      model: 'partner',
      key: 'id'
    }
  }
};

export {
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
};
