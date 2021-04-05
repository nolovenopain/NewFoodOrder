import { StyleSheet } from 'react-native';
import { tomato } from '../../Components/Colors/Color';
import { height, statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const markerSIZE = 40

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
        height: 60,
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
    addressBox: {
        width: width - 40,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        marginBottom: 10,
        height: 30, 
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    address: {
        fontFamily: 'Poppins-Light',
        fontSize: 11
    },
    iconBox: {
        width: 40,
        alignItems: 'center',
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    mapView: {
        width: width,
        height: height - statusbarHeight - 100,
    },
    markerWrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -20,
        marginTop: -45,
        alignItems: 'center'
    },
    marker: {
        backgroundColor: tomato,
        width: markerSIZE,
        height: markerSIZE,
        borderRadius: markerSIZE/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: markerSIZE - 6,
        height: markerSIZE - 6,
        borderRadius: (markerSIZE - 6)/2,
        marginTop: -2,
    },
    triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 14,
        borderRightWidth: 14,
        borderBottomWidth: 8,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: tomato,
        transform: [{ rotate: "180deg" }],
        marginTop: -3,
        borderRadius: 7
    },
    btnWrapper: {
        position: 'absolute',
        top: '90%',
    },
    btn: {
        width: width - 100,
        paddingVertical: 7,
        alignItems: 'center',
        backgroundColor: tomato,
        borderRadius: 10
    },
    btnTitle: {
        fontSize: 17, 
        color: '#fff',
        fontFamily: 'Poppins-Medium'
    }
});

export { styles };