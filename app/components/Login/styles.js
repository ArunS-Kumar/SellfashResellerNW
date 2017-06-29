import {StyleSheet, Platform} from 'react-native'

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1
    },
    logoContainer: {
        flex: 1,
        backgroundColor: '#ffc107',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 110,
        height: 127
    },
    formContainer: {
        flex: 1,
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 15,
        marginTop: -50,
        marginBottom:  10,
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { 
            height: 2
        },
        paddingVertical: 30,
        paddingHorizontal: 20,
        elevation: 3
    },
    input: {
        height: 40,
        backgroundColor: 'transparent',
        color: '#999',
        borderWidth: 0
    },
    infotext: {
        color: '#999',
        fontSize: 14,
        marginBottom: 5,
        letterSpacing: 0.5
    },
    nextBtn: {
        backgroundColor: '#4285f4',
        paddingHorizontal: 17,
        paddingVertical: 15,
        marginTop: 30,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { 
            height: 6
        },
        flexDirection: 'row'
    },
    nextText: {
        fontSize: 16,
        fontWeight: "600",
        color: '#fff',
    },
    nextTextContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    nextArrowContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 3
    },
    nextArrow: {
        width: 23,
        height: 13
    }
});

export default styles