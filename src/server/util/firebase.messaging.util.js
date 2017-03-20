import {
  admin
} from './firebase.util';

const payload = {
  notification: {
    title: 'Notification from Yetta',
    body: 'You are babo'
    // click_action: 'pingstersapp.ACTION.message'
  },
  data: {
    component: 'newOrder',
    props: '3e2wfri34no823ijeo83euh2'
  }
};

let options = {
  priority: 'high',
  content_available: true,

  // expire sec
  timeToLive: 60 * 60 * 24
};

const sendPush = registrationToken => admin.messaging()
  .sendToDevice(registrationToken, payload, options)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch(function (error) {
      console.log('Error sending message:', error);
    });
export default {
  sendPush
};

