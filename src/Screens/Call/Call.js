import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, TouchableHighlight } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { tomato, backgroundColorWhite, backgroundColorGrey } from '../../Components/Colors/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { goBack, navigate } from '../../Navigators/Router';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';

export default class Call extends Component {

    _isMounted = false;
    
    constructor(props) {
        super(props);
        this.state = {
            
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
                            <Text style={styles.headerTitle}>Call</Text>
                        </View>
                        <View style={styles.headerRight}>

                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}