import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import { CTAButton } from "../Components/Buttons/CTAButton";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import auth from "@react-native-firebase/auth";
import { FormInput } from "../Components/Inputs/FormInput";
import { MessageView } from "../Components/Views/MessageView";

const passwordSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = auth().currentUser;
    console.log("Current user: ", user);
  }, []);

  const enableButtonOnChange = (text1, text2) => {
    if (text1 && text2) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      router.replace("/home");
    } catch (error) {
      console.log("Handled error logging in:", error);
      if (error.code === "auth/invalid-credential") {
        setErrorMessage("Неверная почта или пароль!");
      } else {
        setErrorMessage("Возникла ошибка, пожалуйста попробуйте позже");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Вход</Text>
          </View>
          <View style={styles.mainContent}>
            <FormInput
              placeholder="Email"
              variant="email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                enableButtonOnChange(text, password);
              }}
            />
            <FormInput
              placeholder="Пароль"
              variant="password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                enableButtonOnChange(email, text);
              }}
            />
            {errorMessage && <MessageView text={errorMessage} type="error" />}
          </View>
          {loading && <ActivityIndicator size="large" />}
          <CTAButton
            title="Продолжить"
            onPress={handleLogin}
            variant="primary"
            disabled={buttonDisabled}
          />
          <CTAButton
            title="Назад"
            onPress={() => {
              router.back();
            }}
            variant="secondary"
          />
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginHorizontal: 50,
    backgroundColor: "white",
    paddingTop: 20,
    minHeight: 800,
  },
  titleContainer: {
    flex: 1.2,
    justifyContent: "center",
    maxHeight: 200,
  },
  titleText: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: "400",
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 60,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
  },
  mainContent: {
    flex: 6,
    gap: 10,
    maxHeight: "40%",
    justifyContent: "center",
  },
});

export default passwordSetup;
