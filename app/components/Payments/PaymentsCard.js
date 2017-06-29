import React, { Component } from 'react';
import {
  	TouchableOpacity,
  	Text,
  	View,
} from 'react-native';
import styles from './styles'

export default class PaymentsCard extends Component {

	componentWillMount() {
	}
	render() {
		return (
			<View>
				<View style={styles.transCardContainer}>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 1}} >
							<Text style={styles.date}>{this.props.getdayMonth(this.props.payment.createdAt)}</Text>
						</View>
						<View style={{flex: 1, alignItems: 'flex-end'}} >
							<Text style={[styles.receivedText, { color: this.props.payment.transactionStatus == 'pending' ? 'orange' : this.props.payment.transactionStatus == 'accepted' ? 'green' : 'red'}]}>{this.props.payment.transactionStatus}</Text>
						</View>
					</View>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 1.5}} >
							<Text style={styles.orderRefText}>Order Ref: <Text style={{color: '#4285f4'}} onPress={this.props.showOrderDetail.bind(this, this.props.payment.product)}>{this.props.payment.order}</Text></Text>
						</View>
						<View style={{flex: 1, alignItems: 'flex-end'}} >
							<Text style={[styles.receivedText, { color: this.props.payment.transactionStatus == 'pending' ? 'orange' : this.props.payment.transactionStatus == 'accepted' ? 'green' : 'red'}]}>1200</Text>
						</View>
					</View>
				</View>
			</View>
		)
	}
}