import admin from 'firebase-admin';

const serviceAccount = require(`../../../${process.env.FIREBASE_SERVICE_ACCOUNT_JSON}`);
const adminOption = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
};

admin.initializeApp(adminOption);

const db = admin.database();

const userRef = db.ref('/user');
const propertiesRef = db.ref('/properties');

const orderRef = db.ref('/order');
const orderPropertiesRef = db.ref('/connectionProperties');

const nodeRef = db.ref('/node');
const nodePropertiesRef = db.ref('/nodeProperties');

const partnerRef = db.ref('/partner');
const partnerPropertiesRef = db.ref('/partnerProperties');

const helpRef = db.ref('/help');

const refs = {
  user: {
    root: userRef,
    properties: propertiesRef,
    userQualification: propertiesRef.child('userQualification'),
    runnerQualification: propertiesRef.child('runnerQualification'),
    coordinate: propertiesRef.child('coordinate'),
    userPaymentInfo: propertiesRef.child('userPaymentInfo'),
    runnerPaymentInfo: propertiesRef.child('runnerPaymentInfo'),
    address: propertiesRef.child('address'),
    phoneVerificationInfo: propertiesRef.child('phoneVerificationInfo')
  },
  order: {
    root: orderRef,
    properties: orderPropertiesRef,
    nodeInfo: orderPropertiesRef.child('nodeInfo'),
    paymentDetail: orderPropertiesRef.child('paymentDetail'),
    calculateDetail: orderPropertiesRef.child('calculateDetail'),
    evalFromUser: orderPropertiesRef.child('evalFromUser'),
    evalFromRunner: orderPropertiesRef.child('evalFromRunner')
  },
  node: {
    root: nodeRef,
    properties: nodePropertiesRef,
    items: nodePropertiesRef.child('items')
  },
  partner: {
    root: partnerRef,
    properties: partnerPropertiesRef,
    qualification: partnerPropertiesRef.child('qualification'),
    paymentInfo: partnerPropertiesRef.child('paymentInfo')
  },
  help: {
    root: helpRef
  }
};

const defaultSchema = {
  user: {
    isPhoneValid: false,
    createdAt: Date.now(),
    phoneNumber: null,
    rating: 0,
    country: null
  },
  orderQualification: {
    isAgreed: false,
    agreedAt: null
  },
  userRunnerQualification: {
    isAgreed: false,
    agreedAt: null,
    isFirstApproved: false,
    firstApprovedAt: null,
    isSecondApproved: false,
    secondApprovedAt: null
  },
  userPhoneVerificationInfo: {
    expiredAt: Date.now() + 120000
  },
  connection: {
    ship: null,
    resultImage: null,
    openedAt: Date.now(),
    isExpired: false
  },
  report: {
    createdAt: Date.now()
  }
};

export default class firebase {
  static get admin() {
    return admin;
  }

  static get refs() {
    return refs;
  }

  static get defaultSchema() {
    return defaultSchema;
  }
}
