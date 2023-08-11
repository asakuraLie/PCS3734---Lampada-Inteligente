import {View, Text, Switch} from 'react-native';
import React from 'react';

import {useState} from 'react';

export default function Lights() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState('Ligar Lâmpadar');

  const toggleSwitch = () => {
    if (!isEnabled) {
      setText('Desligar Lâmpada');
    } else {
      setText('Ligar Lâmpada');
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
    </View>
  );
}
