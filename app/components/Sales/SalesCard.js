import React, { Component } from 'react';
import {
  	TouchableOpacity,
  	Text,
  	View,
  	Image,
  	ScrollView
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import {imageUrl} from '../../constants'
import ImageLoader from 'react-native-smart-image-loader';

export default class SalesCard extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {

	  	};

	  	this.getdayMonth = this.getdayMonth.bind(this)
	}

	getdayMonth(date) {
        var createdAt = new Date(date);
        var createddate = createdAt.getDate();
        var createdYear = createdAt.getFullYear();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var createdMonth = monthNames[createdAt.getMonth()];
        return createddate + ' ' + createdMonth + ' ' + createdYear;
    }

	componentWillMount() {
	}

	render() {
		return (
			<View>
				<View style={styles.salesCard}>
					<View style={styles.imageAnddetainContainer}>
						<View style={styles.imageContainer}>
							<ImageLoader style={styles.productImage} options={{src: imageUrl+this.props.sale.items[0].imgName, placeholder: ""}} />
						</View>
						<View style={styles.detailContainer}>
							<Text numberOfLines={1} style={styles.productName}>{this.props.sale.items[0].productTitle}</Text>
							<View style={{flexDirection: 'row'}}>
								<View style={{flex: 7}}>
									<Text style={styles.extradetail}>SKU: {this.props.sale.items[0].itemId}</Text>
								</View>
								<View style={{flex: 1, justifyContent: 'flex-end'}}>
									<Text style={[styles.extradetail, {backgroundColor: '#f5f5f5', paddingHorizontal: 4, color: '#404040'}]}>x{this.props.sale.items.length}</Text>
								</View>
							</View>
							<Text style={styles.extradetail}>Supplier: {this.props.sale.reseller.firstName}</Text>
							<Text style={styles.extradetail}>Order Date: {this.getdayMonth(this.props.sale.createdAt)}</Text>
							<Text style={styles.extradetail}>Profit: Rs. { this.props.sale.profit ? Math.floor(this.props.sale.profit) : 0}</Text>
						</View>
					</View>
					<View style={{flexDirection: 'row', marginTop: 15}}>
						<View style={{flex: 1.5}}>
							<Text style={styles.extradetail}>Order Ref: {this.props.sale.orderId}</Text>
						</View>
						<View style={{flex: 1, alignItems: 'flex-end'}}>
							<Text numberOfLines={1} style={{color: '#11d47f'}}>{this.props.sale.items[0].orderStatus}</Text>
						</View>
					</View>
				</View>
			</View>
		)
	}
}