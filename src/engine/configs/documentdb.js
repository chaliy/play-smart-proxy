const denodeify = require('denodeify');
const DocumentClient = require('documentdb').DocumentClient;

module.exports = options => key => {
  const client = new DocumentClient(options.endpoint, { masterKey: options.primaryKey });
  const readDocument = denodeify(client.readDocument.bind(client));

  const DATABASE_URL = `dbs/${options.database}`;
  const COLLECTION_URL = `${DATABASE_URL}/colls/${options.collection}`;
  const DOCUMENT_URL = `${COLLECTION_URL}/docs/${key}`;

  return readDocument(DOCUMENT_URL);
}
