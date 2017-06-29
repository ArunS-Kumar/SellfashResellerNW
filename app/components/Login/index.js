import React, { Component } from 'react';
import {
  	TouchableOpacity,
  	Text,
  	View,
  	Image,
  	KeyboardAvoidingView,
  	TextInput,
  	Platform,
  	Alert,
  	AsyncStorage,
  	ActivityIndicator,
  	Dimensions,
  	Keyboard,
  	TouchableWithoutFeedback
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import {api} from '../../constants'

const { width, height} = Dimensions.get('window')

export default class Login extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		email: null,
	  		correctEmail: true,
	  		phone: null,
	  		loader: false
	  	};
	}

	componentWillMount() {
	}

	verifyEmail(email) {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
		if(reg.test(email) === false) {
			this.setState({correctEmail: false})
		} else {
			this.setState({correctEmail: true})
		}
		this.setState({email: email})
	}

	verifyMobile(phone) {
		if(phone.length > 10) {
			Alert.alert('Message', 'Phone number cannot be greater than 10 digit!')
		} else {
			this.setState({phone: phone})
		}
	}

	signIn() {
		if(this.state.email != null && this.state.phone != null) {
			this.setState({loader: true})
			fetch(api+'/user/signup', {
				method: 'POST',
				headers: {
	    			'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: this.state.email,
					mobile: this.state.phone,
					device_token: this.props.deviceToken
				})
			}).then((response) => response.json())
	        .then((responseJson) => {
	            if(responseJson && responseJson.token) {
	            	// AsyncStorage.setItem('sellfash@token', responseJson.token).then((res) => {
	            		// if(responseJson != "error") {
	            			this.setState({loader: false})
	            			Actions.otp({user: responseJson})
	            		// }
	            		// Alert.alert(JSON.stringify(responseJson))
						// if(!responseJson.mobileVerified) {
						// 	this.setState({loader: false})
		    //         		Actions.otp({user: responseJson})
		    //         	} else {
		            		// this.setState({loader: false})
		            		// var user = JSON.stringify(responseJson)
		            		// AsyncStorage.setItem('sellfash@user', user)
		            		// Actions.main({type: 'reset'})
		    //         	}
					// })
	            } else {
	            	this.setState({loader: false})
	            	Alert.alert('Error', responseJson.message)
	            }
	        })
	    } else {
	    	if(this.state.email == null) {
	    		this.setState({correctEmail: false})
	    		Alert.alert('Message', 'Please enter your mail id')
	    	} else if(this.state.phone == null) {
	    		Alert.alert('Message', 'Please enter Phone Number')
	    	}
	    }
	}

	render() {
		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{flex: 1, position: 'relative'}} onPress={Keyboard.dismiss}>
					{
						this.state.loader ?
							<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 99, position: 'absolute', width: width, height: height}}> 
									<ActivityIndicator
							          	style={[styles.centering, {backgroundColor: '#000', opacity: 0.7, borderRadius: 4, padding: 30}]}

							          	size="large"
							        />
							</View> : 
							<View style={{flex: 0}}></View>
			        }
					{Platform.OS === 'ios' ? <IosForm signIn={this.signIn.bind(this)} email={this.state.email} verifyMobile={this.verifyMobile.bind(this)} verifyEmail={this.verifyEmail.bind(this)} correctEmail={this.state.correctEmail}/> : <AndroidForm email={this.state.email} phone={this.state.phone} signIn={this.signIn.bind(this)} verifyMobile={this.verifyMobile.bind(this)} verifyEmail={this.verifyEmail.bind(this)} correctEmail={this.state.correctEmail} />}
				</View>
			</TouchableWithoutFeedback>
		)
	}
}

