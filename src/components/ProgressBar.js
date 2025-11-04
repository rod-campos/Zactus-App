import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

export default function ProgressBar({ totalSteps, currentStep }) {
  const progress = (currentStep / totalSteps) * 100;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={styles.container}>
      <View style={styles.progressBackground}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 32,
  },
  progressBackground: {
    height: 6,
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#8b5cf6",
    borderRadius: 10,
  },
});
