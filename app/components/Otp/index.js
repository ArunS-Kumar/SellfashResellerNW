import React, { Component } from 'react';
import {
  	TouchableOpacity,
  	Text,
  	View,
  	Image,
  	KeyboardAvoidingView,
  	TextInput,
  	Keyboard,
  	Dimensions,
  	Platform,
  	Alert,
  	ActivityIndicator,
  	Modal,
  	TouchableWithoutFeedback,
  	AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import {api} from '../../constants'

Keyboard.addListener('keyboardWillShow', function() {})

const { width, height} = Dimensions.get('window')

export default class Otp extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		otp: null,
	  		keyboardVisible: true,
	  		loader: false,
	  		showEditPhoneNumber: false
	  	};

	  	this.checkOtp = this.checkOtp.bind(this)
	  	this.resendOtp = this.resendOtp.bind(this)
	  	this.updateMobileNumber = this.updateMobileNumber.bind(this)
	  	this.changeNumber = this.changeNumber.bind(this)
	}

	componentDidMount() {
		setTimeout(()=> {
			this.otpInput.focus()
		}, 1000)
		this.setState({mobile: this.props.user.mobile.toString()})
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
    	let newSize = Dimensions.get('window').height - e.endCoordinates.height
    	this.setState({
      		visibleHeight: newSize,
      		topLogo: {width: 100, height: 70},
      		keyboardVisible: true,
      		mobile: null
    	})
  	}
  
  	keyboardDidHide (e) {
    	this.setState({
      		visibleHeight: Dimensions.get('window').height,
      		topLogo: {width: Dimensions.get('window').width},
      		keyboardVisible: false
    	})
  	}

  	checkOtp(otp) {
  		if(otp.length < 5) {
  			this.setState({otp: otp})
	  		if(otp.length == 4) {
	  			this.setState({loader: true})
	  			fetch(api+'/verify-otp/'+this.props.user.id, {
	  				method: 'POST',
	  				headers: {
		    			'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						otp: otp,
					})
	  			}).then((res) => {
	  				if(res.ok) {
	  					return res.json()
	  				} else {
	  					return "error"
	  				}
	  			})
	  				.then((resJson) => {
	  					this.setState({loader: false})
	  					if(resJson == 'error') {
	  						Alert.alert('Message', 'Some error occured please try Again!')
	  					} else {
	  						if(!this.props.user.shopName && !this.props.user.shopDetails){
	  							Actions.webshop({user: this.props.user})
	  						} else {
	  							AsyncStorage.setItem('sellfash@token', this.props.user.token).then((res) => {
				            		var user = JSON.stringify(this.props.user)
				            		AsyncStorage.setItem('sellfash@user', user)
				            		Actions.main({type: 'reset'})
				            	})
	  						}
	  					}
	  				})
	  		}
  		} 
  	}

  	resendOtp(){
  		this.setState({loader: true})
  		fetch(api+'/user/resendotp/'+this.props.user.id).then((res) => res.json())
			.then((resJson) => {
				this.setState({loader: false})
				Alert.alert('Message', resJson.message)
			})
  	}

  	updateMobileNumber(mobile) {
  		this.setState({mobile})
  	}

  	changeNumber() {
  		if(this.state.mobile.length == 10) {
  			const mobile = parseInt(this.state.mobile) 
	  		this.setState({loader: true})
			fetch(api+'/user/signup', {
				method: 'POST',
				headers: {
	    			'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: this.props.user.email,
					mobile: mobile
				})
			}).then((response) => {
					if(response.ok) {
						return response.json()
					} else {
						return "error"
					}
				})
	        .then((responseJson) => {
	        	if(responseJson != "error") {
	        		Alert.alert('Error', 'Otp is sent to'+this.state.mobile)
	        		this.setState({showEditPhoneNumber: false})
	            } else {
	            	Alert.alert('Error', 'Some error occured please try again!')
	            }
	        })
	    } else {
	    	Alert.alert('Message', 'Please check the mobile number you have entered')
	    }
  	}

 //  	<View style={{flexDirection: 'row'}}>
	// 	<View>
	// 		<Text style={[styles.phoneNumber, {marginBottom: Platform.OS === 'ios' ? 35 : 20}]}>+91 {this.state.mobile || this.props.user.mobile}</Text>
	// 	</View>
	// 	<View>
	// 		<TouchableOpacity
	// 			onPress={() => this.setState({showEditPhoneNumber: true})}
	// 			style={{marginLeft: 15}}
	// 		>
	// 			<Image style={{width: 17, height: 17}} source={require('../../assets/images/ic_edit.png')} />
	// 		</TouchableOpacity>
	// 	</View>
	// </View>

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={[styles.otpContainer]}>
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
					<KeyboardAvoidingView behavior="padding" style={[styles.otpContainer]}>
		        		<Image style={[styles.mobile, {marginTop: Platform.OS === 'ios' ? 0 : this.state.keyboardVisible ? 220 : 0}]} source={require('../../assets/images/img_otp.png')} />
						<Text style={{fontSize: 18, fontWeight: '700', color: '#fff', marginVertical: Platform.OS === 'ios' ? 20 : 10}}>Validation</Text>
						<Text style={[styles.otpText, {marginBottom: Platform.OS === 'ios' ? 10 : 5}]}>OTP has been sent to your phone</Text>
						<Text style={[styles.phoneNumber, {marginBottom: Platform.OS === 'ios' ? 35 : 20}]}>+91 {this.state.mobile || this.props.user.mobile}</Text>
						<Text style={[styles.enterOtpText]}>ENTER YOUR OTP</Text>
						<View style={{flexDirection: 'row', marginTop: 10, marginBottom: Platform.OS === 'ios' ? 40 : 20}}>
							<View style={{flex: 1}}>
								
							</View>
							<View style={{flex: 1, borderBottomWidth: 5, borderBottomColor: '#fff',}}>
								<TextInput 
									style={styles.input}
			                        placeholder="OTP"
			                        placeholderTextColor='#fff'
			                        keyboardType="number-pad"
			                        value={this.state.otp}
			                        autoCorrect={false}
					                onChangeText={(otp) => this.checkOtp(otp)}
					                ref={(input) => this.otpInput = input}
					                underlineColorAndroid="transparent"
					                onSubmitEditing={this.checkOtp.bind(this, this.state.otp)}
					            />
							</View>
							<View style={{flex: 1}}>
								
							</View>
						</View>
						<View styl={{marginBottom: 10}}>
							<Text style={[styles.didntReceiveOtp]}>Didn't receive the OTP? <Text style={styles.resendText} onPress={this.resendOtp.bind(this)} >RESEND AGAIN</Text></Text>
						</View>
						<Modal
		                    animationType={"slide"}
		                    transparent={true}
		                    visible={this.state.showEditPhoneNumber}
		                    onRequestClose={() => this.setState({showEditPhoneNumber: false})}
		                >
			                <View style={{flex: 1, justifyContent: 'space-between', backgroundColor: '#fafafa'}}>
			                	<View style={{flex: 1}}></View>
			                	<View style={{flex: 1}}>
				                	<View style={{borderBottomWidth: 1, borderBottomColor: '#999'}}>
				                		<TextInput 
											style={[styles.input, {color: '#999', fontSize: 16}]}
					                        placeholder="Enter New Number"
					                        placeholderTextColor='#ddd'
					                        keyboardType="number-pad"
					                        value={this.state.mobile}
					                        autoCorrect={false}
							                onChangeText={(mobile) => this.updateMobileNumber(mobile)}
							                ref={(input) => this.mobileInput = input}
							                underlineColorAndroid="transparent"
							                onSubmitEditing={this.changeNumber}
							            />
			                		</View>
			                		<View style={{margin: 10}}>
			                			<TouchableOpacity onPress={this.changeNumber} style={{padding: 12, backgroundColor: '#4285f4', alignItems: 'center'}}><Text>Save</Text></TouchableOpacity>
			                		</View>
			                	</View>
		                		<View style={{flex: 1}}></View>
			                </View>
		                </Modal>
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		)
	}
}