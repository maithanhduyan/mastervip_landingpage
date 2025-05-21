"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useGeolocation } from "@/hooks/use-geolocation"
import { isWithinRadius } from "@/utils/geo-utils"
import type { Location, PointDrop, HuntHistory, HuntChallenge, UserHuntStats } from "@/types/vip-hunt"

// Mock data - trong thực tế sẽ được lấy từ API
const MOCK_LOCATIONS: Location[] = [
  {
    id: "loc1",
    name: "Continental Hotel",
    description: "Khách sạn sang trọng dành cho giới thượng lưu",
    address: "1 Wall Street, New York, NY",
    coordinates: {
      latitude: 40.7127,
      longitude: -74.0134,
    },
    pointsAvailable: 500,
    pointsType: "PREMIUM",
    radius: 50,
    category: "hotel" as any,
    isExclusive: true,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "loc2",
    name: "Noir Lounge",
    description: "Quán bar bí mật với những ly cocktail đẳng cấp",
    address: "123 Secret Ave, Los Angeles, CA",
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    pointsAvailable: 300,
    pointsType: "STANDARD",
    radius: 30,
    category: "bar" as any,
    isExclusive: false,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
  },
]

interface VIPHuntContextType {
  nearbyLocations: Location[]
  availableDrops: PointDrop[]
  userStats: UserHuntStats
  activeChallenges: HuntChallenge[]
  huntHistory: HuntHistory[]
  loading: boolean
  error: string | null
  claimPoints: (dropId: string) => Promise<boolean>
  refreshLocations: () => void
  startChallenge: (challengeId: string) => Promise<boolean>
}

const VIPHuntContext = createContext<VIPHuntContextType | undefined>(undefined)

export function VIPHuntProvider({ children }: { children: ReactNode }) {
  const { position, error: geoError, loading: geoLoading } = useGeolocation()
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([])
  const [availableDrops, setAvailableDrops] = useState<PointDrop[]>([])
  const [activeChallenges, setActiveChallenges] = useState<HuntChallenge[]>([])
  const [huntHistory, setHuntHistory] = useState<HuntHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userStats, setUserStats] = useState<UserHuntStats>({
    totalPointsCollected: 0,
    locationsVisited: 0,
    challengesCompleted: 0,
    rarePointsFound: 0,
    currentStreak: 0,
    longestStreak: 0,
  })

  // Cập nhật các địa điểm gần đó khi vị trí người dùng thay đổi
  useEffect(() => {
    if (geoError) {
      setError(geoError)
      setLoading(false)
      return
    }

    if (!position) return

    // Trong thực tế, sẽ gọi API để lấy các địa điểm gần đó
    // Ở đây chúng ta sử dụng dữ liệu mẫu
    const nearby = MOCK_LOCATIONS.filter((loc) =>
      isWithinRadius(
        position.latitude,
        position.longitude,
        loc.coordinates.latitude,
        loc.coordinates.longitude,
        5000, // Tìm trong bán kính 5km
      ),
    )

    setNearbyLocations(nearby)

    // Tạo các point drops cho các địa điểm gần đó
    const drops: PointDrop[] = nearby.map((loc) => ({
      id: `drop-${loc.id}`,
      locationId: loc.id,
      pointsAmount: Math.floor(Math.random() * loc.pointsAvailable),
      pointType: loc.pointsType,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Hết hạn sau 24 giờ
      rarity: Math.random() > 0.8 ? "RARE" : "COMMON",
    }))

    setAvailableDrops(drops)
    setLoading(false)
  }, [position, geoError])

  // Hàm để nhận điểm từ một drop
  const claimPoints = async (dropId: string): Promise<boolean> => {
    try {
      const drop = availableDrops.find((d) => d.id === dropId)
      if (!drop) return false

      const location = nearbyLocations.find((l) => l.id === drop.locationId)
      if (!location) return false

      // Kiểm tra xem người dùng có ở gần địa điểm không
      if (position && location.coordinates) {
        const isNearby = isWithinRadius(
          position.latitude,
          position.longitude,
          location.coordinates.latitude,
          location.coordinates.longitude,
          location.radius,
        )

        if (!isNearby) {
          setError("Bạn cần ở gần địa điểm để nhận điểm")
          return false
        }
      }

      // Trong thực tế, sẽ gọi API để xác nhận việc nhận điểm
      // Ở đây chúng ta giả lập thành công

      // Cập nhật lịch sử săn điểm
      const newHistory: HuntHistory = {
        id: `hist-${Date.now()}`,
        userId: "current-user", // Trong thực tế sẽ lấy từ authentication
        pointDropId: drop.id,
        locationId: location.id,
        pointsEarned: drop.pointsAmount,
        timestamp: new Date(),
      }

      setHuntHistory([newHistory, ...huntHistory])

      // Cập nhật thống kê người dùng
      setUserStats({
        ...userStats,
        totalPointsCollected: userStats.totalPointsCollected + drop.pointsAmount,
        locationsVisited: userStats.locationsVisited + 1,
        rarePointsFound: userStats.rarePointsFound + (drop.rarity === "RARE" ? 1 : 0),
        currentStreak: userStats.currentStreak + 1,
        longestStreak: Math.max(userStats.longestStreak, userStats.currentStreak + 1),
      })

      // Xóa drop đã nhận
      setAvailableDrops(availableDrops.filter((d) => d.id !== dropId))

      return true
    } catch (err) {
      setError("Có lỗi xảy ra khi nhận điểm")
      return false
    }
  }

  // Hàm để làm mới danh sách địa điểm
  const refreshLocations = () => {
    setLoading(true)
    // Trong thực tế, sẽ gọi API để lấy danh sách địa điểm mới
    // Ở đây chúng ta giả lập bằng cách đặt lại trạng thái loading
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // Hàm để bắt đầu một thử thách
  const startChallenge = async (challengeId: string): Promise<boolean> => {
    // Trong thực tế, sẽ gọi API để bắt đầu thử thách
    // Ở đây chúng ta giả lập thành công
    return true
  }

  return (
    <VIPHuntContext.Provider
      value={{
        nearbyLocations,
        availableDrops,
        userStats,
        activeChallenges,
        huntHistory,
        loading,
        error,
        claimPoints,
        refreshLocations,
        startChallenge,
      }}
    >
      {children}
    </VIPHuntContext.Provider>
  )
}

export function useVIPHunt() {
  const context = useContext(VIPHuntContext)
  if (context === undefined) {
    throw new Error("useVIPHunt must be used within a VIPHuntProvider")
  }
  return context
}
