import { StyleSheet } from 'react-native';
import { tomato } from '../../Components/Colors/Color';
import { statusbarHeight, width } from '../../Components/Dimensions/Dimensions';
import { backgroundColorWhite } from '../../Components/Colors/Color';

const categorySIZE = 40;
const elementSIZE = 60;
const promotionSIZE = 100;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: width,
        paddingTop: statusbarHeight
    },
    header: {
        width: width,
        backgroundColor: backgroundColorWhite,
        paddingTop: 10,
        paddingBottom: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom: 10
    },
    searchAndLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15
    },
    headerLeft: {
        width: width/2,
        alignItems: 'center'
    },
    headerRight: {
        width: width/2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBar: {
        width: width/2 - 30,
        paddingVertical: 5,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10
    },
    searchTitle:{
        fontFamily: 'Poppins-Light',
        color: 'gray',
        marginLeft: 5,
    },
    locationIconWrapper: {
        width: 30,
        alignItems: 'center'
    },
    dropdownIconWrapper: {
        width: 40,
        alignItems: 'center'
    },
    showLocationWrapper: {
        width: width/2 - 70,
        paddingRight: 10,
        paddingLeft: 5
    },
    deliveryTo: {
        color: tomato,
        fontFamily: 'Poppins-Regular',
    },
    location: {
        color: 'gray',
        fontFamily: 'Poppins-Regular',
    },
    categoriesWrapper: {
        width: width
    },
    categoryTitle: {
        fontFamily: 'Poppins-Regular',
        marginLeft: 20,
        marginBottom: 10
    },
    categoryElement: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    categoryElementInside: {
        alignItems: 'center',
    },
    categoryImg: {
        width: categorySIZE,
        height: categorySIZE,
        borderRadius: categorySIZE/2,
        marginBottom: 5,
    },
    categoryElementTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    },
    body: {
        backgroundColor: backgroundColorWhite,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: width,
        paddingTop: 10
    },
    headerBodyTabWrapper: {
        marginBottom: 5
    },
    headerBodyTab: {
        marginLeft: 20,
        paddingTop: 5
    },
    headerBodyTabTitle: {
        
    },
    shortlist: {
        width: width,
        alignItems: 'center',
        marginBottom: 15
    },
    elementListBody: {
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 0.3,
        paddingVertical: 7
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
        fontSize: 13,
    },
    starGroup: {
        flexDirection: 'row',
    },
    evaluation: {
        fontFamily: 'Poppins-Light',
        marginLeft: 5,
        fontSize: 12
    },
    distanceGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    elementText: {
        fontFamily: 'Poppins-Light',
        color: 'gray',
        fontSize: 12
    },
    promotionListShow: {
        width: width,
        alignItems: 'center'
    },
    titleAndViewMore: {
        width: width - 40,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    titleWrapper: {
        width: (width - 40) / 2
    },
    viewMoreWrapper: {
        width: (width - 40) / 2,
        alignItems: 'flex-end',
    },
    viewMore: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    promotionTitle: {
        fontFamily: 'Poppins-Regular',
    },
    viewMoreTitle: {
        color: 'gray',
        fontFamily: 'Poppins-Light',
        marginRight: 3,
    },
    promotionElement: {
        width: promotionSIZE,
        marginLeft: 15,
    },
    promotionElementImage: {
        width: promotionSIZE,
        height: promotionSIZE,
        borderRadius: 5,
        marginBottom: 5
    },
    promotionElementName: {
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        marginBottom: 7
    },
    discountBox: {
        borderWidth: 0.5,
        borderColor: 'red',
        borderWidth: 0.8,
        alignItems: 'center',
    },
    discount: {
        color: 'red',
        fontSize: 9,
        fontFamily: 'Poppins-Light',
    }
});

export { styles };