const sql = require('mssql');
console.log('Test Data');
const config = {
  user: 'sa',
  password: 'saadmin',
  server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
  database: 'DBTestVipin',
};
//select with parameter throw store procedure
async function TestStoredProc() {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input('input_parameter', sql.Int, 1)
      .execute('sp_selectTestData');
      return result;
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

export default TestStoredProc;
