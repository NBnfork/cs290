var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs290_buchenn',
  password        : '6556',
  database        : 'cs290_buchenn'
});

module.exports.pool = pool;
