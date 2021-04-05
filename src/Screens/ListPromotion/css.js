import { StyleSheet } from 'react-native';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const imageSIZE = 80;

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
        flex: 1,
        justifyContent: 'center'
    },
    elementWrapper: {
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.3,
        borderColor: 'silver'
    },
    image: {
        width: imageSIZE,
        height: imageSIZE,
        borderRadius: 5
    },
    elementRight: {
        width: width - 40 - imageSIZE,
        height: imageSIZE,
        paddingLeft: 15
    },
    promotionElementName: {
        fontFamily: 'Poppins-Regular',
        marginBottom: 3
    },
    starGroup: {
        flexDirection: 'row',
        marginBottom: 3
    },
    evaluation: {
        fontFamily: 'Poppins-Light',
        marginLeft: 5,
        marginBottom: 3
    },
    discount: {
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 0.8,
        width: 80,
    },
    discountTitle: {
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poppins-Light',
    },
    noData: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: 'silver'
    }
});

export { styles };