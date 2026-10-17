export function validate(schema, source = 'body') {
  return (req, res, next) => {
    const parsed = schema.safeParse(req[source])

    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid request payload' })
    }

    req[source] = parsed.data
    return next()
  }
}
