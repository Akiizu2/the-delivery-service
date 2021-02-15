import { Route } from '../../helpers/town'

export const CalculateCostActionType = 'CALCULATE_DELIVERY_COST'

export type CalculateCostAction = {
  type: typeof CalculateCostActionType
  providedRoute: Route[]
  selectedDeliveryRoute: string[]
}

export const calculateDeliveryCost = (
  providedRoute: Route[],
  selectedDeliveryRoute: string[]
) => {
  return {
    type: CalculateCostActionType,
    providedRoute,
    selectedDeliveryRoute,
  }
}
