import GeoFire from 'geofire';
import {
  userGeoFire,
  nodeGeoFire
} from './firebase.geofire.util';

const calcPrice = (items, uId) => new Promise((resolve, reject) => {
  userGeoFire.get(uId)
  .then((location1) => {
    const defaultDistance = 100; // in meters
    const distanceUnit = 100; // in meters
    const defaultFee = 2000; // in KRW
    const additionalFee = 100; // per distance unit , in KRW
    const nodes = [];
    let EDP = 0;
    let itemP = 0;

    const addEDP = (location2) => {
      const distance = GeoFire.distance(location1, location2) * 1000; // in meters
      const additionalDistance = distance - defaultDistance;
      EDP += additionalDistance > 0 ? Math.ceil(additionalDistance / distanceUnit) * additionalFee : defaultFee;
    };

    const getLocation = (index) => {
      nodeGeoFire.get(nodes[index])
      .then((location) => {
        addEDP(location);
        if (index === nodes.length - 1) resolve([EDP, itemP]);
      })
      .catch(reject);
    };

    for (let i = 0; i < items.length; ++i) {
      itemP += items[i].cnt * items[i].price;
      if (nodes.indexOf(items[i].nId) < 0) {
        nodes.push(items[i].nId);
        getLocation(i);
      }
    }
  })
  .catch(reject);
});

export default calcPrice;
