import {combineReducers} from 'redux'

import User from './User'
import Menu from './Menu'
import Search from './SearchBar'
import Filter from './Filter'

export default combineReducers({User, Menu, Search, Filter}) 