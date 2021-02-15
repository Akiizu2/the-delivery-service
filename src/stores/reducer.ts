import { combineReducers, createStore } from 'redux'
import userReducers from './user/reducer'
import calculaterReducers from './calculater/reducer'

const rootReducer = combineReducers({ userReducers, calculaterReducers })

export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer)
