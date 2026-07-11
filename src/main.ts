import './styles.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const INCH_TO_METER = 0.0254
const wallHeightIn = 101.7
const wallThicknessIn = 4.5

type Color = `#${string}`

type Finish = {
  name: string
  color: Color
  texture?: 'wood' | 'tile' | 'plain'
  plankColor?: Color
}

type Room = {
  name: string
  xIn: number
  zIn: number
  widthIn: number
  depthIn: number
  floor: keyof typeof finishes
  notes?: string
}

type Wall = {
  from: [number, number]
  to: [number, number]
  finish?: keyof typeof finishes
  heightIn?: number
  thicknessIn?: number
}

const finishes = {
  livingFloor: {
    name: 'dark grey-brown wood-look planks',
    color: '#403a35',
    plankColor: '#5a5149',
    texture: 'wood',
  },
  bedroomFloor: {
    name: 'light grey-beige wood-look planks',
    color: '#b8afa3',
    plankColor: '#d6cec3',
    texture: 'wood',
  },
  kitchenFloor: {
    name: 'warmer medium-brown wood-look planks',
    color: '#8a6143',
    plankColor: '#b1835f',
    texture: 'wood',
  },
  bathFloor: {
    name: 'light neutral tile',
    color: '#d6d1c8',
    texture: 'tile',
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
    zIn: 0,
    widthIn: 106,
    depthIn: 166.5,
    floor: 'bedroomFloor',
    notes: 'Measured usable space; PDF structural dimension differs due to wall widths.',
  },
  {
    name: 'Living / Dining',
    xIn: 106,
    zIn: 0,
    widthIn: 125.5,
    depthIn: 166.5,
    floor: 'livingFloor',
  },
  {
    name: 'Bedroom 2',
    xIn: 231.5,
    zIn: 0,
    widthIn: 122,
    depthIn: 124.9,
    floor: 'bedroomFloor',
  },
  {
    name: 'Main Bedroom',
    xIn: 353.5,
    zIn: 0,
    widthIn: 137.3,
    depthIn: 173,
    floor: 'bedroomFloor',
  },
  {
    name: 'Household Shelter',
    xIn: 0,
    zIn: 166.5,
    widthIn: 106,
    depthIn: 50.6,
    floor: 'bathFloor',
  },
  {
    name: 'Suggested Study',
    xIn: 106,
    zIn: 166.5,
    widthIn: 141.6,
    depthIn: 75.6,
    floor: 'livingFloor',
  },
  {
    name: 'Kitchen',
    xIn: 247.6,
    zIn: 166.5,
    widthIn: 194.4,
    depthIn: 98.6,
    floor: 'kitchenFloor',
  },
  {
    name: 'Bath / WC 2',
    xIn: 353.5,
    zIn: 173,
    widthIn: 60,
    depthIn: 70,
    floor: 'bathFloor',
  },
  {
    name: 'Bath / WC 1',
    xIn: 413.5,
    zIn: 173,
    widthIn: 77.3,
    depthIn: 70,
    floor: 'bathFloor',
  },
  {
    name: 'Service Yard',
    xIn: 413.5,
    zIn: 243,
    widthIn: 77.3,
    depthIn: 22,
    floor: 'bathFloor',
  },
]

const walls: Wall[] = [
  // Main facade and exterior shell, simplified from the HDB plan.
  { from: [0, 0], to: [490.8, 0] },
  { from: [490.8, 0], to: [490.8, 243] },
  { from: [442, 265.1], to: [247.6, 265.1] },
  { from: [247.6, 242.1], to: [106, 242.1] },
  { from: [0, 0], to: [0, 217.1] },
  { from: [0, 166.5], to: [106, 166.5] },
  { from: [0, 217.1], to: [106, 217.1] },

  // Partitions. Door gaps are intentionally approximate and left open.
  { from: [106, 0], to: [106, 130] },
  { from: [231.5, 0], to: [231.5, 124.9] },
  { from: [353.5, 0], to: [353.5, 124.9] },
  { from: [231.5, 124.9], to: [310, 124.9] },
  { from: [335, 124.9], to: [353.5, 124.9] },
  { from: [353.5, 173], to: [490.8, 173] },
  { from: [353.5, 173], to: [353.5, 243] },
  { from: [413.5, 173], to: [413.5, 243] },
  { from: [353.5, 243], to: [490.8, 243] },
  { from: [247.6, 166.5], to: [247.6, 242.1] },
  { from: [106, 166.5], to: [106, 242.1], finish: 'accentRust' },

  // Accent/photo-observed finishes.
  { from: [106, 166.5], to: [247.6, 166.5], finish: 'accentRust' },
  { from: [231.5, 124.9], to: [353.5, 124.9], finish: 'accentRust' },
  { from: [0, 0], to: [106, 0], finish: 'accentTaupe' },
]

