import {View, Text, Switch, Button} from 'react-native';
import React from 'react';

import {useState} from 'react';
// import BluetoothConnections from '../components/BluetoothConnections';

const Bluetooth = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState('Ligar Bluetooth');

  const toggleSwitch = () => {
    if (!isEnabled) {
      setText('Desligar Bluetooth');
    } else {
      setText('Ligar Bluetooth');
    }

    setIsEnabled(previousState => !previousState);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#9AE4D9',
        alignItems: 'center',
      }}>
      <Text style={{fontWeight: 'bold', margin: 20}}>{text}</Text>
      <Switch
        trackColor={{false: 'grey', true: 'grey'}}
        thumbColor={isEnabled ? 'tomato' : 'blue'}
        ios_backgroundColor="grey"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <View style={{margin: 30}}>
        <Button title="Escanear dispositivos" color="#841584" />
      </View>
      {/* <BluetoothConnections /> */}
    </View>
  );
};

export default Bluetooth;
