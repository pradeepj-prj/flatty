import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

export type FurnitureKind = 'bed' | 'sofa' | 'table' | 'chair' | 'beadTable'

export type FurnitureDefinition = {
  id: string
  name: string
  category: string
  kind: FurnitureKind
  widthIn: number
  depthIn: number
  heightIn: number
  colors: {
    primary: string
    secondary?: string
    accent?: string
  }
}

export type FurniturePlacement = {
  id: string
  furnitureId: string
  xIn: number
  zIn: number
  rotationDegrees: number
}

type InchesToMeters = (inches: number) => number

export const furnitureCatalog: FurnitureDefinition[] = [
  {
    id: 'queen-bed',
    name: 'Queen Bed',
    category: 'Beds',
    kind: 'bed',
    widthIn: 60,
    depthIn: 80,
    heightIn: 42,
    colors: { primary: '#e5ddd2', secondary: '#8a6245', accent: '#b8c7d9' },
  },
  {
    id: 'three-seat-sofa',
    name: '3-seat Sofa',
    category: 'Seating',
    kind: 'sofa',
    widthIn: 84,
    depthIn: 36,
    heightIn: 34,
    colors: { primary: '#718096', secondary: '#566273', accent: '#d7a86e' },
  },
  {
    id: 'dining-table-140',
    name: 'Dining Table',
    category: 'Tables',
    kind: 'table',
    widthIn: 55.1,
    depthIn: 31.5,
    heightIn: 29.5,
    colors: { primary: '#9a6845', secondary: '#5f412f' },
  },
  {
    // Reference: white painted stadium top on chunky orange solid-wood ball legs, 100 x 60 x 75 cm.
    id: 'sculpted-dining-table',
    name: 'Sculpted Dining Table',
    category: 'Tables',
    kind: 'beadTable',
    widthIn: 39.4,
    depthIn: 23.6,
    heightIn: 29.5,
    colors: { primary: '#f2ede4', secondary: '#d08a54' },
  },
  {
    id: 'dining-chair',
    name: 'Dining Chair',
    category: 'Seating',
    kind: 'chair',
    widthIn: 18,
    depthIn: 20,
    heightIn: 34,
    colors: { primary: '#9a6845', secondary: '#d8c5ad' },
  },
]

export function createFurnitureModel(definition: FurnitureDefinition, m: InchesToMeters) {
  const group = new THREE.Group()
  group.name = definition.name

  if (definition.kind === 'bed') buildBed(group, definition, m)
  if (definition.kind === 'sofa') buildSofa(group, definition, m)
  if (definition.kind === 'table') buildTable(group, definition, m)
  if (definition.kind === 'beadTable') buildBeadTable(group, definition, m)
  if (definition.kind === 'chair') buildChair(group, definition, m)

  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return
    object.castShadow = true
    object.receiveShadow = true
  })
  return group
}

function buildBed(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const frameHeightIn = 8
  const mattressHeightIn = 10
  const mattressWidthIn = item.widthIn - 4
  const mattressDepthIn = item.depthIn - 5

  addBox(group, item.widthIn, frameHeightIn, item.depthIn, 0, frameHeightIn / 2, 0, item.colors.secondary ?? item.colors.primary, m)
  addRoundedBox(
    group,
    mattressWidthIn,
    mattressHeightIn,
    mattressDepthIn,
    0,
    frameHeightIn + mattressHeightIn / 2,
    1.5,
    item.colors.primary,
    1.5,
    m,
  )
  addRoundedBox(
    group,
    mattressWidthIn - 2,
    1.2,
    mattressDepthIn * 0.62,
    0,
    frameHeightIn + mattressHeightIn + 0.5,
    item.depthIn * 0.16,
    item.colors.accent ?? '#b8c7d9',
    0.5,
    m,
  )

  const headboardThicknessIn = 3
  addRoundedBox(
    group,
    item.widthIn,
    item.heightIn,
    headboardThicknessIn,
    0,
    item.heightIn / 2,
    -item.depthIn / 2 + headboardThicknessIn / 2,
    item.colors.secondary ?? item.colors.primary,
    1,
    m,
  )

  const pillowWidthIn = mattressWidthIn * 0.42
  for (const xIn of [-mattressWidthIn * 0.23, mattressWidthIn * 0.23]) {
    addRoundedBox(
      group,
      pillowWidthIn,
      3,
      12,
      xIn,
      frameHeightIn + mattressHeightIn + 2,
      -item.depthIn * 0.27,
      '#f5f1eb',
      2,
      m,
    )
  }
}

