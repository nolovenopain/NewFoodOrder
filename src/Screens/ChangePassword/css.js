import { StyleSheet } from 'react-native';
import { tomato } from '../../Components/Colors/Color';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: statusbarHeight
    },
    header: {
        width: width,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10
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
        alignItems: 'center',
        paddingTop: 20
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
    inputTitle: {
        fontFamily: 'Poppins-Regular',
    },
    right: {
        width: (width - 30)/2,
    },
    saveBtn: {
        width: width - 60,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: tomato,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 40
    },
    btnTitle: {
        fontFamily: 'Poppins-Medium',
        color: tomato,
        fontSize: 17
    },
});

export { styles };