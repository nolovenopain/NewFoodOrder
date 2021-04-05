import { StyleSheet } from 'react-native';
import { backgroundColorGrey, backgroundColorWhite, tomato } from '../../Components/Colors/Color';
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
        paddingTop: 10,
        backgroundColor: backgroundColorWhite,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        marginBottom: 10
    },
    body: {
        flex: 1
    },
    elementWrapper: {
        paddingTop: 10,
        borderColor: 'silver',
        borderBottomWidth: 0.3,
    },
    elementListBody: {
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5, 
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
    total: {
        fontFamily: 'Poppins-Regular',
    },
    timeWrapper: {
        width: width - 40,
        alignItems: 'flex-end'
    },
    time: {
        color: 'gray',
        fontFamily: 'Poppins-Light'
    },
    groupBottom: {
        width: width - 40,
        paddingVertical: 7,
        flexDirection: 'row', 
        alignItems: 'center',
    },
    groupBottomLeft: {
        width: (width - 40)*1/3,
        alignItems: 'center',
        flexDirection: 'row',
    },
    groupBottomRight: {
        width: (width - 40)*2/3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    statusCircle: {
        width: 8,
        height: 8,
        borderRadius: 4
    },
    statusTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        marginLeft: 5,
    },
    reOrder: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    },
    rate: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        marginRight: 40
    },
    reOrderBtn: {
        paddingHorizontal: 15,
        paddingVertical: 5, 
        borderRadius: 20,
        backgroundColor: backgroundColorGrey
    },
    unRate: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        marginRight: 40,
        color: tomato
    },
    tabGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabWrapper: {
        width: width/3
    },
    deliveringTab: {
        marginLeft: 25,
        borderBottomWidth: 2,
        borderColor: backgroundColorWhite,
        paddingVertical: 5,
        alignItems: 'center'
    },
    historyTab: {
        borderBottomWidth: 2,
        borderColor: backgroundColorWhite,
        paddingVertical: 5,
        width: width/3,
        alignItems: 'center'
    },
    cancelTabActive: {
        marginRight: 25,
        borderBottomWidth: 2,
        borderColor: backgroundColorWhite,
        paddingVertical: 5,
        alignItems: 'center'
    },
    tabTitle: {
        fontFamily: 'Poppins-Medium',
    }
});

export { styles };