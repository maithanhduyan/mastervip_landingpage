"use client"

import { useState, useEffect, useRef } from "react"
import { useVIPHunt } from "@/contexts/vip-hunt-context"
import { MapPin, Crosshair, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Location } from "@/types/vip-hunt"

interface HuntMapProps {
  className?: string
}

export function HuntMap({ className }: HuntMapProps) {
  const { nearbyLocations, availableDrops, loading, error, claimPoints } = useVIPHunt()
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  // Trong thực tế, sẽ tích hợp với Google Maps hoặc Mapbox
  // Ở đây chúng ta tạo một bản đồ giả lập đơn giản

  useEffect(() => {
    // Giả lập thời gian tải bản đồ
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location)
  }

  const handleClaimPoints = async (dropId: string) => {
    const success = await claimPoints(dropId)
    if (success) {
      // Hiển thị thông báo thành công
      alert("Chúc mừng! Bạn đã nhận được điểm VIP.")
      setSelectedLocation(null)
    }
  }

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center h-96 bg-gray-900 rounded-xl", className)}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Đang tải bản đồ...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("flex items-center justify-center h-96 bg-gray-900 rounded-xl", className)}>
        <div className="text-center p-6">
          <div className="bg-red-900 bg-opacity-20 p-3 rounded-full inline-flex mb-4">
            <Crosshair className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Không thể tải bản đồ</h3>
          <p className="text-gray-400">{error}</p>
          <button className="mt-4 px-4 py-2 bg-yellow-600 text-black rounded-md font-medium">Thử lại</button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative h-96 bg-gray-900 rounded-xl overflow-hidden", className)}>
      {/* Bản đồ giả lập */}
      <div
        ref={mapRef}
        className={cn(
          "absolute inset-0 bg-gray-800 transition-opacity duration-1000",
          mapLoaded ? "opacity-100" : "opacity-0",
        )}
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1553547274-0df401ae03c9?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(80%) brightness(0.4)",
        }}
      >
        {/* Lớp phủ bản đồ */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
      </div>

      {/* Vị trí người dùng */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="h-6 w-6 rounded-full bg-yellow-500 animate-pulse"></div>
          <div className="absolute top-0 left-0 h-6 w-6 rounded-full bg-yellow-500 animate-ping opacity-75"></div>
        </div>
      </div>

      {/* Các địa điểm trên bản đồ */}
      {nearbyLocations.map((location) => {
        const drop = availableDrops.find((d) => d.locationId === location.id)
        const isSelected = selectedLocation?.id === location.id

        return (
          <div
            key={location.id}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300",
              isSelected ? "scale-125 z-10" : "hover:scale-110",
            )}
            style={{
              top: `${Math.random() * 60 + 20}%`,
              left: `${Math.random() * 60 + 20}%`,
            }}
            onClick={() => handleLocationClick(location)}
          >
            <div className={cn("flex flex-col items-center", isSelected && "filter drop-shadow-lg")}>
              <div
                className={cn(
                  "p-2 rounded-full",
                  location.isExclusive ? "bg-yellow-600 bg-opacity-80" : "bg-gray-700 bg-opacity-80",
                  isSelected && "ring-2 ring-yellow-400",
                )}
              >
                <MapPin className={cn("h-6 w-6", location.isExclusive ? "text-black" : "text-yellow-500")} />
              </div>
              {isSelected && (
                <div className="mt-2 bg-black bg-opacity-80 p-2 rounded-md text-center min-w-[120px]">
                  <p className="text-sm font-bold text-white">{location.name}</p>
                  {drop && (
                    <div className="mt-1">
                      <p className="text-xs text-yellow-400">{drop.pointsAmount} điểm</p>
                      <button
                        className="mt-2 px-3 py-1 bg-yellow-600 text-black text-xs rounded-md font-medium"
                        onClick={() => handleClaimPoints(drop.id)}
                      >
                        Nhận điểm
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* Điều khiển bản đồ */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button className="p-2 bg-black bg-opacity-70 rounded-full hover:bg-opacity-90 transition-all">
          <Award className="h-5 w-5 text-yellow-500" />
        </button>
        <button className="p-2 bg-black bg-opacity-70 rounded-full hover:bg-opacity-90 transition-all">
          <Crosshair className="h-5 w-5 text-yellow-500" />
        </button>
      </div>

      {/* Chỉ dẫn */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 p-2 rounded-md">
        <p className="text-xs text-gray-300">Nhấn vào điểm đánh dấu để xem chi tiết</p>
      </div>
    </div>
  )
}
