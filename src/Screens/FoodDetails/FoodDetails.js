import React, { Component } from 'react';
import { View, Text, SafeAreaView, ImageBackground, TouchableWithoutFeedback, StatusBar, ScrollView } from 'react-native';
import { styles } from "./css";
import { tomato, backgroundColorWhite } from '../../Components/Colors/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack, navigate } from '../../Navigators/Router';
import ModalShowImage from '../../Modals/ModalShowImage/ModalShowImage';
import ModalCart from '../../Modals/ModalCart/ModalCart';
import BottomSheetOrder from '../../Components/BottomSheetOrder/BottomSheetOrder';
import { height } from '../../Components/Dimensions/Dimensions';
import AsyncStorage from '@react-native-community/async-storage';

export default class FoodDetails extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            food: this.props.route.params.food,
            modalShowImageVisible: false,
            modalCartVisible: false,
            orderList: this.props.route.params.orderList
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    goBack = () => {
        goBack()
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

    minusAmount = item => e => {
        var food = this.state.food
        food.orderAmount--

        var orderList = []
        this.state.orderList.map((value, key) => {
            if(value.id == food.id) {
                if(value.orderAmount > 1) {
                    value.orderAmount--
                    orderList.push(value)
                }
            }
            else {
                orderList.push(value)
            }
        })
        this.setState({ 
            food,
            orderList 
        })
        this.props.route.params.minusAmount(item)
    }
    
    plusAmount = item => e => {
        var food = this.state.food
        food.orderAmount++

        var orderList = []
        var exist = false
        this.state.orderList.map((value, key) => {
            if(value.id == food.id) {
                value.orderAmount++
                exist = true
            }
            orderList.push(value)
        })
        if(!exist) {
            orderList.push(food)
        }
        this.setState({ 
            food,
            orderList 
        })
        this.props.route.params.plusAmount(item)
    }

    openModalCart = () => {
        this.setState({ modalCartVisible: true })
    }

    closeModalCart = () => {
        this.setState({ modalCartVisible: false })
    }

    goToCart = () => { 
        if(this.state.orderList.length > 0) {
            navigate('MyCart', { orderList: this.state.orderList })
        }  
    }

    backDataOrderListFromModalCart = (item, orderList) => e => { 
        this.props.route.params.backDataOrderListFromModalCart(orderList)
    }

    render() { 
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
                    <ScrollView 
                        contentContainerStyle={styles.container}
                        showsVerticalScrollIndicator={false}
                    >
                        <TouchableWithoutFeedback onPress={this.openModalShowImage(this.state.food.imgSrc)}>
                            <ImageBackground
                                style={styles.image}
                                source={this.state.food.imgSrc}
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
                                        
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                        
                        <View style={styles.body}>
                            <View style={styles.foodNameRow}>
                                <Text style={styles.foodName}>{this.state.food.name}</Text>
                            </View>

                            <View style={styles.priceRow}>
                                <View style={styles.rowLeft}>
                                    <Text style={styles.price}>{this.state.food.price}</Text>
                                </View>
                                <View style={styles.rowRight}>
                                    <View style={styles.removeAddGroup}>
                                        {this.state.food.orderAmount > 0 ? 
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableWithoutFeedback onPress={this.minusAmount(this.state.food)}>
                                                    <Icon
                                                        name='remove-circle-outline'
                                                        size={25}
                                                        color='silver'
                                                    />
                                                </TouchableWithoutFeedback>
                                                <View style={styles.showAmount}>
                                                    <Text style={styles.amount}>{this.state.food.orderAmount}</Text>
                                                </View>
                                            </View> : null
                                        }
                                        <TouchableWithoutFeedback onPress={this.plusAmount(this.state.food)}>
                                            <Icon
                                                name='add-circle'
                                                size={25}
                                                color={tomato}
                                            />
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.describeWrapper}>
                                <Text style={styles.describe}>
                                    Do nhu cầu vui chơi giải trí ngày càng tăng, nên xu hướng kinh doanh quán cafe ngày càng phát triển. Nên ngoài việc cần tạo phong cách riêng biệt cho quán cafe, hay làm bảng hiệu quán cà phê đẹp. Thì việc đặt tên quán cà phê hay và ý nghĩa cũng góp phần không nhỏ trong phát triển bền vững cho quán.
                                </Text>
                            </View>
                        </View>
                    </ScrollView>

                {/* CART BOTTOM */}
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
                    </TouchableWithoutFeedback>
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
                        imgSrcShow={this.state.food.imgSrc}
                    />
                </View>
            {/* MODAL SHOW IMAGE*/}
            </SafeAreaView>
        )
    }
}