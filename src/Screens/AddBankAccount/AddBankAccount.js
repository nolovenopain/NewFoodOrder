import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from "./css";
import { backgroundColorGrey } from '../../Components/Colors/Color';
import { goBack, navigate } from '../../Navigators/Router';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';

export default class AddBankAccount extends Component { 

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            city: {},
            bank: {}
        };
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

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    goToCityList = () => {
        navigate('ListSelection', { 
            type: 'city', 
            title: 'Province/City',
            city: this.state.city,
            getCity: () => this.getCity()
        })
    }

    goToBankList = () => {
        navigate('ListSelection', { 
            type: 'bank', 
            title: 'Bank',
            bank: this.state.bank,
            getBank: () => this.getBank()
        })
    }

    getCity = city => e => {
        this.setState({ city })
    }

    getBank = bank => e => {
        this.setState({ bank })
    }

    addBankAccount = () => {
        
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColorGrey }}>
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
                                <Text style={styles.headerTitle}>Bank Account</Text>
                            </View>
                            <View style={styles.headerRight}>

                            </View>
                        </View>

                        <ScrollView 
                            contentContainerStyle={styles.body}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.title}>Account-holder name</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='account name'
                                        name='accountHolder'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={20}
                                        textAlign='right'
                                        onRef={ref => (this.childAccountHolder = ref)}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.title}>Account number</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='19034458755...'
                                        name='accountHolder'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={20}
                                        textAlign='right'
                                        onRef={ref => (this.childAccountNumber = ref)}
                                    />
                                </View>
                            </View>

                            <TouchableWithoutFeedback onPress={this.goToBankList}>
                                <View style={styles.row}>
                                    <View style={styles.left}>
                                        <Text style={styles.title}>Bank name</Text>
                                    </View>
                                    <View style={[styles.right, { paddingVertical: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }]}>
                                        <Text style={styles.selectTitle}>{this.state.bank.name}</Text>
                                        <Icon
                                            name='chevron-forward'
                                            size={20}
                                            color='gray'
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={this.goToCityList}>
                                <View style={styles.row}>
                                    <View style={styles.left}>
                                        <Text style={styles.title}>Bank location</Text>
                                    </View>
                                    <View style={[styles.right, { paddingVertical: 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }]}>
                                        <Text style={styles.selectTitle}>{this.state.city.name}</Text>
                                        <Icon
                                            name='chevron-forward'
                                            size={20}
                                            color='gray'
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                            <View style={styles.row}>
                                <View style={styles.left}>
                                    <Text style={styles.title}>Branch name</Text>
                                </View>
                                <View style={styles.right}>
                                    <Input
                                        placeholder='Chi nhanh Dong Da'
                                        name='branchName'
                                        setValue={this.setValue}
                                        editable={true}
                                        multiline={false}
                                        hideshowText={false}
                                        width={(width - 30) / 2}
                                        length={20}
                                        textAlign='right'
                                        onRef={ref => (this.childBranchName = ref)}
                                    />
                                </View>
                            </View>
                        </ScrollView>

                        <View style={styles.bottom}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={this.addBankAccount}
                            >
                                <Text style={styles.btnTitle}>Add account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </SafeAreaView>
        )
    }
}