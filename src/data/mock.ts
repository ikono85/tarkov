export const QUESTS = [
  {
    id: 1,
    name: "Debut",
    trader: "Prapor",
    map: "Douanes",
    status: "active",
    objectives: [
      { id: 1, text: "Tuer 5 Scavs sur Douanes", done: true },
      { id: 2, text: "Trouver 3 MP-133 (Found in Raid)", done: false },
      { id: 3, text: "Retourner en vie depuis Douanes", done: false },
    ],
    rewards: ["15 000 ₽", "+0.2 Prapor", "Clé Bureau 114"],
    keepers: ["MP-133 ×3"],
  },
  {
    id: 2,
    name: "Fishing Gear",
    trader: "Ragman",
    map: "Shoreline",
    status: "todo",
    objectives: [
      { id: 1, text: "Trouver des équipements de pêche sur Shoreline", done: false },
      { id: 2, text: "Marquer le bateau avec un émetteur", done: false },
    ],
    rewards: ["22 000 ₽", "Gilet 6B5-15"],
    keepers: ["Émetteur"],
  },
  {
    id: 3,
    name: "The Survivalist Path",
    trader: "Jaeger",
    map: "Woods",
    status: "done",
    objectives: [
      { id: 1, text: "Survivre à 3 raids sur Woods", done: true },
      { id: 2, text: "Tuer 10 Scavs avec des armes de type pistolet", done: true },
    ],
    rewards: ["35 000 ₽", "+0.3 Jaeger", "PM pistol"],
    keepers: [],
  },
];

export const STASH_ITEMS = [
  {
    id: 1, name: "LEDX", icon: "💊", qty: 1,
    action: "keep",
    reason: "Quête future · Therapist",
    fleaPrice: 820000, traderPrice: 630000,
  },
  {
    id: 2, name: "GPU", icon: "💻", qty: 3,
    action: "keep2sell1",
    reason: "Bitcoin Farm requis ×2",
    fleaPrice: 480000, traderPrice: 350000,
  },
  {
    id: 3, name: "AK-74N", icon: "🔫", qty: 2,
    action: "sell",
    reason: "Pas de quête · surplus",
    fleaPrice: 78000, traderPrice: 52000,
  },
  {
    id: 4, name: "Moteur V12", icon: "⚙️", qty: 3,
    action: "keep2sell1",
    reason: "Hideout besoin ×2",
    fleaPrice: 245000, traderPrice: 180000,
  },
  {
    id: 5, name: "Tetriz", icon: "📱", qty: 1,
    action: "keep",
    reason: "Bitcoin barter",
    fleaPrice: 320000, traderPrice: 240000,
  },
  {
    id: 6, name: "Morphine", icon: "💉", qty: 4,
    action: "sell",
    reason: "En surplus · pas de quête active",
    fleaPrice: 25000, traderPrice: 18000,
  },
  {
    id: 7, name: "Docs case 0052", icon: "📁", qty: 1,
    action: "keep",
    reason: "Quête future · Skier",
    fleaPrice: 0, traderPrice: 0,
  },
];

export const HIDEOUT_MODULES = [
  {
    id: 1, name: "Workbench", level: 2, maxLevel: 3, pct: 66,
    needs: ["4× GPU", "2× VPX Flash Drive", "3× WD-40 100ml"],
    profit: "Craft munitions, réduction coût",
  },
  {
    id: 2, name: "Medstation", level: 2, maxLevel: 3, pct: 66,
    needs: ["5× Charbon actif", "2× CPU Fan"],
    profit: "Craft Salewa, IFAK",
  },
  {
    id: 3, name: "Bitcoin Farm", level: 1, maxLevel: 3, pct: 33,
    needs: ["10× GPU", "Workbench Niv 2"],
    profit: "~180k ₽/24h passif",
  },
  {
    id: 4, name: "Water collector", level: 3, maxLevel: 3, pct: 100,
    needs: [],
    profit: "Maxé ✓",
  },
  {
    id: 5, name: "Nutrition unit", level: 1, maxLevel: 3, pct: 33,
    needs: ["3× Tournevis", "2× Condensateur"],
    profit: "Craft nourriture",
  },
  {
    id: 6, name: "Generator", level: 3, maxLevel: 3, pct: 100,
    needs: [],
    profit: "Maxé ✓",
  },
];

export const TEAM_PLAYERS = [
  {
    id: 1, name: "MedKit_57", initials: "MK", country: "🇫🇷", countryName: "France",
    level: 34, server: "EU", discord: "MedKit#5741", invite: "",
    style: ["Quêtes", "Douanes"], langs: ["FR", "EN"], color: "#1a3a2a",
  },
  {
    id: 2, name: "RatTactique", initials: "RT", country: "🇫🇷", countryName: "France",
    level: 52, server: "EU", discord: "RatTac#0042", invite: "",
    style: ["PvP", "Factory"], langs: ["FR"], color: "#1a2a3a",
  },
  {
    id: 3, name: "ShadowViper", initials: "SV", country: "🇧🇪", countryName: "Belgique",
    level: 28, server: "EU", discord: "", invite: "https://discord.gg/shadow",
    style: ["Farm", "Reserve"], langs: ["FR"], color: "#3a2a1a",
  },
  {
    id: 4, name: "AlphaScav", initials: "AS", country: "🇨🇦", countryName: "Canada",
    level: 41, server: "NA", discord: "AlphaS#7291", invite: "",
    style: ["Quêtes", "Labs"], langs: ["FR", "EN"], color: "#2a1a3a",
  },
];

export const PRICE_ITEMS = [
  { name: "LEDX", icon: "💊", today: 820000, avg7: 784000, avg30: 756000, trader: 630000, category: "Électronique", history: [720,740,710,780,820,790,820] },
  { name: "GPU", icon: "💻", today: 480000, avg7: 465000, avg30: 450000, trader: 350000, category: "Électronique", history: [430,450,440,460,480,470,480] },
  { name: "Tetriz", icon: "📱", today: 320000, avg7: 310000, avg30: 295000, trader: 240000, category: "Électronique", history: [280,290,300,310,305,315,320] },
  { name: "Bitcoin (physique)", icon: "₿", today: 1100000, avg7: 1050000, avg30: 980000, trader: 850000, category: "Barter", history: [900,950,1000,980,1050,1080,1100] },
  { name: "Morphine", icon: "💉", today: 25000, avg7: 23000, avg30: 22000, trader: 18000, category: "Médical", history: [20,21,22,23,24,23,25] },
  { name: "Salewa", icon: "🩺", today: 42000, avg7: 40000, avg30: 38000, trader: 30000, category: "Médical", history: [35,37,38,39,41,40,42] },
];
