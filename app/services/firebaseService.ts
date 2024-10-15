// services/firebaseService.ts
import firebase from '@/database/firebase';
import Toast from 'react-native-toast-message';

export const sendToFirebase = async (
  intensity: number,
  speed: number,
  rgbValues: { red: number, green: number, blue: number },
  lightModel: number,
  mesa: number
) => {
  const { red, green, blue } = rgbValues;

  try {
    await firebase.databaseRef.set({
      knob_R: red,
      knob_G: green,
      knob_B: blue,
      sliderVelocidad: speed,
      sliderIntensidad: intensity,
      lucesEfecto: lightModel,
      botonMesa: mesa,
    });

    Toast.show({
      type: 'success',
      text1: 'Valores actualizados',
      text2: `Intensidad: ${intensity}, Velocidad: ${speed}, Efecto: ${lightModel}`,
    });
  } catch (error) {
    console.error('Error actualizando en Firebase:', error);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'No se pudieron actualizar los valores',
    });
  }
};

// Nueva función para obtener valores desde Firebase
export const getFromFirebase = async (setValues: (values: any) => void) => {
  try {
    const snapshot = await firebase.databaseRef.once('value');
    const data = snapshot.val();
    if (data) {
      // Aquí debes ajustar según la estructura de tus datos
      const values = {
        intensity: data.sliderIntensidad || 0,
        speed: data.sliderVelocidad || 0,
        rgb: {
          red: data.knob_R || 0,
          green: data.knob_G || 0,
          blue: data.knob_B || 0,
        },
        lightModel: data.lucesEfecto || 0,
        mesa: data.botonMesa || 1,
      };
      setValues(values);
    } else {
      console.log('No hay datos en Firebase.');
    }
  } catch (error) {
    console.error('Error obteniendo datos de Firebase:', error);
  }
};
