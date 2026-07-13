import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

export type FurnitureKind =
  | 'bed'
  | 'miyoBed'
  | 'sofa'
  | 'barslovSofaBed'
  | 'jaetteboModule'
  | 'jaetteboChaise'
  | 'comfySebastianChaise'
  | 'comfyCatalinaRockingChair'
  | 'castleryLainaChaiseSofa'
  | 'kingAuraChaiseSofa'
  | 'king1977ChaiseSofa'
  | 'stockholm2025Sofa'
  | 'stockholm2025Pouffe'
  | 'castleryHuggCoffeeTable'
  | 'castleryHarperCoffeeTable'
  | 'castleryHarperRoundDiningTable'
  | 'uoleviCoffeeTable'
  | 'hannahRoundTable'
  | 'ceasarStudyDesk'
  | 'selbyDesk'
  | 'kamdenDesk'
  | 'kamdenDeskMirror'
  | 'wilfredoStorageSet'
  | 'omarShelvingUnit'
  | 'bestaTvBench'
  | 'eketCabinet'
  | 'prismSingleFridge'
  | 'castlerySebDiningBench'
  | 'castleryCallieBanquette'
  | 'tymaLoungeChair'
  | 'taobaoGreenChair'
  | 'taobaoVelvetChair'
  | 'totoroSofa'
  | 'catClawChair'
  | 'linnmonTable'
  | 'arecaPalmPlant'
  | 'monsteraPlant'
  | 'deskMonitor'
  | 'jarnvagRug'
  | 'kivikChaiseSofa'
  | 'vimleChaiseSofa'
  | 'table'
  | 'chair'
  | 'beadTable'
  | 'merlynDiningTable'
  | 'castleryArlenDiningTable'
  | 'taobaoFoldingTable'
  | 'renbergetChair'
  | 'wallTv'
  | 'wallArt'
  | 'floatingConsole'
  | 'measurementBlock'

