import * as types from '../actions/actionTypes'
import {
	AsyncStorage
} from 'react-native'

function Menu(state = false, action) {
	switch (action.type) {
		case types.MENU_ACTION :
			return ({}, state, !state)
		default: 
			return state
	}	
}

export default Menu