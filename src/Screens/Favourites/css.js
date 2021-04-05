import { StyleSheet } from 'react-native';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';

const elementSIZE = 80;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: statusbarHeight
    },
    header: {
        width: width,
        alignItems: 'center',
        paddingVertical: 10
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium'
    },
    body: {
        flex: 1,
        justifyContent: 'center'
    },
    elementListBody: {
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: 'silver',
        borderBottomWidth: 0.3
    },
    elementListBodyLeft: {
        width: elementSIZE
    },
    elementListBodyRight: {
        width: width - 40 - elementSIZE,
        paddingHorizontal: 15
    },
    elementImage: {
        width: elementSIZE,
        height: elementSIZE,
        borderRadius: 5
    },
    elementListBodyName: {
        fontFamily: 'Poppins-Regular',
        marginBottom: 5
    },
    starGroup: {
        flexDirection: 'row',
        marginBottom: 5
    },
    evaluation: {
        fontFamily: 'Poppins-Light',
        marginLeft: 5
    },
    distanceGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    elementText: {
        fontFamily: 'Poppins-Light',
        color: 'gray',
    },
    noData: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: 'silver'
    }
});

export { styles };