import React, { Component } from 'react'
import { Modal, Text, TouchableOpacity, View, Image, Dimensions, TextInput, AsyncStorage, Alert } from 'react-native'
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import {api} from '../../constants'

class Filter extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            nextCategory: [],
            name: null
        };

        this.setNextCategories = this.setNextCategories.bind(this)
    }

    componentWillMount() {
    }

    componentDidMount() {
        // this.searchInput.focus()
    }

    componentWillReceiveProps(props) {
    } 

    setNextCategories(cat, name) {
        this.setState({nextCategory: cat, name: name})
    }

    render() {
        return (
            <View style={{marginTop: 22,flex: 1, marginTop: 25}}>
                {
                    this.state.nextCategory.length > 0 ? <NextCategory categoryname={this.state.name} nextCategories={this.state.nextCategory} setNextCategories={this.setNextCategories} {...this.props} /> : <CategoryList setNextCategories={this.setNextCategories.bind(this)} {...this.props} />
                }
            </View>
        );
    }
}

class CategoryList extends Component {
    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', marginBottom: 15, alignItems:'center'}}>
                    <View style={{alignItems: 'center', flex: 1}}>
                        <TouchableOpacity style={{padding: 10}} onPress={Actions.pop}>
                            <Image source={require('../../assets/images/ic_dark-close.png')} style={{width: 17, height: 17}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center', flex: 9}}>
                        <Text style={{fontSize: 18, color: '#d1d1d1'}}>FILTER BY CATEGORY</Text>
                    </View>
                </View>
                {
                    this.props.Filter.categories.map((cat, i) => <Category cat={cat} key={i} {...this.props} />)
                }
            </View>
        )
    }
}

class Category extends Component {

    setCategory(cat, name) {
        this.props.setNextCategories(cat, name)
    }

    getProduct(id) {
        AsyncStorage.getItem('sellfash@token').then((res) => {
            fetch(api+'/feed/release_stock_and_reselling_product', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + res
                },
                body: JSON.stringify({
                    category: id
                })
                }).then((res) => {
                    if(!res.ok){
                        return
                    }
                    return res.json()
                })
                .then((resJson) => { 
                    Actions.pop()
                    Actions.refresh({products: resJson, category: id})
                })
        })
    }

    render() {
        return(
            <View style={{flexDirection: 'row', padding: 12, borderBottomColor: '#fafafa', borderBottomWidth: 0.5}}>
                <View style={{flex: 9}}>
                    <TouchableOpacity onPress={this.getProduct.bind(this, this.props.cat.id)}>
                        <Text>{this.props.cat.displayName}</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.props.cat.child_categories ?
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={this.setCategory.bind(this, this.props.cat.child_categories, this.props.cat.displayName)}  style={{alignItems: 'center'}}>
                            <Image source={require('../../assets/images/right-arrow.png')} style={{width: 20, height: 20}} />
                        </TouchableOpacity>
                    </View> : <View style={{flex: 1}}></View>
                }
            </View>
        )
    }
}

class NextCategory extends Component {
    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', marginBottom: 15, alignItems:'center'}}>
                    <View style={{alignItems: 'center', flex: 1}}>
                        <TouchableOpacity onPress={Actions.pop}>
                            <Image source={require('../../assets/images/ic_dark-close.png')} style={{width: 17, height: 17}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems: 'center', flex: 9}}>
                        <Text style={{fontSize: 18, color: '#d1d1d1'}}>{this.props.categoryname}</Text>
                    </View>
                </View>
                {
                    this.props.nextCategories.map((cat, i) => <Category cat={cat} key={i} {...this.props}/>)
                }
            </View>
        )
    }
}

// {
//     this.props.cat.child_categories ? this.props.cat.child_categories.map((cat, i) => <Category cat={cat} key={i} />) : <View></View>
// }

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Filter)

