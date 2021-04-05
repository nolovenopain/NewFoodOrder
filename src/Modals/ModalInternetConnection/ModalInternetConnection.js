import React, { Component } from 'react';
import { View, Modal, Text, TouchableHighlight } from 'react-native';
import { backgroundColorGrey } from '../../Components/Colors/Color';
import { styles } from "./css";

export default class ModalInternetConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        
    }

    closeModal = () => {
        this.props.closeModalInternetConnection()
    }

    render() { 
        return (
            <Modal
                animationType='fade' 
                transparent={true}
                visible={this.props.modalInternetConnectionVisible}
                statusBarTranslucent={true}
                onRequestClose={this.closeModal}
            >
                <View style={styles.modalWrapper}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Internet not available</Text>
                        <Text style={styles.check}>Cross check your internet connectivity and try again.</Text>      
                        <TouchableHighlight
                            style={styles.btn}
                            underlayColor={backgroundColorGrey}
                            onPress={this.closeModal}
                        >
                            <Text style={styles.btnTitle}>OK</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        )
    }
}

