export function errorHandler(error, _req, res, _next) {
  const status = Number(error.status) || 500
  const message = status >= 500 ? 'Internal server error' : error.message

  res.status(status).json({ error: message })
}
