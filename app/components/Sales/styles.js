import {StyleSheet, Platform, PixelRatio} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.os == 'android' ? 44 : 66,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 15
    },
    salesDetailCard: {
        marginVertical: 30, 
        minHeight: 90,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { 
            height: 2
        },
        backgroundColor: '#fff',
        borderRadius: 4,
        flexDirection: 'row'
    },
    ordersAndSoldContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    image: {
        flex: 1.5
    },
    detail: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    total: {
        fontSize: 20,
        fontWeight: "700",
        color: "#ffc107",
        textAlign: 'right'
    },
    type: {
        fontSize: 14,
        color: '#9a9a9a',
        opacity: 0.8,
        textAlign: 'right',
        fontWeight: '600',
        marginTop: 5
    },
    orderText: {
        fontSize: 16,
        color: '#999',
        fontWeight: '400',
        marginBottom: 15
    },
    salesCard: {
        flex: 1,
        marginBottom: 10,
        minHeight: 120,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { 
            height: 2
        },
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 4
    },
    imageAnddetainContainer: {
        flexDirection: 'row'
    },
    imageContainer: {
        flex: 1.2
    },
    productImage: {
        height: 110,
        width: 110,
        borderRadius: 55,
    },
    detailContainer: {
        flex: 2,
        marginLeft: 8
    },
    productName: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.5,
        color: '#404040',
        marginBottom: 12
    },
    extradetail: {
        fontSize: 13,
        marginBottom: 4,
        color: '#9a9a9a',
        opacity: 0.8
    },
});

export default styles