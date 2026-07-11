import './styles.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const INCH_TO_METER = 0.0254
const wallHeightIn = 101.7
const wallThicknessIn = 4.5
const windowTopIn = 94
const hallWindowSillIn = 8
const roomWindowSillIn = 48
const doorOpenAngleDegrees = 45
const bedroomDatumZIn = 124.9
const livingDepthIn = 105
const livingFacadeZIn = bedroomDatumZIn - livingDepthIn
const bedroom3BackZIn = livingFacadeZIn + 166.5
const householdShelterDepthIn = 50.6
const householdShelterBackZIn = bedroom3BackZIn + householdShelterDepthIn
const entranceDoorOffsetFromShelterIn = 50
const entranceDoorWidthIn = 40
const entranceDoorStartZIn = householdShelterBackZIn + entranceDoorOffsetFromShelterIn
const entranceDoorEndZIn = entranceDoorStartZIn + entranceDoorWidthIn
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
const bathroom2DoorHingeXIn = bathroom2LeftXIn + wallThicknessIn / 2
const bathroom2DoorEndXIn = bedroom2DoorEndXIn
const bathroom2WidthIn = 95
const bathroomDividerXIn = bathroom2LeftXIn + bathroom2WidthIn
const bathroom1DoorStartXIn = 450
const bathroom1DoorEndXIn = 480
const bathroom1RightXIn = 515.8
const bathroom1WidthIn = bathroom1RightXIn - bathroomDividerXIn
const viewStyle = {
  background: '#94a3b8',
  floor: '#a9784f',
  wall: '#ffffff',
  windows: '#b9dce8',
  windowFrames: '#e2e8f0',
  sunbeams: '#ffe2a8',
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
  receivesShadow?: boolean
  notes?: string
}

type Wall = {
  from: [number, number]
  to: [number, number]
  finish?: keyof typeof finishes
  heightIn?: number
  thicknessIn?: number
  castsShadow?: boolean
}

type Window = {
  name: string
  from: [number, number]
  to: [number, number]
  sillHeightIn: number
  heightIn: number
  panes?: number
  inwardDirection: [number, number]
  lightDepthIn: number
}

type Door = {
  name: string
  hinge: [number, number]
  closedDirection: [number, number]
  widthIn: number
  heightIn: number
  leafThicknessIn: number
  wallThicknessIn?: number
  lintelStartExtensionIn?: number
  swingDegrees: number
  finish: keyof typeof finishes
}

