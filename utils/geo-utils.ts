/**
 * Tính khoảng cách giữa hai điểm địa lý sử dụng công thức Haversine
 * @param lat1 Vĩ độ của điểm thứ nhất
 * @param lon1 Kinh độ của điểm thứ nhất
 * @param lat2 Vĩ độ của điểm thứ hai
 * @param lon2 Kinh độ của điểm thứ hai
 * @returns Khoảng cách tính bằng mét
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3 // Bán kính trái đất tính bằng mét
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δφ = ((lat2 - lat1) * Math.PI) / 180
  const Δλ = ((lon2 - lon1) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

/**
 * Kiểm tra xem người dùng có nằm trong phạm vi của một địa điểm không
 * @param userLat Vĩ độ của người dùng
 * @param userLon Kinh độ của người dùng
 * @param locationLat Vĩ độ của địa điểm
 * @param locationLon Kinh độ của địa điểm
 * @param radius Bán kính tính bằng mét
 * @returns true nếu người dùng nằm trong phạm vi, ngược lại false
 */
export function isWithinRadius(
  userLat: number,
  userLon: number,
  locationLat: number,
  locationLon: number,
  radius: number,
): boolean {
  const distance = calculateDistance(userLat, userLon, locationLat, locationLon)
  return distance <= radius
}

/**
 * Tạo một mã ngẫu nhiên để xác thực việc check-in
 * @returns Mã check-in ngẫu nhiên
 */
export function generateCheckInCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}
