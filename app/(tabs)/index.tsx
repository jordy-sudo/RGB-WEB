// App.tsx
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ColorPicker, { Panel3 } from 'reanimated-color-picker';
import Slider from '@react-native-community/slider';
import Toast from 'react-native-toast-message';
import Ionicons from '@expo/vector-icons/Ionicons';

import { splitRGB } from '@/helpers/splitRGB';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import LightingModeModal from '../components/LightingModeModal';
import { customButton } from '@/helpers/customButton';
import { getFromFirebase, sendToFirebase } from '../services/firebaseService';

export default function App() {
  const [intensity, setIntensity] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [rgbValues, setRgbValues] = useState({ red: 0, green: 0, blue: 0 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tableStatus, settableStatus] = useState<number>(1); 
  const [lightModel, setLightModel] = useState(0);
  const { icon, label, backgroundColor } = customButton(tableStatus);

  // Función para cargar los valores desde Firebase
  const loadValuesFromFirebase = async () => {
    await getFromFirebase((values) => {
      setIntensity(values.intensity);
      setSpeed(values.speed);
      setRgbValues(values.rgb);
      setLightModel(values.lightModel);
      settableStatus(values.mesa);
    });
  };

  useEffect(() => {
    loadValuesFromFirebase(); // Cargar valores al inicio
  }, []);

  const handlePress = () => {
    settableStatus(prevState => (prevState === 3 ? 1 : prevState + 1));
    sendToFirebase(intensity, speed, rgbValues, lightModel, tableStatus);
  };

  const onSelectColor = (data: { rgb: string }) => {
    if (!data || !data.rgb) {
      console.error('Datos de color inválidos');
      return;
    }

    const { rgb } = data;
    const split = splitRGB(rgb);

    if (split !== null) {
      const { red, green, blue } = split;
      setRgbValues({ red, green, blue });

      sendToFirebase(intensity, speed, { red, green, blue }, lightModel, tableStatus);
    } else {
      console.error('Error al separar los valores RGB.');
    }
  };

  const handleIntensityChange = (value: Float) => {
    const roundedValue = Math.round(value / 5) * 5;
    setIntensity(roundedValue);
    sendToFirebase(roundedValue, speed, rgbValues, lightModel, tableStatus);
  };

  const handleSpeedChange = (value: Float) => {
    const roundedValue = Math.round(value / 5) * 5;
    setSpeed(roundedValue);
    sendToFirebase(intensity, roundedValue, rgbValues, lightModel, tableStatus);
  };

  const handleButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleModalSubmit = (lightModel: any) => {
    setLightModel(lightModel);
    sendToFirebase(intensity, speed, rgbValues, lightModel, tableStatus);
  };

  
  return (
    <View style={styles.container}>
      <ColorPicker
        value={`rgb(${rgbValues.red}, ${rgbValues.green}, ${rgbValues.blue})`} 
        onComplete={onSelectColor}
        style={styles.colorPicker}
      >
        <Panel3 style={styles.circle} />
      </ColorPicker>
      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Intensidad: {intensity}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={intensity}
          onValueChange={handleIntensityChange}
          minimumTrackTintColor="#fff"
          thumbTintColor="rgb(229, 229, 231)"
          maximumTrackTintColor="#737070"
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Velocidad: {speed}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={speed}
          onValueChange={handleSpeedChange}
          minimumTrackTintColor="#fff"
          thumbTintColor="rgb(229, 229, 231)"
          maximumTrackTintColor="#737070"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Ionicons name="color-filter" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Modos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor }]}
          onPress={handlePress}
        >
          <Ionicons name={icon} size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
      </View>

      <LightingModeModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleModalSubmit} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#171717',
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
  sliderContainer: {
    width: '80%',
    marginVertical: 20,
  },
  slider: {
    width: '100%',
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '80%', 
    marginTop: 20, 
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: 'transparent', 
    paddingVertical: 12,
    paddingHorizontal: 24, 
    borderRadius: 25, 
    borderWidth: 2, 
    borderColor: '#fff', 
  },
  icon: {
    marginRight: 10, 
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16, 
  },
});
