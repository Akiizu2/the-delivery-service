import {
  AddTownActionType,
  RemoveLastActionType,
  SelectTownActionType,
} from './action'
import type { UserActions } from './action'
import { NONE_SELECT_VALUE, UserState } from './intialState'
import initialState from './intialState'

const userReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case SelectTownActionType: {
      const { selectedIndex, value } = action
      const clonedState = [...state.selectedTown]
      clonedState[selectedIndex] = value
      return {
        ...state,
        selectedTown: clonedState,
      }
    }
    case AddTownActionType: {
      return {
        ...state,
        selectedTown: [...state.selectedTown, NONE_SELECT_VALUE],
      }
    }
    case RemoveLastActionType: {
      const clonedState = [...state.selectedTown]
      clonedState.pop()
      return { ...state, selectedTown: clonedState }
    }
    default:
      return state
  }
}

export default userReducer
