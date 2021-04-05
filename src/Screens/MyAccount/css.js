import { StyleSheet } from 'react-native';
import { tomato } from '../../Components/Colors/Color';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const avatarSize = 60;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: statusbarHeight
    },
    header: {
        width: width,
        alignItems: 'center',
        paddingVertical: 10
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium'
    },
    body: {
        width: width,
        alignItems: 'center',
        marginBottom: 40
    },
    accountRow: {
        width: width - 40,
        flexDirection: 'row',
        paddingVertical: 10,
        borderColor: 'silver',
        borderBottomWidth: 0.3
    },
    avatar: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize/2,
        borderWidth: 2,
        borderColor: tomato
    },
    accountRowCenter: {
        width: width - 40 - avatarSize - 40,
        paddingLeft: 20,
    },
    accountRowRight: {
        width: 40,
        alignItems: 'flex-end'
    },
    userName: {
        fontFamily: 'Poppins-Medium',
        marginBottom: 3
    },
    userEmail: {
        fontFamily: 'Poppins-Light',
        color: 'gray'
    },
    edit: {
        color: tomato,
        fontFamily: 'Poppins-Light',
    },
    row: {
        width: width - 40,
        flexDirection: 'row',
        paddingVertical: 10,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        alignItems: 'center'
    },
    rowLeft: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: tomato,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowCenter: {
        paddingLeft: 15,
        width: width - 40 - 80
    },
    rowTitle: {
        fontFamily: 'Poppins-Light',
    },
    rowRight: {
        width: 40,
        alignItems: 'flex-end'
    },
    btn: {
        width: width - 60,
        paddingVertical: 10,
        borderRadius: 25,
        borderColor: tomato,
        borderWidth: 1,
        alignItems: 'center'
    },
    btnTitle: {
        color: tomato,
        fontSize: 17,
        fontFamily: 'Poppins-Medium'
    }
});

export { styles };