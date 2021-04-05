import { StyleSheet } from 'react-native';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const imageSIZE = 80

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
        paddingTop: 15
    },
    notiTitleWrapper: {
        flexDirection: 'row',
        marginBottom: 20
    },
    image: {
        width: imageSIZE,
        height: imageSIZE,
        borderRadius: 5,
    },
    notiTitleRight: {
        width: width - 30 - imageSIZE,
        paddingLeft: 10
    },
    storeName: {
        fontFamily: 'Poppins-Regular',
        marginBottom: 3
    },
    time: {
        fontFamily: 'Poppins-Light',
        color: 'gray'
    },
    notiContentWrapper: {
        width: width - 30
    },
    notiContent: {
        fontFamily: 'Poppins-Light',
        color: 'gray',
        fontSize: 13,
        lineHeight: 22
    }
});

export { styles };