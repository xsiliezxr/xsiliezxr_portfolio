const scratch = Array.from({ length: 8 }, () => new Array(9))

function solve(rows, values) {
  const n = values.length
  const matrix = scratch
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) matrix[i][j] = rows[i][j]
    matrix[i][n] = values[i]
  }
  for (let col = 0; col < n; col += 1) {
    let pivot = col
    for (let row = col + 1; row < n; row += 1) {
      if (Math.abs(matrix[row][col]) > Math.abs(matrix[pivot][col])) pivot = row
    }
    const swap = matrix[col]
    matrix[col] = matrix[pivot]
    matrix[pivot] = swap
    const diagonal = matrix[col][col]
    if (Math.abs(diagonal) < 1e-8) return null
    for (let j = col; j <= n; j += 1) matrix[col][j] /= diagonal
    for (let row = 0; row < n; row += 1) {
      if (row === col) continue
      const factor = matrix[row][col]
      for (let j = col; j <= n; j += 1) matrix[row][j] -= factor * matrix[col][j]
    }
  }
  return matrix.slice(0, n).map((row) => row[n])
}

export function matrixFromQuad(width, height, corners) {
  const src = [
    [0, 0],
    [width, 0],
    [width, height],
    [0, height],
  ]
  const rows = []
  const values = []
  for (let i = 0; i < 4; i += 1) {
    const [x, y] = src[i]
    const X = corners[i].x
    const Y = corners[i].y
    rows.push([x, y, 1, 0, 0, 0, -x * X, -y * X])
    values.push(X)
    rows.push([0, 0, 0, x, y, 1, -x * Y, -y * Y])
    values.push(Y)
  }
  const homography = solve(rows, values)
  if (!homography) return null
  const [a, b, c, d, e, f, g, h] = homography
  return [a, d, 0, g, b, e, 0, h, 0, 0, 1, 0, c, f, 0, 1]
}
