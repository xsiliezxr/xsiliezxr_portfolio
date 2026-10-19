import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const geoPath = path.join(root, 'src/assets/maps/gt-all.geo.json')
const outPath = path.join(root, 'src/assets/maps/guatemala-departments.json')

const geo = JSON.parse(fs.readFileSync(geoPath, 'utf8'))
const feats = geo.features
let minX = Infinity
let minY = Infinity
let maxX = -Infinity
let maxY = -Infinity

function walk(c) {
  if (typeof c[0] === 'number') {
    const [x, y] = c
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
    return
  }
  c.forEach(walk)
}

feats.forEach((f) => walk(f.geometry.coordinates))

const W = 640
const H = 720
const pad = 12
const s = Math.min((W - 2 * pad) / (maxX - minX), (H - 2 * pad) / (maxY - minY))
const ox = pad + (W - 2 * pad - s * (maxX - minX)) / 2
const oy = pad + (H - 2 * pad - s * (maxY - minY)) / 2

function proj([x, y]) {
  return [ox + (x - minX) * s, oy + (maxY - y) * s]
}

function ringToPath(ring) {
  return `${ring
    .map((p, i) => {
      const [X, Y] = proj(p)
      return `${i ? 'L' : 'M'}${X.toFixed(1)},${Y.toFixed(1)}`
    })
    .join(' ')} Z`
}

function geomToPath(g) {
  if (g.type === 'Polygon') return g.coordinates.map(ringToPath).join(' ')
  if (g.type === 'MultiPolygon') {
    return g.coordinates.map((poly) => poly.map(ringToPath).join(' ')).join(' ')
  }
  return ''
}

function slug(label) {
  return String(label)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const departments = feats.map((f) => {
  const label = f.properties.name
  const coords =
    f.geometry.type === 'Polygon' ? f.geometry.coordinates[0] : f.geometry.coordinates[0][0]
  let cx = 0
  let cy = 0
  coords.forEach((p) => {
    const q = proj(p)
    cx += q[0]
    cy += q[1]
  })
  cx /= coords.length
  cy /= coords.length
  return {
    id: slug(label),
    label,
    path: geomToPath(f.geometry),
    cx: +cx.toFixed(1),
    cy: +cy.toFixed(1),
  }
})

const guatemala = departments.find((d) => d.id === 'guatemala')

fs.writeFileSync(
  outPath,
  `${JSON.stringify(
    {
      viewBox: `0 0 ${W} ${H}`,
      attribution: 'Límites administrativos públicos · silueta proyectada para el portafolio',
      departments,
      capital: {
        cx: guatemala?.cx ?? 280,
        cy: guatemala?.cy ?? 540,
        label: 'Ciudad de Guatemala',
        deptId: 'guatemala',
      },
    },
    null,
    2,
  )}\n`,
)

console.log(`wrote ${departments.length} departments → ${outPath}`)
