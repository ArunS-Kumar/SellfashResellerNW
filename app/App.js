import React, { Component } from 'react';
import {AppState, View, Alert, NetInfo} from 'react-native'
import {Provider} from 'react-redux'
import Routes from './routes'
import store from './store'
import PushNotification from 'react-native-push-notification'
import NoInternet from './components/noInternet'
export default class App extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		deviceToken: null,
	  		connected: true
	  	};
	  	this.handleStateChange = this.handleStateChange.bind(this)
	  	this._handleConnectionInfoChange = this._handleConnectionInfoChange.bind(this)
	  	this.onRegister = this.onRegister.bind(this)
	  	this.onNotification = this.onNotification.bind(this)
	}

	componentDidMount() {
		NetInfo.isConnected.addEventListener('change', this._handleConnectionInfoChange);
		NetInfo.isConnected.fetch().done(
	        (isConnected) => { this.setState({connected: isConnected}); }
	    );
		AppState.addEventListener('change', this.handleStateChange)
		PushNotification.configure({
		    onRegister: this.onRegister,
		    onNotification: this.onNotification,
		    senderID: "409969189226",
		    permissions: {
		        alert: true,
		        badge: true,
		        sound: true
		    },
		    popInitialNotification: true,
		    requestPermissions: true,
		});
	}

	_handleConnectionInfoChange(connected) {
		this.setState({connected: connected})
	}

	onNotification(notification) {
	}

	onRegister(token) {
		this.setState({deviceToken: token.token})
	}

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener('change', this._handleConnectionInfoChange);
		AppState.removeEventListener('change', this.handleStateChange)
	}

	handleStateChange(appState) {
	}

	render() {
		if(!this.state.connected) {
			return (
				<NoInternet />
			)
		}
		return (
			<Provider store={store}>
				<Routes deviceToken={this.state.deviceToken} connected={this.state.connected}/>
			</Provider>
		)
	}
}