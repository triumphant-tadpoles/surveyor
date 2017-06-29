const discoveryV1 = require('watson-developer-cloud').DiscoveryV1;
let key;
let secret;
if (process.env.DISCOVERY_KEY && process.env.DISCOVERY_SECRET) {
  key = process.env.DISCOVERY_KEY;
  secret = process.env.DISCOVERY_SECRET;
} else {
  
}

let discovery = new discoveryV1({
  username: '72b87ebc-7be6-463c-8eb5-ff073582ca53',
  password: '4m0NQZReRbDS',
  version: 'v1',
  version_date: '2017-06-25'
});

