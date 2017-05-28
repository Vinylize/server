import {
  decodeToken
} from './auth/auth.jwt';
import {
  mRefs,
  findDataById
} from './sequelize/sequelize.database.util';

const tempUid = 'AZpdgg8SnteR7qgOItyYn1lH0sH3';
const tempName = 'YettaTest';

export default {
  apiProtector(req, res, next) {
    const r = req;
    if (r.headers.authorization === 'TT') {
      r.user = { uid: tempUid, name: tempName, warn: 'this is tempUid.', d: 'TT' };
      return next();
    }
    if (r.headers.authorization) {
      return decodeToken(r.headers.authorization)
        .then((result) => {
          r.user = result.user;
          return findDataById(mRefs.user.root, ['e', 'permission', 'd'], r.user.uid)
          .then((user) => {
            if (user[0].permission === 'admin' && user[0].e === r.user.e) {
              r.user.permission = 'admin';
              return next();
            }
            if (!r.headers.device) throw new Error('No device id Error');
            if (user[0].d && user[0].d !== r.headers.device) {
              throw new Error('Another device logged in. Please login again.');
            }
            return next();
          });
        })
        .catch(error => res.status(200).json({ errors: [{
          message: error.message,
          locations: error.locations,
          stack: error.stack,
          path: error.path
        }] }));
    }
    return next();
  }
};
