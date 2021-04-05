import { StyleSheet } from 'react-native';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';
import { backgroundColorWhite } from '../../Components/Colors/Color';

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
        width: width,
        alignItems: 'center',
    },
    bodyElement: {
        width: width,
        alignItems: 'flex-end'
    },
    bodyElementInside: {
        width: width - 20,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    elementLeft: {
        width: (width - 30)/2
    },
    elementRight :{
        width: (width - 30)/2,
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'Poppins-Regular'
    }   
});

export { styles };