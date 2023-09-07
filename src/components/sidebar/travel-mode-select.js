import { FormControl, FormLabel, Select, Option } from '@mui/joy'
import { useMap } from '../map'

export const TravelModeSelect = () => {
  const {
    TRAVEL_MODES, travelMode, setTravelMode,
  } = useMap()

  const handleChangeTravelOption = (event, newMode) => {
    setTravelMode(newMode)
  }

  return (
    <FormControl>
      <FormLabel id="travel-mode-label" htmlFor="travel-mode-button">Travel Mode</FormLabel>
      <Select
        value={ travelMode }
        onChange={ handleChangeTravelOption }
        slotProps={{
          button: {
            id: 'travel-mode-button',
            // MUI set aria-labelledby correctly & automatically,
            // but Joy UI doesn't yet.
            'aria-labelledby': 'travel-mode-label travel-mode-button',
          },
        }}
      >
        {
          TRAVEL_MODES.map(mode => (
            <Option key={ `travel-option-${ mode }` } value={ mode }>{ mode }</Option>
          ))
        }
      </Select>
    </FormControl>
  )
}