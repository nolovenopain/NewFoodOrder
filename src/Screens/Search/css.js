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
        paddingVertical: 10,
    },
    headerLeft: {
        width: 50,
        alignItems: 'center',
    },
    headerCenter: {
        width: width - 70,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        flexDirection: 'row',
    },
    headerRight: {
        width: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium'
    },
    iconBox: {
        width: 40,
        alignItems: 'center',
    },
    body: {
        width: width,
        alignItems: 'center',
        paddingTop: 15
    },
    element: {
        width: width - 30
    },
    question: {
        fontFamily: 'Poppins-Medium',
        marginBottom: 5
    },
    answer: {
        fontFamily: 'Poppins-Light'
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
    },
    elementName: {
        fontFamily: 'Poppins-Regular',
        marginBottom: 3,
        marginLeft: 15
    },
    starGroup: {
        flexDirection: 'row',
        marginBottom: 3,
        width: (width - 40 - imageSIZE)/3,
        paddingLeft: 15
    },
    evaluation: {
        fontFamily: 'Poppins-Light',
        marginLeft: 5,
    },
    discount: {
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 0.8,
        width: 80, 
        marginLeft: 15
    },
    discountTitle: {
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poppins-Light',
    },
    rowGroup: {
        width: width - 40 - imageSIZE,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3
    },
    distanceGroup: {
        width: (width - 40 - imageSIZE) * 2/3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    elementText: {
        fontFamily: 'Poppins-Light',
        color: 'gray',
        fontSize: 13
    },
});

export { styles };