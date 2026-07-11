import './styles.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const INCH_TO_METER = 0.0254
const wallHeightIn = 101.7
const wallThicknessIn = 4.5
const bedroomDatumZIn = 124.9
const livingDepthIn = 105
const livingFacadeZIn = bedroomDatumZIn - livingDepthIn
const bedroom3BackZIn = livingFacadeZIn + 166.5
const mainBedroomBackZIn = 173
const bathroomFrontZIn = 179.1
const bathroomDepthIn = 74.8
const bathroomBackZIn = bathroomFrontZIn + bathroomDepthIn
const bedroomBathroomWallThicknessIn = bathroomFrontZIn - mainBedroomBackZIn
const bedroomBathroomWallZIn = mainBedroomBackZIn + bedroomBathroomWallThicknessIn / 2
const mainBedroomRightXIn = 525.1
const mainBedroomLowerWidthIn = 115.5
const mainBedroomLowerWallStartXIn = mainBedroomRightXIn - mainBedroomLowerWidthIn
const mainBedroomDoorWidthIn = 35.5
const mainBedroomDoorStartZIn = mainBedroomBackZIn - mainBedroomDoorWidthIn
const bedroom2DoorStartXIn = 327.6
const bedroom2DoorEndXIn = 360.3
const bathroom2LeftXIn = bedroom2DoorStartXIn
const bathroom2DoorEndXIn = bedroom2DoorEndXIn
const bathroom2WidthIn = 95
const bathroomDividerXIn = bathroom2LeftXIn + bathroom2WidthIn
const bathroom1RightXIn = 515.8
const bathroom1WidthIn = bathroom1RightXIn - bathroomDividerXIn
const viewStyle = {
  background: '#94a3b8',
  floor: '#a9784f',
  wall: '#ffffff',
  windows: '#d8dde2',
  edges: '#475569',
} satisfies Record<string, Color>

type Color = `#${string}`

type Finish = {
  name: string
  color: Color
  modelColor?: Color
  texture?: 'wood' | 'plain'
  plankColor?: Color
}

type Room = {
  name: string
  xIn: number
  zIn: number
  widthIn: number
  depthIn: number
  floor: keyof typeof finishes
  floorOutlineIn?: Array<[number, number]>
  notes?: string
}

type Wall = {
  from: [number, number]
  to: [number, number]
  finish?: keyof typeof finishes
  heightIn?: number
  thicknessIn?: number
}

type NavigationMode = 'rotate' | 'translate'

const finishes = {
  livingFloor: {
    name: 'dark grey-brown floor',
    color: '#4a4540',
    texture: 'plain',
  },
  bedroomFloor: {
    name: 'light grey-beige floor',
    color: '#c6beb3',
    texture: 'plain',
  },
  kitchenFloor: {
    name: 'medium warm-brown floor',
    color: '#8a684f',
    texture: 'plain',
  },
  bathFloor: {
    name: 'light neutral bathroom floor',
    color: '#d6d1c8',
    texture: 'plain',
  },
  shelterFloor: {
    name: 'cool grey household shelter floor',
    color: '#cbd5e1',
    modelColor: '#cbd5e1',
    texture: 'plain',
  },
  wall: {
    name: 'warm off-white / light cream walls',
    color: '#eee8dc',
    texture: 'plain',
  },
  accentRust: {
    name: 'terracotta/rust accent wall',
    color: '#934532',
    texture: 'plain',
  },
  accentTaupe: {
    name: 'taupe bedroom accent wall',
    color: '#9b8b7d',
    texture: 'plain',
  },
  darkKitchen: {
    name: 'dark charcoal kitchen cabinetry / backsplash',
    color: '#1f2326',
    texture: 'plain',
  },
  countertop: {
    name: 'light wood countertop',
    color: '#c99a6b',
    texture: 'wood',
  },
  woodSlats: {
    name: 'vertical wood slat entry feature',
    color: '#6b3f25',
    texture: 'plain',
  },
} satisfies Record<string, Finish>

