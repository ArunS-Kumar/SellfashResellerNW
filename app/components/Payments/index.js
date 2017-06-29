import React, { Component } from 'react';
import {
  	TouchableOpacity,
  	Text,
  	View,
  	Image,
  	ScrollView,
  	AsyncStorage,
  	Modal,
  	ActivityIndicator
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import PaymentsCard from './PaymentsCard'
import {api, imageUrl} from '../../constants'
import ImageLoader from 'react-native-smart-image-loader';

export default class Payments extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		payments: [],
	  		totalBalance: null,
	  		alreadyReceiveAmount: null,
	  		yetToReceiveAmount: null,
	  		loading: true,
	  		orderDetail: {},
	  		showModal: false
	  	}
	}

	componentDidMount() {
		AsyncStorage.getItem('sellfash@token').then((res) => {
			fetch(api+'/transactions/all', {
	  			method: "GET",
	  			headers: {
	  				'Content-Type': 'application/json',
	  				'Authorization': 'Bearer ' + res
	  			}
	  			}).then((res) => res.json())
				.then((resJson) => { 
					this.setState({payments: resJson.transactions, totalBalance: Math.floor(resJson.totalBalance), alreadyReceiveAmount: Math.floor(resJson.alreadyReceiveAmount), yetToReceiveAmount: Math.floor(resJson.yetToReceiveAmount), loading: false})
				})
		})
	}

	showOrderDetail(product) {
    	this.setState({orderDetail: product, showModal: true})
    }

    closeModal() {
    	this.setState({orderDetail: {}, showModal: false})
    }

    getdayMonth(date) {
        var createdAt = new Date(date);
        var createddate = createdAt.getDate();
        var createdYear = createdAt.getFullYear();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var createdMonth = monthNames[createdAt.getMonth()];
        return createddate + ' ' + createdMonth + ' ' + createdYear;
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
		if(this.state.payments.length == 0) {
			return(
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Image style={{width: 100, height: 150}} source={require('../../assets/images/img_payment-empty.png')} />
					<Text style={{fontSize: 20, fontWeight: '400', color: '#000', letterSpacing: 1, marginVertical: 25 }}>No Payments yet ...</Text>
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
				<View style={{marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>
					<Image style={styles.earningImage} source={require('../../assets/images/img_payment-earnings.png')} />
					<Text style={styles.myEarningText}>My Earnings</Text>
					<Text style={styles.earningPrice}>Rs. {this.state.totalBalance}</Text>
					<View style={styles.earningsCardContainer}>
						<View style={styles.receivedAndPending}>
							<View style={{flex: 1}}>
								<Text style={styles.myEarningText}>Recieved</Text>
								<Text style={styles.receivedText}>Rs. {this.state.alreadyReceiveAmount}</Text>
							</View>
							<View style={{flex: 1, alignItems: 'flex-end'}}>
								<Text style={styles.myEarningText}>Pending</Text>
								<Text style={styles.pendingText}>Rs. {this.state.yetToReceiveAmount}</Text>
							</View>
						</View>
					</View>
				</View>
				<Text style={{fontSize: 16, color: '#9a9a9a', marginBottom: 15}}>Transactions</Text>
				<ScrollView>
					{
						this.state.payments.map((payment, i) => <PaymentsCard key={i} payment={payment} showOrderDetail={this.showOrderDetail.bind(this)} getdayMonth={this.getdayMonth.bind(this)}/>)
					}
				</ScrollView>
				<Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({showModal: false})}
                >
                	<View style={{flex: 1}}>
                		<View style={{flex: 1, backgroundColor: '#000', opacity: 0.7}}></View>
                		<View style={{flex: 5, flexDirection: 'row'}}>
                			<View style={{flex: 0.05, backgroundColor: '#000', opacity: 0.7}}></View>
                			<View style={{flex: 9, backgroundColor: '#fff', flex: 1}}>
	                			<View style={{flex: 7, position: 'relative'}}>
	                				<View style={{position: 'absolute', top: 0, right: 0, zIndex: 9999, backgroundColor: '#fff'}}>
	                					<TouchableOpacity onPress={() => this.setState({showModal: false})}>
	                						<Image source={require('../../assets/images/ic_dark-close.png')} style={{width: 25, height: 25}} />
	                					</TouchableOpacity>
	                				</View>
	                				<ImageLoader style={styles.productImage} resizeMode={Image.resizeMode.sretch} options={{src: imageUrl+this.state.orderDetail.baseImage, placeholder: ""}} />
	                			</View>
	                			<View style={{flex: 2.5, margin: 15}}>
	                				<View style={styles.productName}>
										<Text style={styles.productNameText}>{this.state.orderDetail.title}</Text>
									</View>
									<View style={{marginBottom: 5}}>
										<Text style={{fontSize: 14, color: '#999'}}>SKU: {this.state.orderDetail.productId}</Text>
									</View>
									<View style={{marginBottom: 5}}>
										<Text style={{fontSize: 14, color: '#999'}}>SUPPLIER: {"Hariprasad"}</Text>
									</View>
									<View style={{marginBottom: 5}}>
										<Text style={{fontSize: 14, color: '#999'}}>Order Date: {this.getdayMonth.bind(this, this.state.orderDetail.createdAt)}</Text>
									</View>
									<View style={{marginBottom: 5}}>
										<Text style={{fontSize: 14, color: '#999'}}>Profit: {this.state.orderDetail.customerPrice - this.state.orderDetail.resellerPrice}</Text>
									</View>
	                			</View>
	                		</View>
	                		<View style={{flex: 0.05, backgroundColor: '#000', opacity: 0.7}}></View>
                		</View>
                		<View style={{flex: 1, backgroundColor: '#000', opacity: 0.7}}></View>
                	</View>
                </Modal>
			</View>
		)
	}
}