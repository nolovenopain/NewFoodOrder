import React, { Component } from 'react';
import { View, SafeAreaView, Modal, TouchableWithoutFeedback, Text, TouchableHighlight } from 'react-native';
import { styles } from "./css";
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class ModalRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate1star: false,
            rate2star: false,
            rate3star: false,
            rate4star: false,
            rate5star: false
        };
    }

    UNSAFE_componentWillReceiveProps() {
        this.setState({
            rate1star: false,
            rate2star: false,
            rate3star: false,
            rate4star: false,
            rate5star: false
        })
    }

    componentDidMount() {
        
    }

    closeModal = () => {
        this.props.closeModalRate()
    }

    press1star = () => {
        this.setState({ 
            rate1star: true,
            rate2star: false,
            rate3star: false,
            rate4star: false,
            rate5star: false 
        })
    }

    press2star = () => {
        this.setState({ 
            rate1star: true,
            rate2star: true,
            rate3star: false,
            rate4star: false,
            rate5star: false 
        })
    }

    press3star = () => {
        this.setState({ 
            rate1star: true,
            rate2star: true,
            rate3star: true,
            rate4star: false,
            rate5star: false 
        })
    }

    press4star = () => {
        this.setState({ 
            rate1star: true,
            rate2star: true,
            rate3star: true,
            rate4star: true,
            rate5star: false 
        })
    }

    press5star = () => {
        this.setState({ 
            rate1star: true,
            rate2star: true,
            rate3star: true,
            rate4star: true,
            rate5star: true 
        })
    }

    default = () => {
        this.setState({ 
            rate1star: false,
            rate2star: false,
            rate3star: false,
            rate4star: false,
            rate5star: false 
        })
        this.closeModal()
    }

    rate = () => {
        this.props.rate(this.props.itemRate)
        this.closeModal()
    }

    render() {
        return (
            <Modal
                animationType='fade' 
                transparent={true}
                visible={this.props.modalRateVisible}
                statusBarTranslucent={true}
                onRequestClose={this.closeModal}
            >
                <TouchableWithoutFeedback onPress={this.closeModal}>
                    <View style={styles.modalWrapper}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.modalContent}>
                                <Text style={styles.rate}>Rate</Text>
                                <View style={styles.starGroup}>
                                    <TouchableWithoutFeedback onPress={this.press1star}>
                                        {!this.state.rate1star ?
                                            <AntDesign
                                                name='staro'
                                                size={25}
                                                color='yellow'
                                                style={{ marginRight: 5 }}
                                            />
                                            :
                                            <AntDesign
                                                name='star'
                                                size={25}
                                                color='yellow'
                                                style={{ marginRight: 5 }}
                                            />
                                        }
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={this.press2star}>
                                        {!this.state.rate2star ?
                                            <AntDesign
                                                name='staro'
                                                size={25}
                                                color='yellow'
                                                style={{ paddingHorizontal: 5 }}
                                            />
                                            :
                                            <AntDesign
                                                name='star'
                                                size={25}
                                                color='yellow'
                                                style={{ paddingHorizontal: 5 }}
                                            />
                                        }
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={this.press3star}>
                                        {!this.state.rate3star ?
                                            <AntDesign
                                                name='staro'
                                                size={25}
                                                color='yellow'
                                                style={{ paddingHorizontal: 5 }}
                                            />
                                            :
                                            <AntDesign
                                                name='star'
                                                size={25}
                                                color='yellow'
                                                style={{ paddingHorizontal: 5 }}
                                            />
                                        }
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={this.press4star}>
                                        {!this.state.rate4star ?
                                            <AntDesign
                                                name='staro'
                                                size={25}
                                                color='yellow'
                                                style={{ paddingHorizontal: 5 }}
                                            />
                                            :
                                            <AntDesign
                                                name='star'
                                                size={25}
                                                color='yellow'
                                                style={{ paddingHorizontal: 5 }}
                                            />
                                        }
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={this.press5star}>
                                        {!this.state.rate5star ?
                                            <AntDesign
                                                name='staro'
                                                size={25}
                                                color='yellow'
                                                style={{ marginLeft: 5 }}
                                            />
                                            :
                                            <AntDesign
                                                name='star'
                                                size={25}
                                                color='yellow'
                                                style={{ marginLeft: 5 }}
                                            />
                                        }
                                    </TouchableWithoutFeedback>
                                </View>

                                <View style={styles.bottomGroup}>
                                    <TouchableHighlight
                                        underlayColor='whitesmoke'
                                        style={styles.defaultBtn}
                                        onPress={this.default}
                                    >
                                        <Text style={styles.btnTitle}>Default</Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        underlayColor='whitesmoke'
                                        style={styles.rateBtn}
                                        onPress={this.rate}
                                    >
                                        <Text style={styles.btnTitle}>Rate</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