class IosForm extends Component {
	render() {
		return(
			<KeyboardAvoidingView behavior="padding" style={[styles.loginContainer]}>
				<View style={styles.logoContainer}>
					<Image style={styles.logo} source={require('../../assets/images/img_logo-with-caption.png')} />
				</View>
				<View style={[{flex: 1}]}>
					<View style={[styles.inputContainer]}>
						<View style={{borderBottomWidth: 1, borderBottomColor: this.props.correctEmail ? '#f5f5f5' : 'red', marginBottom: 20}}>
							<TextInput 
		                        placeholder="Email"
		                        style={styles.input}
		                        placeholderTextColor='#999'
		                        keyboardType="email-address"
		                        returnKeyType="next"
		                        value={this.props.email}
		                        onChangeText={(email) => this.props.verifyEmail(email)}
		                        onSubmitEditing={() => this.phoneInput.focus()}
		                        autoCorrect={false}
		                        underlineColorAndroid="transparent"
		                        autoCapitalize="none"
		                    />
		                </View>
		                <View style={{borderBottomWidth: 1, borderBottomColor: '#f5f5f5', marginBottom: 20}}>
		                    <TextInput 
		                        style={styles.input}
		                        placeholder="Phone Number"
		                        placeholderTextColor='#999'
		                        keyboardType="number-pad"
		                        returnKeyType="go"
		                        value={this.props.phone}
		                        autoCorrect={false}
		                        onChangeText={(phone) => this.props.verifyMobile(phone)}
		                        ref={(input) => this.phoneInput = input}
		                        onSubmitEditing={this.props.signIn}
		                        underlineColorAndroid="transparent"
		                    />
		                </View>
	                    <Text style={styles.infotext}>We will send you a one time sms message.</Text>
	                    <TouchableOpacity style={styles.nextBtn} onPress={this.props.signIn}>
	                    	<View style={styles.nextTextContainer}>
	                    		<Text style={styles.nextText}>NEXT</Text>
	                    	</View>
	                    	<View style={styles.nextArrowContainer}>
	                    		<Image style={styles.nextArrow} source={require('../../assets/images/ic_right-arrow.png')} />
	                    	</View>
	                    </TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

class AndroidForm extends Component {
	render() {
		return(
			<View behavior="padding" style={[styles.loginContainer]}>
				<View style={styles.logoContainer}>
					<Image style={styles.logo} source={require('../../assets/images/img_logo-with-caption.png')} />
				</View>
				<View style={[{flex: 1}]}>
					<View style={[styles.inputContainer]}>
						<View style={{borderBottomWidth: 1, borderBottomColor: this.props.correctEmail ? '#f5f5f5' : 'red', marginBottom: 20}}>
							<TextInput 
		                        placeholder="Email"
		                        style={styles.input}
		                        placeholderTextColor='#999'
		                        keyboardType="email-address"
		                        returnKeyType="next"
		                        value={this.props.email}
		                        onChangeText={(email) => this.props.verifyEmail(email)}
		                        onSubmitEditing={() => this.phoneInput.focus()}
		                        autoCorrect={false}
		                        underlineColorAndroid="transparent"
		                    />
		                </View>
		                <View style={{borderBottomWidth: 1, borderBottomColor: '#f5f5f5', marginBottom: 20}}>
		                    <TextInput 
		                        style={styles.input}
		                        placeholder="Phone Number"
		                        placeholderTextColor='#999'
		                        keyboardType="numeric"
		                        returnKeyType="go"
		                        value={this.props.phone}
		                        autoCorrect={false}
		                        onChangeText={(phone) => this.props.verifyMobile(phone)}
		                        ref={(input) => this.phoneInput = input}
		                        onSubmitEditing={this.props.signIn}
		                        underlineColorAndroid="transparent"
		                    />
		                </View>
	                    <Text style={styles.infotext}>We will send you a one time sms message.</Text>
	                    <TouchableOpacity style={styles.nextBtn} onPress={this.props.signIn}>
	                    	<View style={styles.nextTextContainer}>
	                    		<Text style={styles.nextText}>NEXT</Text>
	                    	</View>
	                    	<View style={styles.nextArrowContainer}>
	                    		<Image style={styles.nextArrow} source={require('../../assets/images/ic_right-arrow.png')} />
	                    	</View>
	                    </TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}