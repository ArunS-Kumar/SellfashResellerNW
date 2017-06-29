import {StyleSheet, Platform} from 'react-native'

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 30 : 0,
    },
    menuContent: {
        flex: 1,
        backgroundColor: '#ffc107',
        paddingHorizontal: 20
    },
    blackTransparent: {
        flex: Platform.OS === 'ios' ? 1.4 : 1,
        backgroundColor: '#000',
        opacity: 0.5
    },
    mobileNumber: {
        color: '#fff',
        fontSize: 18,
        letterSpacing: 0.5,
        fontWeight: "500"
    },
    viewWebshop: {
        flex: 1,
        alignItems: 'flex-end',
    },
    viewWebshopImage: {
        width: 25,
        height: 15,
        marginTop: 5
    },
    mobileAndViewWebshop: {
        flexDirection: 'row',  
        justifyContent: 'center', 
        alignItems: 'center'
    },
    homeImage: {
        width: 28,
        height: 31
    },
    salesImage: {
        width: 33,
        height: 33
    },
    paymentImage: {
        width: 36,
        height: 31
    },
    helpImage: {
        width: 27,
        height: 31
    },
    indicatorText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        marginTop: 10
    },
    webshopLink: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "600",
        // paddingLeft: 10
    },
    upImage: {
        width: 18,
        height: 10
    },
    menuNavigatorBtn: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export default styles