import React, { Component } from 'react';
import {
  	Text,
  	View,
  	WebView,
  	Dimensions,
  	Image,
  	TouchableOpacity,
  	Alert,
  	Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux'

const {width, height} = Dimensions.get('window')

export default class WebshopView extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		navigationChange: false
	  	};

	  	this.onNavigationStateChange = this.onNavigationStateChange.bind(this)
	  	this.goBack = this.goBack.bind(this)
	}

	componentWillReceiveProps(props) {
    }

	componentWillMount() {
	}

	goBack() {
		this.refs['webshop'].goBack();
	}

	onNavigationStateChange(navState) {
		this.setState({
			navigationChange: navState.canGoBack
		})
	}

	render() {
		return (
			<View style={{flex: 1}}>
				<View style={{top: 0, position: 'absolute', width: width, zIndex: 9999, backgroundColor: '#fff'}}>
					<View style={{flexDirection: 'row', marginTop: Platform.OS === 'ios' ? 20 : 10, padding: 18, alignItems:'center',shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { 
            height: 2
        },}}>
	                    <View style={{alignItems: 'center', flex: 1}}>
	                    	{
	                    		this.state.navigationChange ? <TouchableOpacity onPress={this.goBack}>
					                <Image source={require('../../assets/images/ic_product-back.png')} style={{width: 22, height: 15}} />
					            </TouchableOpacity> : <View></View>
	                    	}
	                    </View>
	                    <View style={{alignItems: 'center', flex: 9}}>
	                        <Text style={{fontSize: 18, color: '#d1d1d1'}}>{this.props.name}</Text>
	                    </View>
	                    <View style={{alignItems: 'center', flex: 1}}>
	                        <TouchableOpacity onPress={Actions.pop}>
	                            <Image source={require('../../assets/images/ic_dark-close.png')} style={{width: 22, height: 15}} />
	                        </TouchableOpacity>
	                    </View>
	                </View>
				</View>
				<WebView 
					source={{uri: this.props.url}}  
					style={{marginTop: 20}} 
					ref="webshop"
					javaScriptEnabled={true}
					automaticallyAdjustContentInsets={false}
					onNavigationStateChange={this.onNavigationStateChange}
				/>
			</View>
		)
	}
}
class BackButton extends Component {
	render() {
		return(
			<TouchableOpacity onPress={Actions.pop}>
                <Image source={require('../../assets/images/ic_product-back.png')} style={{width: 22, height: 15}} />
            </TouchableOpacity>
		)
	}
}

