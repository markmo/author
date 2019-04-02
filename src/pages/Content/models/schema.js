const schema = require('./sample-schema.json');
const data = require('./sample-data.json');

export default {
  namespace: 'schema',

  state: {
    schema,
    data
  },
}
