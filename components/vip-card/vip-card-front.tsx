"use client"
import { cn } from "@/lib/utils"
import { getTierStyles } from "@/utils/vip-card-styles"
import type { VIPCardFrontProps } from "@/types/vip-card"

export function VIPCardFront({
  tier,
  customTierName,
  member,
  organization,
  backgroundImage,
  backgroundColor,
  accentColor,
  glowEffect,
  handleFlip,
}: VIPCardFrontProps) {
  const tierStyles = getTierStyles({
    tier,
    customTierName,
    backgroundColor,
    accentColor,
    backgroundImage,
  })

  return (
    <div
      className={cn(
        "absolute inset-0 backface-hidden rounded-xl p-6 flex flex-col justify-between",
        "border border-opacity-30 transition-all duration-300",
        glowEffect && "shadow-lg",
        "bg-gradient-to-br",
      )}
      style={{
        backgroundColor: tierStyles.backgroundColor,
        borderColor: tierStyles.accentColor,
        boxShadow: glowEffect ? `0 0 15px ${tierStyles.accentColor}40` : "none",
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`
          : `linear-gradient(to bottom right, ${tierStyles.backgroundColor}, ${tierStyles.backgroundColor}cc)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleFlip}
    >
      {/* Card Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          {organization.logo ? (
            <img
              src={organization.logo || "/placeholder.svg"}
              alt={`${organization.name} logo`}
              className="h-8 w-auto mr-2"
            />
          ) : (
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center mr-2"
              style={{ backgroundColor: tierStyles.accentColor }}
            >
              <span className="text-xs font-bold text-black">{organization.name.charAt(0)}</span>
            </div>
          )}
          <span
            className="text-lg font-bold"
            style={{
              backgroundImage: `linear-gradient(90deg, ${tierStyles.gradientFrom}, ${tierStyles.gradientTo})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {organization.name}
          </span>
        </div>
        <span className="text-xs text-gray-400">#{member.id.slice(-4)}</span>
      </div>

      {/* Card Body */}
      <div className="flex-grow flex items-center justify-center mb-6">
        <div className="text-center">
          {member.avatar ? (
            <div
              className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-2"
              style={{ borderColor: tierStyles.accentColor }}
            >
              <img
                src={member.avatar || "/placeholder.svg"}
                alt={member.name || "VIP Member"}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}
          <div
            className="text-2xl font-bold mb-1"
            style={{
              backgroundImage: `linear-gradient(90deg, ${tierStyles.gradientFrom}, ${tierStyles.gradientTo})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {member.name || "VIP Member"}
          </div>
          <div className="text-sm text-gray-400">Member since {member.joinDate || "2023"}</div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-400">VALID THRU</p>
          <p className="text-sm">{member.expiryDate || "LIFETIME"}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">TIER</p>
          <p
            className="text-sm font-semibold"
            style={{
              color: tierStyles.accentColor,
            }}
          >
            {tier === "Custom" ? customTierName : tier}
          </p>
        </div>
      </div>

      {/* Watermark */}
      {organization.watermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <img src={organization.watermark || "/placeholder.svg"} alt="" className="w-3/4 h-auto" />
        </div>
      )}

      {/* Chip */}
      <div
        className="absolute top-1/2 left-6 transform -translate-y-1/2 w-10 h-7 rounded"
        style={{
          background: `linear-gradient(135deg, ${tierStyles.gradientFrom}80, ${tierStyles.gradientTo}80)`,
          boxShadow: `0 0 5px ${tierStyles.accentColor}40`,
        }}
      ></div>
    </div>
  )
}
