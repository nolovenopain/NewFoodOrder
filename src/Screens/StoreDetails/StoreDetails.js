import React, { Component } from 'react';
import { View, Text, SafeAreaView, ImageBackground, TouchableWithoutFeedback, ActivityIndicator, Image, FlatList, Platform, Linking, StatusBar } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { tomato, backgroundColorGrey } from '../../Components/Colors/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { goBack, navigate } from '../../Navigators/Router';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ModalShowImage from '../../Modals/ModalShowImage/ModalShowImage';
import ModalCart from '../../Modals/ModalCart/ModalCart';
import { height } from '../../Components/Dimensions/Dimensions';
import ModalChangeArrivalTime from '../../Modals/ModalChangeArrivalTime/ModalChangeArrivalTime';
import { coordinates } from '../../Constants';
import AsyncStorage from '@react-native-community/async-storage';
import BottomSheetOrder from '../../Components/BottomSheetOrder/BottomSheetOrder';


export default class FoodDetails extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            foodList: [
                {id: 1, name: 'hòng trà sữa trân châu đường đen', imgSrc: require('../../Assets/Images/hongtrasua.jpg'), price: 20000, describe: 'Bao gồm: hồng trà sữa sủi bọt + trân châu đường đen', orderAmount: 0}, 
                {id: 2, name: 'trà vải', imgSrc: require('../../Assets/Images/hongtrasua.jpg'), price: 20000, describe: 'Bao gồm: hồng trà sữa sủi bọt + trân châu đường đen', orderAmount: 0}, 
                {id: 3, name: 'trà đen', imgSrc: require('../../Assets/Images/hongtrasua.jpg'), price: 20000, describe: 'Bao gồm: hồng trà sữa sủi bọt + trân châu đường đen', orderAmount: 0}, 
                {id: 4, name: 'trà nhài', imgSrc: require('../../Assets/Images/hongtrasua.jpg'), price: 20000, describe: 'Bao gồm: hồng trà sữa sủi bọt + trân châu đường đen', orderAmount: 0}, 
                {id: 5, name: 'trà quất mật ong', imgSrc: require('../../Assets/Images/hongtrasua.jpg'), price: 20000, describe: 'Bao gồm: hồng trà sữa sủi bọt + trân châu đường đen', orderAmount: 0}, 
                {id: 6, name: 'matchiato', imgSrc: require('../../Assets/Images/hongtrasua.jpg'), price: 20000, describe: 'Bao gồm: hồng trà sữa sủi bọt + trân châu đường đen', orderAmount: 0}, 
                {id: 7, name: 'hòng trà sữa trân châu đường đen', imgSrc: require('../../Assets/Images/hongtrasua.jpg'), price: 20000, describe: 'Bao gồm: hồng trà sữa sủi bọt + trân châu đường đen', orderAmount: 0}, 
                {id: 8, name: 'hòng trà sữa trân châu đường đen', imgSrc: require('../../Assets/Images/hongtrasua.jpg'), price: 20000, describe: 'Bao gồm: hồng trà sữa sủi bọt + trân châu đường đen', orderAmount: 0},
                {id: 9, name: 'hòng trà sữa trân châu đường đen', imgSrc: require('../../Assets/Images/hongtrasua.jpg'), price: 20000, describe: 'Bao gồm: hồng trà sữa sủi bọt + trân châu đường đen', orderAmount: 0}, 
                {id: 10, name: 'hòng trà sữa trân châu đường đen', imgSrc: require('../../Assets/Images/hongtrasua.jpg'), price: 20000, describe: 'Bao gồm: hồng trà sữa sủi bọt + trân châu đường đen', orderAmount: 0}, 
                {id: 11, name: 'hòng trà sữa trân châu đường đen', imgSrc: require('../../Assets/Images/hongtrasua.jpg'), price: 20000, describe: 'Bao gồm: hồng trà sữa sủi bọt + trân châu đường đen', orderAmount: 0},  
            ],
            page: 1,
            itemLoading: false,
            handleLoadMore: false,
            refresh: true,
            token: '',
            tabInfoVisible: false,
            modalShowImageVisible: false,
            modalCartVisible: false,
            modalChangeArrivalTimeVisible: false,
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: coordinates.latitudeDelta,
                longitudeDelta: coordinates.longitudeDelta,
            },
            imgSrcShow: null,
            orderList: [],
            orderPassToBottomSheet: {},
            deliveryNow: true,
            like: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.getFoodList();
        setTimeout(() => {
            this._isMounted && Geolocation.getCurrentPosition(
                (position) => {
                    this.setState({ 
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: coordinates.latitudeDelta,
                            longitudeDelta: coordinates.longitudeDelta,
                        },
                        itemLoading: true,
                        handleLoadMore: true,
                        refresh: false,
                        loaded: true
                    })
                },
                (error) => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                    this.setState({ 
                        itemLoading: true,
                        handleLoadMore: true,
                        refresh: false,
                        loaded: true
                    })
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
            );
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getFoodList = async() => {

    }

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <View style={styles.topHeader}>
                    <TouchableWithoutFeedback onPress={this.openModalShowImage(require('../../Assets/Images/trasua.jpg'))}>
                        <ImageBackground
                            style={styles.storeImage}
                            source={require('../../Assets/Images/trasua.jpg')}
                        >
                            <View style={styles.headerGroupBtn}>
                                <View style={styles.headerGroupBtnLeft}>
                                    <TouchableWithoutFeedback onPress={this.goBack}>
                                        <Icon
                                            name='chevron-back'
                                            color='#fff'
                                            size={30}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.headerGroupBtnRight}>
                                    <TouchableWithoutFeedback onPress={this.like}>
                                        <Icon
                                            name={this.state.like ? 'heart' : 'heart-outline'}
                                            color={this.state.like ? tomato : '#fff'}
                                            size={30}
                                        />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                    <View style={styles.storeNameWrapper}>
                        <Text style={styles.storeName}>
                            Bakery - Bong lan trung muoi & do uong online
                        </Text>
                    </View>
                    <View style={styles.evaluationAndDistance}>
                        <Icon
                            name='star'
                            size={18}
                            color='gold'
                        />
                        <Text style={styles.evaluation}>4.7</Text>
                        <Entypo
                            name='back-in-time'
                            size={18}
                            color='gray'
                            style={{ marginLeft: 10 }}
                        />
                        <Text style={[styles.elementText, { marginLeft: 5 }]}>18 mins</Text>
                        <Entypo
                            name='dot-single'
                            size={20}
                            color='gray'
                        />
                        <Text style={styles.elementText}>1.3 km</Text>
                    </View>
                </View>

                <View style={styles.tabGroup}>
                    <TouchableWithoutFeedback onPress={this.onOrderTab}>
                        <View style={styles.tab}>
                            <Text 
                                style={
                                    [
                                        styles.tabTitle,
                                        { fontFamily: this.state.tabInfoVisible ? 'Poppins-Regular' : 'Poppins-Medium' }
                                    ]
                                }
                            >
                                Orders
                            </Text>
                            <View 
                                style={
                                    [
                                        styles.underlineTab,
                                        { backgroundColor: this.state.tabInfoVisible ? '#fff' : 'red' }
                                    ]
                                }
                            ></View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.onInfoTab}>
                        <View style={styles.tab}>
                            <Text 
                                style={
                                    [
                                        styles.tabTitle,
                                        { fontFamily: this.state.tabInfoVisible ? 'Poppins-Medium' : 'Poppins-Regular' }
                                    ]
                                }
                            >
                                Informations
                            </Text>
                            <View 
                                style={
                                    [
                                        styles.underlineTab,
                                        { backgroundColor: this.state.tabInfoVisible ? 'red' : '#fff' }
                                    ]
                                }
                            ></View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                
                { !this.state.tabInfoVisible ?
                    <View>
                        <View style={styles.bottomHeader}>
                            <Text style={styles.delivery}>Standard Delivery</Text>
                            <View style={styles.estTime}>
                                <View style={styles.estTimeLeft}>
                                    <Text style={styles.arrrival}>
                                        {this.state.deliveryNow ? 'Est.arrival at 14:50' : 'Appointment Delivery'}
                                    </Text>
                                </View>
                                <View style={styles.estTimeRight}>
                                    <TouchableWithoutFeedback onPress={this.openModalChangeArrivalTime}>
                                        <Text style={styles.changeArrivalTime}>Change</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                        <View style={styles.allFood}>
                            <Text style={styles.allFoodTitle}>All Food</Text>
                        </View>
                    </View>
                        : 
                    <View style={styles.showInforWrapper}>
                        <TouchableWithoutFeedback onPress={this.goToMapApp}>                           
                            <View style={styles.mapView}>
                                <MapView
                                    provider={PROVIDER_GOOGLE}
                                    region={this.state.region}
                                    onRegionChangeComplete={this.onRegionChange}
                                    style={styles.bgGeoLocationWrapper}                        
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: this.state.region.latitude,
                                            longitude: this.state.region.longitude
                                        }}
                                    />        
                                </MapView>
                            </View>
                        </TouchableWithoutFeedback>

                        <View style={styles.infoRow}>
                            <FontAwesome5
                                name='location-arrow'
                                size={22}
                                color={tomato}
                            />
                            <Text style={styles.infoText}>58, Ngo Luong Su, Dong Da, Ha Noi</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <FontAwesome5
                                name='utensils'
                                size={22}
                                color={tomato}
                            />
                            <Text style={styles.infoText}>Category: Shop online</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <FontAwesome5
                                name='tag'
                                size={22}
                                color={tomato}
                            />
                            <Text style={styles.infoText}>Avg.Price: 70k</Text>
                        </View>
                        <View 
                            style={
                                [
                                    styles.infoRow,
                                    { marginBottom: this.state.tabInfoVisible ? 20 : 0 }
                                ]
                            }
                        >
                            <FontAwesome5
                                name='clock'
                                size={22}
                                color={tomato}
                            />
                            <Text style={styles.infoText}>Opening Hours: 09:00 ~ 21:00</Text>
                        </View>
                    </View>
                }
            </View>
        )
    }

    renderRow = ({ item, index }) => {
        return (
            <View style={styles.foodElementWrapper} >
                <TouchableWithoutFeedback onPress={this.openModalShowImage(item.imgSrc)}>
                    <Image
                        style={styles.foodImage}
                        source={item.imgSrc}
                    />
                </TouchableWithoutFeedback>
                <View style={styles.foodElementInfo}>
                    <TouchableWithoutFeedback onPress={this.goToFoodDetails(item)}>
                        <View style={styles.foodElementInfoInside}>
                            <Text 
                                style={styles.foodName}
                                numberOfLines={1}
                            >
                                {item.name}
                            </Text>
                            <Text 
                                style={styles.foodDescribe}
                                numberOfLines={1}
                            >
                                {item.describe}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.orderGroup}>
                        <View style={styles.foodPriceWrapper}>
                            <Text style={styles.foodPrice}>{item.price}</Text>
                        </View>
                        <View style={styles.addToCart}>
                            <View style={styles.removeAddGroup}>
                                {item.orderAmount > 0 ? 
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableWithoutFeedback onPress={this.minusAmount(item)}>
                                            <Icon
                                                name='remove-circle-outline'
                                                size={25}
                                                color='silver'
                                            />
                                        </TouchableWithoutFeedback>
                                        <View style={styles.showAmount}>
                                            <Text style={styles.amount}>{item.orderAmount}</Text>
                                        </View>
                                    </View> : null
                                }
                                <TouchableWithoutFeedback onPress={this.plusAmount(item)}>
                                    <Icon
                                        name='add-circle'
                                        size={25}
                                        color={tomato}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderFooter = () => {
        return( 
            this.state.itemLoading && this.state.handleLoadMore ? 
            <View style={styles.itemLoader}>
                <ActivityIndicator size='large'/>
            </View> : null
        )
    }

    handleLoadMore = () => {
        this.setState({ 
            page: this.state.page + 1, 
        },  () => {
                this.getFoodList()  
            });       
    }

    refresh = () => {
        this.setState({ 
            foodList: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true,
        },  () => {
                this.getFoodList();
            }
        );
    }

    scrollToTop = () => {
        if(this.state.foodList.length > 0) {
            this.foodListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    goBack = () => {
        goBack()
    }

    like = () => {
        this.setState({ like: !this.state.like })
    }

    openModalShowImage = imgSrcShow => e => {
        this.setState({ 
            modalShowImageVisible: true,
            imgSrcShow 
        })
    }

    closeModalShowImage = () => {
        this.setState({ modalShowImageVisible: false })
    }

    onOrderTab = () => {
        this.setState({ tabInfoVisible: false })
    }

    onInfoTab = () => {
        this.setState({ tabInfoVisible: true })
    }

    goToMapApp = () => {
        const url = Platform.select({
            ios: "maps:" + this.state.region.latitude + "," + this.state.region.longitude + "?q=",
            android: "geo:" + this.state.region.latitude + "," + this.state.region.longitude + "?q="
        });
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              return Linking.openURL(url);
            } else {
              const browser_url = "https://www.google.de/maps/@" + this.state.region.latitude + "," + this.state.region.longitude + "?q=";
              return Linking.openURL(browser_url);
            }
        });
    }

    goToFoodDetails = item => e => {
        navigate('FoodDetails', { 
            food: item,
            orderList: this.state.orderList,
            minusAmount: this.minusAmount(item),
            plusAmount: this.plusAmount(item),
            backDataOrderListFromModalCart: this.backDataOrderListFromModalCart(item) 
        })
    }

    goToCart = () => { 
        if(this.state.orderList.length > 0) {
            navigate('MyCart', { orderList: this.state.orderList })
        }  
    }
    
    openBottomSheet = item => e => { 
        this.setState({ orderPassToBottomSheet: item }, () => this.childBottomSheet.onOpen())
    }

    plusAmount = item => e => {
        var foodList = [];   
        this.state.foodList.map((value, key) => {
            if(value.id == item.id) {
                value.orderAmount++
            }
            foodList.push(value)
        })
        var orderList = [];
        foodList.map((value, key) => {
            if(value.orderAmount > 0) {
                orderList.push(value)
            }
        })
        this.setState({ foodList, orderList })
    }

    minusAmount = item => e => {
        var foodList = [];
        this.state.foodList.map((value, key) => {
            if(value.id == item.id) {
                value.orderAmount--
            }
            foodList.push(value)
        })
        var orderList = [];
        foodList.map((value, key) => {
            if(value.orderAmount > 0) {
                orderList.push(value)
            }
        })
        this.setState({ foodList, orderList })
    }

    confirmOrderFromBottomSheet = item => e => {
         var foodList = [];
         this.state.foodList.map((value, key) => { 
             if(value.id == item.id) {
                 value.orderAmount = item.orderAmount
             }
             foodList.push(value)
         }) 
         this.setState({ foodList, orderPassToBottomSheet: item })
    }

    openModalCart = () => {
        this.setState({ modalCartVisible: true })
    }

    closeModalCart = () => {
        this.setState({ modalCartVisible: false })
    }

    backDataOrderListFromModalCart = (item, orderList) => e => { 
        var foodList = [];
        foodList.map((value, key) => {
            if(value.id == item.id) {
                value.orderAmount = item.orderAmount
            }
            foodList.push(value)
        })

        console.log(item)
        this.setState({ orderList, foodList })
    }

    openModalChangeArrivalTime = () => {
        this.setState({ modalChangeArrivalTimeVisible: true })
    }

    closeModalChangeArrivalTime = () => {
        this.setState({ modalChangeArrivalTimeVisible: false })
    }

    chooseDeliveryNow = () => {
        this.setState({ deliveryNow: true })
    }

    chooseAppointmentDelivery = () => {
        this.setState({ deliveryNow: false })
    }

    onRegionChange = region => e => { 
        this.setState({ 
            region: {
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
            }
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorGrey }}>
                { !this.state.loaded ? loading() : null }
                    <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
                    <View style={styles.container}>
                        <View style={styles.foodList} >
                            <FlatList
                                ref={(ref) => { this.foodListRef = ref }}
                                data={this.state.foodList}
                                refreshing={this.state.refresh}
                                onRefresh={this.state.tabInfoVisible ? null : this.refresh}
                                renderItem={this.state.tabInfoVisible ? null : this.renderRow}
                                keyExtractor={(item, index) => index.toString()}
                                onEndReached={this.state.handleLoadMore && !this.state.tabInfoVisible ? this.handleLoadMore : null}
                                onEndReachedThreshold={0.1}
                                ListHeaderComponent={this.renderHeader}
                                ListFooterComponent={this.state.itemLoading && !this.state.tabInfoVisible ? this.renderFooter : null}
                                disableVirtualization={true}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>

            {/* CART BOTTOM */}
                { !this.state.tabInfoVisible ?
                    <TouchableWithoutFeedback onPress={this.openModalCart}>
                        <View style={
                                [
                                    styles.cartBorderWrapper,
                                    this.state.modalCartVisible ? { position: 'absolute', top: height - 60 - StatusBar.currentHeight } : null
                                ]
                            }
                        >
                            <View style={styles.cartBorder}>
                                <View style={styles.cartBorderInside}>
                                    <View style={styles.iconCartWrapper}>
                                        <Icon
                                            name='cart-outline'
                                            size={26}
                                            color='#fff'
                                        />
                                        {this.state.orderList.length > 0 ?
                                            <View style={styles.amountOnIconCartWrapper}>
                                                <Text style={styles.amountOnIconCart}>{this.state.orderList.length}</Text>
                                            </View> : null
                                        }
                                    </View>
                                    <View style={styles.totalPaymentWrapper}>
                                        <Text 
                                            style={styles.payment}
                                            numberOfLines={1}
                                        >
                                            74.298 VNĐ
                                        </Text>
                                    </View>
                                    <TouchableWithoutFeedback onPress={this.goToCart}>
                                        <View style={styles.checkOutWrapper}>
                                            <Text style={styles.checkOut}>Check out</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback> : null
                } 
            {/* CART BOTTOM */}

                {/* <BottomSheetOrder
                    onRef={ref => (this.childBottomSheet = ref)}
                    orderPassToBottomSheet={this.state.orderPassToBottomSheet}
                    confirmOrderFromBottomSheet={this.confirmOrderFromBottomSheet}
                /> */}
            
            {/* MODAL CART*/}
                <View>
                    <ModalCart
                        modalCartVisible={this.state.modalCartVisible}
                        closeModalCart={this.closeModalCart}
                        orderList={this.state.orderList}
                        backDataOrderListFromModalCart={this.backDataOrderListFromModalCart}
                    />
                </View>
            {/* MODAL CART*/}

            {/* MODAL SHOW IMAGE*/}
                <View>
                    <ModalShowImage
                        modalShowImageVisible={this.state.modalShowImageVisible}
                        closeModalShowImage={this.closeModalShowImage}
                        imgSrcShow={this.state.imgSrcShow}
                    />
                </View>
            {/* MODAL SHOW IMAGE*/}

            {/* MODAL CHANGE ARRIVAL TIME*/}
                <View>
                    <ModalChangeArrivalTime
                        modalChangeArrivalTimeVisible={this.state.modalChangeArrivalTimeVisible}
                        closeModalChangeArrivalTime={this.closeModalChangeArrivalTime}
                        deliveryNow={this.state.deliveryNow}
                        chooseDeliveryNow={this.chooseDeliveryNow}
                        chooseAppointmentDelivery={this.chooseAppointmentDelivery}
                    />
                </View>
            {/* MODAL CHANGE ARRIVAL TIME*/}    
            </SafeAreaView>
        )
    }
}

