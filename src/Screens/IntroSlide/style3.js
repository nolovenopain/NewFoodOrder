import { StyleSheet } from 'react-native';
import { width } from '../../Components/Dimensions/Dimensions';
import { tomato } from '../../Components/Colors/Color';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: tomato
    },
    top: {
        flex: 9,
        width: width,
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        width: width,
        alignItems: 'center'
    },
    btn: {
        width: width/1.1,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 30,
        alignItems: 'center'
    },
    btnTitle: {
        color: tomato,
        fontSize: 17,
        fontFamily: 'Poppins',
    },
    slogan: {
        flex: 4,
        justifyContent: 'flex-end',
        width: width,
        paddingLeft: 30
    },
    image: {
        flex: 6,
        width: width,
        alignItems: 'flex-end'
    },
    slogan1: {
        marginBottom: 20
    }
});

export { styles };