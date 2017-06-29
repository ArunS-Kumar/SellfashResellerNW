import React, { Component } from 'react';
import {
  	TouchableOpacity,
  	Text,
  	View,
  	Image,
  	KeyboardAvoidingView,
  	TextInput,
  	Platform,
  	Keyboard,
  	Alert,
  	AsyncStorage,
  	ActivityIndicator,
  	TouchableWithoutFeedback
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from '../Otp/styles'
import {api} from '../../constants'

Keyboard.addListener('keyboardWillShow', function() {})

const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`=";

function check(string){
    for(i = 0; i < specialChars.length;i++){
        if(string.indexOf(specialChars[i]) > -1){
            return true
        }
    }
    return false;
}

export default class Otp extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		shopName: null,
	  		keyboardVisible: true,
	  		shopUrl: null,
	  		validShopName: true,
	  		loader: false
	  	};

	  	this.validateWebshop = this.validateWebshop.bind(this)
	  	this.createWebshop = this.createWebshop.bind(this)
	}

	componentDidMount() {
		setTimeout(()=> {
			this.webshopName.focus()
		}, 500)
	}

	submitOtp() {
		Actions.main({type: 'reset'})
	}

	componentWillMount () {
    	this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this))
    	this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this))
  	}

  	componentWillUnmount () {
    	this.keyboardDidShowListener.remove()
    	this.keyboardDidHideListener.remove()
  	}

  	keyboardDidShow (e) {
    	this.setState({
      		keyboardVisible: true
    	})
  	}
  
  	keyboardDidHide (e) {
    	this.setState({
      		keyboardVisible: false
    	})
  	}

  	validateWebshop(shopName) {
  		if(check(shopName) == false) {
  			this.setState({shopName: shopName})
  			shopName = shopName.replace(/\s+/g, '-').toLowerCase();
  			this.setState({shopUrl: shopName})
	  		fetch(api+'/user/validatewebshop', {
	  			method: "POST",
	  			headers: {
	  				'Content-Type': 'application/json',
	  				'Authorization': 'Bearer ' + this.props.user.token
	  			},
	  			body: JSON.stringify({
	  				shopName: shopName
	  			})
	  		}).then((res) => res.json())
				.then((resJson) => {
					this.setState({validShopName: resJson.validShopName})
				})
  		} else {
  			Alert.alert('Error', 'Shop Name should not contain special character. Please verify once.')
  		}
  	}

  	createWebshop() {
  		if(this.state.validShopName) {
  			this.setState({loader: true})
	        var bankDetails = {};
	        var shopDetails = {};

	        shopDetails.email = this.props.user.email;
	        shopDetails.mobile = this.props.user.mobile;
	        shopDetails.city = 'Yet to enter';
	        shopDetails.shopName = this.state.shopName;
	        shopDetails.shopUrl = this.state.shopUrl;

	        bankDetails.bankAccHolderName = 'Yet to enter';
	        bankDetails.bankAccNumber = 'Yet to enter'
	        bankDetails.bankIFSCCode = 'Yet to enter'
	        bankDetails.bankAccType = 'Yet to enter'

	        fetch(api+'/user/create/onlinestore', {
	  			method: "POST",
	  			headers: {
	  				'Content-Type': 'application/json',
	  				'Authorization': 'Bearer ' + this.props.user.token
	  			},
	  			body: JSON.stringify({
	  				resellerMargin: 5,
	  				customerMargin: 10,
	  				isSupplier: true,
	  				bankDetails: bankDetails,
	  				shopDetails: shopDetails
	  			})
	  		}).then((res) => {return res.json()})
				.then((resJson) => {
					// if(resJson && resJson.bankDetails && resJson.shopDetails ) {
					AsyncStorage.setItem('sellfash@token', this.props.user.token).then((res) => {
						var user = JSON.stringify(resJson)
						this.setState({loader: false})
						AsyncStorage.setItem('sellfash@user', user)
						Actions.main({type:'reset'})
					})
					// } 
				})
		} else {
			Alert.alert('Message', 'Shop Name already Taken try with different Name')
		}
  	}


	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView behavior="padding" style={styles.otpContainer}>
					{
						this.state.loader ?
							<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 99, position: 'absolute'}}> 
									<ActivityIndicator
							          	style={[styles.centering, {backgroundColor: '#000', opacity: 0.7, borderRadius: 4, padding: 30}]}

							          	size="large"
							        />
							</View> : 
							<View stye={{flex: 0}}></View>
			        }
					<Image style={[styles.mobile, {width: 65, height: 65}]} source={require('../../assets/images/img_webshop.png')} />
					<Text style={{fontSize: 18, fontWeight: '700', marginVertical: Platform.OS === 'ios' ? 20 : this.state.keyboardVisible ? 10 : 20, color: '#fff'}}>Create My Webshop</Text>
					<Text style={styles.otpText}>You cannot change the name of</Text>
					<Text style={[styles.phoneNumber, {fontWeight: "400", marginBottom: Platform.OS === 'ios' ? 35 : this.state.keyboardVisible ? 20 : 35}]}>Your webshop later!</Text>
					<Text style={styles.enterOtpText}>MY WEBSHOP NAME</Text>
					<View style={{flexDirection: 'row', marginTop: 10}}>
						<View style={{flex: 1}}>
							
						</View>
						<View style={{flex: 3, borderBottomWidth: 5, borderBottomColor: '#fff',}}>
							<TextInput 
				                style={styles.input}
				                placeholder="MY WEBSHOP"
				                placeholderTextColor='#fff'
				                returnKeyType="go"
				                value={this.state.shopName}
				                onChangeText={(shopName) => this.validateWebshop(shopName)}
				                ref={(input) => this.webshopName = input}
				                onSubmitEditing={this.createWebshop}
				                underlineColorAndroid="transparent"
				            />
						</View>
						<View style={{flex: 1}}>
						</View>
					</View>
					{
						this.state.validShopName ? <View style={{flex: 0}}></View> : <View style={{marginTop: 5}}>
							<Text style={{color: 'red', fontSize: 14}}>Shop Name already taken.</Text>
						</View>
					}
					<View style={{marginTop: 10}}>
						<Text style={{color: '#fff', fontSize: 14}}>http://www.moifash.com/{this.state.shopUrl}</Text>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		)
	}
}