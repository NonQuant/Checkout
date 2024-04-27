import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { CTAButton } from "../../Components/Buttons/CTAButton";
import { router, useLocalSearchParams } from "expo-router";
import { FormInput } from "../../Components/Inputs/FormInput";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { MessageView } from "../../Components/Views/MessageView";

const RegisterSeller = () => {
  const GLOBAL = require("./../../global");
  const phoneNumber = GLOBAL.phoneNumber;
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<FirebaseAuthTypes.ConfirmationResult>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function redirectUser(user) {
    try {
      const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      if (userDocument.exists && userDocument.get("firstName")) {
        router.navigate("/home");
      } else {
        router.navigate("/registration/client/userInfoSetup");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onAuthStateChanged(user) {
    if (user && user.phoneNumber === phoneNumber) {
      redirectUser(user);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleCodeChange = (code: string) => {
    setVerificationCode(code);
    if (code.length === 6) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const sendVerificationCode = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`; // Format phone number with country code
      const confirmationResult = await auth().signInWithPhoneNumber(
        formattedPhoneNumber
      );
      setConfirmationResult(confirmationResult);
    } catch (error) {
      console.error("Error sending verification code:", error);
      setErrorMessage(error.message); // Display a user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await linkPhoneNumber();
    } catch (error) {
      console.error("Error verifying code:", error);
      setErrorMessage(error.message); // Display a user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  const linkPhoneNumber = async () => {
    setLoading(true);
    setErrorMessage(null);

    const user = auth().currentUser;

    if (user && user.uid) {
      // Check if user is authenticated
      try {
        const credential = auth.PhoneAuthProvider.credential(
          confirmationResult.verificationId,
          verificationCode
        );
        await user.linkWithCredential(credential);
        console.log("Phone number successfully linked to user");
        redirectUser(user);
      } catch (error) {
        console.error("Error linking phone number:", error);
        setErrorMessage(error.message); // Display user-friendly error message
      } finally {
        setLoading(false);
      }
    } else {
      console.error("User is not authenticated");
      setErrorMessage("An error occurred. Please try again."); // Inform user about authentication issue
    }
  };

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Регистрация ИП</Text>
          </View>
          <View style={styles.mainContent}>
            <Text style={styles.labelText}>Введенный номер: {phoneNumber}</Text>
            <Text style={styles.labelText}>Введите код:</Text>
            <TextInput
              style={styles.codeInput}
              value={verificationCode}
              onChangeText={handleCodeChange}
              maxLength={6}
              keyboardType="number-pad"
            />
            {errorMessage && <MessageView text={errorMessage} type="error" />}
          </View>
          {loading && <ActivityIndicator size="large" />}
          {confirmationResult ? (
            <CTAButton
              title="Продолжить"
              onPress={verifyCode}
              variant="primary"
              disabled={buttonDisabled || loading}
            />
          ) : (
            <CTAButton
              title="Отправить код"
              onPress={sendVerificationCode}
              variant="primary"
              disabled={loading}
            />
          )}
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
  },
  titleContainer: {
    flex: 1.2,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 50,
  },
  titleText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 40,
    textAlign: "center",
    fontWeight: "300",
  },
  mainContent: {
    flex: 6,
    alignItems: "center",
    gap: 40,
  },
  labelText: {
    fontSize: 24,
    marginBottom: 10,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "black",
    width: 160,
    fontSize: 40,
    padding: 5,
  },
});

export default RegisterSeller;
