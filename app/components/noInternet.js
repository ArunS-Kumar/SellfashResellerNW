import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class NoInternet extends Component {
	render() {
		return(
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', opacity: 0.7}}>
				<Text style={{fontSize: 16, color: '#fff', fontWeight: '400'}}>Please check your network connection.</Text>
			</View>
		)
	}
}