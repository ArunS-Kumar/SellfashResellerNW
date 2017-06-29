import React, { Component } from 'react';
import {
  	TouchableOpacity,
  	Text,
  	View,
  	ScrollView,
  	WebView,
  	AsyncStorage,
  	Alert,
  	Platform,
  	Image
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import {api, imageUrl} from '../../constants'

import ImageLoader from 'react-native-smart-image-loader';

export default class ProductCard extends Component {

	constructor(props) {
	  	super(props);
	
	  	this.state = {

	  	};

	  	this.buyProduct = this.buyProduct.bind(this)
	}

	componentWillMount() {
	}

	buyProduct(id, feedId, name) {
		this.props.showLoader()
		AsyncStorage.getItem('sellfash@token').then((res) => {
			fetch(api+'/buy/product/'+id, {
	  			method: "PUT",
	  			headers: {
	  				'Content-Type': 'application/json',
	  				'Authorization': 'Bearer ' + res
	  			},
	  			body: JSON.stringify({
	  			})
	  			}).then((res) => {
	  				if(res.ok){
	  					return res.json()
	  				} else {
	  					return "error"
	  				}
	  			})
				.then((resJson) => { 
					this.props.showLoader()
					if(resJson != 'error') {
						Actions.webview({url: resJson, name})
					} else {
						Alert.alert('Error', 'Some error occured Please try again!')
					}
				})
		})
	}

	gotoProductDetail(item) {
		Actions.productdetail({item: item, buyProduct: this.buyProduct, shareProduct: this.shareProduct})
	}

	shareProduct(product){
		Actions.sellingprice({shareProduct: product})
	}

	render() {
		return (
			<View style={styles.productCard}>
				<TouchableOpacity onPress={this.gotoProductDetail.bind(this, this.props.item)}>
					<View style={styles.imageContainer}>
						<View style={styles.baseImage}>
							{
								Platform.OS === 'ios' ? <IosImage image={this.props.item.product.baseImage} /> : <AndroidImage image={this.props.item.product.baseImage} />
							}
						</View>
						<View style={styles.imagesContainer}>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 1}} >
									{
										Platform.OS === 'ios' ? <IosImage image={this.props.item.product.images[1]} /> : <AndroidImage image={this.props.item.product.images[1]} />
									}
								</View>
								<View style={{flex: 1}}>
									{
										Platform.OS === 'ios' ? <IosImage image={this.props.item.product.images[2]} /> : <AndroidImage image={this.props.item.product.images[2]} />
									}
								</View>
							</View>
							<View style={{flex: 1, flexDirection: 'row'}}>
								<View style={{flex: 1}}>
									{
										Platform.OS === 'ios' ? <IosImage image={this.props.item.product.images[3]} /> : <AndroidImage image={this.props.item.product.images[3]} />
									}
								</View>
								<View style={{flex: 1}}>
									{
										Platform.OS === 'ios' ? <IosImage image={this.props.item.product.images[4]} /> : <AndroidImage image={this.props.item.product.images[4]} />
									}
								</View>
							</View>
						</View>
					</View>
					<View style={styles.detailContainer}>
						<View style={styles.productNameAndPrice}>
							<View style={styles.productName}>
								<Text style={styles.productNameText}>{this.props.item.product.title}</Text>
							</View>
							<View style={styles.productPrice}>
								<Text style={styles.productPriceText}> Rs. {this.props.item.product.resellerPrice} </Text>
							</View>
						</View>
						<View style={styles.productextraDetail}>
							<View style={styles.productSkuAndVariants}>
								<View style={styles.productSku}>
									<Text style={styles.skuText}>SKU: <Text style={styles.skuCode}>{this.props.item.product.productId}</Text></Text>
								</View>
								<View style={styles.productVariants}>
									<Text style={styles.variantsText}>VARIANTS: <Text style={styles.variants}>{this.props.item.product.extrainfo.length}</Text></Text>
								</View>
							</View>
							<View>
								<Text style={styles.supplierText}>Supplier: <Text style={styles.supplierNameText}>{this.props.item.from.firstName}</Text> </Text>
							</View>
						</View>
					<View style={styles.productDescription}>
						<Text style={styles.descText}>Description:</Text>
						<Text style={styles.description} numberOfLines={3}>{this.props.item.product.description}</Text>
					</View>
				</View>
				</TouchableOpacity>
				<View>
					<View style={styles.actionBtns}>
						<TouchableOpacity style={styles.buyBtn} onPress={this.buyProduct.bind(this, this.props.item.product.id, this.props.item.product.feedId, this.props.item.product.title)}>
							<Text style={styles.buyAndShareBtnText}>BUY</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.shareBtn} onPress={this.shareProduct.bind(this, this.props.item.product)}>
							<Text style={styles.buyAndShareBtnText}>SHARE</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}

class IosImage extends Component {
	render() {
		if(this.props.image == undefined) {
			return (
				<View style={{backgroundColor:'#f5f5f5', alignItems: 'center', justifyContent: 'center', margin: 3, flex: 1}}>
					<Image style={{width: 40, height: 40}} source={require('../../assets/images/img_feed-image-empty.png')} />
				</View>
			)
		}
		return(
			<Image style={styles.productImage} resizeMode={Image.resizeMode.cover} source={{uri: imageUrl+this.props.image}} />
		)
	}
}

class AndroidImage extends Component {
	render() {
		if(this.props.image == undefined) {
			return (
				<View style={{backgroundColor:'#f5f5f5', alignItems: 'center', justifyContent: 'center', margin: 3, flex: 1}}>
					<Image style={{width: 40, height: 40}} source={require('../../assets/images/img_feed-image-empty.png')} />
				</View>
			)
		}
		return(
			<ImageLoader style={styles.productImage} resizeMode={Image.resizeMode.stretch} options={{src: imageUrl+this.props.image, placeholder: ""}} />
		)
	}
}

