import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, FlatList, Image, TouchableOpacity } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { backgroundColorWhite, tomato } from '../../Components/Colors/Color';
import { navigate } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalRate from '../../Modals/ModalRate/ModalRate';
import AsyncStorage from '@react-native-community/async-storage';

export default class Orders extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            orderList: [
                {id: 1, storeName: 'Thanh Dai - Bun cha & bun ca', imgSrc: require('../../Assets/Images/buncha.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 0, rate: null},
                {id: 2, storeName: 'Van Huong - Chao long', imgSrc: require('../../Assets/Images/chaolong.jpeg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 1, rate: 0},
                {id: 3, storeName: 'Ding Tea - Tra sua', imgSrc: require('../../Assets/Images/trasua.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 0, rate: null},
                {id: 4, storeName: 'Thanh Dai - Bun cha & bun ca', imgSrc: require('../../Assets/Images/buncha.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 2, rate: null},
                {id: 5, storeName: 'Van Huong - Chao long', imgSrc: require('../../Assets/Images/chaolong.jpeg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 1, rate: 1},
                {id: 6, storeName: 'Ding Tea - Tra sua', imgSrc: require('../../Assets/Images/trasua.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 0, rate: null},
                {id: 7, storeName: 'Thanh Dai - Bun cha & bun ca', imgSrc: require('../../Assets/Images/buncha.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 0, rate: null},
                {id: 8, storeName: 'Van Huong - Chao long', imgSrc: require('../../Assets/Images/chaolong.jpeg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 1, rate: 1},
                {id: 9, storeName: 'Ding Tea - Tra sua', imgSrc: require('../../Assets/Images/trasua.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 0, rate: null},
                {id: 10, storeName: 'Thanh Dai - Bun cha & bun ca', imgSrc: require('../../Assets/Images/buncha.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 2, rate: null},
                {id: 11, storeName: 'Van Huong - Chao long', imgSrc: require('../../Assets/Images/chaolong.jpeg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 2, rate: null},
                {id: 12, storeName: 'Ding Tea - Tra sua', imgSrc: require('../../Assets/Images/trasua.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 1, rate: 0},
                {id: 13, storeName: 'Thanh Dai - Bun cha & bun ca', imgSrc: require('../../Assets/Images/buncha.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 1, rate: 1},
                {id: 14, storeName: 'Van Huong - Chao long', imgSrc: require('../../Assets/Images/chaolong.jpeg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 1, rate: 1},
                {id: 15, storeName: 'Ding Tea - Tra sua', imgSrc: require('../../Assets/Images/trasua.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 0, rate: null},
                {id: 16, storeName: 'Thanh Dai - Bun cha & bun ca', imgSrc: require('../../Assets/Images/buncha.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 1, rate: 1},
                {id: 17, storeName: 'Van Huong - Chao long', imgSrc: require('../../Assets/Images/chaolong.jpeg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 1, rate: 0},
                {id: 18, storeName: 'Ding Tea - Tra sua', imgSrc: require('../../Assets/Images/trasua.jpg'), total: 154.00, time: '11:09 PM 10/12/2020', status: 0, rate: null},
            ],
            modalRateVisible: false,
            itemRate: {},
            deliveryTabActive: true,
            historyTabActive: false,
            cancelTabActive: false,
            deliveringList: [],
            historyList: [],
            cancelList: []
        };
    }

    componentDidMount() {
        this._isMounted = true
        var deliveringList = this.state.orderList.filter(order => order.status == 0);
        var historyList = this.state.orderList.filter(order => order.status == 1)
        var cancelList = this.state.orderList.filter(order => order.status == 2)
        setTimeout(() => {
            this._isMounted && this.setState({ 
                loaded: true,
                deliveringList,
                historyList,
                cancelList 
            });
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderRow = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.goToOrderDetails(item)}>
                <View style={styles.elementWrapper}>
                    <View style={styles.timeWrapper}>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>

                    <View style={styles.elementListBody}>
                        <View style={styles.elementListBodyLeft}>
                            <Image
                                style={styles.elementImage}
                                source={item.imgSrc}
                            />
                        </View>
                        <View style={styles.elementListBodyRight}>
                            <Text 
                                style={styles.elementListBodyName}
                                numberOfLines={1}
                            >
                                {item.storeName}
                            </Text>
                            <View style={styles.starGroup}>
                                <Icon
                                    name='star'
                                    size={18}
                                    color='gold'
                                />
                                <Text style={styles.evaluation}>4.7</Text>
                            </View>
                            <View style={styles.distanceGroup}>
                                <Text style={styles.total}>Total: {item.total}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.groupBottom}>
                        <View style={styles.groupBottomLeft}>
                            <View style={
                                    [
                                        styles.statusCircle,
                                        { backgroundColor: item.status == 0 ? '#00FF0A' : 
                                            item.status == 1 ? tomato : 'gray' }
                                    ]
                                }
                            ></View>
                            <Text style={styles.statusTitle}>
                                {item.status == 0 ? 'Delivering' : 
                                    item.status == 1 ? 'Completed' : 'Canceled'}
                            </Text>
                        </View>
                        <View style={styles.groupBottomRight}>
                            {item.status == 2 || item.status == 0 ? null :
                                item.rate == 1 ? 
                                    <Text style={styles.rate}>
                                        Rated
                                    </Text>
                                        :
                                    <TouchableOpacity onPress={this.openModalRate(item)}>
                                        <Text style={styles.unRate}>Un-rate</Text>
                                    </TouchableOpacity>
                            }

                            {item.status == 0 ? null : 
                                <TouchableWithoutFeedback onPress={this.reOrder(item)}>
                                    <View style={styles.reOrderBtn}>
                                        <Text style={styles.reOrder}>Re-Order</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            } 
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    goToOrderDetails = order => e => {
        navigate('OrderDetails', { order })
    }

    rate = () => {
        var orderList = []
        this.state.orderList.map((value, key) => {
            if(this.state.itemRate.id == value.id) {
                value.rate = 1
            }
            orderList.push(value)
        })
        this.setState({ orderList })
    }

    reOrder = item => e => {
        navigate('StoreDetails')
    }

    openModalRate = item => e => {
        this.setState({ 
            modalRateVisible: true,
            itemRate: item 
        })
    }

    closeModalRate = () => {
        this.setState({ modalRateVisible: false })
    }

    deliveryTabActive = () => {
        this.setState({
            deliveryTabActive: true,
            historyTabActive: false,
            cancelTabActive: false
        })
    }
    
    historyTabActive = () => {
        this.setState({
            deliveryTabActive: false,
            historyTabActive: true,
            cancelTabActive: false
        })
    }

    cancelTabActive = () => {
        this.setState({
            deliveryTabActive: false,
            historyTabActive: false,
            cancelTabActive: true
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                { !this.state.loaded ? loading() : null }
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>My Orders</Text>

                            <View style={styles.tabGroup}>
                                <View style={styles.tabWrapper}>
                                    <TouchableWithoutFeedback onPress={this.deliveryTabActive}>
                                        <View 
                                            style={
                                                [
                                                    styles.deliveringTab,
                                                    { borderColor: this.state.deliveryTabActive ? tomato : backgroundColorWhite }
                                                ]
                                            }
                                        >
                                            <Text style={styles.tabTitle}>Delivering</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={[styles.tabWrapper, { alignItems: 'center' }]}>
                                    <TouchableWithoutFeedback onPress={this.historyTabActive}>
                                        <View 
                                            style={
                                                [
                                                    styles.historyTab,
                                                    { borderColor: this.state.historyTabActive ? tomato : backgroundColorWhite }
                                                ]
                                            }
                                        >
                                            <Text style={styles.tabTitle}>History</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.tabWrapper}>
                                    <TouchableWithoutFeedback onPress={this.cancelTabActive}>
                                        <View 
                                            style={
                                                [
                                                    styles.cancelTabActive,
                                                    { borderColor: this.state.cancelTabActive ? tomato : backgroundColorWhite }
                                                ]
                                            }
                                        >
                                            <Text style={styles.tabTitle}>Cancel</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>

                        <View style={styles.body}>
                            <FlatList
                                data={
                                    this.state.deliveryTabActive ? this.state.deliveringList : 
                                        this.state.historyTabActive ? this.state.historyList : this.state.cancelList
                                }
                                renderItem={this.renderRow}
                                keyExtractor={(item, index) => index.toString()}
                                disableVirtualization={true}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>

                    {/* MODAL RATE */}
                        <ModalRate
                            modalRateVisible={this.state.modalRateVisible}
                            closeModalRate={this.closeModalRate}
                            itemRate={this.state.itemRate}
                            rate={this.rate}
                        />
                    {/* MODAL RATE */}
            </SafeAreaView>
        )
    }
}

