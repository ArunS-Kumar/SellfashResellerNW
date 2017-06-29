import React, { Component } from 'react'
import { Modal, Text, TouchableOpacity, View, Image, AsyncStorage, Alert} from 'react-native'
import styles from './styles'
import {Actions} from 'react-native-router-flux'
import { connect } from 'react-redux'
import {url} from '../../constants'

class Menu extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            active: 1,
            user: {},
            shopName: null
        };

        this.goToWebshop = this.goToWebshop.bind(this)
    }

    componentWillMount() {
        AsyncStorage.getItem('sellfash@user').then((res) => {
            var user = JSON.parse(res)
            this.setState({user: user})
            // Alert.alert('sellfash@user', res)
        })
    }

    componentDidMount() {
    }

    goToWebshop() {
        this.props.setMenuVisible()
        AsyncStorage.getItem('sellfash@user').then((val) => {
            if(val) {
                var user = JSON.parse(val)
                this.setState({shopName: user.shopName})
                Actions.webview({url: url+'/'+user.shopName, name: user.shopName})
            } else {
                Alert.alert('You have not set up your webshop!')
            }
        })
    }

    componentWillReceiveProps(props) {
    }

    navigateToHome() {
        this.setState({active: 1})
        this.props.setMenuVisible()
        Actions.home({type: 'reset'})
    }

    navigateToSales() {
        this.setState({active: 2})
        this.props.setMenuVisible()
        Actions.sales()
    }

    navigateToPayments() {
        this.setState({active: 3})
        this.props.setMenuVisible()
        Actions.payments()
    }

    navigateToHelp() {
        this.setState({active: 4})
        this.props.setMenuVisible()
        Actions.help()
    }

    render() {
        return (
            <View style={{marginTop: this.props.Menu ? 22 : 0}}>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.props.Menu}
                    onRequestClose={() => this.props.setMenuVisible()}
                >
                <View style={styles.menuContainer}>
                    <View style={styles.menuContent}>
                        <View style={styles.mobileAndViewWebshop}>
                            <View style={{flex: 2}}>
                                <Text style={styles.mobileNumber}>+91 {"" || this.state.user.mobile}</Text>
                            </View>
                            <View style={styles.viewWebshop}>
                                <TouchableOpacity style={{padding: 10}} onPress={this.goToWebshop}>
                                    <Image style={styles.viewWebshopImage} source={require('../../assets/images/ic_drawer-view-webshop.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginVertical: 40}}>
                            <TouchableOpacity style={styles.menuNavigatorBtn} onPress={this.navigateToHome.bind(this)}>
                                <Image style={styles.homeImage} source={this.state.active == 1 ? require('../../assets/images/ic_drawer-feed-active.png') : require('../../assets/images/ic_drawer-feed-inactive.png')}/>
                                <Text style={[styles.indicatorText, {color: this.state.active == 1 ? "#fff" : "#ffde9a"}]}>Home</Text>                                  
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuNavigatorBtn} onPress={this.navigateToSales.bind(this)}>
                                    <Image style={styles.salesImage} source={this.state.active == 2 ? require('../../assets/images/ic_drawer-sales-active.png') : require('../../assets/images/ic_drawer-sales-inactive.png') }/>
                                    <Text style={[styles.indicatorText, {color: this.state.active == 2 ? '#fff' : '#ffde9a'}]}>Sales</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuNavigatorBtn} onPress={this.navigateToPayments.bind(this)}>
                                    <Image style={styles.paymentImage} source={this.state.active == 3 ? require('../../assets/images/ic_drawer-payment-active.png') : require('../../assets/images/ic_drawer-payment-inactive.png')}/>
                                    <Text style={[styles.indicatorText, {color: this.state.active == 3 ? "#fff" : "#ffde9a"}]}>Payment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuNavigatorBtn} onPress={this.navigateToHelp.bind(this)}>
                                    <Image style={styles.helpImage} source={this.state.active == 4 ? require('../../assets/images/ic_drawer-help-active.png') : require('../../assets/images/ic_drawer-help-inactive.png')}/>
                                    <Text style={[styles.indicatorText, {color: this.state.active == 4 ? '#fff' : '#ffde9a'}]}>Help</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{flexDirection: 'row', backgroundColor: '#fdd250', padding: 12, borderRadius: 4, marginHorizontal: 5}}>
                            <Image source={require('../../assets/images/ic_drawer-link.png')} style={{width: 20, height: 20}} />
                            <Text numberOfLines={1} style={styles.webshopLink}>{'https://wwww.moifash.com/'+this.state.shopName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', marginTop: 30, padding: 10}} onPress={this.props.setMenuVisible}>
                            <Image style={styles.upImage} source={require('../../assets/images/ic_drawer-swipe-up.png')}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.blackTransparent} onPress={this.props.setMenuVisible}></TouchableOpacity>
                </View>
                </Modal>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Menu)