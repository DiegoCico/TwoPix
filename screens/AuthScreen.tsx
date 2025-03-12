// AuthScreen.tsx
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
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

// A fun animated circle component that continuously pulsates
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
  
  return <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }, style]} />;
};

const AuthScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Animated values for logo fade-in, form slide-up, and flash effect
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(50)).current;
  const flashAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(formTranslateY, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoOpacity, formTranslateY]);

  // Trigger a flash animation (simulates camera flash)
  const triggerFlash = () => {
    flashAnim.setValue(1);
    Animated.timing(flashAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
        // Navigate to your main app screen if desired.
      })
      .catch(error => {
        console.error('Login error:', error);
        Alert.alert('Login Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      {/* Fun animated circles in the background */}
      <AnimatedCircle style={styles.circleOne} />
      <AnimatedCircle style={styles.circleTwo} />
      
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
        <Text style={styles.logo}>TwoPix</Text>
      </Animated.View>
      <Animated.View style={[styles.formContainer, { transform: [{ translateY: formTranslateY }] }]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.cameraContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={triggerFlash}>
          <Text style={styles.cameraIcon}>📷</Text>
        </TouchableOpacity>
      </View>
      <Animated.View pointerEvents="none" style={[styles.flashOverlay, { opacity: flashAnim }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    zIndex: 2,
  },
  logo: {
    fontSize: 48,
    color: '#FF69B4', // Hot pink for a playful vibe
    fontWeight: 'bold',
    fontFamily: 'PressStart2P', // Ensure this pixelated font is linked
    letterSpacing: 2,
    textShadowColor: '#FF0000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    zIndex: 2,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#FF0000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'white',
    marginBottom: 15,
    backgroundColor: '#1E1E1E',
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
  signUpButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  cameraIcon: {
    fontSize: 30,
    color: 'white',
  },
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 3,
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

export default AuthScreen;
