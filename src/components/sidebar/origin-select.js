import { Fragment } from 'react'
import { List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Typography } from '@mui/joy'
import { Place as LocationIcon } from '@mui/icons-material'
import { useMap } from '../map'

export const OriginSelect = () => {
  const { setOrigin } = useMap()

  const handleClickUseOldWell = () => {
    setOrigin({ lat: 35.91223822347761, lng: -79.05119764301317 })
  }

  const handleClickUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude: lat, longitude: lng } = position.coords
      setOrigin({ lat, lng })
    })
  }

  return (
    <Fragment>
      <Typography component="label">Set an Origin</Typography>
      <List>
        <ListItem>
          <ListItemButton onClick={ handleClickUseOldWell }>
            <ListItemDecorator><LocationIcon /></ListItemDecorator>
            <ListItemContent>The Old Well</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>    
          <ListItemButton onClick={ handleClickUseCurrentLocation }>
            <ListItemDecorator><LocationIcon /></ListItemDecorator>
            <ListItemContent>My current location</ListItemContent>
          </ListItemButton>
        </ListItem>
      </List>
    </Fragment>
  )
}