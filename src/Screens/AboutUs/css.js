import { StyleSheet } from 'react-native';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

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
    element: {
        width: width - 30
    },
    question: {
        fontFamily: 'Poppins-Medium',
        marginBottom: 5
    },
    answer: {
        fontFamily: 'Poppins-Light'
    }
});

export { styles };