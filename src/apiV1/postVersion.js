// example api action
export default opts => (req, res, next) => {
  const { db } = opts;
  const { version, servercode } = req.body;

  if (!version || !servercode) return res.send( {
    status: 'fail', error: 'either version or servercode are missing',
  })

  db.createVersionRecord(next, req.body, (result) => {
    res.send({status: 'success', date: result});
  });
}
