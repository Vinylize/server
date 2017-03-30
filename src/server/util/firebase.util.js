import admin from 'firebase-admin';

const serviceAccount = require(`../../../${process.env.FIREBASE_SERVICE_ACCOUNT_JSON}`);
const adminOption = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
};

admin.initializeApp(adminOption);

const db = admin.database();

const userRef = db.ref('/user');
const userPropertiesRef = db.ref('/userProperties');

const orderRef = db.ref('/order');
const orderPropertiesRef = db.ref('/orderProperties');

const nodeRef = db.ref('/node');
const nodePropertiesRef = db.ref('/nodeProperties');

const partnerRef = db.ref('/partner');
const partnerPropertiesRef = db.ref('/partnerProperties');

// synchronized with documentation
const refs = {
  user: {
    root: userRef,
    properties: userPropertiesRef,
    userQualification: userPropertiesRef.child('userQualification'),
    runnerQualification: userPropertiesRef.child('runnerQualification'),
    coordinate: userPropertiesRef.child('coordinate'),
    userPaymentInfo: userPropertiesRef.child('userPaymentInfo'),
    runnerPaymentInfo: userPropertiesRef.child('runnerPaymentInfo'),
    address: userPropertiesRef.child('address'),
    phoneVerificationInfo: userPropertiesRef.child('phoneVerificationInfo'),
    help: userPropertiesRef.child('help')
  },
  order: {
    root: orderRef,
    properties: orderPropertiesRef,
    itemInfo: orderPropertiesRef.child('itemInfo'),
    paymentDetail: orderPropertiesRef.child('paymentDetail'),
    calculateDetail: orderPropertiesRef.child('calculateDetail'),
    evalFromUser: orderPropertiesRef.child('evalFromUser'),
    evalFromRunner: orderPropertiesRef.child('evalFromRunner')
  },
  node: {
    root: nodeRef,
    properties: nodePropertiesRef,
    items: nodePropertiesRef.child('items'),
    coordinate: nodePropertiesRef.child('coordinate')
  },
  partner: {
    root: partnerRef,
    properties: partnerPropertiesRef,
    qualification: partnerPropertiesRef.child('qualification'),
    paymentInfo: partnerPropertiesRef.child('paymentInfo')
  }
};

const defaultSchema = {
  user: {
    root: {
      identificationImageUrl: null,
      profileImageUrl: null,
      isPhoneValid: false,
      phoneNumber: null,
      rating: 5,
    },
    orderQualification: {
      isAgreed: false,
      agreedAt: null
    },
    runnerQualification: {
      isAgreed: false,
      agreedAt: null,
      isFirstApproved: false,
      firstApprovedAt: null,
      isSecondApproved: false,
      secondApprovedAt: null
    }
  },
  order: {
    root: {
      runnerId: null,
      receiptImage: null,
      realDeliveryPrice: null,
      isExpired: false
    },
    itemInfo: {

    },
    evalFromUser: {
      mark: 3,
      comment: null
    },
    evalFromRunner: {
      mark: 3,
      comment: null
    }
  },
  node: {
    root: {
      like: 0
    },
    items: {
      itemImageUrl: null
    }
  },
  partner: {
    root: {
    },
    qualification: {
      isAgreed: false,
      agreedAt: null,
      isFirstApproved: false,
      firstApprovedAt: null
    }
  }
};

export {
  admin,
  db,
  defaultSchema,
  refs
};
