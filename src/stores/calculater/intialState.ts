import { COST_CODE } from '../../helpers/town'

export interface CalculaterState {
  cost: number
}

const calculaterState: CalculaterState = {
  cost: COST_CODE.HAVE_NONE_SELECT_TOWN,
}

export default calculaterState