export type FurnitureDefinition = {
  id: string
  name: string
  category: string
  kind: FurnitureKind
  placementSurface?: 'floor' | 'wall'
  // Stackable items land on whichever surface (floor or furniture top) is under the pointer.
  stackable?: boolean
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

export type FurnitureDimensionsIn = {
  widthIn: number
  depthIn: number
  heightIn: number
}

export type FloorFurniturePlacement = {
  id: string
  furnitureId: string
  surface?: 'floor'
  xIn: number
  zIn: number
  // Height of the supporting surface (0 for the floor, a furniture top otherwise).
  elevationIn?: number
  rotationDegrees: number
  customDimensionsIn?: FurnitureDimensionsIn
}

export type WallFurniturePlacement = {
  id: string
  furnitureId: string
  surface: 'wall'
  wallId: string
  uIn: number
  elevationIn: number
  side: 1 | -1
}

export type FurniturePlacement = FloorFurniturePlacement | WallFurniturePlacement

type InchesToMeters = (inches: number) => number

export const furnitureCatalog: FurnitureDefinition[] = [
  {
    id: 'measurement-block',
    name: 'Measurement Block',
    category: 'Planning',
    kind: 'measurementBlock',
    widthIn: 36,
    depthIn: 24,
    heightIn: 30,
    cost: 0,
    colors: { primary: '#60a5fa', secondary: '#1d4ed8', accent: '#facc15' },
  },
  {
    id: '55-inch-wall-tv',
    name: '55-inch Wall TV',
    category: 'Wall-mounted',
    kind: 'wallTv',
    placementSurface: 'wall',
    widthIn: 48.5,
    depthIn: 2.2,
    heightIn: 28,
    cost: 0,
    colors: { primary: '#111827', secondary: '#020617', accent: '#334155' },
  },
  {
    id: '65-inch-wall-tv',
    name: '65-inch Wall TV',
    category: 'Wall-mounted',
    kind: 'wallTv',
    placementSurface: 'wall',
    widthIn: 57.5,
    depthIn: 2.4,
    heightIn: 33,
    cost: 0,
    colors: { primary: '#111827', secondary: '#020617', accent: '#334155' },
  },
  {
    id: 'framed-wall-art',
    name: 'Framed Wall Art',
    category: 'Wall-mounted',
    kind: 'wallArt',
    placementSurface: 'wall',
    widthIn: 30,
    depthIn: 1.5,
    heightIn: 40,
    cost: 0,
    colors: { primary: '#d8a45d', secondary: '#5b3924', accent: '#52796f' },
  },
  {
    id: 'floating-tv-console',
    name: 'Floating TV Console',
    category: 'Wall-mounted',
    kind: 'floatingConsole',
    placementSurface: 'wall',
    widthIn: 60,
    depthIn: 14,
    heightIn: 12,
    cost: 0,
    colors: { primary: '#9a6845', secondary: '#33251d', accent: '#d8b98b' },
  },
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
    // Reference: Castlery Miyo upholstered queen bed, Performance Genova Oat, 176 x 213 x 115 cm.
    id: 'castlery-miyo-queen-bed',
    name: 'Castlery Miyo Queen Bed',
    category: 'Beds',
    kind: 'miyoBed',
    widthIn: 69.3,
    depthIn: 83.9,
    heightIn: 45.3,
    cost: 1099,
    colors: { primary: '#d7cfc1', secondary: '#eee8dc', accent: '#f8f5ee' },
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
    // Reference: King Aura modular sofa with right chaise, 2650 mm wide.
    id: 'king-aura-rh-chaise-sofa',
    name: 'King Aura RH Chaise Sofa',
    category: 'Sofas',
    kind: 'kingAuraChaiseSofa',
    widthIn: 104.5,
    depthIn: 66,
    heightIn: 31,
    cost: 6729,
    colors: { primary: '#eee8df', secondary: '#d8d0c4', accent: '#f7f3ec' },
  },
  {
    // Reference: King 1977 sectional sofa with chaise, Package 3, 104 in wide.
    id: 'king-1977-pkg3-chaise-sofa',
    name: 'King 1977 Package 3 Sofa',
    category: 'Sofas',
    kind: 'king1977ChaiseSofa',
    widthIn: 104,
    depthIn: 67,
    heightIn: 30,
    cost: 4827,
    colors: { primary: '#79846e', secondary: '#65725d', accent: '#8e9a82' },
  },
  {
    // Reference: IKEA STOCKHOLM 2025 3-seat sofa, Alhamn dark brown, 243 x 99 x 70 cm.
    id: 'ikea-stockholm-2025-3-seat-sofa',
    name: 'STOCKHOLM 2025 3-seat Sofa',
    category: 'Sofas',
    kind: 'stockholm2025Sofa',
    widthIn: 95.7,
    depthIn: 39,
    heightIn: 27.6,
    cost: 2199,
    colors: { primary: '#4a2f22', secondary: '#2f1d15', accent: '#6a4635' },
  },
  {
    // Reference: IKEA STOCKHOLM 2025 pouffe, Alhamn dark brown, 69 x 65 x 40 cm.
    id: 'ikea-stockholm-2025-pouffe',
    name: 'STOCKHOLM 2025 Pouffe',
    category: 'Ottomans',
    kind: 'stockholm2025Pouffe',
    widthIn: 27.2,
    depthIn: 25.6,
    heightIn: 15.7,
    cost: 350,
    colors: { primary: '#4a2f22', secondary: '#2f1d15', accent: '#6a4635' },
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
    // Reference: Castlery Harper lift-top coffee table, oval fluted body, 122 x 62 x 39 cm, top 2.2 cm.
    id: 'castlery-harper-lift-top-coffee-table',
    name: 'Castlery Harper Coffee Table',
    category: 'Tables',
    kind: 'castleryHarperCoffeeTable',
    widthIn: 48,
    depthIn: 24.4,
    heightIn: 15.4,
    cost: 999,
    colors: { primary: '#a5673a', secondary: '#834f2b', accent: '#c98a54' },
  },
  {
    // Reference: Castlery Harper round dining table, chestnut, 120 x 120 x 76 cm, top 4.7 cm.
    id: 'castlery-harper-round-dining-table',
    name: 'Castlery Harper Round Dining Table',
    category: 'Tables',
    kind: 'castleryHarperRoundDiningTable',
    widthIn: 47.2,
    depthIn: 47.2,
    heightIn: 29.9,
    cost: 1099,
    colors: { primary: '#a5673a', secondary: '#7b4524', accent: '#c98750' },
  },
  {
    // Reference: 42 Uolevi lift-top coffee table, wood storage box on square-tube metal frame, 100 x 55 x 40 cm.
    id: 'fortytwo-uolevi-coffee-table',
    name: '42 Uolevi Coffee Table',
    category: 'Tables',
    kind: 'uoleviCoffeeTable',
    widthIn: 39.4,
    depthIn: 21.7,
    heightIn: 15.75,
    cost: 99,
    colors: { primary: '#d9bd8b', secondary: '#ededec', accent: '#b7955f' },
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
    // Reference: IKEA LINNMON/ADILS table, white, thin top on tapered legs, 100 x 60 x 74 cm.
    id: 'ikea-linnmon-adils-table-white',
    name: 'LINNMON/ADILS Table',
    category: 'Study Desks',
    kind: 'linnmonTable',
    widthIn: 39.4,
    depthIn: 23.6,
    heightIn: 29.1,
    cost: 45,
    colors: { primary: '#f2f2f0', secondary: '#e4e4e2', accent: '#cfcfcd' },
  },
  {
    // Reference: 42 Kamden L-shaped corner desk, walnut top with curved inner corner, splayed black legs, 140 x 100 x 75 cm.
    id: 'fortytwo-kamden-l-desk',
    name: '42 Kamden L-Desk',
    category: 'Study Desks',
    kind: 'kamdenDesk',
    widthIn: 55.1,
    depthIn: 39.4,
    heightIn: 29.5,
    cost: 299,
    colors: { primary: '#8f5d38', secondary: '#1e1e1e', accent: '#6d4526' },
  },
  {
    // Mirror of the 42 Kamden: deep work surface on the left, wing on the right, for the opposite corner.
    id: 'fortytwo-kamden-l-desk-mirror',
    name: '42 Kamden L-Desk (Mirror)',
    category: 'Study Desks',
    kind: 'kamdenDeskMirror',
    widthIn: 55.1,
    depthIn: 39.4,
    heightIn: 29.5,
    cost: 299,
    colors: { primary: '#8f5d38', secondary: '#1e1e1e', accent: '#6d4526' },
  },
  {
    // Reference: 42 Selby work/study desk, concrete-grey top, black metal frame, side shelf storage, 120 x 80 x 77 cm.
    id: 'fortytwo-selby-desk',
    name: '42 Selby Desk',
    category: 'Study Desks',
    kind: 'selbyDesk',
    widthIn: 47.2,
    depthIn: 31.5,
    heightIn: 30.3,
    cost: 236.5,
    colors: { primary: '#bcb7af', secondary: '#1a1a1a', accent: '#9a958d' },
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
    // Reference: IKEA EKET single wall-mounted cabinet (open cube), brown walnut effect, 35 x 35 x 35 cm. Place several to build a combination.
    id: 'ikea-eket-cabinet-walnut',
    name: 'EKET Cabinet',
    category: 'Wall-mounted',
    kind: 'eketCabinet',
    placementSurface: 'wall',
    widthIn: 13.8,
    depthIn: 13.8,
    heightIn: 13.8,
    cost: 30,
    colors: { primary: '#7a5334', secondary: '#5c3d24', accent: '#96693f' },
  },
  {
    // Reference: IKEA BESTA TV bench with doors, black-brown carcass, Lappviken walnut-effect doors, 180 x 42 x 38 cm.
    id: 'ikea-besta-tv-bench-doors',
    name: 'BESTA TV Bench',
    category: 'Wall-mounted',
    kind: 'bestaTvBench',
    placementSurface: 'wall',
    widthIn: 70.9,
    depthIn: 16.5,
    heightIn: 15,
    cost: 185,
    colors: { primary: '#6e4a2f', secondary: '#2a221f', accent: '#8a6242' },
  },
  {
    // Reference: IKEA OMAR shelving unit, galvanised, 3 open metal shelves, 92 x 36 x 94 cm.
    id: 'ikea-omar-shelving-unit-galvanised',
    name: 'OMAR Shelving Unit',
    category: 'Storage',
    kind: 'omarShelvingUnit',
    widthIn: 36.2,
    depthIn: 14.2,
    heightIn: 37,
    cost: 45,
    colors: { primary: '#b8bcc0', secondary: '#8f959b', accent: '#d4d7da' },
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
    // Reference: Castlery Callie L-shaped storage banquette, W120/192 x D135 x H80 cm.
    id: 'castlery-callie-b-banquette',
    name: 'Castlery Callie B Banquette',
    category: 'Benches',
    kind: 'castleryCallieBanquette',
    widthIn: 75.6,
    depthIn: 53.1,
    heightIn: 31.5,
    cost: 1317,
    colors: { primary: '#ebe5dc', secondary: '#d6cec2', accent: '#f7f2eb' },
  },
  {
    // Reference: Castlery Callie extended L-shaped storage banquette, W120/192 x D192 x H80 cm.
    id: 'castlery-callie-l-shape-banquette',
    name: 'Castlery Callie Extended Banquette',
    category: 'Benches',
    kind: 'castleryCallieBanquette',
    widthIn: 75.6,
    depthIn: 75.6,
    heightIn: 31.5,
    cost: 1317,
    colors: { primary: '#ebe5dc', secondary: '#d6cec2', accent: '#f7f2eb' },
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
    // Reference: Taobao T31 retro green corduroy tub armchair, gourd wood legs, 92 x 83 x 75 cm.
    id: 'taobao-t31-green-corduroy-chair',
    name: 'T31 Retro Green Armchair',
    category: 'Lounge Chairs',
    kind: 'taobaoGreenChair',
    widthIn: 36.2,
    depthIn: 32.7,
    heightIn: 29.5,
    cost: 0,
    colors: { primary: '#4f5d2c', secondary: '#3a451f', accent: '#2b1c12' },
  },
  {
    // Reference: Taobao frosted velvet-green leisure sofa chair, chunky tubular form, 76 x 72 x 71 cm.
    id: 'taobao-frosted-velvet-green-chair',
    name: 'Frosted Velvet Sofa Chair',
    category: 'Lounge Chairs',
    kind: 'taobaoVelvetChair',
    widthIn: 29.9,
    depthIn: 28.3,
    heightIn: 28,
    cost: 0,
    colors: { primary: '#5b6b40', secondary: '#495732', accent: '#6f8050' },
  },
  {
    // Reference: Taobao Totoro sofa, sakura pink chenille, rotatable 1-seater, 93 x 80 x 83 cm.
    id: 'taobao-totoro-sofa-pink',
    name: 'Totoro Sofa (Pink)',
    category: 'Lounge Chairs',
    kind: 'totoroSofa',
    widthIn: 36.6,
    depthIn: 31.5,
    heightIn: 32.7,
    cost: 0,
    colors: { primary: '#c67d76', secondary: '#b3665f', accent: '#d69a93' },
  },
  {
    // Reference: generic 27-inch desktop monitor on a pedestal stand.
    id: 'desktop-monitor-27',
    name: '27" Monitor',
    category: 'Electronics',
    kind: 'deskMonitor',
    stackable: true,
    widthIn: 24,
    depthIn: 7.5,
    heightIn: 16.5,
    cost: 0,
    colors: { primary: '#20242a', secondary: '#0a0c0f', accent: '#3a3f45' },
  },
  {
    // Reference: CHRYSALIDOCARPUS LUTESCENS potted plant / areca palm, 24 cm pot, 100 cm high.
    id: 'chrysalidocarpus-areca-palm-24cm',
    name: 'CHRYSALIDOCARPUS Areca Palm',
    category: 'Plants',
    kind: 'arecaPalmPlant',
    stackable: true,
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
    stackable: true,
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
    // Reference: Taobao walnut folding drop-leaf dining table, folded state 80 x 38.6 x 75 cm.
    id: 'taobao-folding-dining-table',
    name: 'Folding Dining Table',
    category: 'Tables',
    kind: 'taobaoFoldingTable',
    widthIn: 31.5,
    depthIn: 15.2,
    heightIn: 29.5,
    cost: 0,
    colors: { primary: '#7a4f31', secondary: '#573621', accent: '#9a6a45' },
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
    // Reference: Castlery Arlen sintered stone dining table, 150 x 80 x 76 cm.
    id: 'castlery-arlen-sintered-stone-dining-table',
    name: 'Castlery Arlen Dining Table',
    category: 'Tables',
    kind: 'castleryArlenDiningTable',
    widthIn: 59.1,
    depthIn: 31.5,
    heightIn: 29.9,
    cost: 899,
    colors: { primary: '#ded8c5', secondary: '#7a4a2c', accent: '#c6b99f' },
  },
  {
    // Reference: COURTS Merlyn dining table, walnut veneer, 180 x 90 x 75 cm.
    id: 'courts-merlyn-dining-table',
    name: 'Merlyn Dining Table',
    category: 'Tables',
    kind: 'merlynDiningTable',
    widthIn: 70.9,
    depthIn: 35.4,
    heightIn: 29.5,
    cost: 540,
    colors: { primary: '#8a5a32', secondary: '#70421f', accent: '#a06d3d' },
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
  {
    // Reference: Huangxin ebony + dark green cat-claw leather dining chair, cane back, 45 x 46 x 80 cm.
    id: 'huangxin-cat-claw-dining-chair',
    name: 'Cat Claw Dining Chair',
    category: 'Chairs',
    kind: 'catClawChair',
    widthIn: 17.7,
    depthIn: 18.1,
    heightIn: 31.5,
    cost: 0,
    colors: { primary: '#46592c', secondary: '#1b1b1b', accent: '#c9a86a' },
  },
  {
    // Reference: IKEA RENBERGET swivel office chair, Bomstad black, 5-star base, 67 x 67 x ~105 cm.
    id: 'ikea-renberget-swivel-chair',
    name: 'RENBERGET Office Chair',
    category: 'Office Chairs',
    kind: 'renbergetChair',
    widthIn: 26.4,
    depthIn: 26.4,
    heightIn: 41.3,
    cost: 99,
    colors: { primary: '#1e1e20', secondary: '#101012', accent: '#33333a' },
  },
  {
    // Reference: PRISM+ single fridge BMF330, black inox, 600 x 685 x 1840 mm.
    id: 'prism-single-fridge-bmf330',
    name: 'PRISM+ Single Fridge',
    category: 'Appliances',
    kind: 'prismSingleFridge',
    widthIn: 23.6,
    depthIn: 27,
    heightIn: 72.4,
    cost: 789,
    colors: { primary: '#1c1c1c', secondary: '#2a2a2a', accent: '#0f0f0f' },
  },
]

export function createFurnitureModel(definition: FurnitureDefinition, m: InchesToMeters) {
  const group = new THREE.Group()
  group.name = definition.name

  if (definition.kind === 'bed') buildBed(group, definition, m)
  if (definition.kind === 'miyoBed') buildMiyoBed(group, definition, m)
  if (definition.kind === 'sofa') buildSofa(group, definition, m)
  if (definition.kind === 'barslovSofaBed') buildBarslovSofaBed(group, definition, m)
  if (definition.kind === 'jaetteboModule') buildJaetteboModule(group, definition, m)
  if (definition.kind === 'jaetteboChaise') buildJaetteboChaise(group, definition, m)
  if (definition.kind === 'comfySebastianChaise') buildComfySebastianChaise(group, definition, m)
  if (definition.kind === 'comfyCatalinaRockingChair') buildComfyCatalinaRockingChair(group, definition, m)
  if (definition.kind === 'castleryLainaChaiseSofa') buildCastleryLainaChaiseSofa(group, definition, m)
  if (definition.kind === 'kingAuraChaiseSofa') buildKingAuraChaiseSofa(group, definition, m)
  if (definition.kind === 'king1977ChaiseSofa') buildKing1977ChaiseSofa(group, definition, m)
  if (definition.kind === 'stockholm2025Sofa') buildStockholm2025Sofa(group, definition, m)
  if (definition.kind === 'stockholm2025Pouffe') buildStockholm2025Pouffe(group, definition, m)
  if (definition.kind === 'castleryHuggCoffeeTable') buildCastleryHuggCoffeeTable(group, definition, m)
  if (definition.kind === 'castleryHarperCoffeeTable') buildCastleryHarperCoffeeTable(group, definition, m)
  if (definition.kind === 'castleryHarperRoundDiningTable') buildCastleryHarperRoundDiningTable(group, definition, m)
  if (definition.kind === 'uoleviCoffeeTable') buildUoleviCoffeeTable(group, definition, m)
  if (definition.kind === 'hannahRoundTable') buildHannahRoundTable(group, definition, m)
  if (definition.kind === 'ceasarStudyDesk') buildCeasarStudyDesk(group, definition, m)
  if (definition.kind === 'selbyDesk') buildSelbyDesk(group, definition, m)
  if (definition.kind === 'kamdenDesk') buildKamdenDesk(group, definition, m, 1)
  if (definition.kind === 'kamdenDeskMirror') buildKamdenDesk(group, definition, m, -1)
  if (definition.kind === 'wilfredoStorageSet') buildWilfredoStorageSet(group, definition, m)
  if (definition.kind === 'omarShelvingUnit') buildOmarShelvingUnit(group, definition, m)
  if (definition.kind === 'bestaTvBench') buildBestaTvBench(group, definition, m)
  if (definition.kind === 'eketCabinet') buildEketCabinet(group, definition, m)
  if (definition.kind === 'prismSingleFridge') buildPrismSingleFridge(group, definition, m)
  if (definition.kind === 'castlerySebDiningBench') buildCastlerySebDiningBench(group, definition, m)
  if (definition.kind === 'castleryCallieBanquette') buildCastleryCallieBanquette(group, definition, m)
  if (definition.kind === 'tymaLoungeChair') buildTymaLoungeChair(group, definition, m)
  if (definition.kind === 'taobaoGreenChair') buildTaobaoGreenChair(group, definition, m)
  if (definition.kind === 'taobaoVelvetChair') buildTaobaoVelvetChair(group, definition, m)
  if (definition.kind === 'totoroSofa') buildTotoroSofa(group, definition, m)
  if (definition.kind === 'catClawChair') buildCatClawChair(group, definition, m)
  if (definition.kind === 'renbergetChair') buildRenbergetChair(group, definition, m)
  if (definition.kind === 'linnmonTable') buildLinnmonTable(group, definition, m)
  if (definition.kind === 'arecaPalmPlant') buildArecaPalmPlant(group, definition, m)
  if (definition.kind === 'monsteraPlant') buildMonsteraPlant(group, definition, m)
  if (definition.kind === 'deskMonitor') buildDeskMonitor(group, definition, m)
  if (definition.kind === 'jarnvagRug') buildJarnvagRug(group, definition, m)
  if (definition.kind === 'kivikChaiseSofa') buildKivikChaiseSofa(group, definition, m)
  if (definition.kind === 'vimleChaiseSofa') buildVimleChaiseSofa(group, definition, m)
  if (definition.kind === 'table') buildTable(group, definition, m)
  if (definition.kind === 'beadTable') buildBeadTable(group, definition, m)
  if (definition.kind === 'merlynDiningTable') buildMerlynDiningTable(group, definition, m)
  if (definition.kind === 'castleryArlenDiningTable') buildCastleryArlenDiningTable(group, definition, m)
  if (definition.kind === 'taobaoFoldingTable') buildTaobaoFoldingTable(group, definition, m)
  if (definition.kind === 'chair') buildChair(group, definition, m)
  if (definition.kind === 'wallTv') buildWallTv(group, definition, m)
  if (definition.kind === 'wallArt') buildWallArt(group, definition, m)
  if (definition.kind === 'floatingConsole') buildFloatingConsole(group, definition, m)
  if (definition.kind === 'measurementBlock') buildMeasurementBlock(group, definition, m)

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

function buildMiyoBed(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const frameHeightIn = 12.6
  const slatHeightIn = 11.4
  const railThicknessIn = 4.2
  const headboardThicknessIn = 5.2
  const mattressWidthIn = 60.6
  const mattressDepthIn = 78.7
  const mattressHeightIn = 10
  const innerDepthCenterZIn = (item.depthIn - headboardThicknessIn) / 2 - mattressDepthIn / 2

  addRoundedBox(group, item.widthIn, frameHeightIn, item.depthIn - 2, 0, frameHeightIn / 2 + 1, 0, item.colors.primary, 2.8, m)
  addRoundedBox(group, item.widthIn - railThicknessIn * 2, frameHeightIn + 0.5, item.depthIn - headboardThicknessIn - railThicknessIn, 0, frameHeightIn / 2 + 2, innerDepthCenterZIn, item.colors.accent ?? item.colors.primary, 1.2, m)
  addRoundedBox(group, item.widthIn, item.heightIn, headboardThicknessIn, 0, item.heightIn / 2, -item.depthIn / 2 + headboardThicknessIn / 2, item.colors.primary, 3, m)
  addRoundedBox(group, mattressWidthIn, mattressHeightIn, mattressDepthIn, 0, slatHeightIn + mattressHeightIn / 2 + 1.2, innerDepthCenterZIn, item.colors.secondary ?? '#eee8dc', 2, m)

  const slatCount = 12
  for (let index = 0; index < slatCount; index += 1) {
    const zIn = -item.depthIn / 2 + headboardThicknessIn + 6 + index * ((item.depthIn - headboardThicknessIn - 14) / (slatCount - 1))
    addBox(group, mattressWidthIn - 2, 0.7, 1.6, 0, slatHeightIn, zIn, '#2e2a24', m)
  }

  for (const xIn of [-item.widthIn / 2 + 3, item.widthIn / 2 - 3]) {
    for (const zIn of [-item.depthIn / 2 + 6, item.depthIn / 2 - 5]) {
      addBox(group, 1.4, 1, 1.4, xIn, 0.5, zIn, '#4b3424', m)
    }
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

function buildKingAuraChaiseSofa(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const mainDepthIn = 38
  const chaiseWidthIn = 34
  const chaiseXIn = item.widthIn / 2 - chaiseWidthIn / 2
  const mainCenterZIn = -item.depthIn / 2 + mainDepthIn / 2
  const seatTopYIn = 16
  const moduleWidthIn = (item.widthIn - chaiseWidthIn) / 2

  addRoundedBox(group, item.widthIn, 9, mainDepthIn, 0, 8, mainCenterZIn, item.colors.secondary ?? item.colors.primary, 7, m)
  addRoundedBox(group, chaiseWidthIn, 9, item.depthIn, chaiseXIn, 8, 0, item.colors.secondary ?? item.colors.primary, 8, m)
  addRoundedBox(group, item.widthIn, 17, 7, 0, 24, -item.depthIn / 2 + 4, item.colors.primary, 7, m, -0.06)
  addRoundedBox(group, 7, 17, mainDepthIn, -item.widthIn / 2 + 3.5, 19, mainCenterZIn, item.colors.primary, 6, m)
  addRoundedBox(group, 7, 17, item.depthIn - 2, item.widthIn / 2 - 3.5, 19, 0, item.colors.primary, 6, m)

  for (let index = 0; index < 2; index += 1) {
    const xIn = -item.widthIn / 2 + moduleWidthIn / 2 + index * moduleWidthIn
    addRoundedBox(group, moduleWidthIn - 1, 6, 27, xIn, seatTopYIn, -4, item.colors.primary, 7, m)
    addBox(group, 0.45, 6, 27, xIn + moduleWidthIn / 2, seatTopYIn + 1, -4, '#cfc7bb', m)
  }
  addRoundedBox(group, chaiseWidthIn - 1, 6, item.depthIn - 10, chaiseXIn, seatTopYIn, 3, item.colors.primary, 8, m)
  addBox(group, 0.45, 6, 27, chaiseXIn - chaiseWidthIn / 2, seatTopYIn + 1, -4, '#cfc7bb', m)
  addChaiseSofaLegs(group, item, mainDepthIn, chaiseXIn, chaiseWidthIn, 3, '#2a2724', m)
}

function buildKing1977ChaiseSofa(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const mainDepthIn = 38
  const chaiseWidthIn = 34
  const chaiseXIn = -item.widthIn / 2 + chaiseWidthIn / 2
  const regularWidthIn = item.widthIn - chaiseWidthIn
  const mainCenterZIn = -item.depthIn / 2 + mainDepthIn / 2
  const seatTopYIn = 15

  addRoundedBox(group, item.widthIn, 9, mainDepthIn, 0, 8, mainCenterZIn, item.colors.secondary ?? item.colors.primary, 5, m)
  addRoundedBox(group, chaiseWidthIn, 9, item.depthIn, chaiseXIn, 8, 0, item.colors.secondary ?? item.colors.primary, 6, m)
  addRoundedBox(group, item.widthIn, 16, 7, 0, 23, -item.depthIn / 2 + 4, item.colors.primary, 5, m, -0.05)
  addRoundedBox(group, 7, 16, item.depthIn - 3, -item.widthIn / 2 + 3.5, 18, 0, item.colors.primary, 5, m)
  addRoundedBox(group, 7, 16, mainDepthIn, item.widthIn / 2 - 3.5, 18, mainCenterZIn, item.colors.primary, 5, m)
  addRoundedBox(group, chaiseWidthIn - 1, 6, item.depthIn - 10, chaiseXIn, seatTopYIn, 3, item.colors.primary, 6, m)

  for (let index = 0; index < 2; index += 1) {
    const cushionWidthIn = regularWidthIn / 2 - 1
    const xIn = -item.widthIn / 2 + chaiseWidthIn + cushionWidthIn / 2 + index * (cushionWidthIn + 1)
    addRoundedBox(group, cushionWidthIn, 6, 27, xIn, seatTopYIn, -4, item.colors.primary, 5, m)
    addRoundedBox(group, cushionWidthIn - 1, 13, 5.5, xIn, 24, -item.depthIn / 2 + 8, item.colors.accent ?? item.colors.primary, 4, m, -0.08)
  }
  addChaiseSofaLegs(group, item, mainDepthIn, chaiseXIn, chaiseWidthIn, 3, '#1f1f1d', m)
}

function buildStockholm2025Sofa(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const fabricColor = item.colors.primary
  const shadowColor = item.colors.secondary ?? fabricColor
  const highlightColor = item.colors.accent ?? fabricColor
  const armWidthIn = 12.6
  const seatHeightIn = 15.7
  const seatThicknessIn = 6.2
  const baseHeightIn = 5.2
  const backDepthIn = 7.4
  const seatDepthIn = 25.2
  const innerWidthIn = item.widthIn - armWidthIn * 2
  const moduleWidthIn = innerWidthIn / 3

  addRoundedBox(group, item.widthIn - 3, baseHeightIn, item.depthIn - 5, 0, baseHeightIn / 2, 0.8, shadowColor, 2.4, m)
  addRoundedBox(group, item.widthIn, 13, backDepthIn, 0, item.heightIn - 6.5, -item.depthIn / 2 + backDepthIn / 2, fabricColor, 3.4, m)

  for (const xIn of [-item.widthIn / 2 + armWidthIn / 2, item.widthIn / 2 - armWidthIn / 2]) {
    addRoundedBox(group, armWidthIn, item.heightIn, item.depthIn, xIn, item.heightIn / 2, 0, fabricColor, 3.6, m)
  }

  for (let index = 0; index < 3; index += 1) {
    const xIn = -innerWidthIn / 2 + moduleWidthIn / 2 + index * moduleWidthIn
    addRoundedBox(group, moduleWidthIn - 1.2, seatThicknessIn, seatDepthIn, xIn, seatHeightIn - seatThicknessIn / 2, 4.2, fabricColor, 3, m)
    addRoundedBox(group, moduleWidthIn - 1.8, 8.4, 4.5, xIn, item.heightIn - 9.5, -item.depthIn / 2 + backDepthIn + 1.3, highlightColor, 2.2, m, -0.08)
  }

  for (const xIn of [-innerWidthIn / 6, innerWidthIn / 6]) {
    addBox(group, 0.45, 0.18, seatDepthIn - 2, xIn, seatHeightIn + 0.1, 4.2, shadowColor, m)
    addBox(group, 0.42, 7.2, 0.18, xIn, item.heightIn - 9.2, -item.depthIn / 2 + backDepthIn + 3.7, shadowColor, m)
  }
}

function buildStockholm2025Pouffe(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const fabricColor = item.colors.primary
  const shadowColor = item.colors.secondary ?? fabricColor
  const highlightColor = item.colors.accent ?? fabricColor
  const baseHeightIn = 3.2
  const cushionHeightIn = item.heightIn - baseHeightIn

  addRoundedBox(group, item.widthIn - 1.2, baseHeightIn, item.depthIn - 1.2, 0, baseHeightIn / 2, 0, shadowColor, 2.2, m)
  addRoundedBox(group, item.widthIn, cushionHeightIn, item.depthIn, 0, baseHeightIn + cushionHeightIn / 2, 0, fabricColor, 3.2, m)
  addRoundedBox(group, item.widthIn - 2.4, 0.45, item.depthIn - 2.4, 0, item.heightIn + 0.12, 0, highlightColor, 2.4, m)

  addBox(group, 0.35, 0.16, item.depthIn - 4, 0, item.heightIn + 0.22, 0, shadowColor, m)
  addBox(group, item.widthIn - 4, 0.16, 0.35, 0, item.heightIn + 0.24, 0, shadowColor, m)
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

function buildUoleviCoffeeTable(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const woodColor = item.colors.primary
  const metalColor = item.colors.secondary ?? '#ededec'
  const grainColor = item.colors.accent ?? woodColor
  const boxHeightIn = 13.5 / 2.54
  const boxTopIn = item.heightIn
  const boxBottomIn = boxTopIn - boxHeightIn
  const tubeIn = 1
  const frameInsetIn = 3
  const legXIn = item.widthIn / 2 - frameInsetIn
  const legZIn = item.depthIn / 2 - frameInsetIn

  // Wood lift-top storage box.
  addRoundedBox(group, item.widthIn, boxHeightIn, item.depthIn, 0, boxBottomIn + boxHeightIn / 2, 0, woodColor, 0.6, m)
  addBox(group, item.widthIn - 4, 0.06, item.depthIn - 4, 0, boxTopIn - boxHeightIn + 0.03, 0, grainColor, m)
  for (let index = -4; index <= 4; index += 1) {
    addBox(group, item.widthIn - 3, 0.05, 0.08, 0, boxTopIn + 0.02, index * 2.1, grainColor, m)
  }

  // Slim square-tube metal frame: legs plus top and bottom perimeter rails.
  for (const xIn of [-legXIn, legXIn]) {
    for (const zIn of [-legZIn, legZIn]) {
      addBox(group, tubeIn, boxBottomIn, tubeIn, xIn, boxBottomIn / 2, zIn, metalColor, m)
    }
  }
  for (const yIn of [boxBottomIn - tubeIn / 2, tubeIn / 2]) {
    for (const zIn of [-legZIn, legZIn]) {
      addBox(group, legXIn * 2 + tubeIn, tubeIn, tubeIn, 0, yIn, zIn, metalColor, m)
    }
    for (const xIn of [-legXIn, legXIn]) {
      addBox(group, tubeIn, tubeIn, legZIn * 2 + tubeIn, xIn, yIn, 0, metalColor, m)
    }
  }
}

function buildCastleryHarperRoundDiningTable(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const woodColor = item.colors.primary
  const bodyColor = item.colors.secondary ?? woodColor
  const fluteColor = item.colors.accent ?? woodColor
  const topThicknessIn = 4.7 / 2.54
  const topRadiusIn = item.widthIn / 2
  const topYIn = item.heightIn - topThicknessIn / 2
  const legHeightIn = item.heightIn - topThicknessIn
  const pedestalRadiusIn = 8.8

  addCylinder(group, topRadiusIn, topThicknessIn, 0, topYIn, 0, woodColor, m)
  addCylinder(group, topRadiusIn - 0.8, 0.45, 0, item.heightIn - topThicknessIn - 0.22, 0, bodyColor, m)
  addCylinder(group, pedestalRadiusIn - 0.45, legHeightIn, 0, legHeightIn / 2, 0, bodyColor, m)
  addCylinder(group, pedestalRadiusIn - 1.3, 0.7, 0, 0.35, 0, bodyColor, m)

  const fluteCount = 44
  const fluteHeightIn = legHeightIn - 0.8
  for (let index = 0; index < fluteCount; index += 1) {
    const angle = (index / fluteCount) * Math.PI * 2
    const color = index % 2 === 0 ? fluteColor : woodColor
    addCylinder(
      group,
      0.22,
      fluteHeightIn,
      Math.cos(angle) * pedestalRadiusIn,
      0.4 + fluteHeightIn / 2,
      Math.sin(angle) * pedestalRadiusIn,
      color,
      m,
    )
  }

  for (let index = -3; index <= 3; index += 1) {
    addBox(group, item.widthIn * 0.72, 0.035, 0.05, 0, item.heightIn + 0.04, index * 2.4, fluteColor, m)
  }
}

function buildCastleryHarperCoffeeTable(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const woodColor = item.colors.primary
  const bodyColor = item.colors.secondary ?? woodColor
  const fluteColor = item.colors.accent ?? woodColor
  const topThicknessIn = 2.2 / 2.54
  const topYIn = item.heightIn - topThicknessIn / 2
  const baseHeightIn = 1.6
  const bodyBottomIn = baseHeightIn
  const bodyTopIn = item.heightIn - topThicknessIn
  const bodyHeightIn = bodyTopIn - bodyBottomIn
  const bodyCenterYIn = bodyBottomIn + bodyHeightIn / 2

  // Oval lift-top and the drum-shaped body just beneath it.
  addStadiumTop(group, item.widthIn, item.depthIn, topThicknessIn, 0, topYIn, 0, woodColor, m)
  addStadiumTop(group, item.widthIn - 2, item.depthIn - 2, bodyHeightIn, 0, bodyCenterYIn, 0, bodyColor, m)

  // Recessed base plinth so the body appears to float slightly.
  addStadiumTop(group, item.widthIn - 8, item.depthIn - 8, baseHeightIn, 0, baseHeightIn / 2, 0, bodyColor, m)

  // Vertical fluting wrapped around the oval body perimeter.
  const bodyWidthIn = item.widthIn - 2
  const bodyDepthIn = item.depthIn - 2
  const capRadiusIn = bodyDepthIn / 2
  const straightLengthIn = Math.max(0.01, bodyWidthIn - bodyDepthIn)
  const fluteRadiusIn = 0.4
  const fluteHeightIn = bodyHeightIn - 0.6
  const straightFlutes = Math.max(2, Math.round(straightLengthIn / 1.6))
  for (let index = 0; index <= straightFlutes; index += 1) {
    const xIn = -straightLengthIn / 2 + (index / straightFlutes) * straightLengthIn
    for (const zIn of [-capRadiusIn, capRadiusIn]) {
      addCylinder(group, fluteRadiusIn, fluteHeightIn, xIn, bodyCenterYIn, zIn, fluteColor, m)
    }
  }
  const capFlutes = 7
  for (const capXIn of [-straightLengthIn / 2, straightLengthIn / 2]) {
    const facing = capXIn < 0 ? Math.PI : 0
    for (let index = 1; index < capFlutes; index += 1) {
      const angle = facing - Math.PI / 2 + (index / capFlutes) * Math.PI
      addCylinder(
        group,
        fluteRadiusIn,
        fluteHeightIn,
        capXIn + Math.sin(angle) * (capXIn < 0 ? -capRadiusIn : capRadiusIn),
        bodyCenterYIn,
        Math.cos(angle) * capRadiusIn,
        fluteColor,
        m,
      )
    }
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

function buildDeskMonitor(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const bodyColor = item.colors.primary
  const screenColor = item.colors.secondary ?? '#0a0c0f'
  const standColor = item.colors.accent ?? bodyColor
  const baseHeightIn = 0.7
  const screenBottomIn = 3.5
  const screenHeightIn = item.heightIn - screenBottomIn
  const screenCenterYIn = screenBottomIn + screenHeightIn / 2

  addRoundedBox(group, 10, baseHeightIn, item.depthIn, 0, baseHeightIn / 2, 1, standColor, 0.6, m)
  addBox(group, 1.8, screenBottomIn - baseHeightIn + 2, 1.4, 0, (screenBottomIn + baseHeightIn) / 2, 0, standColor, m)
  addRoundedBox(group, item.widthIn, screenHeightIn, 1.4, 0, screenCenterYIn, 0, bodyColor, 0.5, m)
  addBox(group, item.widthIn - 2, screenHeightIn - 2, 0.2, 0, screenCenterYIn, 0.8, screenColor, m)
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

function buildKamdenDesk(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters, mirror: 1 | -1) {
  const topColor = item.colors.primary
  const legColor = item.colors.secondary ?? '#1e1e1e'
  const footColor = '#d8d8d8'
  const thicknessIn = 1.2
  const widthIn = item.widthIn
  const depthIn = item.depthIn

  // Walnut L top with a concave curved inner corner: a deep right work surface
  // and a shallower left wing along the back. The outline is sampled as points so
  // the mirror can negate X and reverse order, keeping the face winding correct.
  const zWingFrontIn = -depthIn / 2 + depthIn * 0.58
  const xJointIn = widthIn * 0.06
  const xWingEndIn = xJointIn - 10
  const outline: Array<[number, number]> = [
    [-widthIn / 2, -depthIn / 2],
    [widthIn / 2, -depthIn / 2],
    [widthIn / 2, depthIn / 2],
    [xJointIn, depthIn / 2],
  ]
  const curveSamples = 10
  for (let step = 1; step <= curveSamples; step += 1) {
    const t = step / curveSamples
    const inv = 1 - t
    const x = inv * inv * xJointIn + 2 * inv * t * xJointIn + t * t * xWingEndIn
    const z = inv * inv * depthIn / 2 + 2 * inv * t * zWingFrontIn + t * t * zWingFrontIn
    outline.push([x, z])
  }
  outline.push([-widthIn / 2, zWingFrontIn])

  const points = mirror === -1
    ? outline.map(([x, z]): [number, number] => [-x, z]).reverse()
    : outline
  const shape = new THREE.Shape()
  points.forEach(([x, z], index) => {
    if (index === 0) shape.moveTo(m(x), m(z))
    else shape.lineTo(m(x), m(z))
  })
  shape.closePath()
  const topGeometry = new THREE.ExtrudeGeometry(shape, { depth: m(thicknessIn), bevelEnabled: false })
  topGeometry.rotateX(Math.PI / 2)
  const top = new THREE.Mesh(topGeometry, furnitureMaterial(topColor))
  top.position.y = m(item.heightIn)
  group.add(top)

  // Thin splayed black tapered legs, every one tucked under the top.
  const legTopIn = item.heightIn - thicknessIn
  const legs: Array<[number, number]> = [
    [-widthIn / 2 + 3, -depthIn / 2 + 3],
    [widthIn / 2 - 3, -depthIn / 2 + 3],
    [widthIn / 2 - 3, depthIn / 2 - 3],
    [-widthIn * 0.25, zWingFrontIn - 3],
  ]
  for (const [baseXIn, legZIn] of legs) {
    const legXIn = baseXIn * mirror
    const footXIn = legXIn + Math.sign(legXIn || 1) * 2.5
    const footZIn = legZIn + Math.sign(legZIn || 1) * 2.5
    addCylinderBetween(group, [legXIn, legTopIn, legZIn], [footXIn, 0.4, footZIn], 0.42, legColor, m)
    addCylinder(group, 0.45, 0.3, footXIn, 0.15, footZIn, footColor, m)
  }
}

function buildSelbyDesk(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const topColor = item.colors.primary
  const frameColor = item.colors.secondary ?? '#1a1a1a'
  const shelfColor = item.colors.accent ?? topColor
  const topThicknessIn = 1.2
  const topYIn = item.heightIn - topThicknessIn / 2
  const postHeightIn = item.heightIn - topThicknessIn
  const tubeIn = 0.9
  const shelfWidthIn = 18
  const xTowerOuterIn = -item.widthIn / 2 + 1
  const xTowerInnerIn = xTowerOuterIn + shelfWidthIn
  const notchWidthIn = 11
  const notchDepthIn = 12
  const xNotchRightIn = xTowerInnerIn + notchWidthIn
  const xRightIn = item.widthIn / 2 - 1
  const zFrontIn = item.depthIn / 2 - 1
  const zBackIn = -zFrontIn

  // Concrete-grey top: full-depth left (over the shelf tower) and right work
  // surfaces joined by a back band, with a rectangular notch cut into the
  // front centre. Every leg stays under the top — nothing overhangs the edge.
  const leftBlockWidthIn = xTowerInnerIn + item.widthIn / 2
  addRoundedBox(group, leftBlockWidthIn, topThicknessIn, item.depthIn, -item.widthIn / 2 + leftBlockWidthIn / 2, topYIn, 0, topColor, 0.2, m)
  const rightBlockWidthIn = item.widthIn / 2 - xNotchRightIn
  addRoundedBox(group, rightBlockWidthIn, topThicknessIn, item.depthIn, xNotchRightIn + rightBlockWidthIn / 2, topYIn, 0, topColor, 0.2, m)
  const notchBackDepthIn = item.depthIn - notchDepthIn
  addRoundedBox(group, notchWidthIn, topThicknessIn, notchBackDepthIn, (xTowerInnerIn + xNotchRightIn) / 2, topYIn, -item.depthIn / 2 + notchBackDepthIn / 2, topColor, 0.2, m)

  // Black metal posts, all tucked under the top on adjustable feet.
  for (const xIn of [xTowerOuterIn, xTowerInnerIn, xNotchRightIn, xRightIn]) {
    for (const zIn of [zFrontIn, zBackIn]) {
      addBox(group, tubeIn, postHeightIn, tubeIn, xIn, postHeightIn / 2, zIn, frameColor, m)
      addCylinder(group, 0.4, 0.4, xIn, 0.2, zIn, frameColor, m)
    }
  }

  // Two concrete shelves in the left storage tower.
  const shelfCenterXIn = (xTowerOuterIn + xTowerInnerIn) / 2
  for (const shelfYIn of [6, 15]) {
    addRoundedBox(group, shelfWidthIn - 1, 1, item.depthIn - 2, shelfCenterXIn, shelfYIn, 0, shelfColor, 0.2, m)
  }

  // X cross-braces on the tower faces and across the right work-surface span.
  const braceTopIn = postHeightIn - 2
  for (const xIn of [xTowerOuterIn, xTowerInnerIn]) {
    addCylinderBetween(group, [xIn, 2, zBackIn], [xIn, braceTopIn, zFrontIn], 0.18, frameColor, m)
    addCylinderBetween(group, [xIn, 2, zFrontIn], [xIn, braceTopIn, zBackIn], 0.18, frameColor, m)
  }
  addCylinderBetween(group, [xNotchRightIn, 2, zBackIn], [xRightIn, braceTopIn, zBackIn], 0.18, frameColor, m)
  addCylinderBetween(group, [xRightIn, 2, zBackIn], [xNotchRightIn, braceTopIn, zBackIn], 0.18, frameColor, m)
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

function buildEketCabinet(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const woodColor = item.colors.primary
  const interiorColor = item.colors.secondary ?? woodColor
  const panelIn = 0.6
  const widthIn = item.widthIn
  const heightIn = item.heightIn
  const depthIn = item.depthIn

  // Single open EKET cube: back panel plus top/bottom/side walls, front left open.
  addBox(group, widthIn, heightIn, panelIn, 0, heightIn / 2, -depthIn / 2 + panelIn / 2, interiorColor, m)
  addBox(group, widthIn, panelIn, depthIn, 0, panelIn / 2, 0, woodColor, m)
  addBox(group, widthIn, panelIn, depthIn, 0, heightIn - panelIn / 2, 0, woodColor, m)
  addBox(group, panelIn, heightIn, depthIn, -widthIn / 2 + panelIn / 2, heightIn / 2, 0, woodColor, m)
  addBox(group, panelIn, heightIn, depthIn, widthIn / 2 - panelIn / 2, heightIn / 2, 0, woodColor, m)
}

function buildBestaTvBench(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const doorColor = item.colors.primary
  const carcassColor = item.colors.secondary ?? '#2a221f'
  const grainColor = item.colors.accent ?? doorColor
  const frontZIn = item.depthIn / 2

  // Black-brown carcass with a top panel the TV can sit on.
  addBox(group, item.widthIn, item.heightIn, item.depthIn, 0, item.heightIn / 2, 0, carcassColor, m)
  addBox(group, item.widthIn, 0.8, item.depthIn + 0.2, 0, item.heightIn - 0.4, 0, carcassColor, m)

  // Three handle-less Lappviken walnut-effect doors with thin frame reveals.
  const doorCount = 3
  const gapIn = 0.4
  const doorWidthIn = (item.widthIn - gapIn * (doorCount + 1)) / doorCount
  const doorHeightIn = item.heightIn - 2
  for (let index = 0; index < doorCount; index += 1) {
    const xIn = -item.widthIn / 2 + gapIn + doorWidthIn / 2 + index * (doorWidthIn + gapIn)
    addRoundedBox(group, doorWidthIn, doorHeightIn, 0.7, xIn, item.heightIn / 2, frontZIn + 0.15, doorColor, 0.25, m)
    for (let line = -2; line <= 2; line += 1) {
      addBox(group, doorWidthIn - 1.5, 0.05, 0.08, xIn, item.heightIn / 2 + line * 2.4, frontZIn + 0.55, grainColor, m)
    }
  }
}

function buildOmarShelvingUnit(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const metalColor = item.colors.primary
  const postColor = item.colors.secondary ?? metalColor
  const wireColor = item.colors.accent ?? metalColor
  const postRadiusIn = 0.5
  const footHeightIn = 1.5
  const postXIn = item.widthIn / 2 - postRadiusIn
  const postZIn = item.depthIn / 2 - postRadiusIn
  const shelfYsIn = [footHeightIn + 1.5, item.heightIn / 2, item.heightIn - 1]
  const frameIn = 0.5
  const wireCount = 7

  // Four galvanised corner posts on adjustable feet.
  for (const xIn of [-postXIn, postXIn]) {
    for (const zIn of [-postZIn, postZIn]) {
      addCylinder(group, postRadiusIn, item.heightIn - footHeightIn, xIn, footHeightIn + (item.heightIn - footHeightIn) / 2, zIn, postColor, m)
      addCylinder(group, postRadiusIn * 0.7, footHeightIn, xIn, footHeightIn / 2, zIn, '#2b2f33', m)
    }
  }

  // Three open wire shelves: perimeter frame plus longitudinal wires.
  for (const shelfYIn of shelfYsIn) {
    for (const zIn of [-postZIn, postZIn]) {
      addBox(group, item.widthIn - 1, frameIn, frameIn, 0, shelfYIn, zIn, metalColor, m)
    }
    for (const xIn of [-postXIn, postXIn]) {
      addBox(group, frameIn, frameIn, item.depthIn - 1, xIn, shelfYIn, 0, metalColor, m)
    }
    for (let index = 0; index < wireCount; index += 1) {
      const zIn = -postZIn + frameIn + (index / (wireCount - 1)) * (item.depthIn - 2 * postRadiusIn - 2 * frameIn)
      addBox(group, item.widthIn - 2, 0.25, 0.25, 0, shelfYIn + 0.1, zIn, wireColor, m)
    }
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

function buildCastleryCallieBanquette(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const seatDepthIn = 19.5
  const seatHeightIn = 19.5
  const backHeightIn = 13.4
  const backThicknessIn = 5
  const fabricColor = item.colors.primary
  const seamColor = item.colors.secondary ?? '#d6cec2'
  const highlightColor = item.colors.accent ?? fabricColor
  const rearZIn = -item.depthIn / 2 + backThicknessIn / 2
  const rightXIn = item.widthIn / 2 - backThicknessIn / 2
  const horizontalSeatZIn = -item.depthIn / 2 + backThicknessIn + seatDepthIn / 2
  const verticalSeatXIn = item.widthIn / 2 - backThicknessIn - seatDepthIn / 2

  // Seat/storage bases form an L: a full rear bench plus a full-depth right bench.
  addRoundedBox(group, item.widthIn, seatHeightIn, seatDepthIn, 0, seatHeightIn / 2, horizontalSeatZIn, fabricColor, 3.5, m)
  addRoundedBox(group, seatDepthIn, seatHeightIn, item.depthIn, verticalSeatXIn, seatHeightIn / 2, 0, fabricColor, 3.5, m)

  // Continuous L-shaped back: rear back and side back overlap at the corner.
  addRoundedBox(group, item.widthIn, backHeightIn, backThicknessIn, 0, seatHeightIn + backHeightIn / 2, rearZIn, fabricColor, 3, m, -0.04)
  addRoundedBox(group, backThicknessIn, backHeightIn, item.depthIn, rightXIn, seatHeightIn + backHeightIn / 2, 0, fabricColor, 3, m, -0.04)
  addRoundedBox(group, backThicknessIn + 2, backHeightIn, backThicknessIn + 2, rightXIn - 0.5, seatHeightIn + backHeightIn / 2, rearZIn + 0.5, fabricColor, 2.5, m, -0.04)

  addRoundedBox(group, item.widthIn - 2, 3, seatDepthIn - 2, 0, seatHeightIn + 1.2, horizontalSeatZIn + 0.7, highlightColor, 3, m)
  addRoundedBox(group, seatDepthIn - 2, 3, item.depthIn - 2, verticalSeatXIn - 0.7, seatHeightIn + 1.2, 0, highlightColor, 3, m)

  for (const xIn of [-item.widthIn / 4, 0, item.widthIn / 4]) {
    addBox(group, 0.35, 4, seatDepthIn - 2, xIn, seatHeightIn - 1, horizontalSeatZIn, seamColor, m)
  }
  for (const zIn of [-item.depthIn / 4, item.depthIn / 4]) {
    addBox(group, seatDepthIn - 2, 4, 0.35, verticalSeatXIn, seatHeightIn - 1, zIn, seamColor, m)
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

function buildTaobaoGreenChair(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const fabricColor = item.colors.primary
  const shellColor = item.colors.secondary ?? fabricColor
  const legColor = item.colors.accent ?? '#2b1c12'
  const legHeightIn = 6
  const seatTopIn = legHeightIn + 8.5
  const bodyHeightIn = seatTopIn - legHeightIn

  // Plush rounded body and seat cushion.
  addRoundedBox(group, item.widthIn - 2, bodyHeightIn, item.depthIn - 4, 0, legHeightIn + bodyHeightIn / 2, 1, shellColor, 5, m)
  addRoundedBox(group, item.widthIn - 8, 5.5, item.depthIn - 12, 0, seatTopIn + 1, 3, fabricColor, 4.5, m, -0.05)

  // Curved wraparound back that tapers from a tall back down to the front arms.
  const rimRadiusXIn = item.widthIn / 2 - 3
  const rimRadiusZIn = item.depthIn / 2 - 4
  const angleMaxRad = (135 * Math.PI) / 180
  const backRiseIn = item.heightIn - seatTopIn
  const armRiseIn = backRiseIn * 0.55
  const rimSegments = 16
  for (let index = 0; index <= rimSegments; index += 1) {
    const angle = -angleMaxRad + (index / rimSegments) * angleMaxRad * 2
    const towardFront = Math.abs(angle) / angleMaxRad
    const riseIn = backRiseIn + (armRiseIn - backRiseIn) * towardFront
    const xIn = Math.sin(angle) * rimRadiusXIn
    const zIn = -Math.cos(angle) * rimRadiusZIn
    const segmentWidthIn = (angleMaxRad * 2 * rimRadiusXIn) / rimSegments + 2
    addRoundedBox(group, segmentWidthIn, riseIn, 4.5, xIn, seatTopIn + riseIn / 2, zIn, fabricColor, 2.2, m, 0, angle)
  }

  // Rust piping detail along the front arm seam.
  for (const sideXIn of [-1, 1]) {
    addCylinderBetween(
      group,
      [sideXIn * (rimRadiusXIn - 1), seatTopIn - 1, item.depthIn / 2 - 6],
      [sideXIn * (item.widthIn / 2 - 3), seatTopIn + 2, -2],
      0.3,
      '#9a4a2f',
      m,
    )
  }

  // Houndstooth lumbar pillow leaning on the back.
  const pillowWidthIn = 15
  const pillowHeightIn = 9
  addRoundedBox(group, pillowWidthIn, pillowHeightIn, 3.5, -2, seatTopIn + 6, -item.depthIn / 2 + 8, '#f3f3f0', 2, m, -0.32)
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 5; col += 1) {
      if ((row + col) % 2 !== 0) continue
      addBox(
        group,
        pillowWidthIn / 6,
        pillowHeightIn / 4,
        0.2,
        -2 - pillowWidthIn / 2 + pillowWidthIn / 6 + col * (pillowWidthIn / 5),
        seatTopIn + 6 + (row - 1) * (pillowHeightIn / 3.4),
        -item.depthIn / 2 + 9.5,
        '#1c1c1c',
        m,
      )
    }
  }

  // Turned solid-wood gourd legs, splayed to the four corners.
  const legXIn = item.widthIn / 2 - 7
  const legZIn = item.depthIn / 2 - 6
  for (const xIn of [-legXIn, legXIn]) {
    for (const zIn of [-legZIn, legZIn]) {
      buildGourdLeg(group, xIn, zIn, legHeightIn, legColor, m)
    }
  }
}

function buildTaobaoVelvetChair(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const fabricColor = item.colors.primary
  const shadeColor = item.colors.secondary ?? fabricColor
  const highlightColor = item.colors.accent ?? fabricColor
  const seatTopIn = 15

  // Plush rounded drum seat.
  addRoundedBox(group, item.widthIn - 9, 8, item.depthIn - 8, 0, seatTopIn - 4, 1.5, fabricColor, 5, m)
  addRoundedBox(group, item.widthIn - 11, 5, item.depthIn - 11, 0, seatTopIn + 1, 1.5, highlightColor, 4.5, m, -0.04)

  // Chunky tubular posts: tall front arms and shorter back legs.
  const postRadiusIn = 3.2
  const armTopIn = 23
  const backLegTopIn = 17
  const postXIn = item.widthIn / 2 - postRadiusIn
  const frontZIn = item.depthIn / 2 - postRadiusIn - 1
  const backZIn = -item.depthIn / 2 + postRadiusIn + 1
  for (const sideXIn of [-1, 1]) {
    addRoundedBox(group, postRadiusIn * 2, armTopIn, postRadiusIn * 2, sideXIn * postXIn, armTopIn / 2, frontZIn, shadeColor, postRadiusIn, m)
    addRoundedBox(group, postRadiusIn * 2, backLegTopIn, postRadiusIn * 2, sideXIn * postXIn, backLegTopIn / 2, backZIn, shadeColor, postRadiusIn, m)
  }

  // Floating curved backrest band wrapping the rear.
  const rimRadiusXIn = item.widthIn / 2 - 2
  const rimRadiusZIn = item.depthIn / 2 - 3
  const angleMaxRad = (105 * Math.PI) / 180
  const bandYIn = 23
  const bandSegments = 13
  for (let index = 0; index <= bandSegments; index += 1) {
    const angle = -angleMaxRad + (index / bandSegments) * angleMaxRad * 2
    const xIn = Math.sin(angle) * rimRadiusXIn
    const zIn = -Math.cos(angle) * rimRadiusZIn
    const segmentWidthIn = (angleMaxRad * 2 * rimRadiusXIn) / bandSegments + 2
    addRoundedBox(group, segmentWidthIn, 7, 4.5, xIn, bandYIn, zIn, fabricColor, 3, m, 0, angle)
  }
}

function buildTotoroSofa(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const fabricColor = item.colors.primary
  const shadeColor = item.colors.secondary ?? fabricColor
  const highlightColor = item.colors.accent ?? fabricColor
  const seatTopIn = 15

  // Swivel base disc for the 360° rotating chair.
  addCylinder(group, item.depthIn / 2 - 3, 1.6, 0, 0.8, 0, '#463228', m)

  // Plush rounded body and seat cushion.
  addRoundedBox(group, item.widthIn - 6, seatTopIn, item.depthIn - 4, 0, 1.6 + seatTopIn / 2, 1, shadeColor, 6, m)
  addRoundedBox(group, item.widthIn - 15, 6, item.depthIn - 14, 0, seatTopIn + 4, 2, highlightColor, 5, m, -0.04)

  // Tall curved back.
  addRoundedBox(group, item.widthIn - 13, item.heightIn - 13, 7, 0, seatTopIn + (item.heightIn - 13) / 2, -item.depthIn / 2 + 4.5, fabricColor, 5, m, -0.05)

  // Chunky arm bolsters that rise to soft Totoro "ear" tips.
  for (const sideXIn of [-1, 1]) {
    const armXIn = sideXIn * (item.widthIn / 2 - 4.5)
    addRoundedBox(group, 8, 24, item.depthIn - 6, armXIn, 1.6 + 12, 0.5, fabricColor, 3.8, m)
    addConeFrustum(group, 0.6, 3.9, 8, armXIn, 27, -2, fabricColor, m)
  }
}

function buildRenbergetChair(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const leatherColor = item.colors.primary
  const frameColor = item.colors.secondary ?? '#101012'
  const stitchColor = item.colors.accent ?? leatherColor
  const seatTopIn = 19
  const baseRadiusIn = item.widthIn / 2 - 1

  // Five-star base with castors and a central gas-lift cylinder.
  addCylinder(group, 2, 3, 0, 3, 0, frameColor, m)
  const starLegs = 5
  for (let index = 0; index < starLegs; index += 1) {
    const angle = (index / starLegs) * Math.PI * 2
    const endXIn = Math.cos(angle) * baseRadiusIn
    const endZIn = Math.sin(angle) * baseRadiusIn
    addCylinderBetween(group, [0, 3, 0], [endXIn, 1.6, endZIn], 0.6, frameColor, m)
    addSphere(group, 1.2, endXIn, 1.1, endZIn, '#0c0c0d', m)
  }
  addCylinder(group, 0.9, 12, 0, 9.5, 0, frameColor, m)
  addBox(group, 6, 2, 8, 0, 16, 0, frameColor, m)

  // Seat cushion.
  addRoundedBox(group, 19, 3.5, 18, 0, seatTopIn - 1.75, 1, leatherColor, 2, m)
  addBox(group, 17, 0.1, 16, 0, seatTopIn + 0.1, 1, stitchColor, m)

  // Reclined backrest with stitching and a lumbar band.
  addCylinderBetween(group, [0, 16.5, -6], [0, seatTopIn + 3, -8], 1, frameColor, m)
  addRoundedBox(group, 18, 17, 2.6, 0, seatTopIn + 8.5, -8.6, leatherColor, 3, m, -0.12)
  addRoundedBox(group, 16, 4, 1.4, 0, seatTopIn + 3.5, -7.4, leatherColor, 2, m, -0.12)
  for (let line = -2; line <= 2; line += 1) {
    addBox(group, 15, 0.08, 0.1, 0, seatTopIn + 8.5 + line * 2.6, -7.2, stitchColor, m)
  }

  // Armrests.
  for (const sideXIn of [-1, 1]) {
    addBox(group, 1.4, 6, 1.4, sideXIn * 9.6, seatTopIn + 3, -1, frameColor, m)
    addRoundedBox(group, 2.6, 1.5, 9, sideXIn * 9.6, seatTopIn + 6, -1, leatherColor, 0.6, m)
  }
}

function buildCatClawChair(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const seatColor = item.colors.primary
  const frameColor = item.colors.secondary ?? '#1b1b1b'
  const caneColor = item.colors.accent ?? '#c9a86a'
  const seatHeightIn = 17.5
  const legXIn = item.widthIn / 2 - 1.6
  const legZIn = item.depthIn / 2 - 1.6

  // Green leather seat cushion on a slim frame apron.
  addRoundedBox(group, item.widthIn, 2.6, item.depthIn, 0, seatHeightIn, 0, seatColor, 1, m)
  addBox(group, item.widthIn - 1.5, 1.6, item.depthIn - 1.5, 0, seatHeightIn - 2, 0, frameColor, m)

  // Front legs and rear legs that continue up as the back posts.
  addCylinderBetween(group, [legXIn, 0.4, legZIn], [legXIn - 0.6, seatHeightIn - 2, legZIn - 0.8], 0.55, frameColor, m)
  addCylinderBetween(group, [-legXIn, 0.4, legZIn], [-legXIn + 0.6, seatHeightIn - 2, legZIn - 0.8], 0.55, frameColor, m)
  addCylinderBetween(group, [legXIn, 0.4, -legZIn], [legXIn - 0.5, item.heightIn, -legZIn + 1.5], 0.6, frameColor, m)
  addCylinderBetween(group, [-legXIn, 0.4, -legZIn], [-legXIn + 0.5, item.heightIn, -legZIn + 1.5], 0.6, frameColor, m)

  // Stretchers between legs.
  addCylinderBetween(group, [legXIn - 0.3, 6, legZIn - 0.4], [legXIn - 0.3, 6, -legZIn + 1], 0.35, frameColor, m)
  addCylinderBetween(group, [-legXIn + 0.3, 6, legZIn - 0.4], [-legXIn + 0.3, 6, -legZIn + 1], 0.35, frameColor, m)
  addCylinderBetween(group, [-legXIn + 0.3, 6, legZIn - 0.4], [legXIn - 0.3, 6, legZIn - 0.4], 0.35, frameColor, m)

  // Rounded cane back panel between the rear posts.
  const backZIn = -item.depthIn / 2 + 2
  addRoundedBox(group, item.widthIn - 2, 10, 1.3, 0, 27, backZIn, frameColor, 2.4, m)
  addBox(group, item.widthIn - 6, 8, 0.4, 0, 27, backZIn + 0.5, caneColor, m)
  for (let index = -3; index <= 3; index += 1) {
    addBox(group, 0.15, 7.4, 0.5, index * ((item.widthIn - 7) / 7), 27, backZIn + 0.7, frameColor, m)
  }
  for (let index = -2; index <= 2; index += 1) {
    addBox(group, item.widthIn - 6.4, 0.15, 0.5, 0, 27 + index * 1.7, backZIn + 0.7, frameColor, m)
  }
}

function buildLinnmonTable(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const topColor = item.colors.primary
  const legColor = item.colors.secondary ?? topColor
  const footColor = item.colors.accent ?? legColor
  const topThicknessIn = 1.2
  const topYIn = item.heightIn - topThicknessIn / 2
  const legHeightIn = item.heightIn - topThicknessIn
  const legXIn = item.widthIn / 2 - 3
  const legZIn = item.depthIn / 2 - 3

  addRoundedBox(group, item.widthIn, topThicknessIn, item.depthIn, 0, topYIn, 0, topColor, 0.3, m)
  for (const xIn of [-legXIn, legXIn]) {
    for (const zIn of [-legZIn, legZIn]) {
      addConeFrustum(group, 0.85, 0.55, legHeightIn, xIn, legHeightIn / 2, zIn, legColor, m)
      addCylinder(group, 0.7, 0.4, xIn, 0.2, zIn, footColor, m)
    }
  }
}

function buildGourdLeg(
  group: THREE.Group,
  xIn: number,
  zIn: number,
  legHeightIn: number,
  color: string,
  m: InchesToMeters,
) {
  addSphere(group, 0.5, xIn, 0.5, zIn, color, m)
  addConeFrustum(group, 1.1, 0.6, legHeightIn * 0.45, xIn, legHeightIn * 0.32, zIn, color, m)
  addSphere(group, 1.05, xIn, legHeightIn * 0.6, zIn, color, m)
  addConeFrustum(group, 1.3, 0.9, legHeightIn * 0.3, xIn, legHeightIn * 0.88, zIn, color, m)
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

function buildCastleryArlenDiningTable(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const topThicknessIn = 0.5
  const apronHeightIn = 2.3
  const legHeightIn = item.heightIn - topThicknessIn
  const legSizeIn = 2.5
  const stoneColor = item.colors.primary
  const woodColor = item.colors.secondary ?? '#7a4a2c'
  const veinColor = item.colors.accent ?? stoneColor

  addRoundedBox(group, item.widthIn, topThicknessIn, item.depthIn, 0, item.heightIn - topThicknessIn / 2, 0, stoneColor, 1.2, m)
  addRoundedBox(group, item.widthIn - 3, apronHeightIn, item.depthIn - 3, 0, item.heightIn - topThicknessIn - apronHeightIn / 2, 0, woodColor, 1.1, m)

  const legXIn = item.widthIn / 2 - 5
  const legZIn = item.depthIn / 2 - 4.2
  for (const xIn of [-legXIn, legXIn]) {
    for (const zIn of [-legZIn, legZIn]) {
      addRoundedBox(group, legSizeIn, legHeightIn, legSizeIn, xIn, legHeightIn / 2, zIn, woodColor, 0.7, m)
    }
  }

  for (const zIn of [-item.depthIn * 0.24, 0, item.depthIn * 0.24]) {
    addBox(group, item.widthIn - 7, 0.035, 0.05, 0, item.heightIn + 0.03, zIn, veinColor, m)
  }
}

function buildMerlynDiningTable(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const topThicknessIn = 1.7
  const topYIn = item.heightIn - topThicknessIn / 2
  const legHeightIn = item.heightIn - topThicknessIn
  const endRadiusIn = item.depthIn / 2
  const centerLengthIn = item.widthIn - item.depthIn
  const woodColor = item.colors.primary
  const darkWood = item.colors.secondary ?? woodColor
  const grainColor = item.colors.accent ?? woodColor

  addBox(group, centerLengthIn, topThicknessIn, item.depthIn, 0, topYIn, 0, woodColor, m)
  for (const xIn of [-centerLengthIn / 2, centerLengthIn / 2]) {
    addCylinder(group, endRadiusIn, topThicknessIn, xIn, topYIn, 0, woodColor, m)
  }

  addTaperedOvalCylinder(group, 8.2, 10.2, legHeightIn, item.widthIn * 0.22, legHeightIn / 2, 0, 1.18, darkWood, m)

  const finXIn = -item.widthIn * 0.22
  const finHeightIn = legHeightIn * 0.84
  for (let index = 0; index < 3; index += 1) {
    const progress = index - 1
    addRoundedBox(
      group,
      4.8,
      finHeightIn - Math.abs(progress) * 1.6,
      item.depthIn * 0.52,
      finXIn + progress * 2.2,
      (finHeightIn - Math.abs(progress) * 1.6) / 2,
      progress * 1.9,
      darkWood,
      1.7,
      m,
      0,
      0.28 - progress * 0.12,
    )
  }

  for (let index = -4; index <= 4; index += 1) {
    addBox(group, item.widthIn - 7, 0.04, 0.05, 0, topYIn + 0.9, index * 2.6, grainColor, m)
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

function buildWallTv(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  addRoundedBox(group, item.widthIn, item.heightIn, item.depthIn, 0, item.heightIn / 2, 0, item.colors.primary, 0.8, m)
  addRoundedBox(group, item.widthIn - 1.5, item.heightIn - 1.5, 0.25, 0, item.heightIn / 2, item.depthIn / 2 + 0.13, item.colors.secondary ?? '#020617', 0.3, m)
  addBox(group, item.widthIn * 0.32, 1.2, 0.3, 0, 0.8, item.depthIn / 2 + 0.28, item.colors.accent ?? '#334155', m)
}

function buildWallArt(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  addRoundedBox(group, item.widthIn, item.heightIn, item.depthIn, 0, item.heightIn / 2, 0, item.colors.secondary ?? item.colors.primary, 0.5, m)
  addBox(group, item.widthIn - 2.5, item.heightIn - 2.5, 0.3, 0, item.heightIn / 2, item.depthIn / 2 + 0.16, item.colors.primary, m)
  addBox(group, item.widthIn * 0.65, item.heightIn * 0.28, 0.12, 0, item.heightIn * 0.38, item.depthIn / 2 + 0.34, item.colors.accent ?? item.colors.primary, m)
}

function buildFloatingConsole(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  addRoundedBox(group, item.widthIn, item.heightIn, item.depthIn, 0, item.heightIn / 2, 0, item.colors.primary, 1, m)
  addBox(group, 0.5, item.heightIn - 1.5, item.depthIn + 0.2, 0, item.heightIn / 2, 0.1, item.colors.secondary ?? item.colors.primary, m)
  for (const xIn of [-item.widthIn / 4, item.widthIn / 4]) {
    addBox(group, item.widthIn / 2 - 2, 0.35, 0.5, xIn, item.heightIn / 2 + 1, item.depthIn / 2 + 0.3, item.colors.accent ?? item.colors.primary, m)
  }
}

function buildMeasurementBlock(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const volume = new THREE.Mesh(
    new THREE.BoxGeometry(m(item.widthIn), m(item.heightIn), m(item.depthIn)),
    new THREE.MeshStandardMaterial({
      color: item.colors.primary,
      roughness: 0.45,
      metalness: 0,
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
    }),
  )
  volume.position.set(0, m(item.heightIn / 2), 0)
  group.add(volume)

  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(volume.geometry),
    new THREE.LineBasicMaterial({ color: item.colors.primary, transparent: true, opacity: 0.95 }),
  )
  outline.position.copy(volume.position)
  group.add(outline)

  const guideYIn = item.heightIn + 0.6
  addBox(group, item.widthIn, 0.18, 0.18, 0, guideYIn, -item.depthIn / 2 - 1, '#ef4444', m)
  addBox(group, 0.18, 0.18, item.depthIn, -item.widthIn / 2 - 1, guideYIn, 0, '#22c55e', m)
  addBox(group, 0.18, item.heightIn, 0.18, item.widthIn / 2 + 1, item.heightIn / 2, item.depthIn / 2 + 1, item.colors.accent ?? '#facc15', m)
}

function buildTaobaoFoldingTable(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const woodColor = item.colors.primary
  const bodyColor = item.colors.secondary ?? woodColor
  const grainColor = item.colors.accent ?? woodColor
  const topThicknessIn = 1.5
  const topYIn = item.heightIn - topThicknessIn / 2
  const casterHeightIn = 1.6
  const bodyBottomIn = casterHeightIn
  const bodyTopIn = item.heightIn - topThicknessIn
  const bodyHeightIn = bodyTopIn - bodyBottomIn

  // Folded-down tabletop panel.
  addRoundedBox(group, item.widthIn, topThicknessIn, item.depthIn, 0, topYIn, 0, woodColor, 0.6, m)

  // Central folded body holding the collapsed frame.
  addRoundedBox(group, item.widthIn - 4, bodyHeightIn, item.depthIn - 3, 0, bodyBottomIn + bodyHeightIn / 2, 0, bodyColor, 1, m)

  // Drop leaves folded down flat against the two ends.
  for (const sideXIn of [-1, 1]) {
    addRoundedBox(
      group,
      1.3,
      bodyHeightIn - 3,
      item.depthIn - 1,
      sideXIn * (item.widthIn / 2 - 0.65),
      bodyBottomIn + (bodyHeightIn - 3) / 2,
      0,
      woodColor,
      0.5,
      m,
    )
  }

  // Fold seam and grain lines on the top panel.
  addBox(group, item.widthIn - 6, 0.06, 0.4, 0, topYIn + topThicknessIn / 2, 0, grainColor, m)
  for (let index = -3; index <= 3; index += 1) {
    addBox(group, item.widthIn - 5, 0.05, 0.08, 0, topYIn + topThicknessIn / 2 + 0.01, index * 1.6, grainColor, m)
  }

  // Casters at the base so the folded table can roll away.
  const casterXIn = item.widthIn / 2 - 3
  const casterZIn = item.depthIn / 2 - 2.5
  for (const xIn of [-casterXIn, casterXIn]) {
    for (const zIn of [-casterZIn, casterZIn]) {
      addSphere(group, casterHeightIn / 2, xIn, casterHeightIn / 2, zIn, '#2a2320', m)
    }
  }
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

function buildPrismSingleFridge(group: THREE.Group, item: FurnitureDefinition, m: InchesToMeters) {
  const frontZIn = -item.depthIn / 2 - 0.08
  const doorGapIn = 0.35
  const upperDoorHeightIn = item.heightIn * 0.62
  const lowerDoorHeightIn = item.heightIn - upperDoorHeightIn - doorGapIn
  const lowerDoorCenterYIn = lowerDoorHeightIn / 2 + 1
  const upperDoorCenterYIn = lowerDoorHeightIn + doorGapIn + upperDoorHeightIn / 2 + 1

  addRoundedBox(group, item.widthIn, item.heightIn, item.depthIn, 0, item.heightIn / 2, 0, item.colors.primary, 1, m)
  addBox(group, item.widthIn - 1.1, upperDoorHeightIn, 0.35, 0, upperDoorCenterYIn, frontZIn, item.colors.secondary ?? item.colors.primary, m)
  addBox(group, item.widthIn - 1.1, lowerDoorHeightIn, 0.35, 0, lowerDoorCenterYIn, frontZIn, item.colors.secondary ?? item.colors.primary, m)
  addBox(group, item.widthIn - 1.4, 0.5, 0.55, 0, lowerDoorHeightIn + 1.2, frontZIn - 0.15, item.colors.accent ?? item.colors.primary, m)
  addBox(group, 1.1, item.heightIn - 6, 0.45, -item.widthIn / 2 + 1.3, item.heightIn / 2 + 1, frontZIn - 0.2, '#111111', m)
  addBox(group, 1.1, item.heightIn - 10, 0.45, item.widthIn / 2 - 1.3, item.heightIn / 2 + 1, frontZIn - 0.2, '#111111', m)
  addBox(group, item.widthIn, 2, item.depthIn - 1.2, 0, 1, 0.2, item.colors.accent ?? item.colors.primary, m)
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
  rotationY = 0,
) {
  const radius = Math.min(m(radiusIn), m(widthIn) / 3, m(heightIn) / 3, m(depthIn) / 3)
  const mesh = new THREE.Mesh(
    new RoundedBoxGeometry(m(widthIn), m(heightIn), m(depthIn), 3, radius),
    furnitureMaterial(color),
  )
  mesh.position.set(m(xIn), m(yIn), m(zIn))
  mesh.rotation.set(rotationX, rotationY, 0)
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

function addTaperedOvalCylinder(
  group: THREE.Group,
  topRadiusIn: number,
  bottomRadiusIn: number,
  heightIn: number,
  xIn: number,
  yIn: number,
  zIn: number,
  zScale: number,
  color: string,
  m: InchesToMeters,
) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(m(topRadiusIn), m(bottomRadiusIn), m(heightIn), 36),
    furnitureMaterial(color),
  )
  mesh.position.set(m(xIn), m(yIn), m(zIn))
  mesh.scale.z = zScale
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
