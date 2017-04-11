import FirebaseServer from 'firebase-server';

import startServer from '../server/app';

// open firebase mock server.

/* eslint-disable */
new FirebaseServer(5000, 'localhost.firebaseio.test');
/* eslint-enable */

it('Server open test.', function (done) {
  this.timeout(5000);
  startServer(() => {
    done();
  });
});
