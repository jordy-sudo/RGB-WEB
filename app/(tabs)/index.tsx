import React from 'react';
import { StyleSheet, View } from 'react-native';
import ColorPicker, {Panel3 } from 'reanimated-color-picker';

import firebase from '@/database/firebase';

export default function App() {
  const onSelectColor = (data: any) => {
    const {rgb} = data;
    console.log(rgb);

    firebase.databaseRef.set({
      blue: 110,
      green : 30,
      red : 150
    }).then(() => console.log('Color guardado en Firebase'))
    .catch((error) => console.error('Error guardando en Firebase:', error));

  
  };

  return (
    <View style={styles.container}>
      <ColorPicker 
        value="red" 
        onComplete={onSelectColor}
        // onChange={onSelectColor}
        style={styles.colorPicker}
      >
        <Panel3 style={styles.circle} />
      </ColorPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  colorPicker: {
    alignItems: 'center',
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125, 
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
