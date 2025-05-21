"use client"

import { useState } from "react"
import { VIPCard } from "@/components/vip-card/vip-card"
import type { VIPCardTier, VIPCardMember, VIPCardOrganization } from "@/types/vip-card"

interface VIPCardShowcaseProps {
  title: string
  description?: string
}

export function VIPCardShowcase({ title, description }: VIPCardShowcaseProps) {
  const [activeTier, setActiveTier] = useState<VIPCardTier>("Gold")
  const [flipOnHover, setFlipOnHover] = useState(true)

  const tiers: VIPCardTier[] = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"]

  const member: VIPCardMember = {
    id: "VIP12345",
    name: "John Wick",
    joinDate: "01/2023",
    expiryDate: "12/2025",
    accessPoints: 1250,
    customFields: {
      Status: "Active",
      Events: 24,
      Rewards: 15,
    },
  }

  const organization: VIPCardOrganization = {
    name: "MasterVIP",
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(to right, #d4af37, #f9d423, #d4af37)" }}
            >
              {title}
            </span>
          </h2>
          {description && <p className="text-xl text-gray-300 max-w-3xl mx-auto">{description}</p>}
          <div className="w-24 h-1 bg-yellow-600 mx-auto mt-6"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tiers.map((tier) => (
            <button
              key={tier}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTier === tier
                  ? "bg-yellow-600 text-black font-bold"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTier(tier)}
            >
              {tier}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <VIPCard
              tier={activeTier}
              member={member}
              organization={organization}
              flipOnHover={flipOnHover}
              glowEffect={true}
              animateOnMount={true}
            />
            <div className="mt-6 flex justify-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flipOnHover}
                  onChange={() => setFlipOnHover(!flipOnHover)}
                  className="form-checkbox h-5 w-5 text-yellow-600 rounded focus:ring-yellow-500"
                />
                <span className="text-gray-300">Flip on hover</span>
              </label>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-yellow-500">{activeTier} Tier Features</h3>
            <ul className="space-y-3">
              {getTierFeatures(activeTier).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 text-black font-bold rounded-md transition-colors">
                Get {activeTier} Membership
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function getTierFeatures(tier: VIPCardTier): string[] {
  const commonFeatures = ["Digital VIP card with unique design", "Access to exclusive events", "Member-only promotions"]

  const tierSpecificFeatures: Record<VIPCardTier, string[]> = {
    Bronze: ["Basic event access", "Standard rewards program", "Monthly newsletter"],
    Silver: ["Priority event access", "Enhanced rewards program", "Quarterly gift", "Dedicated support line"],
    Gold: [
      "VIP event access",
      "Premium rewards program",
      "Monthly gift",
      "24/7 concierge service",
      "Exclusive partner benefits",
    ],
    Platinum: [
      "All-access VIP pass",
      "Elite rewards program",
      "Personalized monthly gift",
      "Personal concierge",
      "Global partner benefits",
      "Priority reservations",
    ],
    Diamond: [
      "Unlimited all-access VIP pass",
      "Ultimate rewards program",
      "Luxury monthly gift",
      "Dedicated personal assistant",
      "Global elite benefits",
      "Private events and experiences",
      "Helicopter transfer service",
    ],
    Custom: [],
  }

  return [...commonFeatures, ...tierSpecificFeatures[tier]]
}
