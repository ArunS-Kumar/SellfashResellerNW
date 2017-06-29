import React, { Component } from 'react'
import { Modal, Text, TouchableOpacity, View, Image, Dimensions, TextInput, AsyncStorage, Alert, Platform } from 'react-native'
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import {api} from '../../constants'
const {width, height} = Dimensions.get('window')

class Search extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            search: null,
            products: []
        };

        this.SearchProduct = this.SearchProduct.bind(this)
        this.clearSearch = this.clearSearch.bind(this)
    }

    componentWillMount() {
    }

    componentDidMount() {
        // this.searchInput.focus()
    }

    componentWillReceiveProps(props) {
    }

    clearSearch() {
        this.setState({search: "", products: []})
    }

    SearchProduct(q) {
        if(q.length > 0) {
            AsyncStorage.getItem('sellfash@token').then((res) => {
                fetch(api+'/feed/release_stock_and_reselling_product', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + res
                    },
                    body: JSON.stringify({
                        search: q
                    })
                    }).then((res) => {
                        if(!res.ok) {
                            throw Error(res.statusText);
                        }
                        return res.json()
                    })
                    .then((resJson) => { 
                        this.setState({products: resJson.feeds})
                    }).catch((err) => {
                        // Alert.alert('Error', err)
                    })
            })
        }
    }

    gotoProductDetailPage(product) {
        this.props.setSearchBarVisible()
        Actions.productdetail({item: product})
    }   

    render() {
        return (
                <View style={{marginTop: this.props.Search ? Platform.OS === 'ios' ? 22 : 0 : 0}}>
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.props.Search}
                        onRequestClose={() => this.props.setSearchBarVisible()}
                    >
                            <View style={{flex: 1, position: 'absolute', width: width, height: height, zIndex: 1, backgroundColor: '#000', opacity: 0.5}}>
                            </View>
                            <View style={{flex: 1, backgroundColor: 'transparent', zIndex: 9}}> 
                                <View style={{flexDirection: 'row', backgroundColor: '#fff',paddingTop: Platform.OS === 'ios' ? 32 : 10, paddingBottom: 10, paddingHorizontal: 12, alignItems:'center'}}>
                                    <TouchableOpacity onPress={this.props.setSearchBarVisible} style={{flex: 0.1, justifyContent: 'flex-start'}}>
                                        <Image source={require('../../assets/images/ic_product-back.png')} style={{width: 20, height: 15 }} />
                                    </TouchableOpacity>
                                    <View style={{flex: 1}}>
                                        <TextInput 
                                            placeholder="Search...."
                                            style={{borderWidth: 0}}
                                            style={{height: Platform.OS === 'ios' ? 30 : 50}}
                                            placeholderTextColor='#999'
                                            value={this.state.search}
                                            ref={(input) => this.searchInput = input}
                                            onChangeText={(search) => this.SearchProduct(search)}
                                            autoCorrect={false}
                                            underlineColorAndroid="transparent"
                                        />
                                    </View>
                                    <TouchableOpacity onPress={this.clearSearch} style={{flex: 0.1, justifyContent: 'flex-end'}}>
                                        <Image source={require('../../assets/images/ic_dark-close.png')} style={{width: 15, height: 15}} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginTop: 0.5,backgroundColor: '#fff',}}>
                                {
                                   this.state.products.map((product, i) => <Product product={product.product} key={i} gotoProductDetailPage={this.gotoProductDetailPage.bind(this, product)}/>)
                                }
                            </View>
                        </View>
                </Modal>
            </View>
        );
    }
}

class Product extends Component {

    componentWillMount() {
    }
    render() {
        return(
            <TouchableOpacity onPress={this.props.gotoProductDetailPage} style={{borderBottomWidth: 1, borderBottomColor: '#ddd', padding: 12}}>
                <Text>{this.props.product.title}</Text>
            </TouchableOpacity>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Search)