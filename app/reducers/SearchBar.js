import * as types from '../actions/actionTypes'
import {
	AsyncStorage
} from 'react-native'

function Search(state = false, action) {
	switch (action.type) {
		case types.SEARCH_BAR_ACTION :
			return ({}, state, !state)
		default: 
			return state
	}	
}

export default Search