const measurements = [
  ['Ceiling height', wallHeightIn, 'red measured ceiling height'],
  ['Bedroom 3 width', 106, 'blue measured usable width'],
  ['Bedroom 3 depth', 166.5, 'blue measured usable depth'],
  ['Bedroom 2 width', 122, 'blue measured usable width'],
  ['Bedroom 2 depth', 124.9, 'blue measured usable depth'],
  ['Main bedroom width', 137.3, 'blue measured usable width'],
  ['Main bedroom depth', 173, 'blue measured usable depth'],
  ['Study width', 141.6, 'blue measured usable width'],
  ['Study depth', 75.6, 'blue measured usable depth'],
  ['Kitchen / service span', 194.4, 'blue measured span across kitchen/service side'],
  ['Kitchen depth', 98.6, 'blue measured usable depth'],
] as const

const canvasElement = document.querySelector<HTMLCanvasElement>('#scene')
const panelElement = document.querySelector<HTMLElement>('#panel')

if (!canvasElement || !panelElement) {
  throw new Error('Flatty could not find the scene canvas or info panel.')
}

const canvas = canvasElement
const panel = panelElement

const scene = new THREE.Scene()
scene.background = new THREE.Color('#dbe3ef')

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
camera.position.set(m(260), m(260), m(470))

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(m(245), 0, m(130))
controls.maxPolarAngle = Math.PI * 0.48
controls.minDistance = 3
controls.maxDistance = 22

scene.add(new THREE.HemisphereLight('#ffffff', '#9ca3af', 1.6))
const sun = new THREE.DirectionalLight('#ffffff', 2.2)
sun.position.set(-3, 8, 4)
sun.castShadow = true
sun.shadow.mapSize.set(2048, 2048)
scene.add(sun)

buildFlat()
renderPanel()
resize()
renderer.setAnimationLoop(() => {
  controls.update()
  renderer.render(scene, camera)
})
window.addEventListener('resize', resize)

function buildFlat() {
  const flat = new THREE.Group()
  flat.name = 'Flatty draft model'
  scene.add(flat)

  for (const room of rooms) {
    flat.add(createFloor(room))
    flat.add(createRoomLabel(room))
  }

  for (const wall of walls) {
    flat.add(createWall(wall))
  }

  flat.add(createKitchenBuiltIns())
  flat.add(createWoodSlatFeature())
  flat.add(createCeilingGuide())
  flat.add(createNorthLightWindowStrip())
}

function createFloor(room: Room) {
  const geometry = new THREE.BoxGeometry(m(room.widthIn), 0.04, m(room.depthIn))
  const mesh = new THREE.Mesh(geometry, materialFor(room.floor))
  mesh.name = `${room.name} floor`
  mesh.position.set(m(room.xIn + room.widthIn / 2), -0.02, m(room.zIn + room.depthIn / 2))
  mesh.receiveShadow = true
  return mesh
}

function createWall(wall: Wall) {
  const [x1, z1] = wall.from
  const [x2, z2] = wall.to
  const dx = x2 - x1
  const dz = z2 - z1
  const length = Math.hypot(dx, dz)
  const height = wall.heightIn ?? wallHeightIn
  const thickness = wall.thicknessIn ?? wallThicknessIn
  const geometry = new THREE.BoxGeometry(m(length), m(height), m(thickness))
  const mesh = new THREE.Mesh(geometry, materialFor(wall.finish ?? 'wall'))
  mesh.name = 'wall'
  mesh.position.set(m((x1 + x2) / 2), m(height / 2), m((z1 + z2) / 2))
  mesh.rotation.y = -Math.atan2(dz, dx)
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function createKitchenBuiltIns() {
  const group = new THREE.Group()
  group.name = 'Kitchen built-ins'

  group.add(cabinet('base cabinets + counter', 275, 175, 150, 24, 35, 'darkKitchen'))
  group.add(cabinet('light wood countertop', 275, 175, 150, 24, 38, 'countertop', 2))
  group.add(cabinet('tall dark cabinet', 255, 178, 16, 80, 84, 'darkKitchen'))
  group.add(cabinet('island / movable prep surface placeholder', 258, 205, 48, 28, 36, 'countertop'))

  return group
}

function cabinet(
  name: string,
  xIn: number,
  zIn: number,
  widthIn: number,
  depthIn: number,
  heightIn: number,
  finish: keyof typeof finishes,
  capHeightIn = heightIn,
) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(m(widthIn), m(capHeightIn), m(depthIn)),
    materialFor(finish),
  )
  mesh.name = name
  mesh.position.set(m(xIn + widthIn / 2), m(heightIn / 2), m(zIn + depthIn / 2))
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function createWoodSlatFeature() {
  const group = new THREE.Group()
  group.name = 'Entry wood slat feature wall'
  const slatCount = 18
  for (let i = 0; i < slatCount; i += 1) {
    const slat = new THREE.Mesh(
      new THREE.BoxGeometry(m(1.2), m(94), m(1.6)),
      materialFor('woodSlats'),
    )
    slat.position.set(m(111 + i * 2.2), m(47), m(166.5 - 1.8))
    slat.castShadow = true
    group.add(slat)
  }
  return group
}

