import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  	container: {
    	flex: 1
  	},
  	view: {
    	flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
  	},
  	productImage: {
        flex: 1,
        width: width,
    },
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
    navBackButton: {
        marginTop:15,
        paddingRight:6, 
        width: 23, 
        height: 15
    }
})