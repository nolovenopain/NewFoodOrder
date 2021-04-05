import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { goBack } from '../../Navigators/Router';
import { backgroundColorWhite } from '../../Components/Colors/Color';
import { styles } from './css';
import Geocoder from 'react-native-geocoder';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MapViewer extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            region: this.props.route.params.region,
            searchKey: '',
            address: this.props.route.params.address
        };
    }
    
    async componentDidMount() {
        this._isMounted = true 
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    search = () => {

    }

    goBack = () => {
        goBack()
    }

    onRegionChangeComplete = region => {
        Geocoder.geocodePosition({
            lat: region.latitude, 
            lng: region.longitude
        }).then(res => {
            this.setState({ 
                address: res[0].formattedAddress,
                region
            })
        })
        .catch(err => console.log(err)) 
    }

    chooseAddress = () => {
        this.props.route.params.getAddressFromMapView(this.state.region, this.state.address)
        goBack()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorWhite }}>
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
                            <Text style={styles.headerTitle}>Choose Address</Text>
                        </View>
                        <View style={styles.headerRight}>

                        </View>
                    </View>

                    <View style={styles.addressBox}>
                        {/* <View style={styles.iconBox}>
                            <Icon
                                name='search'
                                size={25}
                                color='silver'
                            />
                        </View>
                        <SearchBar
                            placeholder='Enter address...'
                            width={width - 75}
                            setValue={this.setValue}
                            name='searchKey'
                            search={this.search}
                            onRef={ref => (this.childSearch = ref)}
                        /> */}
                        <Text 
                            style={styles.address}
                            numberOfLines={1}
                        >
                            {this.state.address}
                        </Text>
                    </View>
                    
                    <View style={styles.body}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            region={this.state.region}
                            onRegionChangeComplete={this.onRegionChangeComplete}
                            style={styles.mapView}  
                            showsUserLocation={true}                      
                        />
                        <View style={styles.markerWrapper}>
                            <View style={styles.marker}>
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: this.props.route.params.user.avatar }}
                                />
                            </View>
                            <View style={styles.triangle}></View>
                        </View>
                        <View style={styles.btnWrapper}>
                            <TouchableOpacity 
                                style={styles.btn}
                                onPress={this.chooseAddress}
                            >
                                <Text style={styles.btnTitle}>Choose this address</Text>
                            </TouchableOpacity>   
                        </View>
                      
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
