import React, { Component } from 'react';
import {
  	TouchableOpacity,
  	Text,
  	View,
  	Image,
  	KeyboardAvoidingView,
  	TextInput,
  	Modal,
  	Platform,
  	Keyboard,
  	Alert
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from '../Otp/styles'
import ModifyContent from './ModifyContent'
import {api, imageUrl} from '../../constants'
import Share, {ShareSheet, Button} from 'react-native-share';
import ImageLoader from 'react-native-smart-image-loader';
// const FBSDK = require('react-native-fbsdk');
// const {
//   ShareDialog,
// } = FBSDK;

Keyboard.addListener('keyboardWillShow', function() {})

const closeBtn = {
	position: 'absolute', 
	top: Platform.OS === 'ios' ? 30 : 10, 
	left: 20
}

const container = {
	flex: 1,
    backgroundColor: '#ffc107',
}

export default class Otp extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		product: {},
	  		sellingPrice: null,
	  		webshopPrice: false,
	  		modifyContent: false,
	  		keyboardVisible: false
	  	};

	  	// this.shareLinkWithShareDialog = this.shareLinkWithShareDialog.bind(this)
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
      		keyboardVisible: true,
    	})
  	}
  
  	keyboardDidHide (e) {
    	this.setState({
      		keyboardVisible: false
    	})
  	}

	componentDidMount() {
		this.setState({
			product: this.props.shareProduct
		})
		setTimeout(()=> {
			this.otpInput.focus()
		}, 1000)
	}

	changeSellingPrice() {
		this.setState({webshopPrice: true})
	}

	openModal() {
		this.setState({modifyContent: true})
	}

	closeModal() {
		this.setState({modifyContent: false})
	}

	// shareLinkWithShareDialog() {
	// 	const shareLinkContent = {
	// 	  	contentType: 'link',
	// 	  	contentUrl: "https://facebook.com",
	// 	  	contentDescription: 'Wow, check out this great site!',
	// 	};
	//   	var tmp = this;
	//   	ShareDialog.canShow(shareLinkContent).then(
	//     	function(canShow) {
	// 	      	if (canShow) {
	// 	        	return ShareDialog.show(shareLinkContent);
	// 	      	}
	// 	    }
	//   	).then(
	//     	function(result) {
	//       		if (result.isCancelled) {
	//         		console.log('Share cancelled');
	//       		} else {
	//         		console.log('Share success with postId: ' + result.postId);
	//       		}
	//     	},
	//     	function(error) {
	//       		console.log('Share fail with error: ' + error);
	//     	}
	//   	);
	// }

	render() {
		let shareOptions = {
	      title: this.state.product.title,
	      message: this.state.product.title + ' at Rs ' + this.state.sellingPrice + ' click here to buy',
	      // url: this.state.product.productURL,
	      subject: "Share Link", //  for email,
	      url: imageUrl + this.props.shareProduct.baseImage
	    };
		if(!this.state.webshopPrice) {
			return (
				<KeyboardAvoidingView style={{flex: 1}} behavior="padding" style={container}>
					<TouchableOpacity style={[closeBtn, {flex: 0.2, zIndex: 999, padding: 10}]} onPress={Actions.pop}>
						<Image source={require('../../assets/images/ic_dark-close.png')} style={{width: 15, height: 15}} />
					</TouchableOpacity>
					<View style={{flex: 0.8, alignItems: 'center', justifyContent: 'center'}}>
						<ImageLoader style={{height: 100, width: 100, borderRadius: 50, marginVertical: 20, marginTop: Platform.OS === 'ios' ? 0 : this.state.keyboardVisible ? 200 : 0}} options={{src: imageUrl+this.props.shareProduct.baseImage, placeholder: ""}} />
						<Text style={styles.otpText}>{this.props.shareProduct.title} Kurta sold for Rs. {this.props.shareProduct.resellerPrice}</Text>
						<Text style={[styles.otpText, {marginBottom: 30}]}>by <Text style={styles.phoneNumber}>Sellfash Supply</Text></Text>
						<Text style={styles.enterOtpText}>MY SELLING PRICE</Text>
						<View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
							<View style={{flex: 1}}>
								
							</View>
							<View style={{flex: 1, borderBottomWidth: 5, borderBottomColor: '#fff',}}>
								<TextInput 
					                style={styles.input}
					                placeholder="2000"
					                placeholderTextColor='rgba(255, 255, 255, 0.5)'
					                returnKeyType="go"
					                keyboardType="number-pad"
					                onChangeText={(sellingPrice) => this.setState({sellingPrice})}
					                ref={(input) => this.otpInput = input}
					                onSubmitEditing={this.changeSellingPrice.bind(this)}
					                underlineColorAndroid="transparent"
					            />
							</View>
							<View style={{flex: 1, alignItems: 'flex-start'}}>
							{
								this.state.sellingPrice >= this.props.shareProduct.resellerPrice ? 
									<TouchableOpacity onPress={this.changeSellingPrice.bind(this)} style={{marginLeft: 20}}>
										<Image source={require('../../assets/images/tick-inside-a-circle.png')} style={{width: 30, height: 30}}/>
									</TouchableOpacity> :
									<View></View>
							}
							</View>
						</View>
						<Text style={[styles.otpText, {marginTop: 20}]}>Your profit is <Text style={styles.phoneNumber}>Rs. {this.state.sellingPrice >= this.props.shareProduct.resellerPrice ? this.state.sellingPrice - this.props.shareProduct.resellerPrice : 0 }</Text></Text>
					</View>
				</KeyboardAvoidingView>
			)
		} else if(this.state.webshopPrice) {
			return(
				<View style={container}>
					<TouchableOpacity style={[closeBtn, {zIndex: 999, padding: 10}]} onPress={Actions.pop}>
						<Image source={require('../../assets/images/ic_dark-close.png')} style={{width: 15, height: 15}} />
					</TouchableOpacity>
					<View style={{flex: 1, justifyContent:'center', alignItems: 'center', marginTop: 20}}>
						<ImageLoader style={{height: 100, width: 100, borderRadius: 50, marginVertical: 20, alignItems: 'center'}} options={{src: imageUrl+this.props.shareProduct.baseImage, placeholder: ""}} />
						<Text style={styles.otpText}>Sharing this would automatically </Text>
						<Text style={[styles.otpText, {marginVertical: 4}]}>publish <Text style={styles.phoneNumber}>" {this.props.shareProduct.title} "</Text> in your </Text>
						<Text style={[styles.otpText, {marginBottom:50}]}>Webshop for  <Text style={styles.phoneNumber}>Rs {this.state.sellingPrice}</Text></Text>
					</View>
					<View style={{flex: 1, paddingBottom: 40}}>
						<View style={{flexDirection: 'row', paddingHorizontal: 50, marginBottom: 20}}>
							<View style={{flex: 1, marginHorizontal: 10}}>
								<TouchableOpacity onPress={() => {Alert.alert('Message', 'In Progress')}} style={{backgroundColor: '#fff', paddingBottom: 10, paddingTop: 20, alignItems: 'center', borderRadius: 4}}>
									<Image style={{height: 50, width: 40}} source={require('../../assets/images/ic_share-facebook-page.png')}/>
									<Text style={{color: '#999', opacity: 0.8, fontSize: 12, marginTop: 10}}>Facebook Page</Text>
								</TouchableOpacity>
							</View>
							<View style={{flex: 1, marginHorizontal: 10}}>
								<TouchableOpacity style={{backgroundColor: '#fff', paddingBottom: 10, paddingTop: 20, alignItems: 'center', borderRadius: 4}}
									onPress={() => {Share.shareSingle(Object.assign(shareOptions, {
					                  "social": "whatsapp"
					                }))}}
								>
									<Image style={{height: 50, width: 50}} source={require('../../assets/images/ic_share-whatsapp.png')}/>
									<Text style={{color: '#999', opacity: 0.8, fontSize: 12, marginTop: 10}}>WhatsApp </Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={{flexDirection: 'row', paddingHorizontal: 50}}>
							<View style={{flex: 1, marginHorizontal: 10}}>
								<TouchableOpacity 
									style={{backgroundColor: '#fff', paddingBottom: 10, paddingTop: 20, alignItems: 'center', borderRadius: 4}}>
									<Image style={{height: 50, width: 50}} source={require('../../assets/images/ic_share-facebook.png')}/>
									<Text style={{color: '#999', opacity: 0.8, fontSize: 12, marginTop: 10}}>Facebook</Text>
								</TouchableOpacity>
							</View>
							<View style={{flex: 1, marginHorizontal: 10}}>
								<TouchableOpacity onPress={()=> 
						                Share.open(shareOptions, (err) => {})
						            } style={{backgroundColor: '#fff', paddingBottom: 10, paddingTop: 20, alignItems: 'center', borderRadius: 4}}>
									<Image style={{height: 50, width: 50}} source={require('../../assets/images/ic_share-other.png')}/>
									<Text style={{color: '#999', opacity: 0.8, fontSize: 12, marginTop: 10}}>Other </Text>
								</TouchableOpacity>
							</View>
						</View>
						{
							// <View style={{backgroundColor: '#fff', paddingVertical: 15, position: 'absolute', bottom: 0, flexDirection: 'row' }}>
							// 	<TouchableOpacity onPress={this.openModal.bind(this)} style={{flex: 1}}><Text style={{textAlign: 'center',color: '#999', fontSize: 14, fontWeight: '900'}}>modify content before sharing</Text></TouchableOpacity>
							// </View>
						}
					</View>
					<ModifyContent modifyContent={this.state.modifyContent} closeModal={this.closeModal.bind(this)} />
				</View>
			)
		}
	}
}