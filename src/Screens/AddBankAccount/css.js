import { StyleSheet } from 'react-native';
import { backgroundColorGrey, backgroundColorWhite, blue, tomato } from '../../Components/Colors/Color';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const imgSize = 30

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    header: {
        width: width,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: backgroundColorWhite,
        paddingBottom: 10,
        paddingTop: statusbarHeight + 10,
    },
    headerLeft: {
        width: 50,
        alignItems: 'center'
    },
    headerCenter: {
        width: width - 100,
        alignItems: 'center'
    },
    headerRight: {
        width: 50
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium'
    },
    body: {
        width: width,
        backgroundColor: backgroundColorWhite,
        alignItems: 'center',
        paddingTop: 10
    },
    row: {
        width: width - 30,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    left: {
        width: (width - 30)/2,
    },
    title: {
        fontFamily: 'Poppins-Regular',
    },
    right: {
        width: (width - 30)/2,
    },
    bottom: {
        width: width,
        paddingVertical: 10,
        backgroundColor: backgroundColorWhite,
        alignItems: 'center'
    },
    btn: {
        width: width - 30,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tomato,
        borderRadius: 25
    },
    btnTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 17,
        color: '#fff'
    },
    selectTitle: {
        fontFamily: 'Poppins-Regular',
        marginRight: 5,
        color: 'gray'
    },
});

export { styles };