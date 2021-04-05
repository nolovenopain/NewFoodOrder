/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import InitNavigation from './src/Navigators/InitNavigation';
import NetInfo from "@react-native-community/netinfo";
import ModalInternetConnection from './src/Modals/ModalInternetConnection/ModalInternetConnection';
import { loading, requestLocationPermission } from './src/Helpers/Functions';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';

export default class App extends Component {

	_isMounted = false;
	
	constructor(props) {
		super(props);
		this.state = {
			modalInternetConnectionVisible: false,
			getCurrentLocationSuccess: false
		};
	}

	componentDidMount() {
		this._isMounted = true;
		if(this._isMounted) {
			requestLocationPermission();
			this.getPosition()
			NetInfo.addEventListener(async(state) => {
				this.setState({ modalInternetConnectionVisible: !state.isInternetReachable })
			})
		}
	}

	componentWillUnmount() {
        this._isMounted = false;
	}
	
	getPosition = () => {
        Geolocation.getCurrentPosition(
            async(position) => {
                AsyncStorage.setItem('lat', position.coords.latitude.toString())
				AsyncStorage.setItem('long', position.coords.longitude.toString())
				this.setState({ getCurrentLocationSuccess: true })
            },
            (error) => {
                // See error code charts below.
				console.log(error.code, error.message);
				this.getPosition()
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
        );
    }

	openModalInternetConnection = () => {
        this.setState({ modalInternetConnectionVisible: true })
    }

    closeModalInternetConnection = () => {
        this.setState({ modalInternetConnectionVisible: false })
    }

	render() {
		return (
			<>
				<StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
				{this.state.getCurrentLocationSuccess ? 
					<InitNavigation/> : loading()
				}
				{/* MODAL INTERNET CONNECTION */}
					<ModalInternetConnection
						modalInternetConnectionVisible={this.state.modalInternetConnectionVisible}
						closeModalInternetConnection={this.closeModalInternetConnection}
					/>
                {/* MODAL INTERNET CONNECTION */}
			</>
		);
	}  
}
