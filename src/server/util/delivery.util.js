import GeoFire from 'geofire';
import { nodeGeoFire } from './firebase.geofire.util';

const defaultDistance = 100; // in meters
const distanceUnit = 100; // in meters
const defaultFee = 2000; // in KRW
const additionalFee = 100; // per distance unit , in KRW
let EDP = 0;

const addEDP = (location) => {
  const distance = GeoFire.distance(location[0], location[1]) * 1000; // in meters
  const additionalDistance = distance - defaultDistance;
  EDP += additionalDistance > 0 ? Math.ceil(additionalDistance / distanceUnit) * additionalFee : defaultFee;
};

const calcEDP = ({ items }) => new Promise((resolve, reject) => {
  const nodes = [];
  for (let i = 0; i < items.length; ++i) {
    if (nodes.indexOf(items[i].nId) < 0) {
      nodes.push(items[i].nId);
      nodeGeoFire.get(items[i].nId)
      .then(addEDP)
      .catch(reject);
    }
  }
  resolve(EDP);
});

export default calcEDP;
