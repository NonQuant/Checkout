import React, { FC } from "react";

import { TouchableOpacity, Text, StyleSheet } from "react-native";
import CTAButtonProps from "../../Interfaces/CTAButton";

export const CTAButton: FC<CTAButtonProps> = ({
  disabled = false,
  title,
  onPress,
  variant,
}) => {
  const containerStyle =
    variant === "primary"
      ? [
          styles.containerPrimary,
          { backgroundColor: disabled ? "gray" : "#41B06E" },
        ]
      : styles.containerSecondary;

  const textStyle =
    variant === "primary" ? styles.textPrimary : styles.textSecondary;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={containerStyle}
      disabled={disabled}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerPrimary: {
    height: 60,
    backgroundColor: "#41B06E",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  containerSecondary: {
    height: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  textPrimary: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  textSecondary: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
});