const rooms: Room[] = [
  {
    name: 'Bedroom 3',
    xIn: 0,
    zIn: livingFacadeZIn,
    widthIn: 106,
    depthIn: 166.5,
    floor: 'bedroomFloor',
    notes: 'Measured usable space; the partition to Living / Dining was removed.',
  },
  {
    name: 'Living / Dining',
    xIn: 106,
    zIn: livingFacadeZIn,
    widthIn: 134.2,
    depthIn: livingDepthIn,
    floor: 'livingFloor',
  },
  {
    name: 'Entry / Circulation',
    xIn: 106,
    zIn: bedroomDatumZIn,
    widthIn: 134.2,
    depthIn: 371.25 - bedroomDatumZIn,
    floor: 'livingFloor',
    floorOutlineIn: [
      [106, bedroomDatumZIn],
      [240.2, bedroomDatumZIn],
      [240.2, 362.2],
      [230.2, 362.2],
      [230.2, 371.25],
      [106, 371.25],
    ],
  },
  {
    name: 'Bedroom 2',
    xIn: 265.8,
    zIn: 0,
    widthIn: 122,
    depthIn: bedroomDatumZIn,
    floor: 'bedroomFloor',
  },
  {
    name: 'Main Bedroom',
    xIn: 387.8,
    zIn: 0,
    widthIn: 137.3,
    depthIn: mainBedroomBackZIn,
    floor: 'bedroomFloor',
  },
  {
    name: 'Household Shelter',
    xIn: 0,
    zIn: bedroom3BackZIn,
    widthIn: 106,
    depthIn: 50.6,
    floor: 'shelterFloor',
  },
  {
    name: 'Bath / WC 2',
    xIn: bathroom2LeftXIn,
    zIn: bathroomFrontZIn,
    widthIn: bathroom2WidthIn,
    depthIn: bathroomDepthIn,
    floor: 'bathFloor',
  },
  {
    name: 'Bath / WC 1',
    xIn: bathroomDividerXIn,
    zIn: bathroomFrontZIn,
    widthIn: bathroom1WidthIn,
    depthIn: bathroomDepthIn,
    floor: 'bathFloor',
  },
  {
    name: 'Kitchen',
    xIn: 240.2,
    zIn: 263.6,
    widthIn: 130.9,
    depthIn: 98.6,
    floor: 'kitchenFloor',
  },
  {
    name: 'Service Yard',
    xIn: 371.1,
    zIn: 263.6,
    widthIn: 55.1,
    depthIn: 98.6,
    floor: 'bathFloor',
  },
  {
    name: 'Suggested Study',
    xIn: 88.6,
    zIn: 371.25,
    widthIn: 141.6,
    depthIn: 75.6,
    floor: 'livingFloor',
  },
]

const walls: Wall[] = [
  // Main facade and exterior shell, simplified from the HDB plan.
  { from: [240.2, 0], to: [525.6, 0] },
  { from: [0, livingFacadeZIn], to: [240.2, livingFacadeZIn] },
  { from: [525.6, 0], to: [525.6, 253.9] },
  { from: [426.2, 362.2], to: [230.2, 362.2] },
  { from: [230.2, 446.85], to: [88.6, 446.85], finish: 'accentRust' },
  { from: [88.6, 371.25], to: [88.6, 446.85] },
  { from: [88.6, 371.25], to: [106, 371.25] },
  { from: [230.2, 362.2], to: [230.2, 446.85] },
  { from: [0, livingFacadeZIn], to: [0, 237] },
  { from: [0, bedroom3BackZIn], to: [106, bedroom3BackZIn] },
  { from: [106, bedroom3BackZIn], to: [106, 237] },
  { from: [0, 237], to: [106, 237] },
  { from: [106, 237], to: [106, 371.25] },

  // Partitions. Door gaps are intentionally approximate and left open.
  // Bedroom 3 is open to the living/dining area; the original partition wall was removed.
  { from: [240.2, 0], to: [240.2, 124.9], finish: 'accentRust' },
  { from: [387.8, 0], to: [387.8, mainBedroomDoorStartZIn] },
  { from: [240.2, bedroomDatumZIn], to: [bedroom2DoorStartXIn, bedroomDatumZIn] },
  { from: [bedroom2DoorEndXIn, bedroomDatumZIn], to: [387.8, bedroomDatumZIn] },
  {
    from: [bathroom2DoorEndXIn, bedroomBathroomWallZIn],
    to: [450, bedroomBathroomWallZIn],
    thicknessIn: bedroomBathroomWallThicknessIn,
  },
  {
    from: [480, bedroomBathroomWallZIn],
    to: [mainBedroomRightXIn, bedroomBathroomWallZIn],
    thicknessIn: bedroomBathroomWallThicknessIn,
  },
  { from: [bathroom2LeftXIn, bedroomBathroomWallZIn], to: [bathroom2LeftXIn, bathroomBackZIn] },
  { from: [bathroomDividerXIn, bedroomBathroomWallZIn], to: [bathroomDividerXIn, bathroomBackZIn] },
  { from: [bathroom2LeftXIn, bathroomBackZIn], to: [525.6, bathroomBackZIn] },
  { from: [426.2, 253.9], to: [426.2, 362.2] },

  // The kitchen and service yard are one open space with no partition wall.

  // Photo-observed accent finish in the main bedroom.
  { from: [387.8, 0], to: [mainBedroomRightXIn, 0], finish: 'accentTaupe' },
]

