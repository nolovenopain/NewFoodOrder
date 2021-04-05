import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
import { fetchToken, loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { navigate } from '../../Navigators/Router';
import getNotificationList from '../../Api/getNotificationList';
import AsyncStorage from '@react-native-community/async-storage';

export default class Notifications extends Component {
    
    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            notificationList: [],
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
                var notificationList = await this.getNotificationList()
                this.setState({ 
                    loaded: true,
                    token, 
                    notificationList
                });
            } 
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderRow = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.goToNotificationDetails(item)}>
                <View style={
                        [
                            styles.elementWrapper,
                            { backgroundColor: item.status == 0 ? '#dfe3ee' : backgroundColorWhite }
                        ]
                    }
                >
                    <View style={styles.elementLeft}>
                        <Image
                            style={styles.image}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <View style={styles.elementRight}>
                        <Text
                            style={styles.title}
                            numberOfLines={1}
                        >
                            {item.content}
                        </Text>
                        <Text style={styles.message}>
                            {item.message.length > 150 ? item.message.substr(0,150) + '...' : item.message}
                        </Text>
                        <Text style={styles.time}>{item.created_date}</Text>
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
                var notificationList = await this.getNotificationList() 
                this.setState({ notificationList })
            });       
    }

    refresh = () => {
        this.setState({ 
            notificationList: [],
            page: 1,
            itemLoading: true, 
            handleLoadMore: true,
        },  async() => {
                var notificationList = await this.getNotificationList() 
                this.setState({ notificationList })
            }
        );
    }

    scrollToTop = () => {
        if(this.state.notificationList.length > 0) {
            this.notificationListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    getNotificationList = async() => {
        try {
            var notificationList = []
            const res = await getNotificationList(this.state.page)
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    notificationList = [...this.state.notificationList,...resp.data]   
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return notificationList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getNotificationList()}
                ]
            )
        }
    }

    goToNotificationDetails = notification => e => {
        var notificationList = [];
        this.state.notificationList.map((value, key) => {
            if(value.id == notification.id) {
                value.status = 1
            }
            notificationList.push(value)
        }) 
        this.setState({ notificationList })
        navigate('NotificationDetails', { notification })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Notifications</Text>
                        </View>

                        <View style={styles.body}>
                            {!this._isMounted ? null :
                                 this.state.notificationList.length > 0 ?
                                    <FlatList
                                        ref={(ref) => { this.notificationListRef = ref }}
                                        data={this.state.notificationList}
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
                                    <Text style={styles.noData}>No Notifications</Text>
                            }
                        </View>
                    </View>
            </SafeAreaView>
        )
    }
}