function createCeilingGuide() {
  const geometry = new THREE.BoxGeometry(m(490.8), 0.02, m(265.1))
  const material = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.14,
    side: THREE.DoubleSide,
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.name = 'transparent ceiling height guide'
  mesh.position.set(m(245.4), m(wallHeightIn), m(132.55))
  return mesh
}

function createNorthLightWindowStrip() {
  const group = new THREE.Group()
  group.name = 'approximate window bands'
  const windowMaterial = new THREE.MeshBasicMaterial({ color: '#93c5fd', transparent: true, opacity: 0.46 })
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

function materialFor(key: keyof typeof finishes) {
  const finish = finishes[key]
  const texture = finish.texture === 'wood' || finish.texture === 'tile' ? createTexture(finish) : undefined
  const material = new THREE.MeshStandardMaterial({
    color: texture ? '#ffffff' : finish.color,
    map: texture,
    roughness: 0.82,
    metalness: 0.02,
  })
  return material
}

function createTexture(finish: Finish) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not create material texture.')

  ctx.fillStyle = finish.color
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if (finish.texture === 'wood') {
    const plankColor = finish.plankColor ?? finish.color
    for (let y = 0; y < canvas.height; y += 42) {
      ctx.fillStyle = y % 84 === 0 ? plankColor : finish.color
      ctx.fillRect(0, y, canvas.width, 38)
      ctx.strokeStyle = 'rgba(20, 20, 20, 0.26)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    for (let x = 0; x < canvas.width; x += 126) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + 34, canvas.height)
      ctx.stroke()
    }
  }

  if (finish.texture === 'tile') {
    ctx.strokeStyle = 'rgba(70, 70, 70, 0.26)'
    ctx.lineWidth = 3
    for (let y = 0; y <= canvas.height; y += 128) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    for (let x = 0; x <= canvas.width; x += 128) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
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

function renderPanel() {
  panel.innerHTML = `
    <h1>Flatty draft model</h1>
    <p>This is a first-pass 3D reconstruction of the 5-room flat using the HDB PDF for topology, your laser measurements for usable interior space, and photos for wall/floor finishes.</p>
    <span class="badge">Draft: dimensions may have small measurement error</span>

    <h2>How to view</h2>
    <ul>
      <li>Drag to orbit.</li>
      <li>Scroll to zoom.</li>
      <li>Right-drag / two-finger drag to pan.</li>
    </ul>

    <h2>Measured values</h2>
    <table class="measurement-table">
      <thead><tr><th>Item</th><th>In</th><th>M</th></tr></thead>
      <tbody>
        ${measurements
          .map(([label, inches]) => `<tr><td>${label}</td><td>${inches}</td><td>${m(inches).toFixed(2)}</td></tr>`)
          .join('')}
      </tbody>
    </table>

    <h2>Material notes</h2>
    <ul>
      <li>Main living/dining: ${finishes.livingFloor.name}.</li>
      <li>Bedrooms: ${finishes.bedroomFloor.name}.</li>
      <li>Kitchen: ${finishes.kitchenFloor.name}, with ${finishes.darkKitchen.name} and ${finishes.countertop.name}.</li>
      <li>Walls: ${finishes.wall.name}, plus rust/taupe accent walls from photos.</li>
      <li>Existing loose furniture is intentionally omitted for now.</li>
    </ul>
  `
}

function resize() {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

function m(inches: number) {
  return inches * INCH_TO_METER
}
