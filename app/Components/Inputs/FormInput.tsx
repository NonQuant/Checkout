import React, { FC } from "react";

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";
import FormInputProps from "../../Interfaces/FormInputProps";

export const FormInput: FC<FormInputProps> = ({
  placeholder,
  value,
  onChangeText,
  variant,
}) => {
  let keyboardType: KeyboardTypeOptions = "default";
  if (variant === "phone") keyboardType = "phone-pad";
  if (variant === "email") keyboardType = "email-address";

  const secureTextEntry = variant === "password";
  const autoComplete = variant === "phone" ? "tel" : "off";
  const style =
    variant === "phone" ? styles.loginPhoneField : styles.loginTextField;

  return (
    <TextInput
      style={style}
      placeholder={placeholder}
      placeholderTextColor="#999999"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoComplete={autoComplete}
    />
  );
};

const styles = StyleSheet.create({
  loginTextField: {
    borderBottomWidth: 1,
    height: 45,
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "300",
  },
  loginPhoneField: {
    borderWidth: 1,
    height: 60,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
    borderRadius: 10,
    paddingLeft: 10,
  },
});
