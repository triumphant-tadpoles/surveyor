
module.exports = (doc) => {
const discoveryV1 = require('watson-developer-cloud').DiscoveryV1;
const fs = require('fs');
const path = require('path');
let serverPath = path.join(__dirname, '../');

  // if (process.env.DISCOVERY_KEY && process.env.DISCOVERY_SECRET) {
  //   key = process.env.DISCOVERY_KEY;
  //   secret = process.env.DISCOVERY_SECRET;
  // } else {
    
  // }

  let discovery = new discoveryV1({
    username: '72b87ebc-7be6-463c-8eb5-ff073582ca53',
    password: '4m0NQZReRbDS',
    version: 'v1',
    version_date: '2017-06-25'
  });


  discovery.addDocument({environment_id: 'a22e89d9-c38b-4d8f-b2ba-9f984bf4ee8f', collection_id: '3816d149-0432-46b2-a373-eda2e73ec8e4', 'file': doc}, (error, data) => {
      console.log('/////////', error);
      console.log(JSON.stringify(data, null, 2));
  });
}