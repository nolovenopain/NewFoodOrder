import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, StatusBar, Image, TouchableWithoutFeedback, RefreshControl, FlatList, Alert } from 'react-native';
import { styles } from "./css";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { tomato, backgroundColorGrey } from '../../Components/Colors/Color';
import { navigate } from '../../Navigators/Router';
import { fetchLat, fetchLong, fetchToken, loading } from '../../Helpers/Functions';
import getCategoryList from '../../Api/getCategoryList';
import getHomeList from '../../Api/getHomeList';
import Geocoder from 'react-native-geocoder';
import getUserProfile from '../../Api/getUserProfile';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            loaded: false,
            refreshScreen: false,
            categoriesList: [],
            bodyHeaderTabList: [
                {id: 1, title: 'Nearby', active: true},
                {id: 2, title: 'Top Sales', active: false},
                {id: 3, title: 'Best Rated', active: false},
                {id: 4, title: 'Fast', active: false}
            ],
            homeList: {},
            promotionShortList: [],
            addressDefault: {
                id: null,
                address: '',
                name: '',
                phone: '',
                lat: null,
                long: null
            },
            currentAddressObj: {
                id: null,
                address: '',
                name: '',
                phone: '',
                lat: null,
                long: null
            },
            user: {},
            nearByList: [],
            filterShortList: [],
            topSalesList: [],
            bestRatedList: [],
            fastList: [],
            nearByPromotionList: [],
            topSalesPromotionList: [],
            bestRatedPromotionList: [],
            fastPromotionList: [],
            lat: '',
            long: ''
        };
    }

    async componentDidMount() {    
        this._isMounted = true
        setTimeout(async() => {
            const token = await fetchToken();
            const lat = await fetchLat();
            const long = await fetchLong();
            if(this._isMounted) {
                var user = await this.getUser(token);
                var address = await AsyncStorage.getItem('currentAddress')
                if(!address) {
                    this.getRealAddress(lat, long);
                    address = await AsyncStorage.getItem('currentAddress')
                }
                var categoriesList = await this.getCategory();
                var homeList = await this.getHomeListByCategory(categoriesList[0].id, lat, long);
                this.setState({ 
                    loaded: true,
                    token, 
                    user,
                    categoriesList,
                    homeList,
                    addressDefault: {
                        id: null,
                        address,
                        name: user.name,
                        phone: user.phone,
                        lat: parseFloat(lat),
                        long: parseFloat(long)
                    },
                    currentAddressObj: {
                        id: null,
                        address,
                        name: user.name,
                        phone: user.phone,
                        lat: parseFloat(lat),
                        long: parseFloat(long)
                    },
                    filterShortList: homeList.nearby.data_nearby,
                    nearByList: homeList.nearby.data_nearby,
                    topSalesList: homeList.topSales.data_top_sales,
                    bestRatedList: homeList.reviews.data_reviews,
                    fastList: homeList.fast.data_fast,
                    promotionShortList: homeList.nearby.promotion_nearby,
                    nearByPromotionList: homeList.nearby.promotion_nearby,
                    topSalesPromotionList: homeList.topSales.promotion_top_sales,
                    bestRatedPromotionList: homeList.reviews.promotion_reviews,
                    fastPromotionList: homeList.fast.promotion_fast,
                    lat,
                    long
                });
            }  
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded && this.state.bodyHeaderTabList != nextState.bodyHeaderTabList) {
            return true
        }
        else if(this.state.loaded != nextState.loaded) {
            return true
        }
        else if (this.state.bodyHeaderTabList != nextState.bodyHeaderTabList) {
            return true
        }
        else if(this.state.addressDefault != nextState.addressDefault) {
            return true
        }
        return false
    }

    renderRowCategory = ({ item, index }) => {
        return (
            <View style={styles.categoryElement}>
                <TouchableWithoutFeedback onPress={this.chooseCategory(item)}>
                    <View style={styles.categoryElementInside}>
                        <Image 
                            style={
                                [
                                    styles.categoryImg,
                                    { backgroundColor: item.active ?  'pink' : 'whitesmoke' }
                                ]
                            }
                            source={item.image ? { uri: item.image } : require('../../Assets/Images/noImage.jpg')}
                        />
                        <Text 
                            style={
                                [
                                    styles.categoryElementTitle,
                                    { color: item.active ?  tomato : '#5D5D5D' }
                                ]
                            }
                        >
                            {item.name}
                        </Text>
                     </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    renderRowTabList = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.chooseBodyTab(item)}>
                <View 
                    style={
                        [
                            styles.headerBodyTab,
                            { 
                                borderBottomWidth: item.active ? 1 : 0,
                                borderColor: item.active ? tomato : '#fff' 
                            }
                        ]
                    }
                >
                    <Text 
                        style={
                            [
                                styles.headerBodyTabTitle,
                                { fontFamily: item.active ? 'Poppins-Medium' : 'Poppins-Regular' }
                            ]
                        }
                    >
                        {item.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderRowPromotionList = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.goToStoreDetails(item)}>
                <View style={styles.promotionElement}>
                    <Image
                        style={styles.promotionElementImage}
                        source={{ uri: item.image }}
                    />
                    <Text 
                        style={styles.promotionElementName}
                        numberOfLines={2}
                    >
                        {item.name}
                    </Text>
                    <View style={styles.discountBox}>
                        <Text 
                            style={styles.discount}
                            numberOfLines={1}
                        >
                            {item.discount}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    getUser = async(token) => {
        try {
            var user = {}
            const res = await getUserProfile(token);
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    user = resp.data
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }    
            return user
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getUser()}
                ]
            )
        }
    }

    getCategory = async() => { 
        try{
            var categoriesList = []
            const res = await getCategoryList();
            if(res.status == 200) {
                const resp = await res.json()       
                if(resp.code == 200) {
                    if(resp.data.length > 0) {
                        resp.data.map((value, key) => {
                            categoriesList.push({
                                id: value.id,
                                image: value.image,
                                name: value.name,
                                description: value.description,
                                active: key == 0 ? true : false
                            })
                        })
                    }
                }
                else if(resp.code == 204) {
                    categoriesList = resp.data
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            } 
            return categoriesList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getCategory()}
                ]
            )
        }
    }

    getHomeListByCategory = async(categoryId, lat, long) => { 
        try {
            var homeList = {}
            const res = await getHomeList(
                categoryId,
                lat,
                long
            );
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    homeList = resp.data
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return homeList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getHomeListByCategory(categoryId, lat, long)}
                ]
            )
        }
    }

    getRealAddress = async(lat, long) => {
        Geocoder.geocodePosition({
            lat: parseFloat(lat), 
            lng: parseFloat(long)
        }).then(res => {
            AsyncStorage.setItem('currentAddress', res[0].formattedAddress)
        })
        .catch(err => console.log(err))    
    }   

    getBackAddressHome = address => {
        this.setState({ addressDefault: address })
    }

    chooseCategory = item => async(e) => {
        this.setState({ loaded: false })
        var categoriesList = [];
        this.state.categoriesList.map((value, key) => {
            if(item.id == value.id) {
                value.active = true       
            }
            else {
                value.active = false
            }
            categoriesList.push(value)
        });
        var bodyHeaderTabList = [];
        this.state.bodyHeaderTabList.map((value, key) => {
            if(value.id == 1) {
                value.active = true
            }
            else {
                value.active = false
            }
            bodyHeaderTabList.push(value)
        });
        var homeList = await this.getHomeListByCategory(item.id, this.state.lat, this.state.long)
        this.setState({
            loaded: true,
            categoriesList,
            bodyHeaderTabList,
            homeList,
            filterShortList: homeList.nearby.data_nearby,
            nearByList: homeList.nearby.data_nearby,
            topSalesList: homeList.topSales.data_top_sales,
            bestRatedList: homeList.reviews.data_reviews,
            fastList: homeList.fast.data_fast,
            promotionShortList: homeList.nearby.promotion_nearby,
            nearByPromotionList: homeList.nearby.promotion_nearby,
            topSalesPromotionList: homeList.topSales.promotion_top_sales,
            bestRatedPromotionList: homeList.reviews.promotion_reviews,
            fastPromotionList: homeList.fast.promotion_fast, 
        })
    }

    chooseBodyTab = item => e => {
        var bodyHeaderTabList = [];
        this.state.bodyHeaderTabList.map((value, key) => {
            if(item.id == value.id) {
                value.active = true
                if(value.id == 1) {
                    this.setState({ 
                        filterShortList: this.state.nearByList,
                        promotionShortList: this.state.nearByPromotionList,
                    })
                }
                else if(value.id == 2) {
                    this.setState({ 
                        filterShortList: this.state.topSalesList,
                        promotionShortList: this.state.topSalesPromotionList,
                    })
                }
                else if(value.id == 3) {
                    this.setState({ 
                        filterShortList: this.state.bestRatedList,
                        promotionShortList: this.state.bestRatedPromotionList,
                    })
                }
                else {
                    this.setState({ 
                        filterShortList: this.state.fastList,
                        promotionShortList: this.state.fastPromotionList, 
                    })
                }
            }
            else {
                value.active = false
            }
            bodyHeaderTabList.push(value)
        });
        this.setState({ bodyHeaderTabList })
    }

    goToStoreDetails = (item) => e => {
        navigate('StoreDetails', { store: item })
    }

    goToFullPromotionList = () => {
        navigate('ListPromotion', {
            lat: this.state.lat,
            long: this.state.long
        })
    }

    goToSearch = () => {
        navigate('Search')
    }

    goToDeliveryAddress = () => {
        navigate('DeliveryAddress', {
            addressDefault: this.state.addressDefault,
            currentAddressObj: this.state.currentAddressObj,
            user: this.state.user,
            token: this.state.token,
            getBackAddressHome: this.getBackAddressHome
        })
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefreshScreen = () => {
        this.setState({ refreshScreen: true });
        this.componentDidMount();
        this.wait(1000).then(() => this.setState({ refreshScreen: false }))
    }

    render() { 
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorGrey }}>
                { !this.state.loaded ? loading() : null }
                    <StatusBar barStyle='dark-content' backgroundColor='#fff' translucent />
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshScreen} onRefresh={this.onRefreshScreen} />
                        }
                    >
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <View style={styles.searchAndLocation}>
                                    <View style={styles.headerLeft}>
                                        <TouchableWithoutFeedback onPress={this.goToSearch}>
                                            <View style={styles.searchBar}>
                                                <Feather
                                                    name='search'
                                                    size={20}
                                                    color='silver'
                                                />
                                                <View style={{ height: 20 }}>
                                                    <Text style={styles.searchTitle}>Search</Text>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <TouchableWithoutFeedback onPress={this.goToDeliveryAddress}>
                                        <View style={styles.headerRight}>
                                            <View style={styles.locationIconWrapper}>
                                                <FontAwesome
                                                    name='location-arrow'
                                                    color='gray'
                                                    size={20}
                                                />
                                            </View>
                                            <View style={styles.showLocationWrapper}>
                                                <Text style={styles.deliveryTo}>Delivery to</Text>
                                                <Text 
                                                    style={styles.location}
                                                    numberOfLines={1}
                                                >
                                                    {this.state.addressDefault.address}
                                                </Text>
                                            </View>
                                            <View style={styles.dropdownIconWrapper}>
                                                <FontAwesome
                                                    name='sort-down'
                                                    color={tomato}
                                                    size={25}
                                                />
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                                <View style={styles.categoriesWrapper}>
                                    <Text style={styles.categoryTitle}>Categories</Text>
                                    <FlatList
                                        data={this.state.categoriesList}
                                        renderItem={this.renderRowCategory}
                                        keyExtractor={(item, index) => index.toString()}
                                        disableVirtualization={true}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                    />
                                </View>
                            </View>

                            <View style={styles.body}>
                                <View style={styles.headerBodyTabWrapper}>
                                    <FlatList
                                        data={this.state.bodyHeaderTabList}
                                        renderItem={this.renderRowTabList}
                                        keyExtractor={(item, index) => index.toString()}
                                        disableVirtualization={true}
                                        showsHorizontalScrollIndicator={false}
                                        horizontal={true}
                                    />
                                </View>

                                <View style={styles.shortlist}>
                                    {this.state.filterShortList.map((value, key) => {
                                        return(
                                            <TouchableWithoutFeedback 
                                                onPress={this.goToStoreDetails(value)} 
                                                key={key}
                                            >
                                                <View style={styles.elementListBody}>
                                                    <View style={styles.elementListBodyLeft}>
                                                        <Image
                                                            style={styles.elementImage}
                                                            source={{ uri: value.image }}
                                                        />
                                                    </View>
                                                    <View style={styles.elementListBodyRight}>
                                                        <Text 
                                                            style={styles.elementListBodyName}
                                                            numberOfLines={1}
                                                        >
                                                            {value.name}
                                                        </Text>
                                                        <View style={styles.starGroup}>
                                                            <Icon
                                                                name='star'
                                                                size={16}
                                                                color='gold'
                                                            />
                                                            <Text style={styles.evaluation}>
                                                                {value.rate ? value.rate : 0}
                                                            </Text>
                                                        </View>
                                                        <View style={styles.distanceGroup}>
                                                            <Entypo
                                                                name='back-in-time'
                                                                size={16}
                                                                color='gray'
                                                            />
                                                            <Text style={[styles.elementText, { marginLeft: 5 }]}>18 mins</Text>
                                                            <Entypo
                                                                name='dot-single'
                                                                size={16}
                                                                color='gray'
                                                            />
                                                            <Text style={styles.elementText}>1.3 km</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })}
                                </View>

                                <View style={styles.promotionListShow}>
                                    <View style={styles.titleAndViewMore}>
                                        <View style={styles.titleWrapper}>
                                            <Text style={styles.promotionTitle}>Promotion</Text>
                                        </View>
                                        <View style={styles.viewMoreWrapper}>
                                            <TouchableWithoutFeedback onPress={this.goToFullPromotionList}>
                                                <View style={styles.viewMore}>
                                                    <Text style={styles.viewMoreTitle}>View More</Text>
                                                    <Icon
                                                        name='chevron-forward'
                                                        color='gray'
                                                        size={17}
                                                    />
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>

                                    <View style={{ marginBottom: 20, paddingRight: 15 }}>
                                        <FlatList
                                            data={this.state.promotionShortList}
                                            renderItem={this.renderRowPromotionList}
                                            keyExtractor={(item, index) => index.toString()}
                                            disableVirtualization={true}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
            </SafeAreaView>
        )
    }
}

