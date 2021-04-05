import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native';
import { loading } from '../../Helpers/Functions';
import { styles } from "./css";
import { tomato, backgroundColorWhite } from '../../Components/Colors/Color';
import { goBack } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

export default class ListSelection extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            cityList: [
                {id: 1, name: 'Hà Nam', value: false},
                {id: 2, name: 'Hà Nội', value: false},
                {id: 3, name: 'Bắc Kạn', value: false},
                {id: 4, name: 'Bắc Ninh', value: false},
                {id: 5, name: 'Cần Thơ', value: false},
                {id: 6, name: 'Thanh Hóa', value: false}
            ],
            districtList: [
                {id: 1, name: 'Hà Nam', value: false},
                {id: 2, name: 'Hà Nội', value: false},
                {id: 3, name: 'Bắc Kạn', value: false},
                {id: 4, name: 'Bắc Ninh', value: false},
                {id: 5, name: 'Cần Thơ', value: false},
                {id: 6, name: 'Thanh Hóa', value: false}
            ],
            wardList: [

            ],
            bankList: [
                {id: 1, name: 'ABBank - NTHMCP An Bình', value: false},
                {id: 2, name: 'ABN - AMRO Bank', value: false},
                {id: 3, name: 'BIDV - NH Dau tu & Phat trien Viet Nam', value: false},
                {id: 4, name: 'Bangkok Bank', value: false},
                {id: 5, name: 'Citybank (HCM)', value: false},
                {id: 6, name: 'Techcombank - NHTMCP Ky thuong VN', value: false}
            ]
        };
    }

    componentDidMount() {
        var list = [];
        this._isMounted = true
        setTimeout(() => {
            if(this.props.route.params.type == 'city' && Object.keys(this.props.route.params.city).length != 0) {
                this.state.cityList.map((value, key) => {
                    if(value.id == this.props.route.params.city.id) {
                        value.value = true
                    }
                    else {
                        value.value = false
                    }
                    list.push(value)
                })
                this._isMounted && this.setState({ cityList: list, loaded: true })
            }
            else if(this.props.route.params.type == 'district' && Object.keys(this.props.route.params.district).length != 0) {
                this.state.districtList.map((value, key) => {
                    if(value.id == this.props.route.params.district.id) {
                        value.value = true
                    }
                    else {
                        value.value = false
                    }
                    list.push(value)
                })
                this._isMounted && this.setState({ districtList: list, loaded: true })
            }
            else if(this.props.route.params.type == 'ward' && Object.keys(this.props.route.params.ward).length != 0) {
                this.state.wardList.map((value, key) => {
                    if(value.id == this.props.route.params.ward.id) {
                        value.value = true
                    }
                    else {
                        value.value = false
                    }
                    list.push(value)
                })
                this._isMounted && this.setState({ wardList: list, loaded: true })
            }
            else if(this.props.route.params.type == 'bank' && Object.keys(this.props.route.params.bank).length != 0) {
                this.state.bankList.map((value, key) => {
                    if(value.id == this.props.route.params.bank.id) {
                        value.value = true
                    }
                    else {
                        value.value = false
                    }
                    list.push(value)
                })
                this._isMounted && this.setState({ bankList: list, loaded: true })
            }
            else {
                this._isMounted && this.setState({ loaded: true });
            }      
        }, 500);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    renderRow = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={this.select(item)}>
                <View style={styles.bodyElement}>
                    <View style={styles.bodyElementInside}>
                        <View style={styles.elementLeft}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                        <View style={styles.elementRight}>
                            {item.value ? 
                                <Icon
                                    name='checkmark'
                                    color={tomato}
                                    size={20}
                                /> : null
                            }
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    goBack = () => {
        goBack()
    }

    select = item => e => {
        var list = [];
        if(this.props.route.params.type == 'city') {
            this.state.cityList.map((value, key) => {
                if(value.id == item.id) {
                    value.value = true
                }
                else {
                    value.value = false
                }
                list.push(value)
            })
            this.setState({ cityList: list })
            this.props.route.params.getCity(item)
            goBack()
        }
        else if (this.props.route.params.type == 'district') {
            this.state.districtList.map((value, key) => {
                if(value.id == item.id) {
                    value.value = true
                }
                else {
                    value.value = false
                }
                list.push(value)
            })
            this.setState({ districtList: list })
            this.props.route.params.getDistrict(item)
            goBack()
        }
        else if (this.props.route.params.type == 'ward') {
            this.state.wardList.map((value, key) => {
                if(value.id == item.id) {
                    value.value = true
                }
                else {
                    value.value = false
                }
                list.push(value)
            })
            this.setState({ wardList: list })
            this.props.route.params.getWard(item)
            goBack()
        }
        else if (this.props.route.params.type == 'bank') {
            this.state.bankList.map((value, key) => {
                if(value.id == item.id) {
                    value.value = true
                }
                else {
                    value.value = false
                }
                list.push(value)
            })
            this.setState({ bankList: list })
            this.props.route.params.getBank(item)
            goBack()
        }
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
                                <Text style={styles.headerTitle}>{this.props.route.params.title}</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <View style={styles.body}>
                            <FlatList
                                data={
                                    this.props.route.params.type == 'city' ? 
                                        this.state.cityList : (this.props.route.params.type == 'district' ? 
                                            this.state.districtList : (this.props.route.params.type == 'ward' ? this.state.wardList : this.state.bankList))
                                }
                                renderItem={this.renderRow}
                                keyExtractor={(item, index) => index.toString()}
                                disableVirtualization={true}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
            </SafeAreaView>
        )
    }
}

