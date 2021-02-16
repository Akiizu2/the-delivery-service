import { CalculateCostActionType } from './action'
import type { CalculateCostAction } from './action'
import type { CalculaterState } from './intialState'
import initialState from './intialState'
import { calculateCost } from '../../helpers/town'

const userReducer = (
  state = initialState,
  action: CalculateCostAction
): CalculaterState => {
  switch (action.type) {
    case CalculateCostActionType: {
      const { providedRoute, selectedDeliveryRoute } = action
      return {
        ...state,
        cost: calculateCost(providedRoute, selectedDeliveryRoute),
      }
    }
    default:
      return state
  }
}

export default userReducer
