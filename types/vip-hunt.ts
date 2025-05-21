export interface Location {
  id: string
  name: string
  description: string
  address: string
  coordinates: {
    latitude: number
    longitude: number
  }
  pointsAvailable: number
  pointsType: PointType
  radius: number // Bán kính tính bằng mét
  expiresAt?: Date
  category: LocationCategory
  partnerInfo?: PartnerInfo
  requirements?: HuntRequirement[]
  isExclusive: boolean // Chỉ dành cho thành viên cấp cao
  image?: string
}

export interface PointDrop {
  id: string
  locationId: string
  pointsAmount: number
  pointType: PointType
  claimedBy?: string // User ID
  claimedAt?: Date
  expiresAt: Date
  rarity: PointRarity
  bonusMultiplier?: number
}

export interface HuntRequirement {
  type: RequirementType
  value: string | number
  description: string
}

export interface PartnerInfo {
  id: string
  name: string
  logo: string
  tier: PartnerTier
}

export interface HuntHistory {
  id: string
  userId: string
  pointDropId: string
  locationId: string
  pointsEarned: number
  timestamp: Date
  bonusApplied?: number
}

export interface HuntChallenge {
  id: string
  name: string
  description: string
  requiredLocations: string[] // Location IDs
  requiredLocationCount: number // Số lượng địa điểm cần ghé thăm
  timeLimit?: number // Thời gian giới hạn tính bằng giờ
  reward: {
    points: number
    pointType: PointType
    bonusItems?: BonusItem[]
  }
  startDate: Date
  endDate: Date
  isExclusive: boolean
}

export interface BonusItem {
  id: string
  name: string
  description: string
  image?: string
}

export enum PointType {
  STANDARD = "standard",
  PREMIUM = "premium",
  EXCLUSIVE = "exclusive",
  LIMITED = "limited",
  PARTNER = "partner",
}

export enum PointRarity {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  EPIC = "epic",
  LEGENDARY = "legendary",
}

export enum LocationCategory {
  RESTAURANT = "restaurant",
  BAR = "bar",
  CLUB = "club",
  HOTEL = "hotel",
  RETAIL = "retail",
  EVENT = "event",
  HIDDEN = "hidden",
}

export enum RequirementType {
  CHECK_IN = "check_in",
  PURCHASE = "purchase",
  TIME_SPENT = "time_spent",
  PHOTO = "photo",
  QR_SCAN = "qr_scan",
  PARTNER_ACTION = "partner_action",
}

export enum PartnerTier {
  STANDARD = "standard",
  PREMIUM = "premium",
  EXCLUSIVE = "exclusive",
}

export interface UserHuntStats {
  totalPointsCollected: number
  locationsVisited: number
  challengesCompleted: number
  rarePointsFound: number
  currentStreak: number
  longestStreak: number
  rank?: string
  tier?: string
}
