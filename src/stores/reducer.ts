import { combineReducers, createStore } from 'redux'
import userReducers from './user/reducer'

const rootReducer = combineReducers({ userReducers })

export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)
