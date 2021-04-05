import React, { Component } from 'react';
import { View, SafeAreaView, Modal, TouchableWithoutFeedback, Text, FlatList, Alert } from 'react-native';
import { styles } from "./css";
import Icon from 'react-native-vector-icons/Ionicons';
import { tomato } from '../../Components/Colors/Color';

export default class ModalCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: []
        };
    }

    componentDidMount() {
        
    }

    UNSAFE_componentWillReceiveProps() {
        this.setState({ orderList: this.props.orderList })
    }

    closeModal = () => {
        this.props.closeModalCart()
    }

    renderRow = ({ item, index }) => {
        return (
            <View style={styles.element}>
                <View style={styles.elementLeft}>
                    <Text 
                        style={styles.orderName}
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>
                    <Text 
                        style={styles.orderDescribe}
                        numberOfLines={1}
                    >
                        {item.describe}
                    </Text>
                    <Text 
                        style={styles.orderPrice}
                        numberOfLines={1}
                    >
                        {item.price * item.orderAmount}
                    </Text>
                </View>
                <View style={styles.elementRight}>
                    <TouchableWithoutFeedback onPress={this.minusAmount(item)}>
                        <Icon
                            name='remove-circle'
                            size={25}
                            color={tomato}
                        />
                    </TouchableWithoutFeedback>
                    <View style={styles.showAmount}>
                        <Text style={styles.amount}>{item.orderAmount}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={this.plusAmount(item)}>
                        <Icon
                            name='add-circle'
                            size={25}
                            color={tomato}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }

    plusAmount = item => e => {
        var orderList = [];
        this.state.orderList.map((value, key) => {
            if(value.id == item.id) {
                value.orderAmount++
                item.orderAmount++
            }
            orderList.push(value)
        })
        this.setState({ orderList })
        this.props.backDataOrderListFromModalCart(item, orderList)
    }

    minusAmount = item => e => {
        var orderList = []
        this.state.orderList.map((value, key) => {
            if(value.id == item.id) {
                if(value.orderAmount > 1) {
                    value.orderAmount--
                    item.orderAmount--
                    orderList.push(value)
                }
            }
            else {
                orderList.push(value)
            }
        })   
        this.setState({ orderList })
        this.props.backDataOrderListFromModalCart(item, orderList)
    }

    clearList = () => {
        Alert.alert(
            'Delete all',
            'Are you sure to delete all orders ?',
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Delete All', onPress: () => {
                    this.setState({ orderList: [] })
                    this.props.backDataOrderListFromModalCart({}, [])
                    this.closeModal()
                }}
            ],
            {cancelable: true}
        )   
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Modal
                    animationType='slide' 
                    transparent={true}
                    visible={this.props.modalCartVisible}
                    statusBarTranslucent={true}
                    onRequestClose={this.closeModal}
                >
                    <TouchableWithoutFeedback onPress={this.closeModal}>
                        <View style={styles.modalWrapper}>
                            <TouchableWithoutFeedback onPress={() => {}}>
                                <View style={styles.modalContent}>
                                    <View style={styles.modalHeader}>
                                        <View style={styles.modalHeaderLeft}>
                                            <TouchableWithoutFeedback onPress={this.closeModal}>
                                                <Icon
                                                    name='close-circle'
                                                    size={30}
                                                    color={tomato}
                                                />
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <View style={styles.modalHeaderCenter}>
                                            <Text style={styles.modalHeaderTitle}>My Cart</Text>
                                        </View>
                                        <View style={styles.modalHeaderRight}>
                                            <TouchableWithoutFeedback onPress={this.clearList}>
                                                <Text style={styles.clearList}>Clear all</Text>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>

                                    <View style={styles.modalBody}>
                                        <FlatList
                                            data={this.state.orderList}
                                            renderItem={this.renderRow}
                                            keyExtractor={(item, index) => index.toString()}
                                            disableVirtualization={true}
                                            showsVerticalScrollIndicator={false}
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </SafeAreaView>
        )
    }
}

