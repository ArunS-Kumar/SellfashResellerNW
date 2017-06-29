import {StyleSheet, Platform} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.os == 'android' ? 44 : 66,
        backgroundColor: '#f9f9f9'
    },
    itemCounter: {
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemsText: {
        color: '#9a9a9a',
        opacity: 0.9
    },
    productCard: {
        flex: 1,
        marginHorizontal: 5, 
        marginBottom: 10,
        minHeight: 120,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { 
            height: 2
        },
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 4,
        elevation   : 3,
    },
    imageContainer: {
        flexDirection: 'row',
        height: 140,
    },
    baseImage: {
        flex: 1,
    },
    imagesContainer: {
        flex: 1,
    },
    productImage: {
        flex: 1,
        width: null,
        height: null,
        borderRadius: 2.5,
        margin: 3,
        backgroundColor: "#f5f5f5"
    },
    detailContainer: {
        marginTop: 15
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
    actionBtns: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15
    },
    buyAndShareBtnText: {
         color: '#6ea1f6',
         fontSize: 16,
         fontWeight: "bold"
    },
    buyBtn: {
        marginRight: 20,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    shareBtn: {
        paddingVertical: 10,
        paddingHorizontal: 10
    }
});

export default styles