import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, FlatList, Image, ActivityIndicator } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { backgroundColorWhite } from '../../Components/Colors/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate, goBack } from '../../Navigators/Router';
import getPromotionList from '../../Api/getPromotionList';
import AsyncStorage from '@react-native-community/async-storage';

export default class ListPromotion extends Component {
    
    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            promotionList: [],
            page: 1,
            itemLoading: false,
            handleLoadMore: false,
            refresh: false,
            lat: this.props.route.params.lat,
            long: this.props.route.params.long
        };
    }

    componentDidMount() {
        this._isMounted = true
        setTimeout(async() => {
            if(this._isMounted) {
                var promotionList = await this.getPromotionList(this.state.page)
                this.setState({ 
                    loaded: true,
                    promotionList
                });
            } 
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    renderRow = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.goToStoreDetails(item)}>
                <View style={styles.elementWrapper}>
                    <View style={styles.elementLeft}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <View style={styles.elementRight}>
                        <Text 
                            style={styles.promotionElementName}
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
                        <View style={styles.discount}>
                            <Text style={styles.discountTitle}>Giảm món</Text>
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
                const promotionList = await this.getPromotionList(this.state.page)  
                this.setState({ promotionList })
            });       
    }

    refresh = () => {
        this.setState({ 
            promotionList: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true,
        },  async() => {
                const promotionList = await this.getPromotionList(this.state.page)  
                this.setState({ promotionList })
            }
        );
    }

    scrollToTop = () => {
        if(this.state.promotionList.length > 0) {
            this.promotionListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    getPromotionList = async(page) => {
        try {
            var promotionList = []
            const res = await getPromotionList(this.state.lat, this.state.long, page)
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    promotionList = [...this.state.promotionList,...resp.data]   
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return promotionList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getPromotionList(page)}
                ]
            )
        }
    }

    goToStoreDetails = store => e => {
        navigate('StoreDetails', { store })
    }

    goBack = () => {
        goBack()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                { !this.state.loaded ? loading() : null }
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
                                <Text style={styles.headerTitle}>Promotions</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <View style={styles.body}>
                            {!this._isMounted ? null :
                                 this.state.promotionList.length > 0 ?
                                    <FlatList
                                        ref={(ref) => { this.promotionListRef = ref }}
                                        data={this.state.promotionList}
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
                                    <Text style={styles.noData}>No Promotions</Text>
                            }
                        </View>
                    </View>
            </SafeAreaView>
        )
    }
}

