import { Fragment } from 'react'
import { IconButton, List, ListItem, ListItemButton, ListItemContent, ListItemDecorator, Typography } from '@mui/joy'
import { Place as LocationIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useMap } from '../map'

export const DestinationSelect = () => {
  const { destination, setDestination, stationLocations } = useMap()

  const handleClickStation = coords => {
    setDestination(coords)
  }

  const handleClickUnsetStation = () => {
    setDestination(null)
  }

  return (
    <Fragment>
      <Typography component="label">Set a Destination</Typography>
      <List>
        {
          stationLocations.map(({ id, lat, lng }) => (
            <ListItem key={ `station-${ id }}`}
              endAction={
                destination?.lat === lat && destination?.lng === lng && (
                  <IconButton>
                    <DeleteIcon onClick={ handleClickUnsetStation } />
                  </IconButton>
                )
              }
            >
              <ListItemButton onClick={ () => handleClickStation({ lat, lng }) }>
                <ListItemDecorator><LocationIcon /></ListItemDecorator>
                <ListItemContent>Station { id }</ListItemContent>
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </Fragment>
  )
}