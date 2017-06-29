import {StyleSheet, Platform, PixelRatio} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.os == 'android' ? 44 : 66,
        backgroundColor: '#f9f9f9',
        padding: 15,
    },
    earningImage: {
        width: 65,
        height: 65,
        marginBottom: 13
    },
    myEarningText: {
        // marginTop: 10,
        fontSize: 12,
        // letterSpacing: 0.5,
        color: '#9a9a9a',
        marginBottom: 5,
        fontWeight: "500"
    },
    earningPrice: {
        fontWeight: "700",
        color: "#ffc107",
        fontSize: 18,
        marginBottom: 15
    },
    earningsCardContainer: {
        minHeight: 70,
        shadowColor: '#9a9a9a',
        shadowOpacity: 0.15,
        shadowOffset: { 
            height: 4
        },
        backgroundColor: '#fff',
        borderRadius: 4,
        flexDirection: 'row',
        marginBottom: 30
    },
    receivedAndPending: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    receivedText: {
        fontSize: 14,
        color: '#11d47f',
        fontWeight: "700"
    },
    pendingText: {
        fontSize: 14,
        color: '#fc6682',
        fontWeight: "700"
    },
    transCardContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#fafafa',
    },
    date: {
        fontSize: 14,
        color: '#9a9a9a',
        opacity: 0.9,
        marginBottom: 5,
        fontWeight: "500"
    },
    orderRefText: {
        fontSize: 13,
        color: '#404040',
        fontWeight: '700'
    },
    productImage: {
        flex: 1,
        width: null,
        height: null,
        borderRadius: 2.5,
    },
    productNameText: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.5,
        color: '#404040',
        marginBottom: 10
    },
});

export default styles