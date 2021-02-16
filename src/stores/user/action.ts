export const SelectTownActionType = 'SELECT_TOWN'
export const AddTownActionType = 'ADD_TOWN'
export const RemoveLastActionType = 'REMOVE_LAST_TOWN'

export type SelectTownAction = {
  type: typeof SelectTownActionType
  selectedIndex: number
  value: string
}

export type AddTownAction = {
  type: typeof AddTownActionType
}

export type RemoveLastTownAction = {
  type: typeof RemoveLastActionType
}

export type UserActions =
  | SelectTownAction
  | AddTownAction
  | RemoveLastTownAction

export const selectTown = (index: number, value: string) => {
  return {
    type: SelectTownActionType,
    selectedIndex: index,
    value,
  }
}
export const addTown = () => ({
  type: AddTownActionType,
})
export const removeLastTown = () => ({ type: RemoveLastActionType })
