// screens/PixCodeScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type PixCodeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PixCode'>;
type PixCodeScreenRouteProp = RouteProp<RootStackParamList, 'PixCode'>;

// Fun animated circle component
const AnimatedCircle: React.FC<{ style?: object }> = ({ style }) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <Animated.View style={[styles.circle, style, { transform: [{ scale: scaleAnim }] }]} />
  );
};

const PixCodeScreen: React.FC = () => {
  const navigation = useNavigation<PixCodeScreenNavigationProp>();
  const route = useRoute<PixCodeScreenRouteProp>();
  const { fullName, username, dob } = route.params || { fullName: '', username: '', dob: '' };

  const [generatedPixCode, setGeneratedPixCode] = useState<string>('');
  const [inputPixCode, setInputPixCode] = useState<string>('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleGeneratePixCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedPixCode(code);
  };

  const handleSubmitPixCode = () => {
    if (inputPixCode === generatedPixCode && generatedPixCode !== '') {
      Alert.alert('Success', 'Users connected successfully!');
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Pix Code does not match. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Animated circles in the background */}
      <AnimatedCircle style={styles.circleOne} />
      <AnimatedCircle style={styles.circleTwo} />

      <Animated.View style={[styles.overlay, { opacity: fadeAnim, alignItems: 'center' }]}>
        <Text style={styles.title}>Pix Code</Text>
        <TouchableOpacity style={styles.button} onPress={handleGeneratePixCode}>
          <Text style={styles.buttonText}>Generate Pix Code</Text>
        </TouchableOpacity>
        {generatedPixCode ? (
          <>
            <Text style={styles.generatedCode}>Your Code: {generatedPixCode}</Text>
            <Text style={styles.waitingText}>Waiting for partner to enter code</Text>
          </>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="Enter Pix Code"
          placeholderTextColor="#ccc"
          value={inputPixCode}
          onChangeText={setInputPixCode}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmitPixCode}>
          <Text style={styles.buttonText}>Submit Pix Code</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    backgroundColor: 'rgba(18,18,18,0.8)',
    padding: 20,
    borderRadius: 8,
    zIndex: 2,
  },
  title: {
    fontSize: 32,
    color: '#FF69B4',
    marginBottom: 30,
    fontWeight: 'bold',
    fontFamily: 'PressStart2P',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#FF0000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'white',
    marginVertical: 15,
    backgroundColor: 'rgba(30,30,30,0.8)',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  generatedCode: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10,
  },
  waitingText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#FF69B4',
    opacity: 0.3,
    borderRadius: 100,
  },
  circleOne: {
    width: 150,
    height: 150,
    top: 50,
    left: 20,
  },
  circleTwo: {
    width: 100,
    height: 100,
    bottom: 100,
    right: 30,
  },
});

export default PixCodeScreen;
