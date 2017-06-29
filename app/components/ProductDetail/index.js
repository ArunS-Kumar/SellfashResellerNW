import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  PixelRatio,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Modal
} from 'react-native'
import Swiper from 'react-native-swiper'
import {Actions} from 'react-native-router-flux'
import ImageLoader from 'react-native-smart-image-loader';
// import styles from './styles'
const { width, height } = Dimensions.get('window')
import ImageViewer from 'react-native-image-zoom-viewer';
import {imageUrl} from '../../constants'

const styles = {
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width: null,
        height: null,
        flex: 1
    },
    productNameAndPrice: {
        flexDirection: 'row',
    },
    productName: {
        flex: 4
    },
    productNameText: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.5,
        color: '#404040'
    },
    productPrice: {
        flex: 1,
        alignItems: 'flex-end'
    },
    productPriceText: {
        fontSize: 14,
        fontWeight: "500",
        color: '#ffc107'
    },
    productextraDetail: {
        marginVertical: 15
    },
    productSkuAndVariants: {
        flexDirection: 'row'
    },
    productSku: {
        flex: 1,
        alignItems: 'flex-start'
    },
    skuText: {
        fontSize: 12,
        color: '#9a9a9a',
        opacity: 0.9
    },
    supplierText: {
        fontSize: 12,
        color: '#9a9a9a',
        opacity: 0.9,
        marginTop: 5
    },
    supplierNameText: {
        fontSize: 12,
        color: '#8dc63f',
        fontWeight: "bold",
        letterSpacing: 0.5
    },
    skuCode: {
        color: '#9a9a9a'
    },
    productVariants: {
        flex: 1,
        alignItems: 'flex-end'
    },
    variantsText: {
        fontSize: 12,
        color: '#9a9a9a',
        opacity: 0.9
    },
    variants: {
        color: '#9a9a9a'
    },
    descText: {
        marginBottom: 10,
        color: '#9a9a9a',
        fontSize: 14,
        fontWeight: "500"
    },
    description: {
        color: '#9a9a9a',
        opacity: 0.9
    },
    baseImage: {
        flex: 1,
    },
    imageContainer: {
        flex: 1
    },
    productImage: {
        height: 100,
        width: 100,
    },
    filterBtn: {
        marginTop: 3,
        marginRight: 10
    },
    filterImage: {
        width: 10,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    searchBtn: {
        marginTop: 4,
        marginRight: 5,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    searchImage: {
        width: 20,
    },
    navBackButton: {
        marginTop:7,
        paddingRight:3, 
        width: 23, 
        height: 15
    },
}

const renderPagination = (index, total, context) => {
    return (
        <View style={{ position: 'absolute', right: width / 2.3, bottom: height / 2.5 }}>
            <Text style={{ color: '#fff', backgroundColor: '#000', paddingVertical: 7, paddingHorizontal: 15, borderRadius: 4 }}>
                <Text style={{color: '#fff', fontSize: 15 }}>{index + 1}</Text> / <Text style={{ color: '#fff', fontSize: 12}}>{total} </Text>
            </Text>
        </View>
  )
}

export default class extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            item: {},
            openModal: false
        };

        this.buyProduct = this.buyProduct.bind(this)
        this.shareProduct = this.shareProduct.bind(this)
    }

    componentDidMount() {
        this.setState({item: this.props.item})
    }

    buyProduct() {
        this.props.buyProduct(this.props.item.product.id, this.props.item.product.feedId,  this.props.item.product.title)
    }

    shareProduct() {
        this.props.shareProduct(this.props.item.product)
    }

    render () {
        let images = [];
        for(var i=0; i<this.props.item.product.images.length; i++) {
            images.push({url: 'https://s3.ap-south-1.amazonaws.com/moifash/test_product/'+this.props.item.product.images[i]})
        }
        return (
            <View style={{flex: 1, backgroundColor: "#f5f5f5"}}>
                <View style={{position: 'absolute', zIndex: 11, paddingHorizontal: 10, width: width, backgroundColor: '#fff', paddingTop: 22, paddingBottom: 5, opacity: 0.7}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flex: 1, justifyContent: 'flex-start'}}>
                            <TouchableOpacity style={[{
                                width: 50,
                                height: 37,
                                position: 'absolute',
                                bottom: 4,
                                left: 2,
                                padding: 8,
                                zIndex: 999999999,
                                justifyContent:'center',
                            }]} onPress={Actions.pop}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/ic_product-back.png')} color={'#ffffff'} style={styles.navBackButton} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <View style={{flexDirection: 'row', zIndex: 99999999,}}>
                                <TouchableOpacity style={styles.filterBtn} onPress={this.buyProduct}>
                                    <Image style={[styles.filterImage, {height: 26}]} source={require('../../assets/images/ic_product-buy.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.searchBtn} onPress={this.shareProduct}>
                                    <Image style={[styles.searchImage, {height: 23}]} source={require('../../assets/images/ic_product-share.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{position: 'absolute', zIndex: 10}}>
                    <Swiper 
                        style={styles.wrapper} loop={true}
                        renderPagination={renderPagination}
                        paginationStyle={{ bottom: -23, left: null, right: 10, }} loop={true}
                    >
                        {
                            this.props.item.product.images.map((image, i) => {
                                return (<TouchableWithoutFeedback onPress={() => this.setState({openModal: !this.state.openModal})} style={styles.slide} key={i}>
                                    {Platform.OS === 'ios' ?
                                        <Image style={styles.image} resizeMode={Image.resizeMode.cover} source={{uri: imageUrl+image}}/> :  <ImageLoader style={styles.image} resizeMode={Image.resizeMode.cover} options={{src: 'https://s3.ap-south-1.amazonaws.com/moifash/test_product/'+image, placeholder: ""}} />
                                    }
                                </TouchableWithoutFeedback>)
                            })
                        }
                    </Swiper>
                </View>
                <View style={{flex: 2, backgroundColor: 'transparent', zIndex: 1}}></View>
                <View style={{flex: 1, backgroundColor: 'transparent', zIndex: 11, marginHorizontal: 10, backgroundColor: "#fff", borderRadius: 4, paddingHorizontal: 20,paddingVertical: 15}}>
                    <ScrollView>
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
                                <Text style={styles.supplierText}>Supplier: <Text style={styles.supplierNameText}>Hariprasad</Text> </Text>
                            </View>
                        </View>
                        <View style={styles.productDescription}>
                            <Text style={styles.descText}>Description:</Text>
                            <Text style={styles.description} >{this.props.item.product.description}</Text>
                        </View>
                        {
                            this.props.item.product.extrainfo.length > 0 ? 
                                <View style={{marginTop: 15}}>
                                    <Text style={styles.descText}>Variants</Text>
                                    {
                                        this.props.item.product.extrainfo.map((v, i) => {
                                            return (
                                                <Variants v={v} key={i} index={i} />
                                            )
                                        })
                                    }
                                </View> : <View style={{flex: 0}}></View>
                        }
                        <Modal visible={this.state.openModal} transparent={true} onRequestClose={() => this.setState({openModal: !this.state.openModal})}>
                            <ImageViewer imageUrls={images}/>
                        </Modal>
                    </ScrollView>
                </View>
            </View>
        )
    }
}


class Variants extends Component {

    render() {
        return (
            <View style={{flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#f5f5f5', marginBottom: 5}}>
                <View style={styles.imageContainer}>
                    {
                        this.props.v.image.length > 0 ? <ImageLoader style={styles.productImage} options={{src: imageUrl+this.props.v.image[0], placeholder: ""}} /> : <Image source={require('../../assets/images/img_feed-image-empty.png')} />
                    }
                </View>
                <View style={{flex: 3, alignItems: 'center'}}>
                    <Text style={{marginTop: 15}}>{this.props.v.color}</Text>
                </View>
            </View>
        )
    }
}
