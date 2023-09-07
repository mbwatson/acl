import { Divider, Sheet, Stack } from '@mui/joy'
import { OriginSelect } from './origin-select'
import { DestinationSelect } from './destination-select'
import { TravelModeSelect } from './travel-mode-select'
import { TripSummary } from './trip-summary'

//

export const Sidebar = () => {

  return (
    <Sheet sx={{
      height: '100%',
      backgroundColor: '#ccc',
      color: '#eee',
      p: 2,
      'pre': {
        fontSize: '75%',
      },
    }}>
      <Stack gap={ 2 }>
        <TravelModeSelect />

        <Divider />

        <OriginSelect />

        <DestinationSelect />

        <Divider />

        <TripSummary />

      </Stack>

    </Sheet>
  )
}
