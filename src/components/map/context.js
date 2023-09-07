import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react'
import PropTypes from 'prop-types'
import { useLoadScript } from '@react-google-maps/api'

//  

const defaultCenter = { lat: 35.909580, lng: -79.045311 } // UNC-CH

const DEFAULT_ORIGIN = { lat: 35.909580, lng: -79.045311 }

const TRAVEL_MODES = [
  'WALKING',
  'BICYCLING',
  'DRIVING',
]

const generateStations = (count, position) => {
  const _stations = []
  for (let i = 0; i < count; i += 1) {
    const direction = Math.random() < 0.5 ? -100 : 100
    _stations.push({
      id: i,
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    })
  }
  return _stations
}
const MapContext = createContext({ })
export const useMap = () => useContext(MapContext)

export const MapProvider = ({ children }) => {
  const [origin, setOrigin] = useState({ ...DEFAULT_ORIGIN })
  const [destination, setDestination] = useState(null)
  const [travelMode, setTravelMode] = useState(TRAVEL_MODES[0])
  const stationLocations = useMemo(() => [...generateStations(8, origin)], [])
  const [directions, setDirections] = useState()
  const mapRef = useRef()
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    // libraries: ['places'],
  })

  useEffect(() => {
    const fetchDirections = () => {
      const service = new window.google.maps.DirectionsService()
      service.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode[travelMode],
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setDirections(result)
          }
        }
      )
    }

    if (isLoaded && origin && destination && window.google) {
      fetchDirections()
    } else {
      setDirections(null)
    }
  }, [destination, travelMode])

  console.log({
    isLoaded,
    stationLocations,
    origin,
    directions,
    travelMode,
  })

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <MapContext.Provider value={{
      mapRef,
      origin, setOrigin,
      stationLocations,
      destination, setDestination,
      directions,
      TRAVEL_MODES, travelMode, setTravelMode,
    }}>
      { children }
    </MapContext.Provider>
  )
}

MapProvider.propTypes = {
  children: PropTypes.node,
}
