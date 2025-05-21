"use client"

import { useState } from "react"
import { useVIPHunt } from "@/contexts/vip-hunt-context"
import { Trophy, Clock, Award, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface HuntChallengesProps {
  className?: string
}

// Mock data - trong thực tế sẽ được lấy từ API
const MOCK_CHALLENGES = [
  {
    id: "challenge1",
    name: "Tour Quán Bar Bí Mật",
    description: "Ghé thăm 3 quán bar bí mật trong vòng 48 giờ",
    requiredLocations: ["loc1", "loc2", "loc3"],
    requiredLocationCount: 3,
    timeLimit: 48,
    reward: {
      points: 1000,
      pointType: "premium" as any,
      bonusItems: [
        {
          id: "bonus1",
          name: "Cocktail Miễn Phí",
          description: "Một ly cocktail miễn phí tại bất kỳ quán bar đối tác nào",
        },
      ],
    },
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày sau
    isExclusive: false,
  },
  {
    id: "challenge2",
    name: "Săn Tìm Kho Báu VIP",
    description: "Tìm và nhận điểm tại 5 địa điểm độc quyền",
    requiredLocations: ["loc4", "loc5", "loc6", "loc7", "loc8"],
    requiredLocationCount: 5,
    reward: {
      points: 2500,
      pointType: "exclusive" as any,
    },
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 ngày sau
    isExclusive: true,
  },
]

export function HuntChallenges({ className }: HuntChallengesProps) {
  const { startChallenge } = useVIPHunt()
  const [expandedChallengeId, setExpandedChallengeId] = useState<string | null>(null)
  const [challenges] = useState(MOCK_CHALLENGES)

  const handleChallengeClick = (challengeId: string) => {
    setExpandedChallengeId(expandedChallengeId === challengeId ? null : challengeId)
  }

  const handleStartChallenge = async (challengeId: string) => {
    const success = await startChallenge(challengeId)
    if (success) {
      alert("Thử thách đã bắt đầu! Hãy hoàn thành nó để nhận phần thưởng.")
    }
  }

  if (challenges.length === 0) {
    return (
      <div className={cn("bg-gray-900 rounded-xl p-6", className)}>
        <div className="text-center py-8">
          <div className="bg-gray-800 p-3 rounded-full inline-flex mb-4">
            <Trophy className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Không có thử thách nào</h3>
          <p className="text-gray-400">Hãy quay lại sau để xem các thử thách mới</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("bg-gray-900 rounded-xl p-6", className)}>
      <h3 className="text-xl font-bold mb-4">Thử thách săn điểm</h3>
      <div className="space-y-4">
        {challenges.map((challenge) => {
          const isExpanded = expandedChallengeId === challenge.id
          const daysLeft = Math.ceil((new Date(challenge.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

          return (
            <div
              key={challenge.id}
              className={cn(
                "bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden transition-all duration-300",
                challenge.isExclusive && "border border-yellow-600 border-opacity-50",
                isExpanded ? "max-h-96" : "max-h-24",
              )}
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => handleChallengeClick(challenge.id)}
              >
                <div className="flex items-center">
                  <div
                    className={cn(
                      "p-2 rounded-full mr-3",
                      challenge.isExclusive ? "bg-yellow-600 bg-opacity-20" : "bg-gray-700",
                    )}
                  >
                    <Trophy className={cn("h-5 w-5", challenge.isExclusive ? "text-yellow-500" : "text-gray-400")} />
                  </div>
                  <div>
                    <h4 className="font-bold">
                      {challenge.name}
                      {challenge.isExclusive && (
                        <span className="ml-2 text-xs bg-yellow-600 text-black px-2 py-0.5 rounded-full">
                          Độc quyền
                        </span>
                      )}
                    </h4>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Còn {daysLeft} ngày</span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={cn("h-5 w-5 text-gray-400 transition-transform", isExpanded && "transform rotate-90")}
                />
              </div>

              {isExpanded && (
                <div className="px-4 pb-4">
                  <div className="border-t border-gray-700 my-2"></div>
                  <p className="text-sm text-gray-300 mb-4">{challenge.description}</p>

                  <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 mb-4">
                    <h5 className="font-medium mb-2 flex items-center">
                      <Award className="h-4 w-4 text-yellow-500 mr-2" />
                      Phần thưởng
                    </h5>
                    <div className="flex items-center justify-between">
                      <p className="text-yellow-400 font-bold">{challenge.reward.points} điểm</p>
                      {challenge.reward.bonusItems && challenge.reward.bonusItems.length > 0 && (
                        <p className="text-sm text-gray-300">
                          +{challenge.reward.bonusItems.length} phần thưởng bổ sung
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-300">{challenge.requiredLocationCount} địa điểm cần ghé thăm</p>
                      {challenge.timeLimit && (
                        <p className="text-xs text-gray-400">Hoàn thành trong {challenge.timeLimit} giờ</p>
                      )}
                    </div>
                    <button
                      className="px-4 py-2 bg-yellow-600 text-black rounded-md font-medium text-sm hover:bg-yellow-500 transition-colors"
                      onClick={() => handleStartChallenge(challenge.id)}
                    >
                      Bắt đầu
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
