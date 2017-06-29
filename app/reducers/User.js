import * as types from '../actions/actionTypes'
import {
	AsyncStorage
} from 'react-native'

function User(state = {}, action) {
	switch (action.type) {
		case types.GET_USER_DETAIL :
			return ({}, state, action.user)
		case types.GET_USER_BALANCE:
			return Object.assign({}, state, {balance: AsyncStorage.getItem('@mymantra:userDetail').then((val) => {return JSON.parse(val).balance})})
		case types.UPDATE_USER_BALANCE:
			return Object.assign({}, state, {balance: action.balance})
		default: 
			return state
	}	
}

export default User