/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Button,
  View,
  Animated,
  Modal,
  TouchableHighlight,
  TextInput,
  Picker
} from 'react-native';

const partHeight = 213;
export default class sablier extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dec: new Animated.Value(0),
      increasing: new Animated.Value(partHeight),
      modalVisible: false,
      timeUnit: 'min',
      timeout: 1
    }
    this.annimations = undefined;
  }


  componentWillUpdate() {
    console.log('it will update');
  }


  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.width = layout.width;
    this.height = layout.height
  }

  _handleStart() {
    this.annimations = [
      Animated.timing(                  // Animate over time
        this.state.dec,            // The animated value to drive
        {
          toValue: partHeight,                   // Animate to opacity: 1 (opaque)
          duration: this.state.timeout,              // Make it take a while
        }
      ),
      Animated.timing(                  // Animate over time
        this.state.increasing,            // The animated value to drive
        {
          toValue: 0,                   // Animate to opacity: 1 (opaque)
          duration: this.state.timeout,              // Make it take a while
        }
      )];
    Animated.parallel(this.annimations).start();
  }

  _handleLoop() {
    this.state.dec.resetAnimation();
    this.state.increasing.resetAnimation();
  }

  _handleSet() {
    this.setState({ modalVisible: true });
  }

  _closeModal() {
    this.setState({ modalVisible: false });
  }

  _renderModal() {
    const modalContainerSize = {
      height: this.height,
      width: this.width
    }
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => { this._closeModal() }}
      >
        <View style={[styles.modalContainer, modalContainerSize]}>
          <View style={{ backgroundColor: 'white', margin: 10, borderRadius: 3, padding: 10 }}>
            <Text>Duration :</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 3 }}>
                <TextInput
                  placeholder={this.state.timeout.toString()}
                  keyboardType="numeric"
                  onChangeText={(timeout) => this.setState({ timeout })}
                />
              </View>
              <View style={{ flex: 2 }}>
                <Picker
                  selectedValue={this.state.timeUnit}
                  onValueChange={(itemValue) => this.setState({ timeUnit: itemValue })}>
                  <Picker.Item label="Min" value="min" />
                  <Picker.Item label="Sec" value="s" />
                  <Picker.Item label="MSec" value="ms" />
                </Picker>
              </View>

            </View>
            <Button title="Ok" onPress={() => {
              this._closeModal();
            }} />
          </View>
        </View>
      </Modal >
    );
  }

  render() {
    return (
      <View
        style={styles.container}
        onLayout={this._onLayoutDidChange}>
        {this._renderModal()}
        <View style={{ flex: 10, justifyContent: 'center' }}>
          <View>
            <Animated.View style={[styles.overlayTop, { height: this.state.increasing }]}></Animated.View>
            <Image source={require('./assets/top.png')} style={{ width: 512 }} ></Image>
          </View>
          <Image source={require('./assets/middle.png')} />
          <View >
            <Animated.View style={[styles.overlayBottom, { height: this.state.dec }]}></Animated.View>
            <Image source={require('./assets/down.png')} />
          </View>
        </View>

        <View style={{ flex: 1, backgroundColor: 'green' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.button}>
              <Button title="Start" onPress={this._handleStart.bind(this)}></Button>
            </View>
            <View style={styles.button}>
              <Button title="Loop" onPress={this._handleLoop.bind(this)}></Button>
            </View>
            <View style={styles.button}>
              <Button title="Set" onPress={this._handleSet.bind(this)}></Button>
            </View>
          </View>
        </View>
      </View >

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: 80,
    margin: 10,
  },
  overlayTop: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'blue',
    opacity: 0.8,
    width: 512,
  },
  overlayBottom: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'red',
    opacity: 0.8,
    width: 512,
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.9,
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('sablier', () => sablier);
