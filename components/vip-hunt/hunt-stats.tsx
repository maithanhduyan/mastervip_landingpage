"use client"

import { useVIPHunt } from "@/contexts/vip-hunt-context"
import { Award, MapPin, Trophy, Zap, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface HuntStatsProps {
  className?: string
}

export function HuntStats({ className }: HuntStatsProps) {
  const { userStats } = useVIPHunt()

  return (
    <div className={cn("bg-gray-900 rounded-xl p-6", className)}>
      <h3 className="text-xl font-bold mb-4">Thống kê săn điểm</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Award className="h-5 w-5 text-yellow-500 mr-2" />
            <h4 className="font-medium">Tổng điểm</h4>
          </div>
          <p className="text-2xl font-bold text-yellow-400">{userStats.totalPointsCollected}</p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-yellow-500 mr-2" />
            <h4 className="font-medium">Địa điểm</h4>
          </div>
          <p className="text-2xl font-bold">{userStats.locationsVisited}</p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
            <h4 className="font-medium">Thử thách</h4>
          </div>
          <p className="text-2xl font-bold">{userStats.challengesCompleted}</p>
        </div>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
            <h4 className="font-medium">Chuỗi ngày</h4>
          </div>
          <p className="text-2xl font-bold">{userStats.currentStreak}</p>
        </div>
      </div>

      {userStats.rank && (
        <div className="mt-4 bg-yellow-600 bg-opacity-20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-yellow-500 mr-2" />
              <h4 className="font-medium">Xếp hạng hiện tại</h4>
            </div>
            <p className="text-lg font-bold text-yellow-400">{userStats.rank}</p>
          </div>
        </div>
      )}
    </div>
  )
}
