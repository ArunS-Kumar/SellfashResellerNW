import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    otpContainer: {
        flex: 1,
        backgroundColor: '#ffc107',
        alignItems: 'center',
        justifyContent: 'center'
    },
    otpText: {
        fontSize: 16,
        fontWeight: "400",
        color: '#fff',
        marginBottom: 10
    },
    phoneNumber: {
        fontSize: 16,
        fontWeight: "700",
        color: '#fff',
        marginBottom: 35
    },
    enterOtpText: {
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 2,
        color: '#fff',
        opacity: 0.6
    },
    input: {
        height: 50,
        // marginBottom: 10,
        fontSize: 20,
        color: '#fff',
        fontWeight: '900',
        letterSpacing: 2,
        textAlign: 'center',        
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    didntReceiveOtp: {
        fontSize: 13,
        color: '#fff'
    },
    resendText: {
        fontWeight: "900",
    },
    mobile: {
        width: 55,
        height: 75,
        marginLeft: 15,
        marginTop: 40
    },
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
      },
});

export default styles