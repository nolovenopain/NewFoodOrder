import { StyleSheet } from 'react-native';
import { backgroundColorWhite, blue } from '../../Components/Colors/Color';
import { width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    modalWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalContent: {
        width: width/1.3,
        backgroundColor: backgroundColorWhite,
        paddingTop: 20,
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 15
    },
    title: {
        fontFamily: 'Poppins-Medium'
    },
    check: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 15
    },
    btn: {
        alignItems: 'center',
        width: width/1.3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: 'silver',
        borderTopWidth: 0.5,
        paddingVertical: 7
    },
    btnTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 17,
        color: blue,
    }
});

export { styles };