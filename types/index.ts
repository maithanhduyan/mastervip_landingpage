export interface VIPCardProps {
  tier: string
  holderId: string
  accessPoints: number
  issueDate?: string
}

export interface FeatureProps {
  icon: string
  title: string
  description: string
}

export interface PilotLocationProps {
  country: string
  city: string
  description: string
  venueCount: number
  imageUrl: string
  emoji: string
}

export type VIPTier = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond"