function buildSofa(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const armWidthIn = 7
  const baseHeightIn = 8
  const seatHeightIn = 7
  const seatWidthIn = item.widthIn - armWidthIn * 2

  addRoundedBox(group, item.widthIn, baseHeightIn, item.depthIn - 4, 0, baseHeightIn / 2 + 3, 1, item.colors.secondary ?? item.colors.primary, 2, m)
  addRoundedBox(group, armWidthIn, 23, item.depthIn, -item.widthIn / 2 + armWidthIn / 2, 14.5, 0, item.colors.primary, 3, m)
  addRoundedBox(group, armWidthIn, 23, item.depthIn, item.widthIn / 2 - armWidthIn / 2, 14.5, 0, item.colors.primary, 3, m)
  for (const xIn of [-item.widthIn / 2 + 8, item.widthIn / 2 - 8]) {
    for (const zIn of [-item.depthIn / 2 + 6, item.depthIn / 2 - 6]) {
      addBox(group, 2.5, 3, 2.5, xIn, 1.5, zIn, '#3f352f', m)
    }
  }

  const cushionGapIn = 1
  const cushionWidthIn = (seatWidthIn - cushionGapIn * 2) / 3
  for (let index = 0; index < 3; index += 1) {
    const xIn = -seatWidthIn / 2 + cushionWidthIn / 2 + index * (cushionWidthIn + cushionGapIn)
    addRoundedBox(group, cushionWidthIn, seatHeightIn, 21, xIn, 15, 3, item.colors.primary, 2.5, m)
    addRoundedBox(group, cushionWidthIn, 17, 7, xIn, 25, -10.5, item.colors.primary, 2.5, m, -0.12)
  }

  addRoundedBox(group, item.widthIn - armWidthIn * 2, item.heightIn - 8, 7, 0, 21, -item.depthIn / 2 + 4, item.colors.secondary ?? item.colors.primary, 2, m, -0.08)
}

function buildTable(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const topHeightIn = 2
  const legSizeIn = 2.5
  addRoundedBox(group, item.widthIn, topHeightIn, item.depthIn, 0, item.heightIn - topHeightIn / 2, 0, item.colors.primary, 0.8, m)

  const legXIn = item.widthIn / 2 - 4
  const legZIn = item.depthIn / 2 - 4
  for (const xIn of [-legXIn, legXIn]) {
    for (const zIn of [-legZIn, legZIn]) {
      addBox(group, legSizeIn, item.heightIn - topHeightIn, legSizeIn, xIn, (item.heightIn - topHeightIn) / 2, zIn, item.colors.secondary ?? item.colors.primary, m)
    }
  }
}

function buildBeadTable(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const topThicknessIn = 1.8
  const topYIn = item.heightIn - topThicknessIn / 2
  const legColor = item.colors.secondary ?? item.colors.primary

  // Stadium (pill) tabletop: a centre box capped by a cylinder at each short end.
  const endRadiusIn = item.depthIn / 2
  const centerLengthIn = Math.max(0.01, item.widthIn - item.depthIn)
  addBox(group, centerLengthIn, topThicknessIn, item.depthIn, 0, topYIn, 0, item.colors.primary, m)
  for (const xIn of [-centerLengthIn / 2, centerLengthIn / 2]) {
    addCylinder(group, endRadiusIn, topThicknessIn, xIn, topYIn, 0, item.colors.primary, m)
  }

  const legHeightIn = item.heightIn - topThicknessIn
  const legXIn = item.widthIn / 2 - 8
  const legZIn = item.depthIn / 2 - 6

  // One sculptural ball-stack leg at the front centre.
  buildBeadLeg(group, 0, legZIn, legHeightIn, legColor, m)

  // Two plain round legs at the back corners.
  const backLegRadiusIn = 1.9
  for (const xIn of [-legXIn, legXIn]) {
    addCylinder(group, backLegRadiusIn, legHeightIn, xIn, legHeightIn / 2, -legZIn, legColor, m)
  }
}

