import { StyleSheet } from 'react-native';
import { tomato } from '../../Components/Colors/Color';
import { width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    logo: {
        marginBottom: 5,
        marginTop: 15
    },
    titleWrapper: {
        width: width - 40,
        marginBottom: 20
    },
    title: {
        fontFamily: 'Poppins',
        fontSize: 20,
        textAlign: 'center'
    },
    top: {
        width: width,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 25,
        paddingTop: 10
    },
    body: {
        width: width,
        alignItems: 'center'
    },
    inputGroup: {
        width: width/1.2,
        borderBottomWidth: 1,
        marginBottom: 30
    },
    inputLabel: {
        fontFamily: 'Poppins',
        fontSize: 17,
        color: 'gray'
    },
    backWrapper: {
        width: width/1.2 - 10,
        marginBottom: 20,
        alignItems: 'center'
    },
    backTitle: {
        fontSize: 13,
        fontFamily: 'Poppins',
        color: tomato,
        textAlign: 'center'
    },
    btn: {
        width: width/1.2 - 10,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 20
    },
    btnTitle: {
        fontSize: 19,
        fontFamily: 'Poppins',
        color: tomato
    },
});

export { styles };