type DoorModel = {
  door: Door
  pivot: THREE.Group
  isOpen: boolean
  currentSwingDegrees: number
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
  entranceDoor: {
    name: 'dark wood entrance door',
    color: '#533b2f',
    modelColor: '#533b2f',
    texture: 'wood',
  },
  interiorDoor: {
    name: 'warm wood interior door',
    color: '#76533d',
    modelColor: '#76533d',
    texture: 'wood',
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
    receivesShadow: false,
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
    depthIn: householdShelterDepthIn,
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
  { from: [240.2, 0], to: [387.8, 0] },
  { from: [0, livingFacadeZIn], to: [240.2, livingFacadeZIn] },
  { from: [525.6, 0], to: [525.6, 253.9] },
  { from: [426.2, 362.2], to: [230.2, 362.2] },
  { from: [230.2, 446.85], to: [88.6, 446.85], finish: 'accentRust' },
  { from: [88.6, 371.25], to: [88.6, 446.85] },
  { from: [88.6, 371.25], to: [106, 371.25] },
  { from: [230.2, 362.2], to: [230.2, 446.85] },
  { from: [0, livingFacadeZIn], to: [0, householdShelterBackZIn] },
  { from: [0, bedroom3BackZIn], to: [106, bedroom3BackZIn], castsShadow: false },
  { from: [106, bedroom3BackZIn], to: [106, householdShelterBackZIn], castsShadow: false },
  { from: [0, householdShelterBackZIn], to: [106, householdShelterBackZIn] },
  { from: [106, householdShelterBackZIn], to: [106, entranceDoorStartZIn] },
  { from: [106, entranceDoorEndZIn], to: [106, 371.25] },

  // Partitions. Door openings are intentionally approximate.
  // Bedroom 3 is open to the living/dining area; the original partition wall was removed.
  { from: [240.2, 0], to: [240.2, 124.9], finish: 'accentRust' },
  { from: [387.8, 0], to: [387.8, mainBedroomDoorStartZIn] },
  { from: [240.2, bedroomDatumZIn], to: [bedroom2DoorStartXIn, bedroomDatumZIn] },
  { from: [bedroom2DoorEndXIn, bedroomDatumZIn], to: [387.8, bedroomDatumZIn] },
  {
    from: [bathroom2DoorEndXIn, bedroomBathroomWallZIn],
    to: [bathroom1DoorStartXIn, bedroomBathroomWallZIn],
    thicknessIn: bedroomBathroomWallThicknessIn,
  },
  {
    from: [bathroom1DoorEndXIn, bedroomBathroomWallZIn],
    to: [mainBedroomRightXIn, bedroomBathroomWallZIn],
    thicknessIn: bedroomBathroomWallThicknessIn,
  },
  { from: [bathroom2LeftXIn, bedroomBathroomWallZIn], to: [bathroom2LeftXIn, bathroomBackZIn] },
  { from: [bathroomDividerXIn, bedroomBathroomWallZIn], to: [bathroomDividerXIn, bathroomBackZIn] },
  { from: [bathroom2LeftXIn, bathroomBackZIn], to: [525.6, bathroomBackZIn] },
  { from: [426.2, 253.9], to: [426.2, 362.2] },

  // The kitchen and service yard are one open space with no partition wall.

  // Photo-observed accent finish in the main bedroom.
  { from: [387.8, 0], to: [525.6, 0], finish: 'accentTaupe' },
]

const windows: Window[] = [
  {
    name: 'Bedroom 3 / Living window',
    from: [23, livingFacadeZIn],
    to: [83, livingFacadeZIn],
    sillHeightIn: hallWindowSillIn,
    heightIn: windowTopIn - hallWindowSillIn,
    panes: 2,
    inwardDirection: [0, 1],
    lightDepthIn: 90,
  },
  {
    name: 'Living / Dining window',
    from: [117, livingFacadeZIn],
    to: [224, livingFacadeZIn],
    sillHeightIn: hallWindowSillIn,
    heightIn: windowTopIn - hallWindowSillIn,
    panes: 4,
    inwardDirection: [0, 1],
    lightDepthIn: 90,
  },
  {
    name: 'Bedroom 2 window',
    from: [275.8, 0],
    to: [377.8, 0],
    sillHeightIn: roomWindowSillIn,
    heightIn: windowTopIn - roomWindowSillIn,
    panes: 4,
    inwardDirection: [0, 1],
    lightDepthIn: 80,
  },
  {
    name: 'Main bedroom window',
    from: [405.95, 0],
    to: [506.95, 0],
    sillHeightIn: roomWindowSillIn,
    heightIn: windowTopIn - roomWindowSillIn,
    panes: 4,
    inwardDirection: [0, 1],
    lightDepthIn: 90,
  },
  {
    name: 'Suggested Study window',
    from: [230.2, 382],
    to: [230.2, 436],
    sillHeightIn: roomWindowSillIn,
    heightIn: windowTopIn - roomWindowSillIn,
    panes: 2,
    inwardDirection: [-1, 0],
    lightDepthIn: 75,
  },
  {
    name: 'Service Yard window',
    from: [426.2, 277.4],
    to: [426.2, 348.4],
    sillHeightIn: roomWindowSillIn,
    heightIn: windowTopIn - roomWindowSillIn,
    inwardDirection: [-1, 0],
    lightDepthIn: 42,
  },
]

const doors: Door[] = [
  {
    name: 'Flat entrance door',
    hinge: [106, entranceDoorStartZIn],
    closedDirection: [0, 1],
    widthIn: entranceDoorWidthIn,
    heightIn: 82,
    leafThicknessIn: 1.75,
    swingDegrees: -doorOpenAngleDegrees,
    finish: 'entranceDoor',
  },
  {
    name: 'Bedroom 2 door',
    hinge: [bedroom2DoorEndXIn, bedroomDatumZIn],
    closedDirection: [-1, 0],
    widthIn: bedroom2DoorEndXIn - bedroom2DoorStartXIn,
    heightIn: 82,
    leafThicknessIn: 1.5,
    swingDegrees: doorOpenAngleDegrees,
    finish: 'interiorDoor',
  },
  {
    name: 'Main bedroom door',
    hinge: [387.8, mainBedroomBackZIn],
    closedDirection: [0, -1],
    widthIn: mainBedroomDoorWidthIn,
    heightIn: 82,
    leafThicknessIn: 1.5,
    swingDegrees: doorOpenAngleDegrees,
    finish: 'interiorDoor',
  },
  {
    name: 'Bath / WC 2 door',
    hinge: [bathroom2DoorHingeXIn, bedroomBathroomWallZIn],
    closedDirection: [1, 0],
    widthIn: bathroom2DoorEndXIn - bathroom2DoorHingeXIn,
    heightIn: 82,
    leafThicknessIn: 1.5,
    wallThicknessIn: bedroomBathroomWallThicknessIn,
    lintelStartExtensionIn: wallThicknessIn,
    swingDegrees: doorOpenAngleDegrees,
    finish: 'interiorDoor',
  },
  {
    name: 'Bath / WC 1 door',
    hinge: [bathroom1DoorEndXIn, bedroomBathroomWallZIn],
    closedDirection: [-1, 0],
    widthIn: bathroom1DoorEndXIn - bathroom1DoorStartXIn,
    heightIn: 82,
    leafThicknessIn: 1.5,
    wallThicknessIn: bedroomBathroomWallThicknessIn,
    swingDegrees: -doorOpenAngleDegrees,
    finish: 'interiorDoor',
  },
]

const canvasElement = document.querySelector<HTMLCanvasElement>('#scene')
const viewButtons = document.querySelectorAll<HTMLButtonElement>('.view-mode')
const displayButtons = document.querySelectorAll<HTMLButtonElement>('.display-toggle')

if (!canvasElement || viewButtons.length === 0 || displayButtons.length === 0) {
  throw new Error('Flatty could not find the scene canvas or model controls.')
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

const roomLabels: THREE.Sprite[] = []
const roomDimensionOverlays: THREE.Group[] = []
const doorModels: DoorModel[] = []
const doorHitAreas: THREE.Mesh[] = []
const doorPlanGraphics: THREE.Object3D[] = []
const windowLightBeams: THREE.Mesh[] = []
const windowLightMaterials: THREE.ShaderMaterial[] = []
const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()
const clock = new THREE.Clock()
let doorPointerDown: [number, number] | undefined

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
validateWindowOpenings(windows, walls)
buildFlat()
bindViewControls()
resize()
renderer.setAnimationLoop(() => {
  const deltaSeconds = clock.getDelta()
  if (controls.enabled) controls.update()
  updateDoorAnimations(deltaSeconds)
  updateWindowLight(clock.elapsedTime)
  renderer.render(scene, activeCamera)
})
window.addEventListener('resize', resize)

function buildFlat() {
  const flat = new THREE.Group()
  flat.name = 'Flatty draft model'
  scene.add(flat)

  flat.add(createBaseFloor())

  for (const room of rooms) {
    flat.add(createFloor(room))

    const label = createRoomLabel(room)
    roomLabels.push(label)
    flat.add(label)

    const dimensions = createRoomDimensionOverlay(room)
    roomDimensionOverlays.push(dimensions)
    flat.add(dimensions)
  }

  for (const wall of walls) {
    flat.add(createWall(wall, walls, windows))
  }

  for (const door of doors) {
    flat.add(createDoor(door))
  }

  addModelEdges(flat)
}

function addModelEdges(model: THREE.Group) {
  const material = new THREE.LineBasicMaterial({
    color: viewStyle.edges,
    transparent: true,
    opacity: 0.72,
  })
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh) || object.userData.skipEdges) return
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
    [106, householdShelterBackZIn],
    [0, householdShelterBackZIn],
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
  mesh.receiveShadow = room.receivesShadow ?? true
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

function createWall(wall: Wall, allWalls: Wall[], allWindows: Window[]) {
  const [x1, z1] = wall.from
  const [x2, z2] = wall.to
  const dx = x2 - x1
  const dz = z2 - z1
  const length = Math.hypot(dx, dz)
  const direction: [number, number] = [dx / length, dz / length]
  const startExtension = orthogonalJoinExtension(wall.from, direction, wall, allWalls)
  const endExtension = orthogonalJoinExtension(wall.to, direction, wall, allWalls)
  const height = wall.heightIn ?? wallHeightIn
  const thickness = wall.thicknessIn ?? wallThicknessIn
  const wallWindows = allWindows
    .filter((window) => pointOnWall(window.from, wall) && pointOnWall(window.to, wall))
    .map((window) => ({
      window,
      startIn: Math.min(projectOntoWall(window.from, wall, direction), projectOntoWall(window.to, wall, direction)),
      endIn: Math.max(projectOntoWall(window.from, wall, direction), projectOntoWall(window.to, wall, direction)),
    }))
    .sort((a, b) => a.startIn - b.startIn)

  const group = new THREE.Group()
  group.name = wallWindows.length > 0 ? 'wall with windows' : 'wall'
  let cursorIn = -startExtension

  for (const opening of wallWindows) {
    addWallSection(group, wall, direction, cursorIn, opening.startIn, 0, height, thickness)
    addWallSection(group, wall, direction, opening.startIn, opening.endIn, 0, opening.window.sillHeightIn, thickness)

    const lintelBottomIn = opening.window.sillHeightIn + opening.window.heightIn
    addWallSection(
      group,
      wall,
      direction,
      opening.startIn,
      opening.endIn,
      lintelBottomIn,
      height - lintelBottomIn,
      thickness,
    )
    group.add(createWindow(opening.window, wall, direction, opening.startIn, opening.endIn, thickness))
    cursorIn = opening.endIn
  }

  addWallSection(group, wall, direction, cursorIn, length + endExtension, 0, height, thickness)
  return group
}

function addWallSection(
  group: THREE.Group,
  wall: Wall,
  direction: [number, number],
  startIn: number,
  endIn: number,
  bottomIn: number,
  heightIn: number,
  thicknessIn: number,
) {
  const lengthIn = endIn - startIn
  if (lengthIn <= 0.01 || heightIn <= 0.01) return

  const centerIn = (startIn + endIn) / 2
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(m(lengthIn), m(heightIn), m(thicknessIn)),
    materialFor(wall.finish ?? 'wall'),
  )
  mesh.name = 'wall section'
  mesh.position.set(
    m(wall.from[0] + direction[0] * centerIn),
    m(bottomIn + heightIn / 2),
    m(wall.from[1] + direction[1] * centerIn),
  )
  mesh.rotation.y = -Math.atan2(direction[1], direction[0])
  mesh.castShadow = wall.castsShadow ?? true
  mesh.receiveShadow = true
  group.add(mesh)
}

