import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { List, ListItem, ListItemContent, Typography } from '@mui/joy'
import { useMap } from '../map'

export const TripSummary = () => {
  const { directions } = useMap()

  if (!directions) {
    return null
  }

  const { distance, duration } = directions.routes[0].legs[0]

  if (!distance || !duration) {
    return null
  }

  return (
    <Fragment>
      <Typography variant="h3">Trip Summary</Typography>
      <List>
        <ListItem>
          <ListItemContent>Distance: { distance.text }</ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemContent>Duration: { duration.text }</ListItemContent>
        </ListItem>
      </List>
    </Fragment>
  )
}

TripSummary.propTypes = {
  tripLeg: PropTypes.object.isRequired,
}
