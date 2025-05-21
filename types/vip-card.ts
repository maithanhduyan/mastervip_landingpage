export type VIPCardTier = "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Custom"

export interface VIPCardMember {
  id: string
  name?: string
  avatar?: string
  joinDate?: string
  expiryDate?: string
  accessPoints?: number
  customFields?: Record<string, string | number>
}

export interface VIPCardOrganization {
  name: string
  logo?: string
  watermark?: string
}

export interface VIPCardProps {
  /** The tier/level of the VIP card */
  tier: VIPCardTier
  /** Custom tier name (if tier is "Custom") */
  customTierName?: string
  /** Member information */
  member: VIPCardMember
  /** Organization that issued the card */
  organization: VIPCardOrganization
  /** Whether to show the card front (true) or back (false) */
  showFront?: boolean
  /** Whether to enable flip animation on hover */
  flipOnHover?: boolean
  /** Whether to enable glow effect */
  glowEffect?: boolean
  /** Whether to animate the card on mount */
  animateOnMount?: boolean
  /** Custom background image URL */
  backgroundImage?: string
  /** Custom background color */
  backgroundColor?: string
  /** Custom accent color */
  accentColor?: string
  /** Additional CSS class names */
  className?: string
  /** Click handler */
  onClick?: () => void
}

export interface VIPCardStyleProps {
  tier: VIPCardTier
  customTierName?: string
  backgroundColor?: string
  accentColor?: string
  backgroundImage?: string
}

export interface VIPCardFrontProps extends VIPCardProps {
  handleFlip?: () => void
}

export interface VIPCardBackProps extends VIPCardProps {
  handleFlip?: () => void
}
