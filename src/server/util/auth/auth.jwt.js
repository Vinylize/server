import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  mRefs,
  findData
} from '../sequelize/sequelize.database.util';

const jwtKey = process.env.JWT_KEY;
const jwtExp = process.env.JWT_EXP;

const setToken = user => new Promise((resolve, reject) => {
  jwt.sign(user, jwtKey, { expiresIn: jwtExp }, (err, token) => {
    if (err) return reject(err);
    return resolve(token);
  });
});

const decodeToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) return reject(err);
    return resolve(decoded);
  });
});

const getAuth = (e, pw) => new Promise((resolve, reject) => {
  findData(mRefs.root.user, ['e', 'pw', 'n', 'permission'], { where: { e } })
  .then((user) => {
    if (bcrypt.compareSync(pw, user[0].pw)) {
      return setToken({ uid: user[0].row_id, e: user[0].e, n: user[0].n, permission: user[0].permission })
      .then(token => resolve(token))
      .catch(reject);
    }
    return reject('Paassword or email is wrong!');
  })
  .catch(() => reject('Paassword or email is wrong!'));
});

export {
  setToken,
  decodeToken,
  getAuth
};
