import { StyleSheet } from 'react-native'

const styles = StyleSheet.create ({
    container: {
        justifyContent: 'center',
    },
    input: {
        flexDirection: 'row',
    },
    inputText: { 
        color: '#000',
        fontFamily: 'Poppins-Meidum',
        paddingVertical: 5
    },
    btnDelete: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnEye: {
        alignItems: 'center',  
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    label: {
        color: 'grey',
    },
    required: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export { styles }