import { StyleSheet } from 'react-native';
import { blue, tomato } from '../../Components/Colors/Color';
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
        paddingVertical: 10
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium'
    },
    body: {
        flex: 1,
        justifyContent: 'center'
    },
    elementWrapper: {
        paddingBottom: 8,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        width: width,
        justifyContent: 'center'
    },
    image: {
        width: imageSIZE,
        height: imageSIZE,
        borderRadius: 5,
        marginTop: 12
    },
    elementRight: {
        width: width - 30 -imageSIZE,
        paddingLeft: 15,
        marginTop: 8
    },
    title: {
        fontFamily: 'Poppins-Regular'
    },
    message: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        color: 'gray',
        marginBottom: 5
    },
    seeDetails: {
        fontFamily: 'Poppins-Light',
        fontSize: 12,
        color: blue,
        marginBottom: 5
    },
    time: {
        fontFamily: 'Poppins-Light',
        color: 'gray'
    },
    noData: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: 'silver'
    }
});

export { styles };