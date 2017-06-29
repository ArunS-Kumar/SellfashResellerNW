import React, { Component } from 'react'
import {
	View, 
	Text,
	Image,
	Platform
} from 'react-native'
import styles from './styles'

export default class Help extends Component {
	render() {
		return(
			<View style={styles.container}>
				<View style={styles.view1}>
					<View style={{marginBottom: 30}}>
						<Text style={styles.text}>Solutions for most of the problems you're</Text>
						<Text style={styles.text}>facing can be found by these quick links</Text>
					</View>
					<View style={{flexDirection: 'row', paddingHorizontal: 20}}>
						<View style={{flex: 1}}>
							<View style={styles.box}>
								<Image style={{width: 55, height: 50}} source={require('../../assets/images/ic_help-demo.png')} />
							</View>
							<Text style={styles.title}>Demo</Text>
						</View>
						<View style={{flex: 1, marginHorizontal: 15}}>
							<View style={[styles.box, ]}>
								<Image style={{width: 50, height: 50}} source={require('../../assets/images/ic_help-faq.png')} />
							</View>
							<Text style={styles.title}>FAQ</Text>
						</View>
						<View style={{flex: 1}}>
							<View style={styles.box}>
								<Image style={{width: 50, height: 50}} source={require('../../assets/images/ic_help-terms.png')} />
							</View>
							<Text style={styles.title}>Terms</Text>
						</View>
					</View>
				</View>
				<View style={{flex: 1, paddingHorizontal: 50, marginTop: Platform.OS === 'ios' ? 30 : 15}}>
					
					<View style={{flex: 1.5}}>
						<Text style={[styles.title]}>Need help? Worry not we're always</Text>
						<Text style={[styles.title, {marginTop: 4,}]}>here to help you</Text>
					</View>
					<View style={{flex: 1}}>
						<View style={styles.box2}>
							<View style={[ styles.smallbox, {backgroundColor: '#68e1aa'}]}>
								<Image style={{width: 30, height: 30}} source={require('../../assets/images/ic_help-whatsapp.png')} />
							</View>
							<Text style={{marginTop: 10, marginLeft: 20}}>+91 9740082420</Text>
						</View>
					</View>
					<View style={{flex: 1}}>
						<View style={styles.box2}>
							<View style={[ styles.smallbox, {backgroundColor: '#777777'}]}>
								<Image style={{width: 26, height: 20}} source={require('../../assets/images/ic_help-mail.png')} />
							</View>
							<Text style={{marginTop: 10, marginLeft: 20}}>+91 9740082420</Text>
						</View>
					</View>
					<View style={{flex: 1}}>
						<View style={styles.box2}>
							<View style={[ styles.smallbox, {backgroundColor: '#4285f4'}]}>
								<Image style={{width: 10, height: 20}} source={require('../../assets/images/ic_help-facebook.png')} />
							</View>
							<Text style={{marginTop: 10, marginLeft: 20}}>+91 9740082420</Text>
						</View>
					</View>
				</View>
			</View>
		)
	}
}