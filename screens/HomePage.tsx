// HomePage.tsx
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

// Fun animated circle component that continuously pulsates
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

const HomePage: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  
  return (
    <View style={styles.container}>
      {/* Animated circles for a playful background */}
      <AnimatedCircle style={styles.circleOne} />
      <AnimatedCircle style={styles.circleTwo} />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Welcome to TwoPix!</Text>
        <Text style={styles.subtitle}>You are now connected.</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    zIndex: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#FF69B4', // Hot pink for a playful vibe
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'PressStart2P', // Ensure this pixelated font is linked
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
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

export default HomePage;
