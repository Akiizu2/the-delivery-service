export const NONE_SELECT_VALUE = 'NONE'

export interface UserState {
  selectedTown: string[]
}

const userState: UserState = {
  selectedTown: [NONE_SELECT_VALUE, NONE_SELECT_VALUE],
}

export default userState
