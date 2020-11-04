function handleError(error, res, status=500) {
  console.log(error.stack);
  res.status(status).send({error: error.stack});
}

module.exports = handleError;
