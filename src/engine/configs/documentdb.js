const denodeify = require('denodeify');

const DocumentClient = require("documentdb").DocumentClient;

const ENDPOINT = 'https://play-smart-proxy-config.documents.azure.com:443/';
const PRIMARY_KEY = 'azzB8jTNPMSTL88BuoBsUh481OO2CDatEpn2fssBIGH48ztx3itt6AcSZKDp2zEr4z39hLLd00z3WXclOVbflw==';

const DATABASE_ID = 'configs';
const DATABASE_URL = `dbs/${DATABASE_ID}`;
const COLLECTION_ID = 'configs';
const COLLECTION_URL = `${DATABASE_URL}/colls/${COLLECTION_ID}`;

const client = new DocumentClient(ENDPOINT, { "masterKey": PRIMARY_KEY });

const readDocument = denodeify(client.readDocument.bind(client));
const createDatabase = denodeify(client.createDatabase.bind(client));
const createCollection = denodeify(client.createCollection.bind(client));
const createDocument = denodeify(client.createDocument.bind(client));
const readCollection = denodeify(client.readCollection.bind(client));

module.exports = options => key => {

  const DOCUMENT_URL = `${COLLECTION_URL}/docs/${key}`;
  return client.readDocument(DOCUMENT_URL);
}

const init = module.exports.init = options => () => {
  return createDatabase({ id: DATABASE_ID })
    .then(db => createCollection(db._self, { id: COLLECTION_ID }))
    .catch(console.log);
}

const addConfig = module.exports.addConfig = options => (key, doc) => {
  return readCollection(COLLECTION_URL)
    .then(coll => createDocument(coll._self, Object.assign(doc, { id: key })))
    .catch(console.log);
}

// Example
// init()();
// addConfig()('employee', {
//   rules: [{
//       matcher: 'ssn',
//       masker: {
//         type: 'ssn'
//       }
//   }]
// })