const canvasElement = document.querySelector<HTMLCanvasElement>('#scene')
const viewButtons = document.querySelectorAll<HTMLButtonElement>('.view-mode')

if (!canvasElement || viewButtons.length === 0) {
  throw new Error('Flatty could not find the scene canvas or view controls.')
}

const canvas = canvasElement

const scene = new THREE.Scene()
scene.background = new THREE.Color(viewStyle.background)

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const planCenter = { xIn: 262.8, zIn: 223.4 }
const camera3d = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
camera3d.position.set(m(planCenter.xIn), 18, m(planCenter.zIn) + 4)

const camera2d = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
camera2d.position.set(m(planCenter.xIn), 20, m(planCenter.zIn))
camera2d.up.set(0, 0, -1)
camera2d.lookAt(m(planCenter.xIn), 0, m(planCenter.zIn))
let activeCamera: THREE.Camera = camera2d

const roomFloors: THREE.Mesh[] = []
const roomDimensionOverlays = new Map<Room, THREE.Group>()
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
let hoveredRoom: Room | undefined

const controls = new OrbitControls(camera3d, renderer.domElement)
controls.enableDamping = true
controls.target.set(m(planCenter.xIn), 0, m(planCenter.zIn))
controls.minPolarAngle = 0.01
controls.maxPolarAngle = Math.PI - 0.01
controls.minDistance = 3
controls.maxDistance = 22
controls.enabled = false
setNavigationMode('rotate')

scene.add(new THREE.HemisphereLight('#ffffff', '#9ca3af', 1.6))
const sun = new THREE.DirectionalLight('#ffffff', 2.2)
sun.position.set(-3, 8, 4)
sun.castShadow = true
sun.shadow.mapSize.set(2048, 2048)
scene.add(sun)

validateRoomInterference(rooms)
buildFlat()
bindViewControls()
resize()
renderer.setAnimationLoop(() => {
  if (controls.enabled) controls.update()
  renderer.render(scene, activeCamera)
})
window.addEventListener('resize', resize)

function buildFlat() {
  const flat = new THREE.Group()
  flat.name = 'Flatty draft model'
  scene.add(flat)

  flat.add(createBaseFloor())

  for (const room of rooms) {
    const floor = createFloor(room)
    floor.userData.room = room
    roomFloors.push(floor)
    flat.add(floor)
    flat.add(createRoomLabel(room))

    const dimensions = createRoomDimensionOverlay(room)
    roomDimensionOverlays.set(room, dimensions)
    flat.add(dimensions)
  }

  for (const wall of walls) {
    flat.add(createWall(wall, walls))
  }

  flat.add(createNorthLightWindowStrip())
  addModelEdges(flat)
}

function addModelEdges(model: THREE.Group) {
  const material = new THREE.LineBasicMaterial({
    color: viewStyle.edges,
    transparent: true,
    opacity: 0.72,
  })
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(object.geometry), material)
    edges.name = `${object.name} edges`
    object.add(edges)
  })
}

function createBaseFloor() {
  const outline: Array<[number, number]> = [
    [240.2, 0],
    [525.6, 0],
    [525.6, 253.9],
    [426.2, 253.9],
    [426.2, 362.2],
    [230.2, 362.2],
    [230.2, 446.85],
    [88.6, 446.85],
    [88.6, 371.25],
    [106, 371.25],
    [106, 237],
    [0, 237],
    [0, livingFacadeZIn],
    [240.2, livingFacadeZIn],
  ]
  const geometry = createFloorOutlineGeometry(outline)
  const material = materialFor('livingFloor')
  material.side = THREE.DoubleSide
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'continuous base floor'
  mesh.position.y = -0.045
  mesh.receiveShadow = true
  return mesh
}

