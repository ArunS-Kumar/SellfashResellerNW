import React, { Component } from 'react';
import {
  	StyleSheet,
  	Text,
  	View,
  	TouchableOpacity,
  	TouchableHighlight,
  	Image,
  	AsyncStorage
} from 'react-native';
import {Router, Scene, Actions, ActionConst} from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from './actions/index'
import Login from './components/Login/index'
import Otp from './components/Otp/index'
import webshopName from './components/WebshopName/index'
import Home from './components/Home/index'
import Sales from './components/Sales/index'
import Payments from './components/Payments/index'
import Help from './components/Help/index'
import SellingPrice from './components/SellingPrice/index'
import ProductDetail from './components/ProductDetail/index'
import WebshopView from './components/Webview/index'
import Filter from './components/Filter/index'
import NoInternet  from './components/noInternet'

class Routes extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		menuVisible: false,
	  		initial: true
	  	};
	}

	componentWillMount() {
		// AsyncStorage.removeItem('sellfash@token')
		AsyncStorage.getItem('sellfash@token').then((res) => {
			if(res != null) {
				Actions.main({type:'reset'})
			}
		})
	}

	// setMenuVisible() {
	// 	Actions.refresh();
	// 	this.setState({menuVisible: !this.state.menuVisible})
	// }

	renderMenuButton() {
	  	return (
	      	<TouchableOpacity style={[{
	        	width: 50,
	        	height: 37,
	        	position: 'absolute',
	        	bottom: 4,
	        	left: 2,
	        	padding: 12,
	        	justifyContent:'center',
	    	}]} onPress={this.props.setMenuVisible}>
	        	<View style={{flexDirection:'row', alignItems:'center'}}>
	        		<Image source={require('./assets/images/ic_menu.png')} color={'#ffffff'} style={styles.navBackButton} />
	        	</View>
	      	</TouchableOpacity>
	  	);
	};

	renderRightButton() {
		return(
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity onPress={Actions.filter} style={styles.filterBtn}>
					<Image style={styles.filterImage} source={require('./assets/images/ic_filter.png')} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.searchBtn} onPress={this.props.setSearchBarVisible}>
					<Image style={styles.searchImage} source={require('./assets/images/ic_search.png')} />
				</TouchableOpacity>
			</View>
		)		
	}

	renderBuyAndShareButton() {
		return(
			<View style={{flexDirection: 'row', zIndex: 99999999,}}>
				<TouchableOpacity style={styles.filterBtn}>
					<Image style={[styles.filterImage, {height: 22}]} source={require('./assets/images/ic_product-buy.png')} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.searchBtn}>
					<Image style={[styles.searchImage, {height: 22}]} source={require('./assets/images/ic_product-share.png')} />
				</TouchableOpacity>
			</View>
		)
	}

	renderLeftButton() {
		return (
			<TouchableOpacity style={[{
	        	width: 50,
	        	height: 37,
	        	position: 'absolute',
	        	bottom: 4,
	        	left: 2,
	        	padding: 8,
	        	zIndex: 999999999,
	        	justifyContent:'center',
	    	}]} onPress={Actions.pop}>
	        	<View style={{flexDirection:'row', alignItems:'center'}}>
	        		<Image source={require('./assets/images/ic_product-back.png')} color={'#ffffff'} style={styles.navBackButton} />
	        	</View>
	      	</TouchableOpacity>
	    )
	}

	render() {
		return (
			
			<Router>
				<Scene key="root">
					<Scene initial hideNavBar key="login" component={Login} {...this.props}/>
					<Scene hideNavBar key="otp" component={Otp} />
					<Scene hideNavBar key="webshop" component={webshopName} />
					<Scene type={ActionConst.reset} key="main">
						<Scene title="Home" titleStyle={styles.navTitle} renderBackButton={this.renderMenuButton.bind(this)} renderRightButton={this.renderRightButton.bind(this)} navigationBarStyle={styles.navBar} key="home" component={Home} {...this.props}/>
						<Scene title="Sales" titleStyle={styles.navTitle} renderBackButton={this.renderMenuButton.bind(this)} navigationBarStyle={styles.navBar} key="sales" component={Sales} />
						<Scene title="Payments" titleStyle={styles.navTitle} renderBackButton={this.renderMenuButton.bind(this)} navigationBarStyle={styles.navBar} key="payments" component={Payments} {...this.props}/>
						<Scene title="Help" titleStyle={styles.navTitle} renderBackButton={this.renderMenuButton.bind(this)} navigationBarStyle={styles.navBar} key="help" component={Help} {...this.props}/>
						<Scene title="Share" titleStyle={styles.navTitle} renderBackButton={this.renderMenuButton.bind(this)} hideNavBar key="sellingprice" component={SellingPrice} {...this.props}/>
						<Scene title="Webview" titleStyle={styles.navTitle} renderBackButton={this.renderLeftButton.bind(this)} hideNavBar key="webview" component={WebshopView} {...this.props}/>
						<Scene title="" titleStyle={styles.navTitle} renderBackButton={this.renderLeftButton.bind(this)} renderRightButton={this.renderBuyAndShareButton.bind(this)} navigationBarStyle={styles.navBarProductDetail} hideNavBar key="productdetail" component={ProductDetail} />
						<Scene title="" hideNavBar key="filter" component={Filter} />
					</Scene>
				</Scene>
			</Router>
			

		)
	}
}

function mapStateToProps(state) {
	return state;
}

function mapPropsToState(dispatch) {
	return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapPropsToState)(Routes)

const styles = StyleSheet.create( {
	navTitle: {
		color: 'white',
		fontSize: 18,
		textAlign: 'left',
		fontWeight: "600"
	},
	navBar: {
		backgroundColor: '#ffc107',
		borderBottomWidth: 0,
	},
	navBarProductDetail: {
		backgroundColor: '#fff',
		opacity: 0.7,
		borderBottomWidth: 0,
	},
	navBackButton: {
		marginTop:15,
		paddingRight:6, 
		width: 23, 
		height: 15
	},
	filterBtn: {
		marginTop: 3,
		marginRight: 10
	},
	filterImage: {
		width: 17,
		height: 17,
		paddingHorizontal: 10,
		paddingBottom: 10
	},
	searchBtn: {
		marginTop: 2,
		marginRight: 5,
		paddingHorizontal: 10,
		paddingBottom: 10
	},
	searchImage: {
		width: 19,
		height: 19
	}
})