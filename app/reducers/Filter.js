import * as types from '../actions/actionTypes'
import {
	AsyncStorage
} from 'react-native'

function Filter(state = {show: false, categories: []}, action) {
	switch (action.type) {
		case types.FILTER_ACTION :
			return ({}, state, {show: !state.show, categories: state.categories})
		case types.GOT_CATEGORIES :
			return ({}, state, {show: state.show, categories: action.categories})
		default: 
			return state
	}	
}

export default Filter