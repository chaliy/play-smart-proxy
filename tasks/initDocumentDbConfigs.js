const denodeify = require('denodeify');
const config = require('../config').configs.documentDb;
const DocumentClient = require('documentdb').DocumentClient;

const DATABASE_ID = config.database;
const COLLECTION_ID = config.collection;

const DATABASE_URL = `dbs/${DATABASE_ID}`;
const COLLECTION_URL = `${DATABASE_URL}/colls/${COLLECTION_ID}`;

const client = new DocumentClient(config.endpoint, { masterKey: config.primaryKey });

const createDatabase = denodeify(client.createDatabase.bind(client));
const createCollection = denodeify(client.createCollection.bind(client));
const createDocument = denodeify(client.createDocument.bind(client));
const readCollection = denodeify(client.readCollection.bind(client));

const init = () => {
  return createDatabase({ id: DATABASE_ID })
    .then(db => createCollection(db._self, { id: COLLECTION_ID }))
    .catch(console.log);
}

const addConfig = (key, doc) => {
  return readCollection(COLLECTION_URL)
    .then(coll => createDocument(coll._self, Object.assign(doc, { id: key })))
    .catch(console.log);
}

// Example
// init();
// addConfig('employee', {
//   rules: [{
//       matcher: 'ssn',
//       masker: {
//         type: 'ssn'
//       }
//   }]
// })

init();
