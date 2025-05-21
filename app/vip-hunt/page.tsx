"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { VIPHuntProvider } from "@/contexts/vip-hunt-context"
import { HuntMap } from "@/components/vip-hunt/hunt-map"
import { NearbyLocations } from "@/components/vip-hunt/nearby-locations"
import { HuntStats } from "@/components/vip-hunt/hunt-stats"
import { HuntChallenges } from "@/components/vip-hunt/hunt-challenges"
import { MapPin, Trophy, Award, History } from "lucide-react"

export default function VIPHuntPage() {
  const [activeTab, setActiveTab] = useState<"map" | "challenges" | "stats" | "history">("map")

  return (
    <VIPHuntProvider>
      <div className="min-h-screen bg-black text-white">
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f9d423] to-[#d4af37] bg-clip-text text-transparent">
                VIP Hunt
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl">
              Săn tìm điểm VIP tại các địa điểm độc quyền. Hoàn thành thử thách và nhận phần thưởng đặc biệt.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                activeTab === "map" ? "bg-yellow-600 text-black font-medium" : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setActiveTab("map")}
            >
              <MapPin className="h-4 w-4 mr-2" />
              <span>Bản đồ</span>
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                activeTab === "challenges" ? "bg-yellow-600 text-black font-medium" : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setActiveTab("challenges")}
            >
              <Trophy className="h-4 w-4 mr-2" />
              <span>Thử thách</span>
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                activeTab === "stats" ? "bg-yellow-600 text-black font-medium" : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setActiveTab("stats")}
            >
              <Award className="h-4 w-4 mr-2" />
              <span>Thống kê</span>
            </button>
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                activeTab === "history" ? "bg-yellow-600 text-black font-medium" : "bg-gray-800 text-gray-300"
              }`}
              onClick={() => setActiveTab("history")}
            >
              <History className="h-4 w-4 mr-2" />
              <span>Lịch sử</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2">
              {activeTab === "map" && <HuntMap className="mb-6" />}
              {activeTab === "map" && <NearbyLocations />}
              {activeTab === "challenges" && <HuntChallenges />}
              {activeTab === "stats" && (
                <div className="bg-gray-900 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Thống kê chi tiết</h3>
                  <p className="text-gray-400">Đang phát triển...</p>
                </div>
              )}
              {activeTab === "history" && (
                <div className="bg-gray-900 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">Lịch sử săn điểm</h3>
                  <p className="text-gray-400">Đang phát triển...</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <HuntStats />
              {activeTab !== "challenges" && <HuntChallenges />}
            </div>
          </div>
        </main>
      </div>
    </VIPHuntProvider>
  )
}
