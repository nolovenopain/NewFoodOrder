import { StyleSheet } from 'react-native';
import { backgroundColorWhite } from '../../Components/Colors/Color';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: backgroundColorWhite
    },
    title: {
        fontSize: 22,
        fontFamily: 'Poppins'
    }
});

export { styles };