function createWindow(
  window: Window,
  wall: Wall,
  direction: [number, number],
  startIn: number,
  endIn: number,
  wallThicknessIn: number,
) {
  const group = new THREE.Group()
  group.name = window.name
  const widthIn = endIn - startIn
  const centerIn = (startIn + endIn) / 2
  const angle = -Math.atan2(direction[1], direction[0])
  const centerXIn = wall.from[0] + direction[0] * centerIn
  const centerZIn = wall.from[1] + direction[1] * centerIn

  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(m(widthIn), m(window.heightIn), m(0.4)),
    new THREE.MeshStandardMaterial({
      color: viewStyle.windows,
      transparent: true,
      opacity: 0.42,
      roughness: 0.2,
      metalness: 0,
      depthWrite: false,
    }),
  )
  glass.name = `${window.name} glass`
  glass.position.set(centerXIn * INCH_TO_METER, m(window.sillHeightIn + window.heightIn / 2), centerZIn * INCH_TO_METER)
  glass.rotation.y = angle
  group.add(glass)

  const frameWidthIn = 1.5
  const frameDepthIn = wallThicknessIn + 0.5
  const frameMaterial = new THREE.MeshStandardMaterial({ color: viewStyle.windowFrames, roughness: 0.65 })
  const addFrame = (offsetIn: number, yIn: number, frameLengthIn: number, frameHeightIn: number) => {
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(m(frameLengthIn), m(frameHeightIn), m(frameDepthIn)),
      frameMaterial,
    )
    frame.name = `${window.name} frame`
    frame.position.set(
      m(wall.from[0] + direction[0] * (startIn + offsetIn)),
      m(yIn),
      m(wall.from[1] + direction[1] * (startIn + offsetIn)),
    )
    frame.rotation.y = angle
    frame.castShadow = true
    group.add(frame)
  }

  addFrame(widthIn / 2, window.sillHeightIn + frameWidthIn / 2, widthIn, frameWidthIn)
  addFrame(widthIn / 2, window.sillHeightIn + window.heightIn - frameWidthIn / 2, widthIn, frameWidthIn)
  addFrame(0, window.sillHeightIn + window.heightIn / 2, frameWidthIn, window.heightIn)
  addFrame(widthIn, window.sillHeightIn + window.heightIn / 2, frameWidthIn, window.heightIn)
  if (window.panes) {
    addFrame(widthIn / 2, window.sillHeightIn + window.heightIn / 2, widthIn, frameWidthIn)
    for (let pane = 1; pane < window.panes; pane += 1) {
      addFrame(widthIn * pane / window.panes, window.sillHeightIn + window.heightIn / 2, frameWidthIn, window.heightIn)
    }
  }

  group.add(createWindowLight(window))
  return group
}