function buildBeadLeg(
  group: THREE.Group,
  xIn: number,
  zIn: number,
  legHeightIn: number,
  color: string,
  m: InchesToMeters,
) {
  const beadRatios = [1, 0.93, 0.87, 0.8]
  const overlap = 0.9
  const centers: number[] = [beadRatios[0]]
  for (let index = 1; index < beadRatios.length; index += 1) {
    centers.push(centers[index - 1] + (beadRatios[index - 1] + beadRatios[index]) * overlap)
  }
  const naturalHeight = centers[centers.length - 1] + beadRatios[beadRatios.length - 1]
  const scale = legHeightIn / naturalHeight
  beadRatios.forEach((ratio, index) => {
    addSphere(group, ratio * scale, xIn, centers[index] * scale, zIn, color, m)
  })
}

function buildChair(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const seatHeightIn = 18
  const seatThicknessIn = 2.5
  const legSizeIn = 1.5
  const legXIn = item.widthIn / 2 - 2.2
  const legZIn = item.depthIn / 2 - 2.2

  addRoundedBox(group, item.widthIn, seatThicknessIn, item.depthIn - 2, 0, seatHeightIn, 0, item.colors.secondary ?? item.colors.primary, 1, m)
  for (const xIn of [-legXIn, legXIn]) {
    for (const zIn of [-legZIn, legZIn]) {
      addBox(group, legSizeIn, seatHeightIn, legSizeIn, xIn, seatHeightIn / 2, zIn, item.colors.primary, m)
    }
  }
  addRoundedBox(
    group,
    item.widthIn,
    item.heightIn - seatHeightIn,
    2.2,
    0,
    seatHeightIn + (item.heightIn - seatHeightIn) / 2,
    -item.depthIn / 2 + 1.1,
    item.colors.primary,
    1,
    m,
  )
}

function addBox(
  group: THREE.Group,
  widthIn: number,
  heightIn: number,
  depthIn: number,
  xIn: number,
  yIn: number,
  zIn: number,
  color: string,
  m: InchesToMeters,
) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(m(widthIn), m(heightIn), m(depthIn)),
    furnitureMaterial(color),
  )
  mesh.position.set(m(xIn), m(yIn), m(zIn))
  group.add(mesh)
}

function addRoundedBox(
  group: THREE.Group,
  widthIn: number,
  heightIn: number,
  depthIn: number,
  xIn: number,
  yIn: number,
  zIn: number,
  color: string,
  radiusIn: number,
  m: InchesToMeters,
  rotationX = 0,
) {
  const radius = Math.min(m(radiusIn), m(widthIn) / 3, m(heightIn) / 3, m(depthIn) / 3)
  const mesh = new THREE.Mesh(
    new RoundedBoxGeometry(m(widthIn), m(heightIn), m(depthIn), 3, radius),
    furnitureMaterial(color),
  )
  mesh.position.set(m(xIn), m(yIn), m(zIn))
  mesh.rotation.x = rotationX
  group.add(mesh)
}

function addCylinder(
  group: THREE.Group,
  radiusIn: number,
  heightIn: number,
  xIn: number,
  yIn: number,
  zIn: number,
  color: string,
  m: InchesToMeters,
) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(m(radiusIn), m(radiusIn), m(heightIn), 28),
    furnitureMaterial(color),
  )
  mesh.position.set(m(xIn), m(yIn), m(zIn))
  group.add(mesh)
}

function addSphere(
  group: THREE.Group,
  radiusIn: number,
  xIn: number,
  yIn: number,
  zIn: number,
  color: string,
  m: InchesToMeters,
) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(m(radiusIn), 22, 16),
    furnitureMaterial(color),
  )
  mesh.position.set(m(xIn), m(yIn), m(zIn))
  group.add(mesh)
}

function furnitureMaterial(color: string) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.78,
    metalness: 0,
  })
}
