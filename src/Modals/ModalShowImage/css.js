import { StyleSheet } from 'react-native';
import { width } from '../../Components/Dimensions/Dimensions';

const styles = StyleSheet.create({
    backDrop: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#000'
    },
    image: {
        width: width,
    }
});

export { styles };