function createWindowLight(window: Window) {
  const dx = window.to[0] - window.from[0]
  const dz = window.to[1] - window.from[1]
  const widthIn = Math.hypot(dx, dz)
  const tangent: [number, number] = [dx / widthIn, dz / widthIn]
  const center: [number, number] = [
    (window.from[0] + window.to[0]) / 2,
    (window.from[1] + window.to[1]) / 2,
  ]
  const nearWidthIn = widthIn * 0.9
  const farWidthIn = widthIn * 0.72
  const nearBottomIn = window.sillHeightIn + 3
  const nearTopIn = window.sillHeightIn + window.heightIn - 3
  const farHeightIn = Math.max(18, (nearTopIn - nearBottomIn) * 0.55)
  const farBottomIn = 1
  const farTopIn = farBottomIn + farHeightIn

  const positions: number[] = []
  const progress: number[] = []
  const sides: number[] = []
  const addVertex = (sideIn: number, depthIn: number, yIn: number, beamProgress: number) => {
    positions.push(
      m(center[0] + tangent[0] * sideIn + window.inwardDirection[0] * depthIn),
      m(yIn),
      m(center[1] + tangent[1] * sideIn + window.inwardDirection[1] * depthIn),
    )
    progress.push(beamProgress)
    sides.push(sideIn < 0 ? -1 : 1)
  }

  addVertex(-nearWidthIn / 2, 0, nearBottomIn, 0)
  addVertex(nearWidthIn / 2, 0, nearBottomIn, 0)
  addVertex(nearWidthIn / 2, 0, nearTopIn, 0)
  addVertex(-nearWidthIn / 2, 0, nearTopIn, 0)
  addVertex(-farWidthIn / 2, window.lightDepthIn, farBottomIn, 1)
  addVertex(farWidthIn / 2, window.lightDepthIn, farBottomIn, 1)
  addVertex(farWidthIn / 2, window.lightDepthIn, farTopIn, 1)
  addVertex(-farWidthIn / 2, window.lightDepthIn, farTopIn, 1)

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('beamProgress', new THREE.Float32BufferAttribute(progress, 1))
  geometry.setAttribute('beamSide', new THREE.Float32BufferAttribute(sides, 1))
  geometry.setIndex([
    0, 1, 5, 0, 5, 4,
    3, 7, 6, 3, 6, 2,
    0, 4, 7, 0, 7, 3,
    1, 2, 6, 1, 6, 5,
    0, 3, 2, 0, 2, 1,
    4, 5, 6, 4, 6, 7,
  ])

  const material = new THREE.ShaderMaterial({
    uniforms: {
      beamColor: { value: new THREE.Color(viewStyle.sunbeams) },
      time: { value: 0 },
      phase: { value: Math.random() * Math.PI * 2 },
      opacity: { value: 0.11 },
    },
    vertexShader: `
      uniform float time;
      uniform float phase;
      attribute float beamProgress;
      attribute float beamSide;
      varying float vProgress;
      varying float vSide;
      void main() {
        vProgress = beamProgress;
        vSide = beamSide;
        vec3 flutteredPosition = position;
        flutteredPosition.y += sin(time * 1.1 + phase + beamProgress * 6.0 + beamSide * 1.7)
          * 0.025 * beamProgress;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(flutteredPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 beamColor;
      uniform float time;
      uniform float phase;
      uniform float opacity;
      varying float vProgress;
      varying float vSide;
      void main() {
        float fade = 1.0 - smoothstep(0.52, 1.0, vProgress);
        float softEdge = smoothstep(0.0, 0.65, 1.0 - abs(vSide));
        float edgeFade = mix(0.72, 1.0, softEdge);
        float drift = 0.9 + 0.1 * sin(time * 0.8 + phase + vProgress * 4.0);
        float flowA = 0.5 + 0.5 * sin(
          vProgress * 19.0 - time * 1.25 + sin(vSide * 4.0 + time * 0.32 + phase) * 1.7
        );
        float flowB = 0.5 + 0.5 * sin(
          vProgress * 11.0 - time * 0.72 - sin(vSide * 6.0 - time * 0.24 + phase) * 1.3
        );
        float wisps = smoothstep(0.68, 0.98, flowA) * 0.62 + smoothstep(0.78, 0.99, flowB) * 0.3;
        float flutter = 0.88 + 0.12 * sin(time * 1.9 + phase * 0.7 + vProgress * 17.0 + vSide * 4.0);
        float brightness = 0.82 + wisps * 0.42;
        gl_FragColor = vec4(beamColor, opacity * fade * edgeFade * drift * flutter * brightness);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const beam = new THREE.Mesh(geometry, material)
  beam.name = `${window.name} animated light`
  beam.userData.skipEdges = true
  beam.visible = false
  beam.renderOrder = 2
  windowLightBeams.push(beam)
  windowLightMaterials.push(material)
  return beam
}

function updateWindowLight(elapsedSeconds: number) {
  for (const material of windowLightMaterials) {
    material.uniforms.time.value = elapsedSeconds
  }
}

function projectOntoWall(point: [number, number], wall: Wall, direction: [number, number]) {
  return (point[0] - wall.from[0]) * direction[0] + (point[1] - wall.from[1]) * direction[1]
}

function createDoor(door: Door) {
  const group = new THREE.Group()
  group.name = door.name

  const closedAngle = Math.atan2(door.closedDirection[1], door.closedDirection[0])
  const openAngle = closedAngle + THREE.MathUtils.degToRad(door.swingDegrees)
  const pivot = new THREE.Group()
  pivot.name = `${door.name} hinge`
  pivot.position.set(m(door.hinge[0]), 0, m(door.hinge[1]))
  group.add(pivot)

  const leaf = new THREE.Mesh(
    new THREE.BoxGeometry(m(door.widthIn), m(door.heightIn), m(door.leafThicknessIn)),
    materialFor(door.finish),
  )
  leaf.name = `${door.name} leaf`
  leaf.position.set(m(door.widthIn / 2), m(door.heightIn / 2), 0)
  leaf.castShadow = false
  leaf.receiveShadow = true
  pivot.add(leaf)

  const planLine = createDimensionLine([
    new THREE.Vector3(0, 0.06, 0),
    new THREE.Vector3(m(door.widthIn), 0.06, 0),
  ], viewStyle.edges)
  planLine.name = `${door.name} plan line`
  pivot.add(planLine)
  doorPlanGraphics.push(planLine)

  const hitArea = new THREE.Mesh(
    new THREE.BoxGeometry(m(door.widthIn), m(door.heightIn), m(8)),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  )
  hitArea.name = `${door.name} click target`
  hitArea.position.copy(leaf.position)
  hitArea.userData.skipEdges = true
  pivot.add(hitArea)

  const model: DoorModel = {
    door,
    pivot,
    isOpen: true,
    currentSwingDegrees: door.swingDegrees,
  }
  hitArea.userData.doorModel = model
  doorModels.push(model)
  doorHitAreas.push(hitArea)
  setDoorModelAngle(model)

  const lintelHeightIn = wallHeightIn - door.heightIn
  const lintelStartExtensionIn = door.lintelStartExtensionIn ?? 0
  const lintelLengthIn = door.widthIn + lintelStartExtensionIn
  const lintelCenterOffsetIn = (door.widthIn - lintelStartExtensionIn) / 2
  const lintel = new THREE.Mesh(
    new THREE.BoxGeometry(m(lintelLengthIn), m(lintelHeightIn), m(door.wallThicknessIn ?? wallThicknessIn)),
    materialFor('wall'),
  )
  lintel.name = `${door.name} lintel`
  lintel.position.set(
    m(door.hinge[0] + door.closedDirection[0] * lintelCenterOffsetIn),
    m(door.heightIn + lintelHeightIn / 2),
    m(door.hinge[1] + door.closedDirection[1] * lintelCenterOffsetIn),
  )
  lintel.rotation.y = -closedAngle
  lintel.castShadow = true
  lintel.receiveShadow = true
  group.add(lintel)

  const arcPoints = Array.from({ length: 25 }, (_, index) => {
    const angle = closedAngle + (openAngle - closedAngle) * index / 24
    return new THREE.Vector3(
      m(door.hinge[0] + Math.cos(angle) * door.widthIn),
      0.06,
      m(door.hinge[1] + Math.sin(angle) * door.widthIn),
    )
  })
  const swingArc = createDimensionLine(arcPoints, viewStyle.edges)
  swingArc.name = `${door.name} swing`
  group.add(swingArc)
  doorPlanGraphics.push(swingArc)

  return group
}

function updateDoorAnimations(deltaSeconds: number) {
  for (const model of doorModels) {
    const targetSwingDegrees = model.isOpen ? model.door.swingDegrees : 0
    model.currentSwingDegrees = THREE.MathUtils.damp(
      model.currentSwingDegrees,
      targetSwingDegrees,
      12,
      Math.min(deltaSeconds, 0.1),
    )
    if (Math.abs(model.currentSwingDegrees - targetSwingDegrees) < 0.05) {
      model.currentSwingDegrees = targetSwingDegrees
    }
    setDoorModelAngle(model)
  }
}

function setDoorModelAngle(model: DoorModel) {
  const closedAngle = Math.atan2(model.door.closedDirection[1], model.door.closedDirection[0])
  model.pivot.rotation.y = -closedAngle - THREE.MathUtils.degToRad(model.currentSwingDegrees)
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

function validateWindowOpenings(windowData: Window[], wallData: Wall[]) {
  const invalidWindows = windowData.filter((window) => {
    const matchingWalls = wallData.filter((wall) => pointOnWall(window.from, wall) && pointOnWall(window.to, wall))
    const topIn = window.sillHeightIn + window.heightIn
    const inwardLength = Math.hypot(...window.inwardDirection)
    return matchingWalls.length !== 1
      || window.heightIn <= 0
      || window.sillHeightIn < 0
      || topIn > wallHeightIn
      || window.lightDepthIn <= 0
      || Math.abs(inwardLength - 1) > 0.001
  })

  if (invalidWindows.length > 0) {
    throw new Error(`Invalid window openings: ${invalidWindows.map((window) => window.name).join(', ')}`)
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
  displayButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.display === 'labels' || button.dataset.display === 'dimensions') {
        const visible = button.getAttribute('aria-pressed') !== 'true'
        setOverlayVisibility(button.dataset.display, visible)
      }
    })
  })
  canvas.addEventListener('pointermove', showDoorPointer)
  canvas.addEventListener('pointerdown', rememberDoorPointerDown)
  canvas.addEventListener('pointerup', toggleClickedDoor)
  canvas.addEventListener('pointercancel', () => { doorPointerDown = undefined })
  canvas.addEventListener('pointerleave', () => {
    doorPointerDown = undefined
    canvas.style.cursor = ''
  })
  setViewMode('2d')
  setOverlayVisibility('labels', false)
  setOverlayVisibility('dimensions', false)
}

function showDoorPointer(event: PointerEvent) {
  canvas.style.cursor = doorModelAtPointer(event) ? 'pointer' : ''
}

function rememberDoorPointerDown(event: PointerEvent) {
  if (event.button === 0) doorPointerDown = [event.clientX, event.clientY]
}

function toggleClickedDoor(event: PointerEvent) {
  const start = doorPointerDown
  doorPointerDown = undefined
  if (!start || Math.hypot(event.clientX - start[0], event.clientY - start[1]) > 5) return

  const model = doorModelAtPointer(event)
  if (model) model.isOpen = !model.isOpen
}

function doorModelAtPointer(event: PointerEvent) {
  const bounds = canvas.getBoundingClientRect()
  pointer.set(
    ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
    -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
  )
  raycaster.setFromCamera(pointer, activeCamera)
  return raycaster.intersectObjects(doorHitAreas)[0]?.object.userData.doorModel as DoorModel | undefined
}

function setOverlayVisibility(option: 'labels' | 'dimensions', visible: boolean) {
  const overlays = option === 'labels' ? roomLabels : roomDimensionOverlays
  overlays.forEach((overlay) => { overlay.visible = visible })
  displayButtons.forEach((button) => {
    if (button.dataset.display !== option) return
    button.classList.toggle('is-active', visible)
    button.setAttribute('aria-pressed', String(visible))
  })
}

function setViewMode(view: '2d' | '3d') {
  const is3d = view === '3d'
  activeCamera = is3d ? camera3d : camera2d
  controls.enabled = is3d
  doorPlanGraphics.forEach((graphic) => { graphic.visible = !is3d })
  windowLightBeams.forEach((beam) => { beam.visible = is3d })
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
