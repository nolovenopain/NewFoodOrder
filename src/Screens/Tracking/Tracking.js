import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, TouchableHighlight } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { tomato, backgroundColorWhite } from '../../Components/Colors/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { goBack, navigate } from '../../Navigators/Router';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { coordinates } from '../../Constants';
import AsyncStorage from '@react-native-community/async-storage';

export default class Tracking extends Component {

    _isMounted = false

    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            initialRegion: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: coordinates.latitudeDelta,
                longitudeDelta: coordinates.longitudeDelta,
            },
            coords: []
        }
    }

    componentDidMount() {
        this._isMounted = true
        this._isMounted && Geolocation.getCurrentPosition(
            (position) => {
                this.setState({ 
                    initialRegion: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: coordinate.latitudeDelta,
                        longitudeDelta: coordinate.longitudeDelta,
                    },
                }, 
                    // () => this.fetchInitialRoute()
                )
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
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    fetchInitialRoute = async() => {
        const startLoc = this.state.initialRegion.latitude + ', ' + this.state.initialRegion.longitude
        const destinationLoc = '21.01985470011069, 105.80912471557147'
        try {
            const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&mode=${'walking'}`)
            const respJson = await resp.json()
            console.log(respJson)
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points)
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({ coords })
        }
        catch(error) {
            console.log('error', error)
        }
    }

    goBack = () => {
        goBack()
    }
    
    goToChat = () => {
        navigate('Chat')
    }

    goToCall = () => {
        navigate('Call')
    }

    cancel = () => {
        navigate('Home')
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        region={this.state.initialRegion}
                        onRegionChangeComplete={this.onRegionChange}
                        style={styles.bgGeoLocationWrapper}                        
                    >
                        <Marker
                            coordinate={{
                                latitude: this.state.initialRegion.latitude,
                                longitude: this.state.initialRegion.longitude
                            }}
                        />  
                        <Polyline
                            coordinates={this.state.coords}
                            strokeColor={tomato}
                            strokeWidth={1}
                        />      
                    </MapView>

                    <View style={styles.back}>
                        <TouchableWithoutFeedback onPress={this.goBack}>
                            <Icon
                                name='chevron-back'
                                size={30}
                            />
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={styles.bottom}>
                        <View style={styles.borderTop}>
                            <Image
                                style={styles.avatar}
                                source={require('../../Assets/Images/avatar.jpg')}
                            />
                            <View style={styles.borderTopCenter}>
                                <Text style={styles.driverName}>Micheal</Text>
                                <View style={styles.evaluation}>
                                    <Icon
                                        name='star'
                                        size={18}
                                        color='gold'
                                    />
                                    <View style={{ height: 18 }}>
                                        <Text style={styles.evaluate}>4.7</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableHighlight 
                                style={styles.btn}
                                underlayColor='whitesmoke'
                                onPress={this.goToChat}
                            >
                                <AntDesign
                                    name='wechat'
                                    size={25}
                                    color={tomato}
                                />
                            </TouchableHighlight>
                            <TouchableHighlight 
                                style={[styles.btn, { marginLeft: 10 }]}
                                underlayColor='whitesmoke'
                                onPress={this.goToCall}
                            >
                                <Icon
                                    name='call'
                                    size={25}
                                    color={tomato}
                                />
                            </TouchableHighlight>
                        </View>
                        <View style={styles.borderBottomWrapper}>
                            <View style={styles.borderBottom}>
                                <View style={styles.borderBottomInside}>
                                    <View style={styles.borderBottomLeft}>
                                        <View style={styles.locWrapper}>
                                            <FontAwesome5
                                                name='store'
                                                color={tomato}
                                                size={16}
                                            />
                                        </View>
                                        <Entypo
                                            name='dot-single'
                                            color={tomato}
                                            size={15}
                                        />
                                        <Entypo
                                            name='dot-single'
                                            color={tomato}
                                            size={15}
                                        />
                                        <Entypo
                                            name='dot-single'
                                            color={tomato}
                                            size={15}
                                        />
                                        <View style={styles.locWrapper}>
                                            <Feather
                                                name='user'
                                                color={tomato}
                                                size={18}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.borderBottomRight}>
                                        <View styles={styles.startLoc}>
                                            <Text style={styles.address}>78 Nguyen Hoang, Q. Nam Tu Liem, Ha Noi</Text>
                                            <Text style={styles.phone}>Suusoft (+84) 358296686</Text>
                                        </View>
                                        <View style={{ height: 30 }}></View>
                                        <View styles={styles.endLoc}>
                                            <Text style={styles.address}>78 Nguyen Hoang, Q. Nam Tu Liem, Ha Noi</Text>
                                            <Text style={styles.phone}>Suusoft (+84) 358296686</Text>
                                        </View>
                                    </View>
                                </View>  

                                <TouchableWithoutFeedback onPress={this.cancel}>
                                    <View style={styles.cancelBtn}>
                                        <Text style={styles.cancel}>Cancel</Text>
                                    </View>
                                </TouchableWithoutFeedback>                            
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}