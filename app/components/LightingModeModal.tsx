import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

interface LightingModeModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (selectedMode: string) => void;
}

const LightingModeModal: React.FC<LightingModeModalProps> = ({ visible, onClose, onSubmit }) => {
  const [selectedMode, setSelectedMode] = useState<string>('1'); // Valor predeterminado

  const handleSubmit = () => {
    onSubmit(selectedMode); 
    onClose(); 
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Elige un modo de iluminación</Text>

          <RadioButton.Group onValueChange={value => setSelectedMode(value)} value={selectedMode}>
            <View style={styles.optionsContainer}>
              <View style={styles.column}>
                <View style={styles.option}>
                  <RadioButton value="1" color="rgb(229, 229, 231)" />
                  <Text style={styles.optionText}>Fade multicolor</Text>
                </View>
                <View style={styles.option}>
                  <RadioButton value="2" color="rgb(229, 229, 231)" />
                  <Text style={styles.optionText}>Fade unicolor</Text>
                </View>
                <View style={styles.option}>
                  <RadioButton value="3" color="rgb(229, 229, 231)" />
                  <Text style={styles.optionText}>Breathe multicolor</Text>
                </View>
                <View style={styles.option}>
                  <RadioButton value="4" color="rgb(229, 229, 231)" />
                  <Text style={styles.optionText}>Breathe unicolor</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.option}>
                  <RadioButton value="5" color="rgb(229, 229, 231)" />
                  <Text style={styles.optionText}>Strobe multicolor</Text>
                </View>
                <View style={styles.option}>
                  <RadioButton value="6" color="rgb(229, 229, 231)" />
                  <Text style={styles.optionText}>Strobe unicolor</Text>
                </View>
                <View style={styles.option}>
                  <RadioButton value="7" color="rgb(229, 229, 231)" />
                  <Text style={styles.optionText}>Static unicolor</Text>
                </View>
              </View>
            </View>
          </RadioButton.Group>

          {/* Botón Confirmar */}
          <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>

          {/* Botón Cerrar */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro translúcido
  },
  modalContent: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    flex: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    color: '#fff', // Texto blanco
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 20,
    alignItems: 'center',
    width: '80%',
  },
  confirmButton: {
    backgroundColor: '#808080', // Fondo gris para Confirmar
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LightingModeModal;
