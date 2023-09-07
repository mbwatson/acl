import {
  Fragment,
  useMemo,
  useCallback,
} from 'react'
import {
  Circle,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  MarkerClusterer
} from '@react-google-maps/api'
import { useMap } from './context'

//

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
}
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
}
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
}
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
}

export const Map = () => {
  const { directions, mapRef, origin, stationLocations, setDestination } = useMap()

  const mapOptions = useMemo(
    () => ({
      mapId: 'b181cac70f27f5e6',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  )

  const handleClickLocation = coords => {
    setDestination(coords)
  }

  const onLoad = useCallback(map => {
    mapRef.current = map
  }, [])

  return (
    <GoogleMap
      zoom={15}
      center={ origin }
      mapContainerClassName="map-container"
      options={ mapOptions }
      onLoad={ onLoad }
    >
      {
        directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: '#007abc',
                strokeWeight: 5,
              },
            }}
          />
        )
      }
      {
        origin && (
          <Fragment>
            <Marker position={origin} />

            <MarkerClusterer>
              {(clusterer) =>
                stationLocations.map((coords) => (
                  <Marker
                    key={coords.lat}
                    position={coords}
                    clusterer={clusterer}
                    onClick={ () => handleClickLocation(coords) }
                  />
                ))
              }
            </MarkerClusterer>

            <Circle center={ origin } radius={ 400 } options={ closeOptions } />
            <Circle center={ origin } radius={ 800 } options={ middleOptions } />
            <Circle center={ origin } radius={ 1200 } options={ farOptions } />
          </Fragment>
        )
      }
    </GoogleMap>
  )
}
