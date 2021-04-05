import { StyleSheet } from 'react-native';
import { backgroundColorWhite } from '../../Components/Colors/Color';
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
    listCardBorder: {
        borderTopWidth: 0.3,
        borderBottomWidth: 0.3,
        borderColor: 'silver',
        marginBottom: 10,
        backgroundColor: backgroundColorWhite
    },
    borderHeader: {
        width: width,
        paddingVertical: 5,
        paddingLeft: 15,
        borderColor: 'silver',
        borderBottomWidth: 0.3
    },
    borderTitle: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        color: 'gray'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
    },
    left: {
        width: 60,
        alignItems: 'center'
    },
    center: {
        width: width - 60 - 60,
        paddingLeft: 5, 
        paddingRight: 10
    },
    right: {
        width: 60,
    },
    cardImage: {
        width: imgSize,
        height: imgSize,
        borderRadius: 5
    },
    title: {
        fontFamily: 'Poppins-Light',
        fontSize: 13
    },
    last4Seri: {
        fontFamily: 'Poppins-Light',
        fontSize: 13
    },
    addWrapper: {
        width: imgSize,
        height: imgSize,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'silver',
        borderStyle: 'dotted'
    }
});

export { styles };