function createFloor(room: Room) {
  const geometry = room.floorOutlineIn
    ? createFloorOutlineGeometry(room.floorOutlineIn)
    : new THREE.BoxGeometry(m(room.widthIn), 0.04, m(room.depthIn))
  const material = materialFor(room.floor)
  if (room.floorOutlineIn) material.side = THREE.DoubleSide
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = `${room.name} floor`
  if (room.floorOutlineIn) {
    mesh.position.y = 0.001
  } else {
    mesh.position.set(m(room.xIn + room.widthIn / 2), -0.02, m(room.zIn + room.depthIn / 2))
  }
  mesh.receiveShadow = true
  return mesh
}

function createFloorOutlineGeometry(outlineIn: Array<[number, number]>) {
  const shape = new THREE.Shape()
  outlineIn.forEach(([xIn, zIn], index) => {
    if (index === 0) shape.moveTo(m(xIn), m(zIn))
    else shape.lineTo(m(xIn), m(zIn))
  })
  shape.closePath()

  const geometry = new THREE.ShapeGeometry(shape)
  geometry.rotateX(Math.PI / 2)
  return geometry
}

function createWall(wall: Wall, allWalls: Wall[]) {
  const [x1, z1] = wall.from
  const [x2, z2] = wall.to
  const dx = x2 - x1
  const dz = z2 - z1
  const length = Math.hypot(dx, dz)
  const direction: [number, number] = [dx / length, dz / length]
  const startExtension = orthogonalJoinExtension(wall.from, direction, wall, allWalls)
  const endExtension = orthogonalJoinExtension(wall.to, direction, wall, allWalls)
  const extendedFrom = [
    x1 - direction[0] * startExtension,
    z1 - direction[1] * startExtension,
  ] as const
  const extendedTo = [
    x2 + direction[0] * endExtension,
    z2 + direction[1] * endExtension,
  ] as const
  const height = wall.heightIn ?? wallHeightIn
  const thickness = wall.thicknessIn ?? wallThicknessIn
  const geometry = new THREE.BoxGeometry(m(length + startExtension + endExtension), m(height), m(thickness))
  const mesh = new THREE.Mesh(geometry, materialFor(wall.finish ?? 'wall'))
  mesh.name = 'wall'
  mesh.position.set(
    m((extendedFrom[0] + extendedTo[0]) / 2),
    m(height / 2),
    m((extendedFrom[1] + extendedTo[1]) / 2),
  )
  mesh.rotation.y = -Math.atan2(dz, dx)
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function orthogonalJoinExtension(
  endpoint: [number, number],
  direction: [number, number],
  wall: Wall,
  allWalls: Wall[],
) {
  let extension = 0

  for (const other of allWalls) {
    if (other === wall || !pointOnWall(endpoint, other)) continue

    const otherDx = other.to[0] - other.from[0]
    const otherDz = other.to[1] - other.from[1]
    const otherLength = Math.hypot(otherDx, otherDz)
    const dot = Math.abs((direction[0] * otherDx + direction[1] * otherDz) / otherLength)
    if (dot < 0.001) extension = Math.max(extension, (other.thicknessIn ?? wallThicknessIn) / 2)
  }

  return extension
}

function pointOnWall(point: [number, number], wall: Wall) {
  const dx = wall.to[0] - wall.from[0]
  const dz = wall.to[1] - wall.from[1]
  const lengthSquared = dx * dx + dz * dz
  const pointDx = point[0] - wall.from[0]
  const pointDz = point[1] - wall.from[1]
  const cross = Math.abs(pointDx * dz - pointDz * dx)
  const projection = pointDx * dx + pointDz * dz

  return cross < 0.01 * Math.sqrt(lengthSquared) && projection >= -0.01 && projection <= lengthSquared + 0.01
}

function createNorthLightWindowStrip() {
  const group = new THREE.Group()
  group.name = 'approximate window bands'
  const windowMaterial = new THREE.MeshBasicMaterial({ color: viewStyle.windows, transparent: true, opacity: 0.55 })
  for (const [xIn, widthIn] of [
    [12, 82],
    [120, 90],
    [250, 82],
    [370, 92],
  ] as const) {
    const window = new THREE.Mesh(new THREE.BoxGeometry(m(widthIn), m(35), 0.03), windowMaterial)
    window.position.set(m(xIn + widthIn / 2), m(58), m(-2.4))
    group.add(window)
  }
  return group
}

function createRoomDimensionOverlay(room: Room) {
  const overlay = new THREE.Group()
  overlay.name = `${room.name} dimensions`
  overlay.visible = false

  const heightIn = 2
  const widthLineZIn = room.zIn + Math.min(18, room.depthIn * 0.2)
  const depthLineXIn = room.xIn + room.widthIn - Math.min(18, room.widthIn * 0.2)
  addDimension(
    overlay,
    room.widthIn,
    [room.xIn, heightIn, widthLineZIn],
    [room.xIn + room.widthIn, heightIn, widthLineZIn],
  )
  addDimension(
    overlay,
    room.depthIn,
    [depthLineXIn, heightIn, room.zIn],
    [depthLineXIn, heightIn, room.zIn + room.depthIn],
  )

  return overlay
}

function addDimension(
  overlay: THREE.Group,
  valueIn: number,
  from: [number, number, number],
  to: [number, number, number],
) {
  const color: Color = '#1677d2'
  const start = pointInMeters(from)
  const end = pointInMeters(to)
  const direction = end.clone().sub(start).normalize()
  const tickDirection = new THREE.Vector3(-direction.z, 0, direction.x).normalize()

  overlay.add(createDimensionLine([start, end], color))
  overlay.add(createDimensionLine([
    start.clone().addScaledVector(tickDirection, m(-3)),
    start.clone().addScaledVector(tickDirection, m(3)),
  ], color))
  overlay.add(createDimensionLine([
    end.clone().addScaledVector(tickDirection, m(-3)),
    end.clone().addScaledVector(tickDirection, m(3)),
  ], color))

  const labelPosition = start.clone().lerp(end, 0.5).addScaledVector(tickDirection, m(7))
  labelPosition.y += m(4)
  overlay.add(createTextSprite(`${valueIn}\" · ${m(valueIn).toFixed(2)} m`, labelPosition, color))
}

function createDimensionLine(points: THREE.Vector3[], color: Color) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const material = new THREE.LineBasicMaterial({ color, depthTest: false, transparent: true, opacity: 0.95 })
  const line = new THREE.Line(geometry, material)
  line.renderOrder = 20
  return line
}

