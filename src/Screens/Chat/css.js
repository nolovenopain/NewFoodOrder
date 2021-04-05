import { StyleSheet } from 'react-native';
import { backgroundColorWhite } from '../../Components/Colors/Color';
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
        backgroundColor: backgroundColorWhite,
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
    },
    rowWrapper: {
        width: width - 40,
        marginVertical: 7
    },
    row: {
        maxWidth: width * 2/3,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15
    },
    chat: {
        fontFamily: 'Poppins-Regular',
        fontSize: 17
    },
    bottom: {
        paddingVertical: 10,
        width: width,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    left: {
        width: 40
    },
    center: {
        width: width - 40 - 80,
        alignItems: 'center'
    },
    right: {
        width: 40,
        alignItems: 'flex-end'
    },
    input: {
        paddingHorizontal: 10,
        borderRadius: 20,
        width: width - 40 - 80,
        backgroundColor: 'rgba(0,0,0,0.1)'
    }
});

export { styles };