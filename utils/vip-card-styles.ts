import type { VIPCardTier, VIPCardStyleProps } from "@/types/vip-card"

interface TierStyle {
  backgroundColor: string
  accentColor: string
  gradientFrom: string
  gradientTo: string
  textColor: string
}

export const getTierStyles = ({
  tier,
  customTierName,
  backgroundColor,
  accentColor,
  backgroundImage,
}: VIPCardStyleProps): TierStyle => {
  // Default styles based on tier
  const tierStyles: Record<VIPCardTier, TierStyle> = {
    Bronze: {
      backgroundColor: "#2d2a28",
      accentColor: "#cd7f32",
      gradientFrom: "#cd7f32",
      gradientTo: "#a05a2c",
      textColor: "#f5f5f5",
    },
    Silver: {
      backgroundColor: "#2a2d33",
      accentColor: "#c0c0c0",
      gradientFrom: "#c0c0c0",
      gradientTo: "#a8a8a8",
      textColor: "#f5f5f5",
    },
    Gold: {
      backgroundColor: "#2a2922",
      accentColor: "#d4af37",
      gradientFrom: "#d4af37",
      gradientTo: "#b8860b",
      textColor: "#f5f5f5",
    },
    Platinum: {
      backgroundColor: "#1a1a1a",
      accentColor: "#e5e4e2",
      gradientFrom: "#e5e4e2",
      gradientTo: "#a9a9a9",
      textColor: "#f5f5f5",
    },
    Diamond: {
      backgroundColor: "#1a1a2e",
      accentColor: "#b9f2ff",
      gradientFrom: "#b9f2ff",
      gradientTo: "#8cecff",
      textColor: "#f5f5f5",
    },
    Custom: {
      backgroundColor: backgroundColor || "#1a1a1a",
      accentColor: accentColor || "#d4af37",
      gradientFrom: accentColor || "#d4af37",
      gradientTo: accentColor ? `${accentColor}cc` : "#b8860b",
      textColor: "#f5f5f5",
    },
  }

  return tierStyles[tier]
}
