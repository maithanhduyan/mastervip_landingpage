"use client"

import { useState } from "react"
import { useVIPHunt } from "@/contexts/vip-hunt-context"
import { MapPin, Clock, Award, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface NearbyLocationsProps {
  className?: string
}

export function NearbyLocations({ className }: NearbyLocationsProps) {
  const { nearbyLocations, availableDrops, loading, claimPoints } = useVIPHunt()
  const [expandedLocationId, setExpandedLocationId] = useState<string | null>(null)

  const handleLocationClick = (locationId: string) => {
    setExpandedLocationId(expandedLocationId === locationId ? null : locationId)
  }

  const handleClaimPoints = async (dropId: string) => {
    const success = await claimPoints(dropId)
    if (success) {
      // Hiển thị thông báo thành công
      alert("Chúc mừng! Bạn đã nhận được điểm VIP.")
    }
  }

  if (loading) {
    return (
      <div className={cn("bg-gray-900 rounded-xl p-6", className)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Địa điểm gần đây</h3>
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800 bg-opacity-50 rounded-lg p-4 animate-pulse">
              <div className="h-5 w-3/4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (nearbyLocations.length === 0) {
    return (
      <div className={cn("bg-gray-900 rounded-xl p-6", className)}>
        <div className="text-center py-8">
          <div className="bg-gray-800 p-3 rounded-full inline-flex mb-4">
            <MapPin className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Không tìm thấy địa điểm nào gần đây</h3>
          <p className="text-gray-400">Di chuyển đến khu vực khác để tìm kiếm điểm VIP</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("bg-gray-900 rounded-xl p-6", className)}>
      <h3 className="text-xl font-bold mb-4">Địa điểm gần đây</h3>
      <div className="space-y-4">
        {nearbyLocations.map((location) => {
          const drop = availableDrops.find((d) => d.locationId === location.id)
          const isExpanded = expandedLocationId === location.id

          return (
            <div
              key={location.id}
              className={cn(
                "bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden transition-all duration-300",
                location.isExclusive && "border border-yellow-600 border-opacity-50",
                isExpanded ? "max-h-96" : "max-h-24",
              )}
            >
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => handleLocationClick(location.id)}
              >
                <div className="flex items-center">
                  <div
                    className={cn(
                      "p-2 rounded-full mr-3",
                      location.isExclusive ? "bg-yellow-600 bg-opacity-20" : "bg-gray-700",
                    )}
                  >
                    <MapPin className={cn("h-5 w-5", location.isExclusive ? "text-yellow-500" : "text-gray-400")} />
                  </div>
                  <div>
                    <h4 className="font-bold">
                      {location.name}
                      {location.isExclusive && (
                        <span className="ml-2 text-xs bg-yellow-600 text-black px-2 py-0.5 rounded-full">
                          Độc quyền
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-400">{location.address}</p>
                  </div>
                </div>
                <ChevronRight
                  className={cn("h-5 w-5 text-gray-400 transition-transform", isExpanded && "transform rotate-90")}
                />
              </div>

              {isExpanded && (
                <div className="px-4 pb-4">
                  <div className="border-t border-gray-700 my-2"></div>
                  <p className="text-sm text-gray-300 mb-4">{location.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-300">{location.pointsAvailable} điểm có sẵn</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-400">{drop ? "Còn hiệu lực" : "Đã hết điểm"}</span>
                    </div>
                  </div>

                  {drop && (
                    <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-400">{drop.pointsAmount} điểm VIP</p>
                        <p className="text-xs text-gray-400">
                          Hết hạn trong{" "}
                          {Math.ceil((new Date(drop.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60))} giờ
                        </p>
                      </div>
                      <button
                        className="px-4 py-2 bg-yellow-600 text-black rounded-md font-medium text-sm hover:bg-yellow-500 transition-colors"
                        onClick={() => handleClaimPoints(drop.id)}
                      >
                        Nhận điểm
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
