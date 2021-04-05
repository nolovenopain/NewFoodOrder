import React, { Component } from 'react';
import { View, SafeAreaView, Modal, TouchableWithoutFeedback, Text } from 'react-native';
import { styles } from "./css";
import Icon from 'react-native-vector-icons/Ionicons';
import { tomato } from '../../Components/Colors/Color';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ModalChangeArrivalTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        
    }

    closeModal = () => {
        this.props.closeModalChangeArrivalTime()
    }

    chooseDeliveryNow = () => {
        this.props.chooseDeliveryNow()
        this.props.closeModalChangeArrivalTime()
    }

    chooseAppointmentDelivery = () => {
        this.props.chooseAppointmentDelivery()
        this.props.closeModalChangeArrivalTime()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Modal
                    animationType='fade' 
                    transparent={true}
                    visible={this.props.modalChangeArrivalTimeVisible}
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
                                            <Text style={styles.modalHeaderTitle}>Arrival Time</Text>
                                        </View>
                                        <View style={styles.modalHeaderRight}>
                                            
                                        </View>
                                    </View>

                                    <View style={styles.modalBody}>
                                        <View style={styles.row}>
                                            <TouchableWithoutFeedback onPress={this.chooseDeliveryNow}>
                                                <View style={styles.rowInside}>
                                                    <MaterialCommunityIcon
                                                        name={this.props.deliveryNow ? 'check-circle' : 'checkbox-blank-circle-outline'}
                                                        size={30}
                                                        color={this.props.deliveryNow ? tomato : 'silver'}
                                                    />
                                                    <Text style={styles.rowTitle}>Now</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>

                                        <View style={styles.row}>
                                            <TouchableWithoutFeedback onPress={this.chooseAppointmentDelivery}>
                                                <View style={styles.rowInside}>
                                                    <MaterialCommunityIcon
                                                        name={!this.props.deliveryNow ? 'check-circle' : 'checkbox-blank-circle-outline'}
                                                        size={30}
                                                        color={!this.props.deliveryNow ? tomato : 'silver'}
                                                    />
                                                    <Text style={styles.rowTitle}>Appointment Delivery</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
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

