var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'buchenn',
  password        : 'CMB!!Os4ntb',
  database        : 'buchenn'
});

module.exports.pool = pool;
