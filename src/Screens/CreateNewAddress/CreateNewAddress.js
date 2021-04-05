import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from "./css";
import { backgroundColorWhite, tomato } from '../../Components/Colors/Color';
import { goBack, navigate } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';
import { fetchLat, loading,fetchLong } from '../../Helpers/Functions';
import Geocoder from 'react-native-geocoder';
import { coordinates } from '../../Constants';
import createAddress from '../../Api/createAddress';
import { checkPhoneValidate } from '../../Helpers/RegularExpression';
import AsyncStorage from '@react-native-community/async-storage';

export default class CreateNewAddress extends Component {

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            city: {},
            district: {},
            ward: {},
            name: '',
            phone: '', 
            address: '',
            region: {},
            specificAddress: '',
            loaded: true,
            editable: true,
            token: this.props.route.params.token
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        if(this._isMounted) {
            const lat = await fetchLat();
            const long = await fetchLong();
            this.getAddress(lat, long)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.loaded != nextState.loaded ||
            this.state.address != nextState.address ||
            this.state.city != nextState.city ||
            this.state.ward != nextState.ward ||
            this.state.district != nextState.district ||
            this.state.region != nextState.region ) {
                return true
            }
        return false
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    getAddress = async(lat, long) => {
        Geocoder.geocodePosition({
            lat: parseFloat(lat), 
            lng: parseFloat(long)
        }).then(res => {
            this.setState({ 
                address: res[0].formattedAddress,
                region: {
                    latitude: parseFloat(lat),
                    longitude: parseFloat(long),
                    latitudeDelta: coordinates.latitudeDelta,
                    longitudeDelta: coordinates.longitudeDelta
                }
            })
        })
        .catch(err => console.log(err))    
    }

    goBack = () => {
        goBack()
    }

    goToCityList = () => {
        this.state.editable && navigate('ListSelection', { 
            type: 'city', 
            title: 'Province/City',
            city: this.state.city,
            getCity: this.getCity 
        })
    }

    goToDistrictList = () => {
        this.state.editable && navigate('ListSelection', { 
            type: 'district', 
            title: 'District',
            district: this.state.district,
            getDistrict: this.getDistrict
        })
    }

    goToWardList = () => {
        this.state.editable && navigate('ListSelection', { 
            type: 'ward', 
            title: 'Ward',
            ward: this.state.ward,
            getWard: this.getWard
        })
    }

    getCity = city => { console.log(city)
        this.setState({ city })
    }

    getDistrict = district => {
        this.setState({ district })
    }

    getWard = ward => {
        this.setState({ ward })
    }

    getAddressFromMapView = (region, address) => {
        this.setState({ 
            address,
            specificAddress: address,
            region,
            editable: false,
            city: {},
            ward: {},
            district: {}
        })
        this.childSpecificAddress.clearOldInput()
    }

    goToMapView = () => {
        navigate('MapViewer', {
            user: this.props.route.params.user,
            address: this.state.address,
            region: this.state.region,
            getAddressFromMapView: this.getAddressFromMapView
        })
    }

    createNewAddress = async() => { console.log('aaaa')
        if(this.state.name == '') {
            Alert.alert('Alert', 'Please enter receiver name')
        }
        else if(this.state.phone == '') {
            Alert.alert('Alert', 'Please enter receiver phone')
        }
        else if(!checkPhoneValidate(this.state.phone) && this.state.phone) {
            Alert.alert('Error !!!', 'Wrong phone number format')
        }
        else {
            if(this.state.editable) {
                var address = this.state.specificAddress + 
                    (this.state.ward.name ? ', ' + this.state.ward.name : '') + 
                    (this.state.district.name ? ', ' + this.state.district.name : '') + 
                    (this.state.city.name ? ', ' + this.state.city.name : '')

                if(address == '') {
                    Alert.alert('Alert', 'Please enter or choose receiver address')
                }
                else {
                    this.convertAddressToCoordinates(address)
                }
            }
            else {
                this.setState({ loaded: false })
                try {
                    const res = await createAddress(
                        this.state.token,
                        this.state.region.latitude,
                        this.state.region.longitude,
                        this.state.address,
                        this.state.name,
                        this.state.phone
                    )
                    if(res.status == 200) {
                        this.setState({ loaded: true })
                        const resp = await res.json()
                        if(resp.code == 200) {        
                            this.props.route.params.refresh()
                            goBack()
                        }
                        else if(resp.code == 225) {
                            Alert.alert('Error !!!', resp.message);
                        }
                        else if(resp.code == 205) {
                            console.log(resp.message)
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
                            {text: 'Try Again', onPress: () => this.createNewAddress()}
                        ]
                    )
                }
            }
        }
    }

