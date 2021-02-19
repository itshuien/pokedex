import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Image, Easing } from 'react-native';

export default function Loading({ width=100, height=100 }) {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.sin,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 800,
          easing: Easing.sin,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={{
        width,
        height,
        opacity
      }}>
        <Image source={require('../assets/pokeball-grayscale.png')} style={styles.pokeballImage} />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 48,
  },
  pokeballImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    opacity: 0.2,
  }
})
