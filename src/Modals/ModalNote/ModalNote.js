import React, { Component } from 'react';
import { View, Modal, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { styles } from "./css";
import Input from '../../Components/Input/Input';
import { width } from '../../Components/Dimensions/Dimensions';

export default class ModalNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        
    }

    setValue = (name, value) => {
        this.setState({ [name]: value}, () => {})
    }

    closeModal = () => {
        this.props.closeModalNote()
    }

    saveNote = () => {
        if(this.state.note != undefined) {
            this.props.getNote(this.state.note)
            this.closeModal()
        } 
    }

    render() {
        return (
            // <KeyboardAvoidingView>
                <Modal
                    animationType='fade' 
                    transparent={true}
                    visible={this.props.modalNoteVisible}
                    statusBarTranslucent={true}
                    onRequestClose={this.closeModal}
                >
                    <View style={styles.modalWrapper}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <View style={styles.modalHeaderLeft}>

                                </View>
                                <View style={styles.modalHeaderCenter}>
                                    <Text style={styles.modalHeaderTitle}>Note</Text>
                                </View>
                                <View style={styles.modalHeaderRight}>
                                    
                                </View>
                            </View>

                            <View style={styles.modalBody}>
                                <View style={styles.inputBox}>
                                    <Input
                                        placeholder='Please enter note...'
                                        name='note'
                                        setValue={this.setValue}
                                        oldValue={this.state.note}
                                        editable={true}
                                        multiline={true}
                                        hideshowText={false}
                                        width={width - 70}
                                        minHeight={100}
                                        onRef={ref => (this.childNote = ref)}
                                    />
                                </View>
                            </View>

                            <View style={styles.modalBottom}>
                                <TouchableHighlight
                                    style={styles.cancel}
                                    underlayColor='whitesmoke'
                                    onPress={this.closeModal}
                                >
                                    <Text style={styles.btnTitle}>Cancel</Text>
                                </TouchableHighlight>

                                <TouchableHighlight
                                    style={styles.add}
                                    underlayColor='whitesmoke'
                                    onPress={this.saveNote}
                                >
                                    <Text style={styles.btnTitle}>Add</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            // </KeyboardAvoidingView>
        )
    }
}