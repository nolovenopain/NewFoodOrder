import { StyleSheet } from 'react-native'

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'center',
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputText: { 
        color: '#000',
        fontFamily: 'Poppins-Meidum',
        paddingVertical: 5
    },
    deleteBtnWrapper: {
        width: 40,
        alignItems: 'center',
    }
});

export { styles }