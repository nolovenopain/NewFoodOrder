import { StyleSheet } from 'react-native';
import { backgroundColorGrey, backgroundColorWhite, tomato } from '../../Components/Colors/Color';
import { height, statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const bottomHeight = 80

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: statusbarHeight,
    },
    header: {
        width: width,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
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
        alignItems: 'center'
    },
    row: {
        width: width - 30,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    rowLeft: {
        width: (width - 30)/2,
    },
    rowTitle: {
        fontFamily: 'Poppins-Regular',
    },
    rowRight: {
        width: (width - 30)/2,
    },
    selectWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    }, 
    selectTitle: {
        fontFamily: 'Poppins-Regular',
        marginRight: 5,
        color: 'gray'
    },
    specificAddressWrapper: {
        width: width - 30,
        paddingTop: 10,
        marginBottom: 30
    },
    specificAddressTitle: {
        fontFamily: 'Poppins-Regular',
    },
    describe: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: 'gray',
    },
    input: {
        backgroundColor: backgroundColorGrey,
        borderRadius: 10,
        paddingVertical: 5,
        paddingLeft: 5
    },
    searchLocationGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        justifyContent: 'center',
        marginBottom: 20
    },
    searchLocationLeft: {
        width: 50,
    },
    searchLocationCenter: {
        width: width - 30 - 100,
    },
    searchLocationRight: {
        width: 50,
        alignItems: 'flex-end'
    },
    selectLocation: {
        fontFamily: 'Poppins-Regular',
    },
    bottom: {
        width: width,
        backgroundColor: tomato,
        height: 80,
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: 10,
        position: 'absolute',
        top: height - bottomHeight
    },
    createBtn: {
        width: width - 50,
        height: 50,
        justifyContent: 'center',
        backgroundColor: backgroundColorWhite,
        alignItems: 'center',
        borderRadius: 25
    },
    createTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        color: tomato
    },
    showAddressFromMapBox: {
        width: width - 40,
        paddingVertical: 5,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 5,
        paddingHorizontal: 10
    },
    showAddressFromMap: {
        fontFamily: 'Poppins-Light',
    }
});

export { styles };