function createTextSprite(text: string, position: THREE.Vector3, color: Color) {
  const labelCanvas = document.createElement('canvas')
  labelCanvas.width = 512
  labelCanvas.height = 128
  const context = labelCanvas.getContext('2d')
  if (!context) throw new Error('Could not create dimension label canvas.')

  context.fillStyle = 'rgba(255, 255, 255, 0.92)'
  roundRect(context, 6, 12, 500, 104, 18)
  context.fill()
  context.strokeStyle = color
  context.lineWidth = 8
  context.stroke()
  context.fillStyle = color
  context.font = 'bold 39px system-ui, sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, 256, 64)

  const texture = new THREE.CanvasTexture(labelCanvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false }))
  sprite.position.copy(position)
  sprite.scale.set(m(38), m(9.5), 1)
  sprite.renderOrder = 21
  return sprite
}

function pointInMeters([xIn, yIn, zIn]: [number, number, number]) {
  return new THREE.Vector3(m(xIn), m(yIn), m(zIn))
}

function createRoomLabel(room: Room) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Could not create label canvas.')

  context.fillStyle = 'rgba(15, 23, 42, 0.76)'
  roundRect(context, 8, 18, 496, 92, 18)
  context.fill()
  context.fillStyle = '#f8fafc'
  context.font = 'bold 42px system-ui, sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(room.name, 256, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false }))
  sprite.name = `${room.name} label`
  sprite.position.set(m(room.xIn + room.widthIn / 2), 0.08, m(room.zIn + room.depthIn / 2))
  sprite.scale.set(m(55), m(14), 1)
  return sprite
}

