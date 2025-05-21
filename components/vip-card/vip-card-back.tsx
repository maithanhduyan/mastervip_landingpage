"use client"
import { cn } from "@/lib/utils"
import { getTierStyles } from "@/utils/vip-card-styles"
import type { VIPCardBackProps } from "@/types/vip-card"

export function VIPCardBack({
  tier,
  customTierName,
  member,
  organization,
  backgroundImage,
  backgroundColor,
  accentColor,
  glowEffect,
  handleFlip,
}: VIPCardBackProps) {
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
        "absolute inset-0 backface-hidden rounded-xl p-6 flex flex-col justify-between rotate-y-180",
        "border border-opacity-30 transition-all duration-300",
        glowEffect && "shadow-lg",
      )}
      style={{
        backgroundColor: tierStyles.backgroundColor,
        borderColor: tierStyles.accentColor,
        boxShadow: glowEffect ? `0 0 15px ${tierStyles.accentColor}40` : "none",
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${backgroundImage})`
          : undefined,
        backgroundSize: backgroundImage ? "cover" : undefined,
        backgroundPosition: backgroundImage ? "center" : undefined,
      }}
      onClick={handleFlip}
    >
      {/* Magnetic Strip */}
      <div
        className="absolute top-8 left-0 right-0 h-12 bg-black bg-opacity-80"
        style={{
          borderTop: `1px solid ${tierStyles.accentColor}40`,
          borderBottom: `1px solid ${tierStyles.accentColor}40`,
        }}
      ></div>

      {/* Card Content */}
      <div className="mt-24 space-y-4">
        {/* Access Points */}
        <div
          className="bg-black bg-opacity-50 rounded-lg p-4 border border-opacity-20"
          style={{ borderColor: tierStyles.accentColor }}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Access Points</span>
            <span
              className="text-xl font-bold"
              style={{
                color: tierStyles.accentColor,
              }}
            >
              {member.accessPoints || 0}
            </span>
          </div>
        </div>

        {/* Custom Fields */}
        {member.customFields && Object.keys(member.customFields).length > 0 && (
          <div
            className="bg-black bg-opacity-50 rounded-lg p-4 border border-opacity-20"
            style={{ borderColor: tierStyles.accentColor }}
          >
            {Object.entries(member.customFields).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center mb-2 last:mb-0">
                <span className="text-sm text-gray-400">{key}</span>
                <span className="text-sm">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR Code Placeholder */}
      <div className="flex justify-center mt-4">
        <div className="bg-white p-2 rounded">
          <div className="w-24 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cGF0aCBkPSJNMCAwaDIwMHYyMDBIMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjkgMjloMzZ2MzZIMjl6TTc0IDI5aDEwdjEwaC0xMHpNOTMgMjloMTB2MTBoLTEwek0xMTIgMjloMTB2MTBoLTEwek0xMzEgMjloMTB2MTBoLTEwek0xNTAgMjloMjF2MjFoLTIxek0yOSA3NGgxMHYxMEgyOXpNNTYgNzRoMTB2MTBINTZNNzQgNzRoMTB2MTBoLTEwek05MyA3NGgxMHYxMGgtMTB6TTExMiA3NGgxMHYxMGgtMTB6TTEzMSA3NGgxMHYxMGgtMTB6TTE1MCA3NGgxMHYxMGgtMTB6TTI5IDkzaDEwdjEwSDI5ek01NiA5M2gxMHYxMEg1Nk03NCA5M2gxMHYxMGgtMTB6TTkzIDkzaDEwdjEwaC0xMHpNMTEyIDkzaDEwdjEwaC0xMHpNMTMxIDkzaDEwdjEwaC0xMHpNMTUwIDkzaDEwdjEwaC0xMHpNMjkgMTEyaDEwdjEwSDI5ek01NiAxMTJoMTB2MTBINTZ6TTc0IDExMmgxMHYxMGgtMTB6TTkzIDExMmgxMHYxMGgtMTB6TTExMiAxMTJoMTB2MTBoLTEwek0xMzEgMTEyaDEwdjEwaC0xMHpNMTUwIDExMmgxMHYxMGgtMTB6TTI5IDEzMWgxMHYxMEgyOXpNNTYgMTMxaDEwdjEwSDU2ek03NCAxMzFoMTB2MTBoLTEwek05MyAxMzFoMTB2MTBoLTEwek0xMTIgMTMxaDEwdjEwaC0xMHpNMTMxIDEzMWgxMHYxMGgtMTB6TTE1MCAxMzFoMTB2MTBoLTEwek0yOSAxNTBoMjF2MjFIMjl6TTc0IDE1MGgzNnYzNkg3NHpNMTMxIDE1MGgxMHYxMGgtMTB6TTE1MCAxNTBoMTB2MTBoLTEweiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')] bg-contain"></div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="text-center mt-4">
        <p className="text-xs text-gray-400">
          {organization.name} • {tier === "Custom" ? customTierName : tier} Membership
        </p>
      </div>
    </div>
  )
}
