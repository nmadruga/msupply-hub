// example api action
export default opts => (req, res, next) => {
  const { db } = opts;
  const { servercode } = req.params;
  db.getVersionRecord(next, servercode, result => {
    const returnData = result.rows.map(dataRow => {
      return {
        version: dataRow.version,
        date: `${dataRow.timestamp.getFullYear()}/${dataRow.timestamp.getMonth()}/${dataRow.timestamp.getDate()}`
      }
    });
    res.send({ status: 'success', servercode, data: returnData });
  });
};
