import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import {createLogger} from 'redux-logger'

import rootReducers from './reducers/index'

// const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__})

let finalStore = compose(
	applyMiddleware(
		thunkMiddleware,
		// loggerMiddleware
	)(createStore)
)

const initialState = {}

const store  = finalStore(rootReducers, initialState);

export default store;