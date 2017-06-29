import React, { Component } from 'react';
import {
  	TouchableOpacity,
  	Text,
  	View,
  	Image,
  	ScrollView,
  	AsyncStorage,
  	ActivityIndicator,
  	Dimensions,
  	ListView,
  	FlatList,
  	AlertIOS,
  	ToastAndroid,
  	Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import ProductCard from './productCard'
import Menu from '../Menu/index'
import Search from '../Search/index'
import Filter from '../Filter/index'
import {api} from '../../constants'

const {width, height} = Dimensions.get('window')

// const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Home extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {
	  		feeds: [],
	  		totalRecord: null,
	  		loading: true,
	  		loader: false,
	  		refreshing: false,
	  		noMoreDataToLoad: false,
	  		category: null
	  	};

	  	this.showLoader = this.showLoader.bind(this)
	  	this.refresh = this.refresh.bind(this)
	  	this.loadMore= this.loadMore.bind(this)
	}

	componentWillReceiveProps(props) {
		this.setState({feeds: props.products.feeds, totalRecord: props.products.totalRecord, skip: props.products.skip, noMoreDataToLoad: false, category: props.category})
		this.ref.list.getNode().scrollToIndex({viewPosition: 0, index: 0});
    }

	componentWillMount() {
	}

	componentDidMount() {
		this.refresh()
		this.props.getCategories()
	}

	showLoader() {
		this.setState({loader: !this.state.loader})
	}

	loadMore() {
		if(this.state.noMoreDataToLoad) {
			if(Platform.OS === 'ios') {
				AlertIOS.alert(
					'Message',
					'No more data to load!'
				)
			} else {
				ToastAndroid.showWithGravity('No More products to Load', ToastAndroid.SHORT, ToastAndroid.CENTER);
			}
		} else {
			var bodyData = null;
			if(this.state.category != null) {
				bodyData = JSON.stringify({
	  				category: this.state.category,
	  				skip: this.state.skip
	  			})
			} else {
				var bodyData = JSON.stringify({
	  				skip: this.state.skip
	  			})
			}
			this.setState({refreshing: !this.state.refreshing})
			if(this.state.totalRecord >= (this.state.skip - 5)) {
				AsyncStorage.getItem('sellfash@token').then((res) => {
					fetch(api+'/feed/release_stock_and_reselling_product', {
			  			method: "POST",
			  			headers: {
			  				'Content-Type': 'application/json',
			  				'Authorization': 'Bearer ' + res
			  			},
			  			body: bodyData
			  			}).then((res) => res.json())
						.then((resJson) => { 
							this.setState({refreshing: !this.state.refreshing})
							this.setState({feeds: this.state.feeds.concat(resJson.feeds), totalRecord: resJson.totalRecord, skip: resJson.skip, loading: false})
						})
				})
			} else {
				this.setState({refreshing: !this.state.refreshing, noMoreDataToLoad: true})
			}
		}
		// Alert.alert('end reached');
	}

	refresh() {
		this.setState({feeds: [], totalRecord: 0, skip: 0, loading: true, noMoreDataToLoad: false})
		AsyncStorage.getItem('sellfash@token').then((res) => {
			fetch(api+'/feed/release_stock_and_reselling_product', {
	  			method: "POST",
	  			headers: {
	  				'Content-Type': 'application/json',
	  				'Authorization': 'Bearer ' + res
	  			},
	  			body: JSON.stringify({
	  			})
	  			}).then((res) => res.json())
				.then((resJson) => { 
					this.setState({feeds: resJson.feeds, totalRecord: resJson.totalRecord, skip: resJson.skip, loading: false})
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
		if(this.state.feeds.length == 0) {
			return(
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<Text>No Products!</Text>
					<Menu {...this.props}/>
					<Search {...this.props}/>
				</View>
			)
		}
		return (
			<View style={styles.container}>
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
				<View style={styles.itemCounter}>
					<Text style={styles.itemsText}>{this.state.feeds.length + ' / ' + this.state.totalRecord} items</Text>
				</View>
				<FlatList 
					style={{paddingHorizontal: 10}}
					ref="list"
					data={this.state.feeds}
					keyExtractor={(item, index) => item.id}
					refreshing={this.state.refreshing}
					renderItem = {({item}) => <ProductCard showLoader={this.showLoader} item={item}/>}
					onRefresh={this.refresh}
					onEndReached={this.loadMore}
					onEndReachedThreshold={0.5}
				/>
				<Menu {...this.props}/>
				<Search {...this.props}/>
			</View>
		)
	}
}