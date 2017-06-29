import {StyleSheet, Platform} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 34 : 24,
        backgroundColor: '#f9f9f9'
    },
    view1: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', 
        marginTop: Platform.OS === 'ios' ? 10 : 30 
    },
    box: {
        // flex: 1, 
        backgroundColor: '#fff', 
        borderRadius: 4, 
        padding: 20, 
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { 
            height: 2
        },
        elevation   : 3,
    },
    text: {
        textAlign: 'center', 
        color: '#999', 
        fontSize: 16, 
        fontWeight: "400",
        opacity: 0.8
    },
    title: { 
        textAlign: 'center',
        color: '#404040', 
        fontSize: 15, 
        fontWeight: "400",
        marginTop: 15
    },
    box2: {
        flexDirection: 'row', 
        backgroundColor: '#fff', 
        borderRadius: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { 
            height: 2
        },
        elevation   : 3,
    },
    smallbox: {
        paddingHorizontal: 7, 
        paddingVertical: 5, 
        width: 50, 
        height: 40, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});

export default styles