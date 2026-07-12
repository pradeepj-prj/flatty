import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

export type FurnitureKind =
  | 'bed'
  | 'sofa'
  | 'barslovSofaBed'
  | 'jaetteboModule'
  | 'jaetteboChaise'
  | 'comfySebastianChaise'
  | 'comfyCatalinaRockingChair'
  | 'castleryLainaChaiseSofa'
  | 'castleryHuggCoffeeTable'
  | 'hannahRoundTable'
  | 'ceasarStudyDesk'
  | 'wilfredoStorageSet'
  | 'castlerySebDiningBench'
  | 'tymaLoungeChair'
  | 'arecaPalmPlant'
  | 'monsteraPlant'
  | 'jarnvagRug'
  | 'kivikChaiseSofa'
  | 'vimleChaiseSofa'
  | 'table'
  | 'chair'
  | 'beadTable'

export type FurnitureDefinition = {
  id: string
  name: string
  category: string
  kind: FurnitureKind
  widthIn: number
  depthIn: number
  heightIn: number
  cost: number
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
    cost: 0,
    colors: { primary: '#e5ddd2', secondary: '#8a6245', accent: '#b8c7d9' },
  },
  {
    id: 'three-seat-sofa',
    name: '3-seat Sofa',
    category: 'Sofas',
    kind: 'sofa',
    widthIn: 84,
    depthIn: 36,
    heightIn: 34,
    cost: 0,
    colors: { primary: '#718096', secondary: '#566273', accent: '#d7a86e' },
  },
  {
    // Reference: BÅRSLÖV 3-seat sofa-bed with chaise longue, 236 x 153 x 90 cm.
    id: 'barslov-sofa-bed-chaise',
    name: 'BÅRSLÖV Sofa-bed',
    category: 'Sofas',
    kind: 'barslovSofaBed',
    widthIn: 92.9,
    depthIn: 60.2,
    heightIn: 35.4,
    cost: 999,
    colors: { primary: '#91a9a6', secondary: '#708987', accent: '#d7dddd' },
  },
  {
    // Reference: JÄTTEBO 1.5-seat module with storage, 95 x 95 x 71 cm.
    id: 'jaettebo-storage-module',
    name: 'JÄTTEBO Sofa Module',
    category: 'Modular Seating',
    kind: 'jaetteboModule',
    widthIn: 37.4,
    depthIn: 37.4,
    heightIn: 28,
    cost: 600,
    colors: { primary: '#9a8f35', secondary: '#6e6f35', accent: '#c3b94d' },
  },
  {
    // Reference: JÄTTEBO chaise longue module with storage, 95 x 160 x 71 cm.
    id: 'jaettebo-chaise-module',
    name: 'JÄTTEBO Chaise Module',
    category: 'Modular Seating',
    kind: 'jaetteboChaise',
    widthIn: 37.4,
    depthIn: 63,
    heightIn: 28,
    cost: 1130,
    colors: { primary: '#9a8f35', secondary: '#6e6f35', accent: '#c3b94d' },
  },
  {
    // Reference: Comfy Sebastian 3.5 big seater with chaise-end, 272 x 170 x 101 cm, normal depth 102 cm.
    id: 'comfy-sebastian-3-5-chaise',
    name: 'Comfy Sebastian L-shaped Sofa',
    category: 'Sofas',
    kind: 'comfySebastianChaise',
    widthIn: 107.1,
    depthIn: 66.9,
    heightIn: 39.8,
    cost: 2949,
    colors: { primary: '#d6d8cf', secondary: '#bfc3bb', accent: '#eceee7' },
  },
  {
    // Reference: Comfy Catalina rocking chair, 115 x 93 x 94 cm.
    id: 'comfy-catalina-rocking-chair',
    name: 'Comfy Catalina Rocking Chair',
    category: 'Rocking Chairs',
    kind: 'comfyCatalinaRockingChair',
    widthIn: 45.3,
    depthIn: 36.6,
    heightIn: 37,
    cost: 569,
    colors: { primary: '#eee4d2', secondary: '#6f6d65', accent: '#b6773e' },
  },
  {
    // Reference: Castlery Lena Performance Fabric Chaise Sectional Sofa, 262 x 168 x 84 cm.
    id: 'castlery-lena-chaise-sectional',
    name: 'Castlery Lena Chaise Sofa',
    category: 'Sofas',
    kind: 'castleryLainaChaiseSofa',
    widthIn: 103.1,
    depthIn: 66.1,
    heightIn: 33.1,
    cost: 1848,
    colors: { primary: '#b8783f', secondary: '#8f552d', accent: '#c8925c' },
  },
  {
    // Reference: Castlery Hugg nesting rectangular coffee table, table 110 x 55 x 43.2 cm.
    id: 'castlery-hugg-nesting-coffee-table',
    name: 'Castlery Hugg Coffee Table',
    category: 'Tables',
    kind: 'castleryHuggCoffeeTable',
    widthIn: 43.3,
    depthIn: 21.7,
    heightIn: 17,
    cost: 799,
    colors: { primary: '#a56533', secondary: '#efe8dc', accent: '#75451f' },
  },
  {
    // Reference: 42 Hannah round side table, 45 cm diameter x 45 cm high.
    id: 'fortytwo-hannah-round-side-table',
    name: '42 Hannah Round Table',
    category: 'Tables',
    kind: 'hannahRoundTable',
    widthIn: 17.7,
    depthIn: 17.7,
    heightIn: 17.7,
    cost: 149,
    colors: { primary: '#d9bd8d', secondary: '#b7894b', accent: '#8d6235' },
  },
  {
    // Reference: Caesar work desk, 120 x 60 x 76 cm.
    id: 'ceasar-study-desk-120',
    name: 'Caesar Study Desk',
    category: 'Study Desks',
    kind: 'ceasarStudyDesk',
    widthIn: 47.2,
    depthIn: 23.6,
    heightIn: 29.9,
    cost: 429,
    colors: { primary: '#d8b87d', secondary: '#171717', accent: '#9b6a36' },
  },
  {
    // Reference: Wilfredo modular storage set of 5, 216 x 35 x 72 cm.
    id: 'fortytwo-wilfredo-set-of-5',
    name: 'Wilfredo Modular Storage Set',
    category: 'Storage',
    kind: 'wilfredoStorageSet',
    widthIn: 85,
    depthIn: 13.8,
    heightIn: 28.3,
    cost: 429,
    colors: { primary: '#d7b274', secondary: '#f2e8d6', accent: '#8a552b' },
  },
  {
    // Reference: Castlery Seb dining bench, 160 x 38 x 45 cm.
    id: 'castlery-seb-dining-bench-160',
    name: 'Castlery Seb Dining Bench',
    category: 'Benches',
    kind: 'castlerySebDiningBench',
    widthIn: 63,
    depthIn: 15,
    heightIn: 17.7,
    cost: 389,
    colors: { primary: '#9a6333', secondary: '#3d4142', accent: '#70431f' },
  },
  {
    // Reference: 42 Tyma lounge chair, 99 x 105 x 69 cm.
    id: 'fortytwo-tyma-lounge-chair',
    name: '42 Tyma Lounge Chair',
    category: 'Lounge Chairs',
    kind: 'tymaLoungeChair',
    widthIn: 39,
    depthIn: 41.3,
    heightIn: 27.2,
    cost: 459,
    colors: { primary: '#c9bcaa', secondary: '#9b8d7b', accent: '#eee7dc' },
  },
  {
    // Reference: CHRYSALIDOCARPUS LUTESCENS potted plant / areca palm, 24 cm pot, 100 cm high.
    id: 'chrysalidocarpus-areca-palm-24cm',
    name: 'CHRYSALIDOCARPUS Areca Palm',
    category: 'Plants',
    kind: 'arecaPalmPlant',
    widthIn: 34,
    depthIn: 34,
    heightIn: 39.4,
    cost: 19.9,
    colors: { primary: '#2f8a22', secondary: '#b96536', accent: '#6aa83a' },
  },
  {
    // Reference: MONSTERA DELICIOSA potted plant, Swiss cheese plant, 15 cm pot.
    id: 'monstera-deliciosa-24cm',
    name: 'MONSTERA DELICIOSA Plant',
    category: 'Plants',
    kind: 'monsteraPlant',
    widthIn: 18,
    depthIn: 16,
    heightIn: 18,
    cost: 8.9,
    colors: { primary: '#1f7a2c', secondary: '#b96536', accent: '#48a447' },
  },
  {
    // Reference: JÄRNVÄG low-pile rug, ornament pattern pink/beige, 160 x 230 cm.
    id: 'jaernvaeg-rug-pink-beige-160x230',
    name: 'JÄRNVÄG Rug',
    category: 'Rugs',
    kind: 'jarnvagRug',
    widthIn: 63,
    depthIn: 90.6,
    heightIn: 0.4,
    cost: 149,
    colors: { primary: '#d8c9b4', secondary: '#b97868', accent: '#8aa0a0' },
  },
  {
    // Reference: KIVIK 4-seat sofa with chaise longue, 318 x 163 x 83 cm.
    id: 'kivik-4-seat-chaise',
    name: 'KIVIK 4-seat Chaise Sofa',
    category: 'Sofas',
    kind: 'kivikChaiseSofa',
    widthIn: 125.2,
    depthIn: 64.2,
    heightIn: 32.7,
    cost: 1229,
    colors: { primary: '#7a7d7a', secondary: '#595d5a', accent: '#a4a6a1' },
  },
  {
    // Reference: VIMLE 3-seat sofa with chaise longue, 252 x 164 x 83 cm.
    id: 'vimle-3-seat-chaise',
    name: 'VIMLE 3-seat Chaise Sofa',
    category: 'Sofas',
    kind: 'vimleChaiseSofa',
    widthIn: 99.2,
    depthIn: 64.6,
    heightIn: 32.7,
    cost: 919,
    colors: { primary: '#8e928e', secondary: '#6f756f', accent: '#bec2bc' },
  },
  {
    id: 'dining-table-140',
    name: 'Dining Table',
    category: 'Tables',
    kind: 'table',
    widthIn: 55.1,
    depthIn: 31.5,
    heightIn: 29.5,
    cost: 0,
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
    cost: 0,
    colors: { primary: '#f2ede4', secondary: '#d08a54' },
  },
  {
    id: 'dining-chair',
    name: 'Dining Chair',
    category: 'Chairs',
    kind: 'chair',
    widthIn: 18,
    depthIn: 20,
    heightIn: 34,
    cost: 0,
    colors: { primary: '#9a6845', secondary: '#d8c5ad' },
  },
]

