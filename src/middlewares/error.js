export function handleError(err, req, res, next) {
  const { status = 500, path } = err;
  const message = status !== 500 ? err.message : 'Internal Server Error';
  if (status === 500) console.log(err);
  res.status(status).json({ message, path });
}
