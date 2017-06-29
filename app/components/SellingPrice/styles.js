import {StyleSheet, PixelRatio} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffc107',
        marginTop: 22
    },
    closeBtnContainer: {
        paddingTop: 10,
    },
    productImage: {
        height: 100,
        width: 100,
        borderRadius: 100 / PixelRatio.get(),
    },
});

export default styles