    convertAddressToCoordinates = address => {
        this.setState({ loaded: false })
        Geocoder.geocodeAddress(address).then(async(resAdd) => {
            try {
                const res = await createAddress(
                    this.state.token,
                    resAdd[0].position.lat,
                    resAdd[0].position.lng,
                    address,
                    this.state.name,
                    this.state.phone
                )
                if(res.status == 200) {
                    this.setState({ loaded: true })
                    const resp = await res.json()
                    if(resp.code == 200) {        
                        this.props.route.params.refresh()
                        goBack()
                    }
                    else if(resp.code == 225) {
                        Alert.alert('Error !!!', resp.message);
                    }
                    else if(resp.code == 205) {
                        console.log(resp.message)
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
                        {text: 'Try Again', onPress: () => this.createNewAddress()}
                    ]
                )
            }
        })
        .catch(err => {
            console.log(err)
            this.convertAddressToCoordinates(address)
        }) 
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
                {!this.state.loaded ? loading() : null}
                    <KeyboardAvoidingView 
                        style={styles.container}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
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
                                <Text style={styles.headerTitle}>New Address</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>
                    

                        <ScrollView 
                            contentContainerStyle={styles.body}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.row}>
                                <View style={styles.rowLeft}>
                                    <Text style={styles.rowTitle}>Name</Text>
                                </View>
                                <View style={styles.rowRight}>
                                    <Input
                                        placeholder='Name *'
                                        name='name'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={20}
                                        textAlign='right'
                                        nextInput={this.childPhone}
                                        onRef={ref => (this.childName = ref)}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.rowLeft}>
                                    <Text style={styles.rowTitle}>Phone number</Text>
                                </View>
                                <View style={styles.rowRight}>
                                    <Input
                                        placeholder='Phone number *'
                                        name='phone'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={20}
                                        textAlign='right'
                                        keyboardType='phone-pad'
                                        onRef={ref => (this.childPhone = ref)}
                                    />
                                </View>
                            </View>

                            <View style={[styles.row, { paddingVertical: 5 }]}>
                                <View style={styles.rowLeft}>
                                    <Text style={styles.rowTitle}>Province/City</Text>
                                </View>
                                <View style={[styles.rowRight, { alignItems: 'flex-end' }]}>
                                    <TouchableWithoutFeedback onPress={this.goToCityList}>
                                        <View style={styles.selectWrapper}>
                                            <Text style={styles.selectTitle}>
                                                {this.state.city.name && this.state.editable ? this.state.city.name : 'Select Province/City'}
                                            </Text>
                                            <Icon
                                                name='chevron-forward'
                                                size={18}
                                                color='silver'
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>

                            <View style={[styles.row, { paddingVertical: 5 }]}>
                                <View style={styles.rowLeft}>
                                    <Text style={styles.rowTitle}>District</Text>
                                </View>
                                <View style={[styles.rowRight, { alignItems: 'flex-end' }]}>
                                    <TouchableWithoutFeedback onPress={this.goToDistrictList}>
                                        <View style={styles.selectWrapper}>
                                            <Text style={styles.selectTitle}>
                                                {this.state.district.name && this.state.editable ? this.state.district.name : 'Select District'}
                                            </Text>
                                            <Icon
                                                name='chevron-forward'
                                                size={18}
                                                color='silver'
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>

                            <View style={[styles.row, { paddingVertical: 5 }]}>
                                <View style={styles.rowLeft}>
                                    <Text style={styles.rowTitle}>Ward</Text>
                                </View>
                                <View style={[styles.rowRight, { alignItems: 'flex-end' }]}>
                                    <TouchableWithoutFeedback onPress={this.goToWardList}>
                                        <View style={styles.selectWrapper}>
                                            <Text style={styles.selectTitle}>
                                                {this.state.ward.name && this.state.editable ? this.state.ward.name : 'Select Ward'}
                                            </Text>
                                            <Icon
                                                name='chevron-forward'
                                                size={18}
                                                color='silver'
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>

                            <View style={styles.specificAddressWrapper}>
                                <Text style={styles.specificAddressTitle}>Specific address</Text>
                                <Text style={[styles.describe, { marginBottom: 10 }]}>House number, building name, street name,...</Text>
                                <View style={styles.input}>
                                    <Input
                                        placeholder='Enter address...'
                                        name='specificAddress'
                                        setValue={this.setValue}
                                        oldValue={this.state.specificAddress}
                                        editable={this.state.editable}
                                        multiline={false}
                                        hideshowText={false}
                                        width={width - 30 - 40}
                                        btnGroupWidth={30}
                                        length={35}
                                        marginLeft={10}
                                        onRef={ref => (this.childSpecificAddress = ref)}
                                    />
                                </View>
                            </View>
                            
                            <TouchableWithoutFeedback onPress={this.goToMapView}>
                                <View style={styles.searchLocationGroup}>
                                    <View style={styles.searchLocationLeft}>
                                        <Entypo
                                            name='location'
                                            color={tomato}
                                            size={30}
                                        />
                                    </View>
                                    <View style={styles.searchLocationCenter}>
                                        <Text style={styles.selectLocation}>Select the location on the map</Text>
                                        <Text style={styles.describe}>Help the fastest delivery orders</Text>
                                    </View>
                                    <View style={styles.searchLocationRight}>
                                        <Icon
                                            name='chevron-forward'
                                            size={22}
                                            color='silver'
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                            {!this.state.editable ?
                                <View style={styles.showAddressFromMapBox}>
                                    <Text style={styles.showAddressFromMap}>
                                        {this.state.address}
                                    </Text>
                                </View> : null
                            }
                        </ScrollView>

                        <View style={styles.bottom}>
                            <TouchableOpacity 
                                style={styles.createBtn}
                                onPress={this.createNewAddress}
                            >
                                <Text style={styles.createTitle}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>         
            </SafeAreaView>
        )
    }
}

