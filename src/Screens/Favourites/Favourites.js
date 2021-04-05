import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { loading, fetchToken } from '../../Helpers/Functions';
import { styles } from "./css";
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { navigate } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import getFavouriteList from '../../Api/getFavouriteList';
import AsyncStorage from '@react-native-community/async-storage';

export default class Favourites extends Component {

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            favouriteList: [],
            page: 1,
            itemLoading: false,
            handleLoadMore: false,
            refresh: false,
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(async() => {
            if(this._isMounted) {
                const token = await fetchToken();
                var favouriteList = await this.getFavouriteList(token, this.state.page)
                this.setState({ 
                    loaded: true,
                    token, 
                    // favouriteList
                });
            } 
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderRow = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.goToStoreDetail(item)}>
                <View style={styles.elementListBody}>
                    <View style={styles.elementListBodyLeft}>
                        <Image
                            style={styles.elementImage}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <View style={styles.elementListBodyRight}>
                        <Text 
                            style={styles.elementListBodyName}
                            numberOfLines={1}
                        >
                            {item.name}
                        </Text>
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
                                size={18}
                                color='gray'
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
                </View>
            </TouchableWithoutFeedback>
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
        },  async() => {
                const favouriteList = await this.getFavouriteList(this.state.token, this.state.page)  
                this.setState({ favouriteList })
            });       
    }

    refresh = () => {
        this.setState({ 
            favouriteList: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true,
        },  async() => {
                const favouriteList = await this.getFavouriteList(this.state.token, this.state.page)  
                this.setState({ favouriteList })
            }
        );
    }

    scrollToTop = () => {
        if(this.state.favouriteList.length > 0) {
            this.favouriteListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    getFavouriteList = async(token, page) => {
        try {
            var favouriteList = []
            const res = await getFavouriteList(token, page)
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    favouriteList = [...this.state.favouriteList,...resp.data]   
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return favouriteList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getFavouriteList(token, page)}
                ]
            )
        }
    }

    goToStoreDetail = store => e => {
        navigate('StoreDetails', { store })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Favourites</Text>
                        </View>

                        <View style={styles.body}>
                            {!this._isMounted ? null :
                                 this.state.favouriteList.length > 0 ?
                                    <FlatList
                                        ref={(ref) => { this.favouriteListRef = ref }}
                                        data={this.state.favouriteList}
                                        refreshing={this.state.refresh}
                                        onRefresh={this.refresh}
                                        renderItem={this.renderRow}
                                        keyExtractor={(item, index) => index.toString()}
                                        onEndReached={this.state.handleLoadMore ? this.handleLoadMore : null}
                                        onEndReachedThreshold={0.1}
                                        ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                        disableVirtualization={true}
                                        showsVerticalScrollIndicator={false}
                                    />
                                    :
                                    <Text style={styles.noData}>No Favourites</Text>
                            } 
                        </View>
                    </View>
            </SafeAreaView>
        )
    }
}

