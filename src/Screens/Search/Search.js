import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import { styles } from "./css";
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { goBack } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { width } from '../../Components/Dimensions/Dimensions';
import searchRestaurant from '../../Api/searchRestaurant';
import { loading } from '../../Helpers/Functions';
import { getDistance } from 'geolib';

const speed = 10;

export default class Search extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            searchList: [],
            page: 1,
            searchKey: '',
            loaded: true,
            itemLoading: false,
            handleLoadMore: false,
            refresh: false,
        };
    }

    componentDidMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded ||
            this.state.searchList != nextState.searchList) {
                return true
            }
        return false
    }

    renderItem = ({ item, index }) => {
        var distance = getDistance(
            { latitude: this.props.route.params.currtentLocation.latitude, longitude: this.props.route.params.currtentLocation.longitude },
            { latitude: item.lat, longitude: item.long }
        )
        distance = Math.round((distance/1000)*10)/10
        return (
            <TouchableWithoutFeedback onPress={this.goToStoreDetails(item)}>
                <View style={styles.elementWrapper}>
                    <View style={styles.elementLeft}>
                        <Image
                            style={styles.image}
                            source={!item.image ? 
                                require('../../Assets/Images/noImage.jpg') : { uri: item.image }}
                        />
                    </View>
                    <View style={styles.elementRight}>
                        <Text 
                            style={styles.elementName}
                            numberOfLines={1}
                        >
                            {item.name}
                        </Text>
                        <View style={styles.rowGroup}>
                            <View style={styles.starGroup}>
                                <Icon
                                    name='star'
                                    size={18}
                                    color='gold'
                                />
                                <Text style={styles.evaluation}>
                                    {item.rate ? item.rate : 0}
                                </Text>
                            </View>
                            <View style={styles.distanceGroup}>
                                <Entypo
                                    name='back-in-time'
                                    size={16}
                                    color='gray'
                                />
                                <Text style={[styles.elementText, { marginLeft: 5 }]}>
                                    {Math.ceil((distance/1000)/speed * 60) < 60 ? 
                                        (Math.ceil((distance/1000)/speed * 60) + ' mins') : (Math.round((distance/1000)/speed * 10) / 10 + ' hours')} 
                                </Text>
                                <Entypo
                                    name='dot-single'
                                    size={20}
                                    color='gray'
                                />
                                <Text style={styles.elementText}>
                                    {distance} km
                                </Text>
                            </View>
                        </View>
                        
                        <View style={styles.discount}>
                            <Text style={styles.discountTitle}>Giảm món</Text>
                        </View>
                    </View>  
                </View>
            </TouchableWithoutFeedback>
        )
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    goToStoreDetails = store => e => {
        navigate('StoreDetails', { store })
    }

    goBack = () => {
        goBack()
    }

    search = async() => {
        if(this.state.searchKey != '') {
            this.setState({ loaded: false })
            try {
                const res = await searchRestaurant(this.state.searchKey, this.state.page)
                if(res.status == 200) {
                    this.setState({ loaded: true })
                    const resp = await res.json() 
                    console.log(resp)
                    if(resp.code == 200) {
                        this.setState({ searchList: [...this.state.searchList,...resp.data] })
                    }
                    else if(resp.code == 225) {
                        Alert.alert('Error !!!', resp.message);
                    }
                    else if(resp.code == 223) {
                        Alert.alert('Error !!!', resp.message);
                    }
                    else if(resp.code == 202) {
                        console.log('Error: ', resp.message);
                    }
                }
                else if(res.status == 500) {
                    this.setState({ loaded: true })
                    Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
                }
            } 
            catch(error) {
                this.setState({ loaded: true })
                console.log(error)
                Alert.alert(
                    'Sorry, something went wrong. Please try again',
                    error.message,
                    [
                        {text: 'Try Again', onPress: () => this.search()}
                    ]
                )
            }
        } 
        else {
            this.setState({
                loaded: true,
                searchList: []
            })
        }
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
                this.search() 
            });       
    }

    refresh = () => {
        this.setState({ 
            searchList: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true,
        },  () => {
                this.search();
            }
        );
    }

    scrollToTop = () => {
        if(this.state.searchList.length > 0) {
            this.storeListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                {this.state.loaded ? null : loading()}
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <TouchableWithoutFeedback onPress={this.goBack}>
                                <Icon
                                    name='chevron-back'
                                    size={30}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.headerCenter}>
                            <View style={styles.iconBox}>
                                <Icon
                                    name='search'
                                    size={25}
                                    color='silver'
                                />
                            </View>
                            <View style={styles.searchBar}>
                                <SearchBar
                                    placeholder='Enter words...'
                                    width={width - 70 - 40}
                                    setValue={this.setValue}
                                    name='searchKey'
                                    search={this.search}
                                    onRef={ref => (this.childSearch = ref)}
                                />
                            </View>
                        </View>
                        <View style={styles.headerRight}>

                        </View>
                    </View>

                    <View style={styles.body}>
                        <FlatList
                            ref={(ref) => { this.storeListRef = ref }}
                            data={this.state.searchList}
                            refreshing={this.state.refresh}
                            onRefresh={this.refresh}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.state.handleLoadMore ? this.handleLoadMore : null}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                            disableVirtualization={true}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

