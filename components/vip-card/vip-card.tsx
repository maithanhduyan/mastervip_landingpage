"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { VIPCardProps } from "@/types/vip-card"
import { VIPCardFront } from "./vip-card-front"
import { VIPCardBack } from "./vip-card-back"

export function VIPCard({
  tier,
  customTierName,
  member,
  organization,
  showFront = true,
  flipOnHover = false,
  glowEffect = true,
  animateOnMount = true,
  backgroundImage,
  backgroundColor,
  accentColor,
  className,
  onClick,
}: VIPCardProps) {
  const [isFlipped, setIsFlipped] = useState(!showFront)

  const handleFlip = () => {
    if (!flipOnHover) {
      setIsFlipped(!isFlipped)
    }
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div
      className={cn(
        "relative perspective-1000 w-full max-w-md mx-auto cursor-pointer",
        flipOnHover && "hover-trigger",
        className,
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleFlip()
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`VIP Card for ${organization.name}, tier: ${tier}`}
    >
      <motion.div
        className={cn(
          "relative w-full preserve-3d transition-transform duration-500",
          flipOnHover && "group-hover:rotate-y-180",
          isFlipped && "rotate-y-180",
        )}
        initial={animateOnMount ? { scale: 0.9, opacity: 0 } : false}
        animate={animateOnMount ? { scale: 1, opacity: 1 } : false}
        transition={{ duration: 0.5 }}
      >
        <VIPCardFront
          tier={tier}
          customTierName={customTierName}
          member={member}
          organization={organization}
          backgroundImage={backgroundImage}
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          glowEffect={glowEffect}
          handleFlip={handleFlip}
        />
        <VIPCardBack
          tier={tier}
          customTierName={customTierName}
          member={member}
          organization={organization}
          backgroundImage={backgroundImage}
          backgroundColor={backgroundColor}
          accentColor={accentColor}
          glowEffect={glowEffect}
          handleFlip={handleFlip}
        />
      </motion.div>
    </div>
  )
}
