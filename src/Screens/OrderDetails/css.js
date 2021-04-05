import { StyleSheet } from 'react-native';
import { backgroundColorWhite, tomato } from '../../Components/Colors/Color';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const imageSIZE = 60;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
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
    },
    groupStatus: {
        width: width * 3/5,
        alignItems: 'center',
        marginBottom: 10
    },
    groupStatusTop: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5
    },
    iconBorder: {
        width: 30,
        alignItems: 'center'
    },
    line: {
        width: width * 3/5 - 60,
        borderWidth: 0.7,
        borderColor: tomato
    },
    groupStatusBottom: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusBorrder: {
        width: 80,
        alignItems: 'center',
    },
    statusText: {
        fontFamily: 'Poppins-Light',
        fontSize: 12
    },
    between: {
        width: width * 3/5 - 110
    },
    bodyBorder: {
        paddingVertical: 10,
        width: width - 40
    },
    borderTitle: {
        fontFamily: 'Poppins-Regular',
        marginBottom: 5
    },
    borderText: {
        fontFamily: 'Poppins-Light',
    },
    orderShow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: imageSIZE,
        height: imageSIZE,
        borderRadius: 5
    },
    orderShowCenter: {
        width: width - 40 - imageSIZE - 100,
        height: imageSIZE,
        paddingHorizontal: 15, 
    },
    orderShowRight: {
        width: 100,
        height: imageSIZE,
        alignItems: 'flex-end',
    },
    storeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    storeLeft: {
        width: width - 40 - 40, 
        height: 30,
    },
    storeRight: {
        width: 40,
        alignItems: 'flex-end',
        height: 30
    },
    storeName: {
        fontFamily: 'Poppins-Regular',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailRowLeft: {
        width: (width - 40)/2
    },
    detailRowRight: {
        width: (width - 40)/2,
    },
    leftText: {
        fontFamily: 'Poppins-Light'
    },
    rightText: {
        fontFamily: 'Poppins-Light',
        color: 'gray',
        textAlign: 'right'
    },
    btn: {
        width: width - 40,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 10
    },
    btnTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 17,
        color: backgroundColorWhite
    }
});

export { styles };