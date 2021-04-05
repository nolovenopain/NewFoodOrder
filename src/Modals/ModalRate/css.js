import { StyleSheet } from 'react-native';
import { backgroundColorWhite, blue } from '../../Components/Colors/Color';
import { width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    modalWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalContent: {
        width: width/1.5,
        backgroundColor: backgroundColorWhite,
        paddingTop: 20,
        borderRadius: 20,
        alignItems: 'center'
    },
    rate: {
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
        fontSize: 17
    },
    starGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    bottomGroup: {
        width: width/1.5,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'silver',
        borderTopWidth: 0.3
    },
    defaultBtn: {
        width: width/3,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderColor: 'silver',
        borderRightWidth: 0.3
    },
    rateBtn: {
        width: width/3,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomRightRadius: 20
    },
    btnTitle: {
        fontFamily: 'Poppins-Light',
        fontSize: 17,
        color: blue
    }
});

export { styles };