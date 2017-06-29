import * as types from './actionTypes'
import {api} from '../constants'
import {AsyncStorage} from 'react-native'

 Filter = {

	setFilterVisible: function(){
		return {
			type: types.FILTER_ACTION,
		}
	},

	returnCategories: function(categories) {
		return {
			type: types.GOT_CATEGORIES,
			categories
		}
	},

	returnProduct: function(product) {
		return {
			type: types.GOT_PRODUCT,
			product
		}
	},

	getProduct: function(id) {
		return (dispatch, getState) => {
			
		}
	},

	getCategories: function() {
		return (dispatch, getState) => {
			AsyncStorage.getItem('sellfash@token').then((res) => {
				fetch(api+'/category/get_all_for_app', {
		  			method: "GET",
		  			headers: {
		  				'Content-Type': 'application/json',
		  				'Authorization': 'Bearer ' + res
		  			}
		  			}).then((res) => {
		  				if(!res.ok){
		  					return
		  				}
		  				return res.json()
		  			})
					.then((resJson) => { 
						dispatch(Filter.returnCategories(resJson))
					})
			})
		}
	}

}

export default Filter