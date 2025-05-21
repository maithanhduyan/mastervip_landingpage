"use client"

import { useState, useEffect } from "react"

interface GeolocationState {
  position: {
    latitude: number
    longitude: number
  } | null
  error: string | null
  loading: boolean
}

export function useGeolocation(options?: PositionOptions) {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        position: null,
        error: "Geolocation không được hỗ trợ trên trình duyệt này",
        loading: false,
      })
      return
    }

    const geoWatchId = navigator.geolocation.watchPosition(
      (position) => {
        setState({
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error: null,
          loading: false,
        })
      },
      (error) => {
        setState({
          position: null,
          error: error.message,
          loading: false,
        })
      },
      options || {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    )

    return () => {
      navigator.geolocation.clearWatch(geoWatchId)
    }
  }, [options])

  return state
}
