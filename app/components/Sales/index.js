import React, { Component } from 'react';
import {
  	TouchableOpacity,
  	Text,
  	View,
  	Image,
  	ScrollView,
  	AsyncStorage,
  	ActivityIndicator
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import SalesCard from './SalesCard'
import {api} from '../../constants'

export default class Sales extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		sales: [],
	  		loading: true
	  	};
	}

	componentWillMount() {
	}

	componentDidMount() {
		AsyncStorage.getItem('sellfash@token').then((res) => {
			fetch(api+'/user/order_list', {
	  			method: "GET",
	  			headers: {
	  				'Content-Type': 'application/json',
	  				'Authorization': 'Bearer ' + res
	  			}
	  			}).then((res) => res.json())
				.then((resJson) => { 
					this.setState({sales: resJson.resellingOrderList, loading: false})
				})
		})
	}

	render() {
		if(this.state.loading) {
			return(
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<ActivityIndicator
			          	size="large"
			        />
				</View>
			)
		}
		if(this.state.sales.length == 0) {
			return(
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Image style={{width: 100, height: 150}} source={require('../../assets/images/img_sales-empty.png')} />
					<Text style={{fontSize: 20, fontWeight: '400', color: '#000', letterSpacing: 1, marginVertical: 25 }}>No orders yet ...</Text>
					<Text style={{color: '#ddd', fontSize: 16}}>Sadly you're customers haven't rdered anything.</Text>
					<Text style={{color: '#ddd', fontSize: 16, marginBottom: 50}}>Start Sharing products feed to get orders.</Text>
					<TouchableOpacity
						onPress={Actions.pop}
						style={{width: 200, paddingVertical: 15, borderRadius: 50, backgroundColor: '#4285f4', alignItems: 'center'}}
					>
						<Text style={{color: '#fff', fontSize: 16}}>FEED</Text>
					</TouchableOpacity>
				</View>
			)
		}
		return (
			<View style={styles.container}>
				{
					// <View style={styles.salesDetailCard}>
					// 	<View style={styles.ordersAndSoldContainer}>
					// 		<View style={styles.image}>
					// 			<Image style={{width: 50, height: 40}} source={require('../../assets/images/img_sales-order.png')} />
					// 		</View>
					// 		<View style={styles.detail}>
					// 			<Text style={styles.total}>25</Text>
					// 			<Text style={styles.type}>Orders</Text>
					// 		</View>
					// 	</View>
					// 	<View style={[styles.ordersAndSoldContainer, {borderLeftWidth: 1, borderLeftColor: '#fafafa'}]}>
					// 		<View style={styles.image}>
					// 			<Image style={{width: 45, height: 45}} source={require('../../assets/images/img_sales-sold.png')} />
					// 		</View>
					// 		<View style={styles.detail}>
					// 			<Text style={styles.total}>5</Text>
					// 			<Text style={styles.type}>Sales</Text>
					// 		</View>
					// 	</View>
					// </View>
				}
				<View>
					<Text style={styles.orderText}>Orders</Text>
				</View>
				<ScrollView>
					{
						this.state.sales.map((sale, i) => <SalesCard sale={sale} key={i} />)
					}
				</ScrollView>
			</View>
		)
	}
}