function validateRoomInterference(roomData: Room[]) {
  const conflicts: string[] = []

  for (let i = 0; i < roomData.length; i += 1) {
    const room = roomData[i]
    if (room.widthIn <= 0 || room.depthIn <= 0) {
      conflicts.push(`${room.name} has invalid dimensions`)
    }

    for (let j = i + 1; j < roomData.length; j += 1) {
      const other = roomData[j]
      const overlapX = Math.min(room.xIn + room.widthIn, other.xIn + other.widthIn) - Math.max(room.xIn, other.xIn)
      const overlapZ = Math.min(room.zIn + room.depthIn, other.zIn + other.depthIn) - Math.max(room.zIn, other.zIn)

      if (overlapX > 0.01 && overlapZ > 0.01) {
        conflicts.push(`${room.name} overlaps ${other.name} by ${overlapX.toFixed(1)} × ${overlapZ.toFixed(1)} in`)
      }
    }
  }

  if (conflicts.length > 0) {
    throw new Error(`Room interference detected:\n${conflicts.join('\n')}`)
  }
}

function materialFor(key: keyof typeof finishes) {
  const finish: Finish = finishes[key]
  const floorFinishes: Array<keyof typeof finishes> = [
    'livingFloor',
    'bedroomFloor',
    'kitchenFloor',
    'bathFloor',
    'shelterFloor',
  ]
  return new THREE.MeshStandardMaterial({
    color: finish.modelColor ?? (floorFinishes.includes(key) ? viewStyle.floor : viewStyle.wall),
    roughness: 0.86,
    metalness: 0,
  })
}

function roundRect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  context.beginPath()
  context.moveTo(x + r, y)
  context.arcTo(x + w, y, x + w, y + h, r)
  context.arcTo(x + w, y + h, x, y + h, r)
  context.arcTo(x, y + h, x, y, r)
  context.arcTo(x, y, x + w, y, r)
  context.closePath()
}

function bindViewControls() {
  viewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.view === '2d' || button.dataset.view === '3d') {
        setViewMode(button.dataset.view)
      }
    })
  })
  canvas.addEventListener('pointermove', showHoveredRoomDimensions)
  canvas.addEventListener('pointerleave', () => setHoveredRoom(undefined))
  setViewMode('2d')
}

function showHoveredRoomDimensions(event: PointerEvent) {
  const bounds = canvas.getBoundingClientRect()
  pointer.set(
    ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
    -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
  )
  raycaster.setFromCamera(pointer, activeCamera)
  const room = raycaster.intersectObjects(roomFloors)[0]?.object.userData.room as Room | undefined
  setHoveredRoom(room)
}

function setHoveredRoom(room: Room | undefined) {
  if (room === hoveredRoom) return
  if (hoveredRoom) roomDimensionOverlays.get(hoveredRoom)!.visible = false
  hoveredRoom = room
  if (hoveredRoom) roomDimensionOverlays.get(hoveredRoom)!.visible = true
}

function setViewMode(view: '2d' | '3d') {
  const is3d = view === '3d'
  activeCamera = is3d ? camera3d : camera2d
  controls.enabled = is3d
  setHoveredRoom(undefined)
  viewButtons.forEach((button) => {
    const isActive = button.dataset.view === view
    button.classList.toggle('is-active', isActive)
    button.setAttribute('aria-pressed', String(isActive))
  })
}

function setNavigationMode(mode: NavigationMode) {
  const translate = mode === 'translate'
  controls.mouseButtons.LEFT = translate ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE
  controls.mouseButtons.RIGHT = translate ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN
  controls.touches.ONE = translate ? THREE.TOUCH.PAN : THREE.TOUCH.ROTATE
}

function resize() {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  renderer.setSize(width, height, false)

  const aspect = width / height
  camera3d.aspect = aspect
  camera3d.updateProjectionMatrix()

  const planWidth = m(525.6) + 1
  const planDepth = m(446.85) + 1
  const halfHeight = Math.max(planDepth / 2, planWidth / (2 * aspect))
  const halfWidth = halfHeight * aspect
  camera2d.left = -halfWidth
  camera2d.right = halfWidth
  camera2d.top = halfHeight
  camera2d.bottom = -halfHeight
  camera2d.updateProjectionMatrix()
}

function m(inches: number) {
  return inches * INCH_TO_METER
}