export function createFurnitureModel(definition: FurnitureDefinition, m: InchesToMeters) {
  const group = new THREE.Group()
  group.name = definition.name

  if (definition.kind === 'bed') buildBed(group, definition, m)
  if (definition.kind === 'sofa') buildSofa(group, definition, m)
  if (definition.kind === 'barslovSofaBed') buildBarslovSofaBed(group, definition, m)
  if (definition.kind === 'jaetteboModule') buildJaetteboModule(group, definition, m)
  if (definition.kind === 'jaetteboChaise') buildJaetteboChaise(group, definition, m)
  if (definition.kind === 'comfySebastianChaise') buildComfySebastianChaise(group, definition, m)
  if (definition.kind === 'comfyCatalinaRockingChair') buildComfyCatalinaRockingChair(group, definition, m)
  if (definition.kind === 'castleryLainaChaiseSofa') buildCastleryLainaChaiseSofa(group, definition, m)
  if (definition.kind === 'castleryHuggCoffeeTable') buildCastleryHuggCoffeeTable(group, definition, m)
  if (definition.kind === 'hannahRoundTable') buildHannahRoundTable(group, definition, m)
  if (definition.kind === 'ceasarStudyDesk') buildCeasarStudyDesk(group, definition, m)
  if (definition.kind === 'wilfredoStorageSet') buildWilfredoStorageSet(group, definition, m)
  if (definition.kind === 'castlerySebDiningBench') buildCastlerySebDiningBench(group, definition, m)
  if (definition.kind === 'tymaLoungeChair') buildTymaLoungeChair(group, definition, m)
  if (definition.kind === 'arecaPalmPlant') buildArecaPalmPlant(group, definition, m)
  if (definition.kind === 'monsteraPlant') buildMonsteraPlant(group, definition, m)
  if (definition.kind === 'jarnvagRug') buildJarnvagRug(group, definition, m)
  if (definition.kind === 'kivikChaiseSofa') buildKivikChaiseSofa(group, definition, m)
  if (definition.kind === 'vimleChaiseSofa') buildVimleChaiseSofa(group, definition, m)
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

function buildBarslovSofaBed(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const mainDepthIn = 39
  const mainCenterZIn = -item.depthIn / 2 + mainDepthIn / 2
  const chaiseWidthIn = 30
  const chaiseXIn = item.widthIn / 2 - 5.5 - chaiseWidthIn / 2
  const seatTopYIn = 18
  const baseColor = item.colors.secondary ?? item.colors.primary

  addRoundedBox(group, item.widthIn, 9, mainDepthIn, 0, 8, mainCenterZIn, baseColor, 3, m)
  addRoundedBox(group, chaiseWidthIn + 2, 9, item.depthIn - 3, chaiseXIn, 8, 0.5, baseColor, 3, m)

  addRoundedBox(group, 5.5, 24, mainDepthIn, -item.widthIn / 2 + 2.75, 17, mainCenterZIn, item.colors.primary, 3, m)
  addRoundedBox(group, 5.5, 24, item.depthIn, item.widthIn / 2 - 2.75, 17, 0, item.colors.primary, 3, m)
  addRoundedBox(group, item.widthIn, 20, 6, 0, 24, -item.depthIn / 2 + 3, item.colors.primary, 3, m, -0.05)

  const seatGapIn = 1
  const regularSeatCount = 2
  const regularWidthIn = item.widthIn - chaiseWidthIn - 11 - seatGapIn * regularSeatCount
  const regularCushionWidthIn = regularWidthIn / regularSeatCount
  for (let index = 0; index < regularSeatCount; index += 1) {
    const xIn = -item.widthIn / 2 + 5.5 + regularCushionWidthIn / 2 + index * (regularCushionWidthIn + seatGapIn)
    addRoundedBox(group, regularCushionWidthIn, 6, 24, xIn, seatTopYIn, -3, item.colors.primary, 3, m)
    addRoundedBox(group, regularCushionWidthIn, 15, 6, xIn, 27, -item.depthIn / 2 + 8, item.colors.accent ?? item.colors.primary, 3, m, -0.1)
  }

  addRoundedBox(group, chaiseWidthIn, 6, item.depthIn - 13, chaiseXIn, seatTopYIn, 5.5, item.colors.primary, 3, m)
  addRoundedBox(group, chaiseWidthIn, 15, 6, chaiseXIn, 27, -item.depthIn / 2 + 8, item.colors.accent ?? item.colors.primary, 3, m, -0.1)
  addBox(group, 0.7, 0.25, item.depthIn - 18, chaiseXIn - chaiseWidthIn / 2 + 2, seatTopYIn + 3.1, 5, baseColor, m)
  addBox(group, chaiseWidthIn - 4, 0.25, 0.7, chaiseXIn, seatTopYIn + 3.15, item.depthIn / 2 - 8, baseColor, m)

  addChaiseSofaLegs(group, item, mainDepthIn, chaiseXIn, chaiseWidthIn, 3.5, '#2f3434', m)
}

function buildJaetteboModule(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const baseColor = item.colors.secondary ?? item.colors.primary
  const cushionColor = item.colors.accent ?? item.colors.primary

  addRoundedBox(group, item.widthIn - 1, 12, item.depthIn - 2, 0, 8.5, 1, baseColor, 4, m)
  addRoundedBox(group, item.widthIn - 4, 6, item.depthIn - 10, 0, 18, 3.5, item.colors.primary, 4, m)
  addRoundedBox(group, item.widthIn - 4, 16, 7, 0, 22, -item.depthIn / 2 + 5, item.colors.primary, 4, m, -0.08)

  addBox(group, item.widthIn - 8, 0.25, 0.7, 0, 21.2, 0, cushionColor, m)
  addBox(group, 0.7, 0.25, item.depthIn - 15, -item.widthIn / 2 + 6, 21.25, 4, cushionColor, m)
  addBox(group, 0.7, 0.25, item.depthIn - 15, item.widthIn / 2 - 6, 21.25, 4, cushionColor, m)

  addSofaLegs(group, item.widthIn - 7, item.depthIn - 7, 2.5, '#282c25', m)
}

function buildJaetteboChaise(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const baseColor = item.colors.secondary ?? item.colors.primary
  const cushionColor = item.colors.accent ?? item.colors.primary

  addRoundedBox(group, item.widthIn - 1, 12, item.depthIn - 2, 0, 8.5, 1, baseColor, 4, m)
  addRoundedBox(group, item.widthIn - 4, 6, item.depthIn - 10, 0, 18, 4, item.colors.primary, 4, m)
  addRoundedBox(group, item.widthIn - 4, 16, 7, 0, 22, -item.depthIn / 2 + 5, item.colors.primary, 4, m, -0.08)

  addBox(group, item.widthIn - 8, 0.25, 0.7, 0, 21.25, 3, cushionColor, m)
  addBox(group, item.widthIn - 8, 0.25, 0.7, 0, 21.3, item.depthIn / 2 - 8, cushionColor, m)
  addBox(group, 0.7, 0.25, item.depthIn - 15, -item.widthIn / 2 + 6, 21.35, 4, cushionColor, m)
  addBox(group, 0.7, 0.25, item.depthIn - 15, item.widthIn / 2 - 6, 21.35, 4, cushionColor, m)
  addRoundedBox(group, 5, 20, item.depthIn - 5, item.widthIn / 2 - 2.5, 16, 1, item.colors.primary, 3, m)

  addSofaLegs(group, item.widthIn - 7, item.depthIn - 7, 2.5, '#282c25', m)
}

function buildComfySebastianChaise(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const armWidthIn = 6
  const normalDepthIn = 40.2
  const normalCenterZIn = -item.depthIn / 2 + normalDepthIn / 2
  const chaiseWidthIn = 38.6
  const chaiseXIn = item.widthIn / 2 - armWidthIn - chaiseWidthIn / 2
  const seatTopYIn = 18
  const baseColor = item.colors.secondary ?? item.colors.primary

  addRoundedBox(group, item.widthIn, 8, normalDepthIn, 0, 8, normalCenterZIn, baseColor, 2.2, m)
  addRoundedBox(group, chaiseWidthIn + 1, 8, item.depthIn - 2, chaiseXIn, 8, 0, baseColor, 2.2, m)
  addRoundedBox(group, armWidthIn, 23, normalDepthIn, -item.widthIn / 2 + armWidthIn / 2, 15.5, normalCenterZIn, item.colors.primary, 2.8, m)
  addRoundedBox(group, armWidthIn, 23, item.depthIn - 2, item.widthIn / 2 - armWidthIn / 2, 15.5, 0, item.colors.primary, 2.8, m)
  addRoundedBox(group, item.widthIn, 18, 6, 0, 24, -item.depthIn / 2 + 3, item.colors.primary, 2.5, m, -0.05)

  const regularSeatCount = 3
  const regularSeatWidthIn = (item.widthIn - armWidthIn * 2 - chaiseWidthIn - 3) / regularSeatCount
  for (let index = 0; index < regularSeatCount; index += 1) {
    const xIn = -item.widthIn / 2 + armWidthIn + regularSeatWidthIn / 2 + index * (regularSeatWidthIn + 1)
    const isRecliner = index === 0
    addRoundedBox(group, regularSeatWidthIn, 6, 24, xIn, seatTopYIn, -4, item.colors.primary, 2.4, m)
    addRoundedBox(group, regularSeatWidthIn, isRecliner ? 21 : 17, 5.5, xIn, isRecliner ? 30 : 27, -item.depthIn / 2 + 8, item.colors.primary, 2.4, m, -0.18)
    addRoundedBox(group, regularSeatWidthIn - 1.5, 4, 4, xIn, item.heightIn - 4, -item.depthIn / 2 + 5, item.colors.accent ?? item.colors.primary, 2, m, -0.08)
    if (isRecliner) addBox(group, 1.2, 3, 3, -item.widthIn / 2 + armWidthIn + 1, 18, -1, '#31353a', m)
  }

  addRoundedBox(group, chaiseWidthIn, 6, item.depthIn - 12, chaiseXIn, seatTopYIn, 4.5, item.colors.primary, 2.4, m)
  addRoundedBox(group, chaiseWidthIn, 17, 5.5, chaiseXIn, 27, -item.depthIn / 2 + 8, item.colors.primary, 2.4, m, -0.12)
  addRoundedBox(group, chaiseWidthIn - 1.5, 4, 4, chaiseXIn, item.heightIn - 4, -item.depthIn / 2 + 5, item.colors.accent ?? item.colors.primary, 2, m, -0.08)
  addBox(group, chaiseWidthIn - 6, 0.25, 0.7, chaiseXIn, seatTopYIn + 3.1, item.depthIn / 2 - 8, baseColor, m)

  addChaiseSofaLegs(group, item, normalDepthIn, chaiseXIn, chaiseWidthIn, 5, '#3a3530', m)
}

function buildComfyCatalinaRockingChair(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const cushionColor = item.colors.primary
  const shellColor = item.colors.secondary ?? item.colors.primary
  const runnerColor = item.colors.accent ?? '#b6773e'
  const frameColor = '#202124'

  addRoundedBox(group, item.widthIn - 9, 6, item.depthIn - 11, 0, 15, 3, shellColor, 6, m, -0.2)
  addRoundedBox(group, item.widthIn - 13, 5, item.depthIn - 16, 0, 19, 2, cushionColor, 5, m, -0.16)
  addRoundedBox(group, item.widthIn - 12, 20, 5.5, 0, 28, -item.depthIn / 2 + 7, cushionColor, 4, m, -0.32)
  addRoundedBox(group, 8, 9, 16, -item.widthIn / 2 + 8, 21, -1, cushionColor, 3, m, 0.15)
  addRoundedBox(group, 8, 9, 16, item.widthIn / 2 - 8, 21, -1, cushionColor, 3, m, 0.15)

  for (const xIn of [-item.widthIn / 2 + 6, item.widthIn / 2 - 6]) {
    addRoundedBox(group, 2.4, 2.2, item.depthIn - 2, xIn, 1.2, 0, runnerColor, 1.3, m)
    addCylinderBetween(group, [xIn, 2.4, -item.depthIn / 2 + 5], [xIn * 0.45, 14, -5], 0.45, frameColor, m)
    addCylinderBetween(group, [xIn, 2.4, item.depthIn / 2 - 5], [xIn * 0.45, 14, 8], 0.45, frameColor, m)
    addCylinderBetween(group, [xIn * 0.45, 14, -5], [xIn * 0.45, 14, 8], 0.35, frameColor, m)
  }
  addCylinderBetween(group, [-item.widthIn / 2 + 8, 5, -item.depthIn / 2 + 5], [item.widthIn / 2 - 8, 5, -item.depthIn / 2 + 5], 0.35, frameColor, m)
  addCylinderBetween(group, [-item.widthIn / 2 + 8, 5, item.depthIn / 2 - 5], [item.widthIn / 2 - 8, 5, item.depthIn / 2 - 5], 0.35, frameColor, m)
}

function buildCastleryLainaChaiseSofa(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const armWidthIn = 6.5
  const normalDepthIn = 37.4
  const normalCenterZIn = -item.depthIn / 2 + normalDepthIn / 2
  const chaiseWidthIn = 36.2
  const chaiseXIn = item.widthIn / 2 - armWidthIn - chaiseWidthIn / 2
  const seatTopYIn = 17.7
  const baseColor = item.colors.secondary ?? item.colors.primary

  addRoundedBox(group, item.widthIn, 8, normalDepthIn, 0, 8, normalCenterZIn, baseColor, 4, m)
  addRoundedBox(group, chaiseWidthIn + 1.5, 8, item.depthIn - 3, chaiseXIn, 8, 0, baseColor, 4, m)
  addRoundedBox(group, armWidthIn, 19, normalDepthIn, -item.widthIn / 2 + armWidthIn / 2, 15.5, normalCenterZIn, item.colors.primary, 4, m)
  addRoundedBox(group, armWidthIn, 19, item.depthIn - 3, item.widthIn / 2 - armWidthIn / 2, 15.5, 0, item.colors.primary, 4, m)
  addRoundedBox(group, item.widthIn, 16, 6, 0, 24, -item.depthIn / 2 + 3, item.colors.primary, 3.5, m, -0.04)

  const regularSeatCount = 2
  const regularSeatWidthIn = (item.widthIn - armWidthIn * 2 - chaiseWidthIn - 2) / regularSeatCount
  for (let index = 0; index < regularSeatCount; index += 1) {
    const xIn = -item.widthIn / 2 + armWidthIn + regularSeatWidthIn / 2 + index * (regularSeatWidthIn + 1)
    addRoundedBox(group, regularSeatWidthIn, 6, 24, xIn, seatTopYIn, -4, item.colors.primary, 4, m)
    addRoundedBox(group, regularSeatWidthIn, 14, 5.5, xIn, 26, -item.depthIn / 2 + 8, item.colors.primary, 3.5, m, -0.08)
  }

  addRoundedBox(group, chaiseWidthIn, 6, item.depthIn - 12, chaiseXIn, seatTopYIn, 4.5, item.colors.primary, 4, m)
  addRoundedBox(group, chaiseWidthIn, 14, 5.5, chaiseXIn, 26, -item.depthIn / 2 + 8, item.colors.primary, 3.5, m, -0.08)
  addRoundedBox(group, 12, 12, 4, -item.widthIn / 2 + 14, 25, -item.depthIn / 2 + 10, item.colors.accent ?? item.colors.primary, 2.5, m, -0.32)
  addRoundedBox(group, 12, 12, 4, item.widthIn / 2 - 14, 25, -item.depthIn / 2 + 10, item.colors.accent ?? item.colors.primary, 2.5, m, -0.32)

  addChaiseSofaLegs(group, item, normalDepthIn, chaiseXIn, chaiseWidthIn, 5.5, '#9c8f6a', m)
}

function buildCastleryHuggCoffeeTable(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const woodColor = item.colors.primary
  const cushionColor = item.colors.secondary ?? '#efe8dc'
  const darkWood = item.colors.accent ?? woodColor
  const topThicknessIn = 1.4
  const ottomanWidthIn = 21.9
  const ottomanDepthIn = 21.1
  const ottomanHeightIn = 15.4
  const ottomanOffsetXIn = item.widthIn / 2 - ottomanWidthIn / 2 - 1

  addStadiumTop(group, item.widthIn, item.depthIn, topThicknessIn, 0, item.heightIn - topThicknessIn / 2, 0, woodColor, m)
  addRoundedBox(group, 3, item.heightIn - topThicknessIn, 3, 0, (item.heightIn - topThicknessIn) / 2, 0, darkWood, 1, m)
  addBox(group, 2.8, item.heightIn - topThicknessIn - 2, item.depthIn - 4, -6, (item.heightIn - topThicknessIn - 2) / 2, 0, darkWood, m)
  addBox(group, 2.8, item.heightIn - topThicknessIn - 2, item.depthIn - 4, 6, (item.heightIn - topThicknessIn - 2) / 2, 0, darkWood, m)

  for (const xIn of [-ottomanOffsetXIn, ottomanOffsetXIn]) {
    addRoundedBox(group, ottomanWidthIn, ottomanHeightIn, ottomanDepthIn - 1, xIn, ottomanHeightIn / 2, 0, cushionColor, 4, m)
    addBox(group, ottomanWidthIn - 5, 0.35, 1.1, xIn, ottomanHeightIn + 0.25, item.depthIn / 2 - 4, '#c8bfb1', m)
  }
}

function buildArecaPalmPlant(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const potColor = item.colors.secondary ?? '#b96536'
  const leafColor = item.colors.primary
  const lightLeafColor = item.colors.accent ?? leafColor
  const stemColor = '#5f8f24'
  const potHeightIn = 7.3
  const potRadiusIn = 4.7
  const soilYIn = potHeightIn + 0.08

  addConeFrustum(group, potRadiusIn, potRadiusIn * 0.82, potHeightIn, 0, potHeightIn / 2, 0, potColor, m)
  addCylinder(group, potRadiusIn * 0.88, 0.35, 0, soilYIn, 0, '#3b2417', m)

  const stemCount = 11
  for (let index = 0; index < stemCount; index += 1) {
    const angle = (index / stemCount) * Math.PI * 2
    const baseRadiusIn = 1.4 + (index % 3) * 0.45
    const topRadiusIn = 3.5 + (index % 4) * 0.65
    const topYIn = 20 + (index % 5) * 3.1
    const topXIn = Math.cos(angle) * topRadiusIn
    const topZIn = Math.sin(angle) * topRadiusIn
    addCylinderBetween(
      group,
      [Math.cos(angle) * baseRadiusIn, potHeightIn, Math.sin(angle) * baseRadiusIn],
      [topXIn, topYIn, topZIn],
      0.16,
      stemColor,
      m,
    )

    for (let frond = -1; frond <= 1; frond += 1) {
      const frondAngle = angle + frond * 0.42
      const frondLengthIn = 11 + ((index + frond + 3) % 4) * 1.7
      const endXIn = topXIn + Math.cos(frondAngle) * frondLengthIn
      const endYIn = topYIn + 2.8 - Math.abs(frond) * 1.1
      const endZIn = topZIn + Math.sin(frondAngle) * frondLengthIn
      addCylinderBetween(group, [topXIn, topYIn, topZIn], [endXIn, endYIn, endZIn], 0.09, stemColor, m)
      for (let leaf = 1; leaf <= 4; leaf += 1) {
        const t = leaf / 5
        const leafXIn = topXIn + (endXIn - topXIn) * t
        const leafYIn = topYIn + (endYIn - topYIn) * t
        const leafZIn = topZIn + (endZIn - topZIn) * t
        addLeaf(
          group,
          1.2,
          5.4,
          leafXIn,
          leafYIn,
          leafZIn,
          leaf % 2 === 0 ? lightLeafColor : leafColor,
          m,
          [0.55, frondAngle, frondAngle + Math.PI / 2],
        )
      }
    }
  }
}

function buildMonsteraPlant(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const potColor = item.colors.secondary ?? '#b96536'
  const leafColor = item.colors.primary
  const lightLeafColor = item.colors.accent ?? leafColor
  const stemColor = '#427a2a'
  const potHeightIn = 6.2
  const potRadiusIn = 4.7

  addConeFrustum(group, potRadiusIn, potRadiusIn * 0.82, potHeightIn, 0, potHeightIn / 2, 0, potColor, m)
  addCylinder(group, potRadiusIn * 0.9, 0.35, 0, potHeightIn + 0.08, 0, '#3b2417', m)

  const leaves = [
    [-5.5, 15.5, -1.8, 8.2, 10.4, -0.1, -0.55, 0.52],
    [5.8, 16.2, 0.4, 8.8, 11.4, 0.12, 0.58, -0.5],
    [-2.2, 20.2, 1.4, 7.4, 9.6, -0.05, -0.18, 0.15],
    [3.3, 19, -3.6, 7.8, 9.8, 0.18, 0.25, -0.24],
    [0.2, 13.5, 5.3, 7.4, 8.8, -0.2, 0.08, 0.08],
    [-7.3, 12.6, 3.5, 6.2, 7.6, 0.05, -0.72, 0.65],
    [7.1, 12.8, 3.2, 6.2, 7.6, -0.08, 0.74, -0.62],
  ] as const

  leaves.forEach(([xIn, yIn, zIn, widthIn, heightIn, rotationX, rotationY, rotationZ], index) => {
    addCylinderBetween(group, [0, potHeightIn, 0], [xIn * 0.72, yIn - heightIn * 0.28, zIn * 0.72], 0.13, stemColor, m)
    addLeaf(
      group,
      widthIn,
      heightIn,
      xIn,
      yIn,
      zIn,
      index % 2 === 0 ? leafColor : lightLeafColor,
      m,
      [rotationX, rotationY, rotationZ],
    )
  })
}

function buildCeasarStudyDesk(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const woodColor = item.colors.primary
  const metalColor = item.colors.secondary ?? '#171717'
  const grainColor = item.colors.accent ?? '#9b6a36'
  const desktopHeightIn = 5.2
  const desktopYIn = item.heightIn - desktopHeightIn / 2
  const frameTopYIn = item.heightIn - desktopHeightIn - 1.1
  const legRadiusIn = 0.42
  const legXIn = item.widthIn / 2 - 2.6
  const legZIn = item.depthIn / 2 - 2.3
  const drawerFrontZIn = item.depthIn / 2 + 0.18

  addRoundedBox(group, item.widthIn, desktopHeightIn, item.depthIn, 0, desktopYIn, 0, woodColor, 2.2, m)
  addRoundedBox(group, item.widthIn - 2.2, 1.1, item.depthIn + 0.6, 0, item.heightIn - 0.55, 0, '#e5c994', 2, m)
  addBox(group, item.widthIn - 2.8, 0.65, item.depthIn + 0.8, 0, item.heightIn - desktopHeightIn - 0.4, 0, grainColor, m)

  const slatCount = 24
  const slatSpanIn = item.widthIn - 4.4
  for (let index = 0; index < slatCount; index += 1) {
    const xIn = -slatSpanIn / 2 + (index / (slatCount - 1)) * slatSpanIn
    addRoundedBox(group, 0.28, desktopHeightIn - 1.2, 0.45, xIn, desktopYIn - 0.1, drawerFrontZIn, grainColor, 0.12, m)
  }

  for (const xIn of [-1.6, 1.6]) {
    addRoundedBox(group, 0.55, 2.6, 0.65, xIn, desktopYIn - 0.2, drawerFrontZIn + 0.28, metalColor, 0.2, m)
  }

  for (const xIn of [-legXIn, legXIn]) {
    for (const zIn of [-legZIn, legZIn]) {
      addCylinder(group, legRadiusIn, frameTopYIn, xIn, frameTopYIn / 2, zIn, metalColor, m)
    }
  }

  addCylinderBetween(group, [-legXIn, frameTopYIn, legZIn], [legXIn, frameTopYIn, legZIn], 0.26, metalColor, m)
  addCylinderBetween(group, [-legXIn, frameTopYIn, -legZIn], [legXIn, frameTopYIn, -legZIn], 0.26, metalColor, m)
  addCylinderBetween(group, [-legXIn, 8.5, legZIn], [legXIn, 8.5, legZIn], 0.22, metalColor, m)
  addCylinderBetween(group, [-legXIn, 8.5, -legZIn], [legXIn, 8.5, -legZIn], 0.22, metalColor, m)
  addCylinderBetween(group, [-legXIn, 8.5, -legZIn], [-legXIn, 8.5, legZIn], 0.22, metalColor, m)
  addCylinderBetween(group, [legXIn, 8.5, -legZIn], [legXIn, 8.5, legZIn], 0.22, metalColor, m)

  for (let index = -4; index <= 4; index += 1) {
    addBox(group, item.widthIn - 6, 0.05, 0.07, 0, item.heightIn + 0.04, index * 2.2, grainColor, m)
  }
}

function buildWilfredoStorageSet(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const woodColor = item.colors.primary
  const panelColor = item.colors.secondary ?? '#f2e8d6'
  const grainColor = item.colors.accent ?? '#8a552b'
  const frontZIn = item.depthIn / 2 + 0.08
  const moduleWidthIn = item.widthIn / 3
  const lowerHeightIn = item.heightIn * 0.43
  const upperHeightIn = item.heightIn - lowerHeightIn
  const lowerYIn = lowerHeightIn / 2
  const upperYIn = lowerHeightIn + upperHeightIn / 2

  addBox(group, item.widthIn, item.heightIn, item.depthIn, 0, item.heightIn / 2, 0, woodColor, m)
  addBox(group, item.widthIn - 1.2, item.heightIn - 1.2, item.depthIn + 0.3, 0, item.heightIn / 2, 0, '#c79759', m)
  addBox(group, item.widthIn - 2, item.heightIn - 2, item.depthIn + 0.6, 0, item.heightIn / 2, 0, woodColor, m)

  for (const xIn of [-moduleWidthIn / 2, moduleWidthIn / 2]) {
    addBox(group, 0.55, item.heightIn - 1.2, item.depthIn + 0.9, xIn, item.heightIn / 2, 0, grainColor, m)
  }
  addBox(group, item.widthIn - 1.2, 0.55, item.depthIn + 0.9, 0, lowerHeightIn, 0, grainColor, m)

  for (const xIn of [-moduleWidthIn, 0, moduleWidthIn]) {
    addBox(group, moduleWidthIn - 1.3, lowerHeightIn - 2.4, 0.5, xIn, lowerYIn, frontZIn, woodColor, m)
    addBox(group, moduleWidthIn - 2.4, 0.35, 0.7, xIn, lowerYIn + 2.2, frontZIn + 0.15, grainColor, m)
    addBox(group, moduleWidthIn - 2.4, 0.35, 0.7, xIn, lowerYIn - 2.2, frontZIn + 0.15, grainColor, m)
  }

  addBox(group, moduleWidthIn - 2.4, upperHeightIn - 3, 0.7, -moduleWidthIn, upperYIn, frontZIn + 0.1, panelColor, m)
  addDisk(group, 4.1, 0.4, -moduleWidthIn - 6, upperYIn, frontZIn + 0.4, '#3c2417', m)
  addBox(group, moduleWidthIn - 3, upperHeightIn - 3, 0.7, moduleWidthIn, upperYIn, frontZIn + 0.1, panelColor, m)
  addDisk(group, 1.25, 0.35, moduleWidthIn + 8, upperYIn, frontZIn + 0.42, '#171717', m)

  for (const xIn of [0, moduleWidthIn]) {
    addBox(group, 0.45, upperHeightIn - 3, item.depthIn + 0.8, xIn - moduleWidthIn / 2, upperYIn, 0, grainColor, m)
    addBox(group, moduleWidthIn - 2, 0.38, item.depthIn + 0.8, xIn, upperYIn - 2.8, 0, grainColor, m)
    addBox(group, moduleWidthIn - 2, 0.38, item.depthIn + 0.8, xIn, upperYIn + 3.5, 0, grainColor, m)
  }

  addBox(group, 4, 5.2, 0.7, -2, upperYIn - 0.4, frontZIn + 0.2, '#efe5d4', m)
  addBox(group, 2.2, 8, 0.7, 4, upperYIn - 0.1, frontZIn + 0.2, '#315e99', m)
  addBox(group, 2.2, 8, 0.7, 7, upperYIn - 0.1, frontZIn + 0.2, '#d7b94c', m)

  for (let index = -8; index <= 8; index += 1) {
    addBox(group, item.widthIn - 3, 0.035, 0.08, 0, item.heightIn + 0.03, index * 0.7, grainColor, m)
  }
}

function buildCastlerySebDiningBench(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const woodColor = item.colors.primary
  const cushionColor = item.colors.secondary ?? '#3d4142'
  const grainColor = item.colors.accent ?? '#70431f'
  const seatHeightIn = item.heightIn
  const cushionThicknessIn = 2
  const frameThicknessIn = 2.1
  const legHeightIn = seatHeightIn - cushionThicknessIn - frameThicknessIn
  const legXIn = item.widthIn / 2 - 4.5
  const legZIn = item.depthIn / 2 - 2.6

  addRoundedBox(group, item.widthIn, frameThicknessIn, item.depthIn, 0, legHeightIn + frameThicknessIn / 2, 0, woodColor, 1.8, m)
  addRoundedBox(group, item.widthIn - 3.4, cushionThicknessIn, item.depthIn - 2, 0, seatHeightIn - cushionThicknessIn / 2, 0, cushionColor, 1.9, m)
  addBox(group, item.widthIn - 4, 0.16, 0.08, 0, seatHeightIn + 0.08, 0, '#6b7172', m)

  for (const xIn of [-legXIn, legXIn]) {
    for (const zIn of [-legZIn, legZIn]) {
      addCylinderBetween(group, [xIn, 0.7, zIn], [xIn * 0.92, legHeightIn, zIn * 0.82], 0.72, woodColor, m)
    }
  }

  addCylinderBetween(group, [-legXIn, legHeightIn * 0.45, -legZIn], [legXIn, legHeightIn * 0.45, -legZIn], 0.22, grainColor, m)
  addCylinderBetween(group, [-legXIn, legHeightIn * 0.45, legZIn], [legXIn, legHeightIn * 0.45, legZIn], 0.22, grainColor, m)
  for (let index = -5; index <= 5; index += 1) {
    addBox(group, item.widthIn - 6, 0.04, 0.06, 0, legHeightIn + frameThicknessIn + 0.04, index * 1.1, grainColor, m)
  }
}

function buildTymaLoungeChair(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const cushionColor = item.colors.primary
  const seamColor = item.colors.secondary ?? '#9b8d7b'
  const highlightColor = item.colors.accent ?? cushionColor
  const seatHeightIn = 13
  const seatDepthIn = 25.6
  const backHeightIn = 18
  const backThicknessIn = 6
  const seatCenterZIn = item.depthIn / 2 - seatDepthIn / 2 - 1
  const backCenterZIn = -item.depthIn / 2 + 7

  addRoundedBox(group, item.widthIn, 9.5, seatDepthIn, 0, seatHeightIn / 2, seatCenterZIn, cushionColor, 4.5, m, -0.05)
  addRoundedBox(group, item.widthIn - 1, backHeightIn, backThicknessIn, 0, seatHeightIn + 4.5, backCenterZIn, cushionColor, 3.5, m, -0.42)
  addRoundedBox(group, item.widthIn - 2, 7, 9, 0, 4, -item.depthIn / 2 + 11, cushionColor, 3.5, m, -0.18)
  addRoundedBox(group, item.widthIn - 3, 5, 6, 0, 4, item.depthIn / 2 - 3.8, cushionColor, 3, m, 0.12)

  for (const xIn of [-item.widthIn / 2 + 6, item.widthIn / 2 - 6]) {
    addRoundedBox(group, 4, 8, seatDepthIn - 2, xIn, 7, seatCenterZIn, cushionColor, 3, m, -0.05)
  }

  for (const zIn of [-2, 4.5, 11]) {
    addCylinderBetween(group, [-item.widthIn / 2 + 4, seatHeightIn + 0.2, zIn], [item.widthIn / 2 - 4, seatHeightIn + 0.2, zIn], 0.16, seamColor, m)
  }
  for (const yIn of [seatHeightIn + 6, seatHeightIn + 11.5]) {
    addCylinderBetween(group, [-item.widthIn / 2 + 4, yIn, backCenterZIn + 2], [item.widthIn / 2 - 4, yIn, backCenterZIn + 2], 0.16, seamColor, m)
  }
  addCylinderBetween(group, [0, seatHeightIn + 2, backCenterZIn + 3], [0, item.heightIn - 2, backCenterZIn - 1], 0.13, seamColor, m)

  for (const xIn of [-item.widthIn / 4, item.widthIn / 4]) {
    addSphere(group, 1, xIn, seatHeightIn + 9.5, backCenterZIn + 2.4, seamColor, m)
    addSphere(group, 0.85, xIn, seatHeightIn + 0.8, 4.5, seamColor, m)
    addRoundedBox(group, 5, 1.1, 2.2, xIn, item.heightIn - 2.5, backCenterZIn - 1.8, highlightColor, 1, m, -0.45)
  }
}

function buildHannahRoundTable(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const topRadiusIn = item.widthIn / 2
  const topThicknessIn = 1.2
  const topYIn = item.heightIn - topThicknessIn / 2
  const pedestalHeightIn = item.heightIn - topThicknessIn
  const pedestalTopRadiusIn = 2.7
  const pedestalBottomRadiusIn = 4.3
  const grainColor = item.colors.accent ?? '#8d6235'

  addCylinder(group, topRadiusIn, topThicknessIn, 0, topYIn, 0, item.colors.primary, m)
  addCylinder(group, topRadiusIn * 0.9, 0.55, 0, topYIn - topThicknessIn / 2 - 0.25, 0, item.colors.secondary ?? item.colors.primary, m)
  addConeFrustum(
    group,
    pedestalTopRadiusIn,
    pedestalBottomRadiusIn,
    pedestalHeightIn,
    0,
    pedestalHeightIn / 2,
    0,
    item.colors.primary,
    m,
  )

  for (let index = -3; index <= 3; index += 1) {
    addBox(group, topRadiusIn * 1.45, 0.04, 0.08, 0, item.heightIn + 0.02, index * 1.4, grainColor, m)
  }

  const grainLineCount = 14
  for (let index = 0; index < grainLineCount; index += 1) {
    const angle = (index / grainLineCount) * Math.PI * 2
    const xIn = Math.cos(angle) * (pedestalBottomRadiusIn + 0.04)
    const zIn = Math.sin(angle) * (pedestalBottomRadiusIn + 0.04)
    addCylinderBetween(group, [xIn, 1, zIn], [xIn * 0.66, pedestalHeightIn - 1, zIn * 0.66], 0.035, grainColor, m)
  }
}

function buildJarnvagRug(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const topYIn = item.heightIn + 0.035
  const patternHeightIn = 0.06
  const baseColor = item.colors.primary
  const roseColor = item.colors.secondary ?? '#b97868'
  const blueColor = item.colors.accent ?? '#8aa0a0'
  const fadedCream = '#eadfcf'

  addRoundedBox(group, item.widthIn, item.heightIn, item.depthIn, 0, item.heightIn / 2, 0, baseColor, 0.8, m)
  addBox(group, item.widthIn - 3, patternHeightIn, 2.2, 0, topYIn, -item.depthIn / 2 + 3, roseColor, m)
  addBox(group, item.widthIn - 3, patternHeightIn, 2.2, 0, topYIn, item.depthIn / 2 - 3, roseColor, m)
  addBox(group, 2.2, patternHeightIn, item.depthIn - 3, -item.widthIn / 2 + 3, topYIn, 0, roseColor, m)
  addBox(group, 2.2, patternHeightIn, item.depthIn - 3, item.widthIn / 2 - 3, topYIn, 0, roseColor, m)
  addBox(group, item.widthIn - 14, patternHeightIn, 1.1, 0, topYIn + 0.01, -item.depthIn / 2 + 9, blueColor, m)
  addBox(group, item.widthIn - 14, patternHeightIn, 1.1, 0, topYIn + 0.01, item.depthIn / 2 - 9, blueColor, m)
  addBox(group, 1.1, patternHeightIn, item.depthIn - 18, -item.widthIn / 2 + 9, topYIn + 0.01, 0, blueColor, m)
  addBox(group, 1.1, patternHeightIn, item.depthIn - 18, item.widthIn / 2 - 9, topYIn + 0.01, 0, blueColor, m)

  addPatternBox(group, 24, patternHeightIn, 24, 0, topYIn + 0.02, 0, roseColor, m, Math.PI / 4)
  addPatternBox(group, 15, patternHeightIn, 15, 0, topYIn + 0.03, 0, fadedCream, m, Math.PI / 4)
  addPatternBox(group, 8, patternHeightIn, 8, 0, topYIn + 0.04, 0, blueColor, m, Math.PI / 4)

  for (const xIn of [-item.widthIn / 4, item.widthIn / 4]) {
    for (const zIn of [-item.depthIn / 4, item.depthIn / 4]) {
      addPatternBox(group, 10, patternHeightIn, 10, xIn, topYIn + 0.02, zIn, fadedCream, m, Math.PI / 4)
      addBox(group, 9, patternHeightIn, 1.4, xIn, topYIn + 0.03, zIn, blueColor, m)
      addBox(group, 1.4, patternHeightIn, 9, xIn, topYIn + 0.03, zIn, roseColor, m)
    }
  }

  for (const zIn of [-item.depthIn / 2 - 0.9, item.depthIn / 2 + 0.9]) {
    for (let index = -5; index <= 5; index += 1) {
      addBox(group, 0.45, patternHeightIn, 1.8, index * 4, topYIn, zIn, fadedCream, m)
    }
  }
}

function buildKivikChaiseSofa(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const armWidthIn = 9.5
  const normalDepthIn = 37.4
  const normalCenterZIn = -item.depthIn / 2 + normalDepthIn / 2
  const chaiseWidthIn = 36
  const chaiseXIn = item.widthIn / 2 - armWidthIn - chaiseWidthIn / 2
  const seatTopYIn = 17.7
  const baseColor = item.colors.secondary ?? item.colors.primary

  addRoundedBox(group, item.widthIn, 8, normalDepthIn, 0, 8, normalCenterZIn, baseColor, 2.5, m)
  addRoundedBox(group, chaiseWidthIn + 2, 8, item.depthIn - 2, chaiseXIn, 8, 0, baseColor, 2.5, m)
  addRoundedBox(group, armWidthIn, 20, normalDepthIn, -item.widthIn / 2 + armWidthIn / 2, 15, normalCenterZIn, item.colors.primary, 3.5, m)
  addRoundedBox(group, armWidthIn, 20, item.depthIn - 1, item.widthIn / 2 - armWidthIn / 2, 15, 0, item.colors.primary, 3.5, m)
  addRoundedBox(group, item.widthIn, 18, 6.5, 0, 23, -item.depthIn / 2 + 3.25, item.colors.primary, 3, m, -0.06)

  const regularSeatCount = 3
  const regularSeatWidthIn = (item.widthIn - armWidthIn * 2 - chaiseWidthIn - 3) / regularSeatCount
  for (let index = 0; index < regularSeatCount; index += 1) {
    const xIn = -item.widthIn / 2 + armWidthIn + regularSeatWidthIn / 2 + index * (regularSeatWidthIn + 1)
    addRoundedBox(group, regularSeatWidthIn, 6.2, 24, xIn, seatTopYIn, -4, item.colors.primary, 3, m)
    addRoundedBox(group, regularSeatWidthIn, 13, 7, xIn, 25, -item.depthIn / 2 + 8.5, item.colors.accent ?? item.colors.primary, 3, m, -0.1)
  }

  addRoundedBox(group, chaiseWidthIn, 6.2, item.depthIn - 12, chaiseXIn, seatTopYIn, 4.5, item.colors.primary, 3, m)
  addRoundedBox(group, chaiseWidthIn, 13, 7, chaiseXIn, 25, -item.depthIn / 2 + 8.5, item.colors.accent ?? item.colors.primary, 3, m, -0.1)
  addBox(group, 0.8, 0.25, item.depthIn - 18, chaiseXIn - chaiseWidthIn / 2 + 2, seatTopYIn + 3.2, 3.5, baseColor, m)

  addChaiseSofaLegs(group, item, normalDepthIn, chaiseXIn, chaiseWidthIn, 4, '#272928', m)
}

function buildVimleChaiseSofa(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const armWidthIn = 5.9
  const normalDepthIn = 38.6
  const normalCenterZIn = -item.depthIn / 2 + normalDepthIn / 2
  const chaiseWidthIn = 32
  const chaiseXIn = item.widthIn / 2 - armWidthIn - chaiseWidthIn / 2
  const seatTopYIn = 18.9
  const baseColor = item.colors.secondary ?? item.colors.primary

  addRoundedBox(group, item.widthIn, 8, normalDepthIn, 0, 8, normalCenterZIn, baseColor, 1.8, m)
  addRoundedBox(group, chaiseWidthIn + 1, 8, item.depthIn - 2, chaiseXIn, 8, 0, baseColor, 1.8, m)
  addRoundedBox(group, armWidthIn, 26.8, normalDepthIn, -item.widthIn / 2 + armWidthIn / 2, 16.4, normalCenterZIn, item.colors.primary, 1.8, m)
  addRoundedBox(group, armWidthIn, 26.8, item.depthIn - 2, item.widthIn / 2 - armWidthIn / 2, 16.4, 0, item.colors.primary, 1.8, m)
  addRoundedBox(group, item.widthIn, 20, 6, 0, 24, -item.depthIn / 2 + 3, item.colors.primary, 2, m, -0.04)

  const regularSeatCount = 2
  const regularSeatWidthIn = (item.widthIn - armWidthIn * 2 - chaiseWidthIn - 2) / regularSeatCount
  for (let index = 0; index < regularSeatCount; index += 1) {
    const xIn = -item.widthIn / 2 + armWidthIn + regularSeatWidthIn / 2 + index * (regularSeatWidthIn + 1)
    addRoundedBox(group, regularSeatWidthIn, 5.5, 24, xIn, seatTopYIn, -4, item.colors.primary, 2.5, m)
    addRoundedBox(group, regularSeatWidthIn, 13.5, 6.5, xIn, 26, -item.depthIn / 2 + 8, item.colors.accent ?? item.colors.primary, 2.5, m, -0.08)
  }

  addRoundedBox(group, chaiseWidthIn, 5.5, item.depthIn - 12, chaiseXIn, seatTopYIn, 4.5, item.colors.primary, 2.5, m)
  addRoundedBox(group, chaiseWidthIn, 13.5, 6.5, chaiseXIn, 26, -item.depthIn / 2 + 8, item.colors.accent ?? item.colors.primary, 2.5, m, -0.08)
  addBox(group, chaiseWidthIn - 5, 0.25, 0.7, chaiseXIn, seatTopYIn + 2.9, item.depthIn / 2 - 8, baseColor, m)
  addBox(group, 0.7, 0.25, item.depthIn - 18, chaiseXIn - chaiseWidthIn / 2 + 2, seatTopYIn + 2.9, 3.5, baseColor, m)

  addChaiseSofaLegs(group, item, normalDepthIn, chaiseXIn, chaiseWidthIn, 4, '#252827', m)
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
  const legEndXIn = item.widthIn / 2 - 8
  const legZIn = item.depthIn / 2 - 6

  // One sculptural ball-stack leg at one end, centred across the short axis.
  buildBeadLeg(group, -legEndXIn, 0, legHeightIn, legColor, m)

  // Two plain round legs at the other end, spread across the short axis.
  const backLegRadiusIn = 1.9
  for (const zIn of [-legZIn, legZIn]) {
    addCylinder(group, backLegRadiusIn, legHeightIn, legEndXIn, legHeightIn / 2, zIn, legColor, m)
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

function addStadiumTop(
  group: THREE.Group,
  widthIn: number,
  depthIn: number,
  heightIn: number,
  xIn: number,
  yIn: number,
  zIn: number,
  color: string,
  m: InchesToMeters,
) {
  const endRadiusIn = depthIn / 2
  const centerLengthIn = Math.max(0.01, widthIn - depthIn)
  addBox(group, centerLengthIn, heightIn, depthIn, xIn, yIn, zIn, color, m)
  for (const capXIn of [xIn - centerLengthIn / 2, xIn + centerLengthIn / 2]) {
    addCylinder(group, endRadiusIn, heightIn, capXIn, yIn, zIn, color, m)
  }
}

function addSofaLegs(
  group: THREE.Group,
  widthIn: number,
  depthIn: number,
  legHeightIn: number,
  color: string,
  m: InchesToMeters,
) {
  for (const xIn of [-widthIn / 2, widthIn / 2]) {
    for (const zIn of [-depthIn / 2, depthIn / 2]) {
      addBox(group, 2, legHeightIn, 2, xIn, legHeightIn / 2, zIn, color, m)
    }
  }
}

function addChaiseSofaLegs(
  group: THREE.Group,
  item: FurnitureDefinition,
  normalDepthIn: number,
  chaiseXIn: number,
  chaiseWidthIn: number,
  legHeightIn: number,
  color: string,
  m: InchesToMeters,
) {
  const backZIn = -item.depthIn / 2 + 5
  const normalFrontZIn = -item.depthIn / 2 + normalDepthIn - 5
  const chaiseFrontZIn = item.depthIn / 2 - 5
  const leftXIn = -item.widthIn / 2 + 7
  const midXIn = chaiseXIn - chaiseWidthIn / 2 - 4
  const chaiseLeftXIn = chaiseXIn - chaiseWidthIn / 2 + 4
  const chaiseRightXIn = chaiseXIn + chaiseWidthIn / 2 - 4
  const rightXIn = item.widthIn / 2 - 7

  for (const [xIn, zIn] of [
    [leftXIn, backZIn],
    [midXIn, backZIn],
    [rightXIn, backZIn],
    [leftXIn, normalFrontZIn],
    [midXIn, normalFrontZIn],
    [chaiseLeftXIn, chaiseFrontZIn],
    [chaiseRightXIn, chaiseFrontZIn],
    [rightXIn, chaiseFrontZIn],
  ]) {
    addBox(group, 1.8, legHeightIn, 1.8, xIn, legHeightIn / 2, zIn, color, m)
  }
}

function addPatternBox(
  group: THREE.Group,
  widthIn: number,
  heightIn: number,
  depthIn: number,
  xIn: number,
  yIn: number,
  zIn: number,
  color: string,
  m: InchesToMeters,
  rotationY = 0,
) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(m(widthIn), m(heightIn), m(depthIn)),
    furnitureMaterial(color),
  )
  mesh.position.set(m(xIn), m(yIn), m(zIn))
  mesh.rotation.y = rotationY
  group.add(mesh)
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

function addConeFrustum(
  group: THREE.Group,
  topRadiusIn: number,
  bottomRadiusIn: number,
  heightIn: number,
  xIn: number,
  yIn: number,
  zIn: number,
  color: string,
  m: InchesToMeters,
) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(m(topRadiusIn), m(bottomRadiusIn), m(heightIn), 36),
    furnitureMaterial(color),
  )
  mesh.position.set(m(xIn), m(yIn), m(zIn))
  group.add(mesh)
}

