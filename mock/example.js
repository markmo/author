import { parse } from 'url';

const examples = [
  'What is my delegation limit',
  'how much can I sign off',
  'how much can i spend',
  'what is the maximum capex',
  'what is the maximum opex I can approve'
]

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    example: examples[i],
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

function getExample(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.example) {
    dataSource = dataSource.filter(data => data.example.indexOf(params.example) > -1);
  }

  let pageSize = 5;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postExample(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, example, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        example: example,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { example });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getExample(req, res, u);
}

export default {
  'GET /api/example': getExample,
  'POST /api/example': postExample,
};
