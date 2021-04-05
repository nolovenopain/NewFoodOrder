import React, { Component } from 'react';
import { View, SafeAreaView, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import { styles } from "./css";

export default class ModalShowImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        
    }

    closeModal = () => {
        this.props.closeModalShowImage()
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Modal
                    animationType='fade' 
                    transparent={true}
                    visible={this.props.modalShowImageVisible}
                    statusBarTranslucent={true}
                    onRequestClose={this.closeModal}
                >
                    <TouchableWithoutFeedback onPress={this.closeModal}>
                        <View style={styles.backDrop}>
                            <Image
                                style={styles.image}
                                source={this.props.imgSrcShow}
                                resizeMode='contain'
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </SafeAreaView>
        )
    }
}