function addDisk(
  group: THREE.Group,
  radiusIn: number,
  depthIn: number,
  xIn: number,
  yIn: number,
  zIn: number,
  color: string,
  m: InchesToMeters,
) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(m(radiusIn), m(radiusIn), m(depthIn), 32),
    furnitureMaterial(color),
  )
  mesh.position.set(m(xIn), m(yIn), m(zIn))
  mesh.rotation.x = Math.PI / 2
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

function addLeaf(
  group: THREE.Group,
  widthIn: number,
  heightIn: number,
  xIn: number,
  yIn: number,
  zIn: number,
  color: string,
  m: InchesToMeters,
  rotation: [number, number, number],
) {
  const curve = new THREE.EllipseCurve(0, 0, m(widthIn) / 2, m(heightIn) / 2, 0, Math.PI * 2)
  const shape = new THREE.Shape(curve.getPoints(28))
  const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), leafMaterial(color))
  mesh.position.set(m(xIn), m(yIn), m(zIn))
  mesh.rotation.set(rotation[0], rotation[1], rotation[2])
  group.add(mesh)
}

function addCylinderBetween(
  group: THREE.Group,
  fromIn: [number, number, number],
  toIn: [number, number, number],
  radiusIn: number,
  color: string,
  m: InchesToMeters,
) {
  const from = new THREE.Vector3(m(fromIn[0]), m(fromIn[1]), m(fromIn[2]))
  const to = new THREE.Vector3(m(toIn[0]), m(toIn[1]), m(toIn[2]))
  const direction = to.clone().sub(from)
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(m(radiusIn), m(radiusIn), direction.length(), 12),
    furnitureMaterial(color),
  )
  mesh.position.copy(from.add(to).multiplyScalar(0.5))
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
  group.add(mesh)
}

function furnitureMaterial(color: string) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.78,
    metalness: 0,
  })
}

function leafMaterial(color: string) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.86,
    metalness: 0,
    side: THREE.DoubleSide,
  })
}
