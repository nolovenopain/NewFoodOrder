import React, { Component } from 'react';
import { View, Text, StatusBar, SafeAreaView, TouchableWithoutFeedback, FlatList, Platform, Linking, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { backgroundColorWhite, tomato } from '../../Components/Colors/Color';
import { goBack, navigate } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import ModalNote from '../../Modals/ModalNote/ModalNote';
import { coordinates } from '../../Constants';
import AsyncStorage from '@react-native-community/async-storage';

export default class MyCart extends Component {

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: coordinates.latitudeDelta,
                longitudeDelta: coordinates.longitudeDelta,
            },
            orderPayment: 0,
            shippingFee: 0,
            totalPayment: 0,
            payByCash: true,
            modalNoteVisible: false,
            note: ''
        };
    }

    componentDidMount() {
        var orderPayment = 0;
        this.props.route.params.orderList.map((value, key) => {
            orderPayment = orderPayment + value.price * value.orderAmount
        })

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
                        loaded: true,
                        orderPayment,
                        totalPayment: orderPayment + this.state.shippingFee
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
                { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000 }
            );
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderHeader = () => {
        return (
            <View style={styles.bodyHeader}>
                <View style={styles.bodyHeaderTop}>
                    <View style={styles.bodyHeaderTopLeft}>
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
                    </View>
                    <View style={styles.bodyHeaderTopCenter}>
                        <Text 
                            style={styles.receiver}
                            numberOfLines={1}
                        >
                            Suusoft
                        </Text>
                        <Text style={styles.phone}>098 686 8686</Text>
                        <Text 
                            style={styles.address}
                            numberOfLines={2}
                        >
                            88 ngo 78 Nguyen Hoang, Nam Tu Liem, Ha Noi
                        </Text>
                    </View>
                    <View style={styles.bodyHeaderTopRight}>
                        <TouchableWithoutFeedback onPress={this.goToDeliveryAddress}>
                            <Text style={styles.editAddress}>Edit</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View style={styles.bodyHeaderBottom}>
                    <Text style={styles.storeName}>Bakery - Bong lan trung muoi & do uong online</Text>
                </View>
            </View> 
        )
    }

    renderRow = ({ item, index }) => {
        return (
            <View style={styles.elementWrapper}>
                <View style={styles.elementLeft}>
                    <Image
                        style={styles.orderImage}
                        source={item.imgSrc}
                    />
                </View>
                <View style={styles.elementRight}>
                    <Text 
                        style={styles.orderName}
                        numberOfLines={1}
                    >
                        {item.orderAmount + ' x ' + item.name}
                    </Text>
                    <Text 
                        style={styles.orderPrice}
                        numberOfLines={1}
                    >
                        {item.orderAmount * item.price}
                    </Text>
                </View>
            </View> 
        )
    }

    renderFooter = () => {
        return (
            <View style={styles.footer}>
                <View style={styles.footerRow}>
                    <View style={styles.footerRowLeft}>
                        <Text style={styles.footerRowLeftTitle}>
                            {'Subtotal (' + this.props.route.params.orderList.length + (this.props.route.params.orderList.length > 0 ? ' items)' : ' item)')}
                        </Text>
                    </View>
                    <View style={[styles.footerRowRight, { paddingRight: 10 }]}>
                        <Text style={styles.footerRowRightText}>{this.state.orderPayment}</Text>
                    </View>
                </View>

                <View style={styles.footerRow}>
                    <View style={styles.footerRowLeft}>
                        <Text style={styles.footerRowLeftTitle}>Shipping Fee</Text>
                    </View>
                    <View style={[styles.footerRowRight, { paddingRight: 10 }]}>
                        <Text style={styles.footerRowRightText}>0</Text>
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={this.openModalNote}>
                    <View style={styles.footerRow}>
                        <View style={styles.footerRowLeft}>
                            <Text style={styles.footerRowLeftTitle}>Note</Text>
                        </View>
                        <View style={[styles.footerRowRight, { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }]}>
                            <Text
                                style={styles.note}
                                numberOfLines={1}
                            >
                                {this.state.note}
                            </Text>
                            <Icon
                                name='chevron-forward'
                                color='silver'
                                size={25}
                                style={{ marginLeft: 5 }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
               

                <View style={[styles.footerRow, { marginBottom: 20 }]}>
                    <View style={styles.footerRowLeft}>
                        <Text style={styles.totalPaymentTitle}>Total</Text>
                    </View>
                    <View style={[styles.footerRowRight, { paddingRight: 10 }]}>
                        <Text style={styles.totalPaymentAmount}>{this.state.totalPayment}</Text>
                    </View>
                </View>
            </View> 
        )
    }

    goBack = () => {
        goBack()
    }

    goToDeliveryAddress = () => {
        navigate('DeliveryAddress')
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

    openModalNote = () => {
        this.setState({ modalNoteVisible: true })
    }

    closeModalNote = () => {
        this.setState({ modalNoteVisible: false })
    }

    getNote = note => {
        this.setState({ note })
    }

    payByCard = () => {
        this.setState({ payByCash: false })
        navigate('BankCard')
    }

    payByCash = () => {
        this.setState({ payByCash: true })
    }

    submitOrder = () => {
        navigate('Tracking', { orderList: this.props.route.params.orderList })
    }

    render() { console.log('aaaa')
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                { !this.state.loaded ? loading() : null }
                    <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
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
                                <Text style={styles.headerTitle}>My Cart</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <View style={styles.body}>
                            <FlatList
                                data={this.props.route.params.orderList}
                                renderItem={this.renderRow}
                                keyExtractor={(item, index) => index.toString()}
                                ListHeaderComponent={this.renderHeader}
                                ListFooterComponent={this.renderFooter}
                                disableVirtualization={true}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                        
                        <View style={styles.bottom}>
                            <View style={styles.btnGroup}>
                                <TouchableWithoutFeedback onPress={this.payByCard}>
                                    <View 
                                        style={
                                            [
                                                styles.cardWrapper,
                                                { backgroundColor: this.state.payByCash ? tomato : backgroundColorWhite }
                                            ]
                                        }
                                    >
                                        <Icon
                                            name='card-outline'
                                            size={20}
                                            color={this.state.payByCash ? '#fff' : '#000'}
                                        />
                                        <Text 
                                            style={
                                                [
                                                    styles.btnTitle,
                                                    { color: this.state.payByCash ? '#fff' : '#000' }
                                                ]
                                            }
                                        >
                                            Card
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={this.payByCash}>
                                    <View 
                                        style={
                                            [
                                                styles.cashWrapper,
                                                { backgroundColor: this.state.payByCash ? backgroundColorWhite : tomato }
                                            ]
                                        }
                                    >
                                        <Icon
                                            name='cash-outline'
                                            size={20}
                                            color={this.state.payByCash ? '#000' : '#fff'}
                                        />
                                        <Text 
                                            style={
                                                [
                                                    styles.btnTitle,
                                                    { color: this.state.payByCash ? '#000' : '#fff' }
                                                ]
                                            }
                                        >
                                            Cash
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <TouchableOpacity 
                                style={styles.submitBtn}
                                onPress={this.submitOrder}
                            >
                                <Text style={styles.submitTitle}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* MODAL NOTE */}
                        <ModalNote
                            modalNoteVisible={this.state.modalNoteVisible}
                            closeModalNote={this.closeModalNote}
                            note={this.state.note}
                            getNote={this.getNote}
                        />
                    {/* MODAL NOTE */}
            </SafeAreaView>
        )
    }
}

