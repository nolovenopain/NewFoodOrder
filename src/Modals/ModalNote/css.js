import { StyleSheet } from 'react-native';
import { backgroundColorWhite, blue } from '../../Components/Colors/Color';
import { width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    modalWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
        width: width - 40,
        backgroundColor: backgroundColorWhite,
        borderRadius: 20
    },
    modalHeader: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderColor: 'silver',
        borderBottomWidth: 0.3
    },
    modalHeaderLeft: {
        width: 80,
        paddingLeft: 10
    },
    modalHeaderCenter: {
        width: width - 200,
        alignItems: 'center'
    },
    modalHeaderRight: {
        width: 80,
        alignItems: 'center', 
    },
    modalHeaderTitle: {
        fontFamily: 'Poppins-Medium'
    },
    modalBody: {
        width: width - 40,
        alignItems: 'center',
        paddingTop: 20, 
    },
    inputBox: {
        width: width - 60,
        paddingHorizontal: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        marginBottom: 20,
        minHeight: 100
    },
    cancel: {
        width: (width - 40)/2,
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomLeftRadius: 20,
        borderColor: 'silver',
        borderRightWidth: 0.5
    },
    modalBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'silver',
        borderTopWidth: 0.5
    },
    add: {
        width: (width - 40)/2,
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomRightRadius: 20
    },
    btnTitle: {
        color: blue,
        fontFamily: 'Poppins-Medium',
        fontSize: 17
    }
});

export { styles };