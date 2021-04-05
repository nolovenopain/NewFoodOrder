import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, FlatList, ActivityIndicator, Alert } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { goBack, navigate } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import getAddressList from '../../Api/getAddressList';
import AsyncStorage from '@react-native-community/async-storage';

export default class DeliveryAddress extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            page: 1,
            addressList: [],
            itemLoading: false,
            handleLoadMore: false,
            refresh: false,
            addressDefault: this.props.route.params.addressDefault,
            user: this.props.route.params.user,
            token: this.props.route.params.token
        };
    }

    componentDidMount() {
        this._isMounted = true;
        setTimeout(async() => {
            if(this._isMounted) {
                var addressList = await this.getAddressList()
                this.setState({ 
                    loaded: true,
                    addressList
                });
            } 
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded ||
            this.state.addressList != nextState.addressList ||
            this.state.addressDefault != nextState.addressDefault) {
                return true
            }
        return false
    }

    renderHeader = () => {
        return (
            <View style={styles.bodyHeader}>
                <View style={styles.bodyHeaderTop}>
                    <View style={styles.bodyHeaderTopLeft}>
                        <Icon
                            name='location-outline'
                            size={20}
                        />
                    </View>
                    <View style={styles.bodyHeaderTopCenter}>
                        <Text style={styles.receiver}>
                            {this.state.addressDefault.name}
                        </Text>
                        <Text style={styles.phone}>
                            {this.state.addressDefault.phone}
                        </Text>
                        <Text 
                            style={styles.address}
                            numberOfLines={1}
                        >
                            {this.state.addressDefault.address}
                        </Text>
                    </View>
                    <View style={styles.bodyHeaderTopRight}>
                        {JSON.stringify(this.state.addressDefault) !== JSON.stringify(this.props.route.params.currentAddressObj) ?
                            <TouchableWithoutFeedback onPress={this.goToEditDeliveryAddress(this.state.addressDefault)}>
                                <Text style={styles.editAddress}>Edit</Text>
                            </TouchableWithoutFeedback> : null
                        }
                    </View>
                </View>

                <View style={styles.bodyHeaderBottom}>
                    <Text style={styles.history}>History</Text>
                </View>
            </View>
        )
    }

    renderRow = ({ item, index }) => {
        if(!item.active) {
            return (
                <View style={styles.bodyElement}>
                    <View style={styles.bodyElementInside}>
                        <TouchableWithoutFeedback onPress={this.chooseAddress(item)}>
                            <View style={styles.touchableGroup}>
                                <View style={styles.bodyElementLeft}>
                                    <Icon
                                        name='location-outline'
                                        size={20}
                                    />
                                </View>
                                <View style={styles.bodyElementCenter}>
                                    <Text style={styles.receiver}>{item.name}</Text>
                                    <Text style={styles.phone}>{item.phone}</Text>
                                    <Text 
                                        style={styles.address}
                                        numberOfLines={1}
                                    >
                                        {item.address}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.bodyElementRight}>
                            <TouchableWithoutFeedback onPress={this.goToEditDeliveryAddress(item)}>
                                <Text style={styles.editAddress}>Edit</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            )
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
        },  async() => {
                var addressList = await this.getAddressList()
                this.setState({ addressList })  
            });       
    }

    refresh = () => {
        this.setState({ 
            addressList: [],
            page: 1,
        },  async() => {
                var addressList = await this.getAddressList()
                this.setState({ addressList })  
            }
        );
    }

    scrollToTop = () => {
        if(this.state.addressList.length > 0) {
            this.addressListRef.scrollToOffset({ animated: true, offset: 0 });
        } 
    }

    getAddressList = async() => {
        try {
            var addressList = []
            const res = await getAddressList(this.state.token, this.state.page)
            if(res.status == 200) {
                const resp = await res.json()
                if(resp.code == 200) {
                    addressList = [...this.state.addressList,...resp.data]
                    if(resp.data.length == 0) {
                        this.setState({ 
                            handleLoadMore: false, 
                            itemLoading: false 
                        })
                    } 
                    else {
                        this.setState({
                            itemLoading: true,
                            handleLoadMore: true
                        })
                    }
                         
                }
                else if(resp.code == 204) {
                    addressList = [...this.state.addressList,...resp.data]
                    this.setState({ 
                        handleLoadMore: false, 
                        itemLoading: false 
                    })
                }
            }
            else if(res.status == 500) {
                Alert.alert('Error !!!', 'Bad request. Please try again later !!!');
            }
            return addressList
        }
        catch(error) {
            console.log(error)
            Alert.alert(
                'Sorry, something went wrong. Please try again',
                error.message,
                [
                    {text: 'Try Again', onPress: () => this.getAddressList()}
                ]
            )
        }
    }

    goBack = () => {
        goBack()
    }

    goToEditDeliveryAddress = (address) => e => {
        navigate('EditAddress', { 
            address,
            user: this.state.user,
            token: this.state.token,
            getBackAddressFromEdit: this.getBackAddressFromEdit,
        })
    }

    goToAddNewAddress = () => {
        navigate('CreateNewAddress', {
            user: this.state.user,
            token: this.state.token,
            refresh: this.refresh,
        })
    }

    getBackAddressFromEdit = address => {
        this.refresh()
        if(address.id == this.state.addressDefault.id) {
            this.setState({ addressDefault: address })
            this.props.route.params.getBackAddressHome(address)
        }
    }

    chooseAddress = address => e => {
        var addressList = []
        this.state.addressList.map((value, key) => {
            if(address.id == value.id) {
                value.active = true
            }
            else {
                value.active = false
            }
            addressList.push(value)
        })
        this.setState({ addressDefault: address, addressList })
        this.props.route.params.getBackAddressHome(address)
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
                                <Text style={styles.headerTitle}>Delivery Address</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <View style={styles.body}>
                            <FlatList
                                contentContainerStyle={{ paddingBottom: 20 }}
                                ref={(ref) => { this.addressListRef = ref }}
                                data={this.state.addressList}
                                refreshing={this.state.refresh}
                                onRefresh={this.refresh}
                                renderItem={this.renderRow}
                                keyExtractor={(item, index) => index.toString()}
                                ListHeaderComponent={this.renderHeader}
                                onEndReached={this.state.handleLoadMore ? this.handleLoadMore : null}
                                onEndReachedThreshold={0.1}
                                ListFooterComponent={this.state.itemLoading ? this.renderFooter : null}
                                disableVirtualization={true}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>

                        <View style={styles.bottom}>
                            <TouchableWithoutFeedback onPress={this.goToAddNewAddress}>
                                <View style={styles.addNewBtn}>
                                    <Text style={styles.addNewTitle}>Add New Address</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
            </SafeAreaView>
        )
    }
}

