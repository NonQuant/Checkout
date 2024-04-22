import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import { CTAButton } from "../../Components/Buttons/CTAButton";
import { router, useLocalSearchParams } from "expo-router";

const VerifySeller = () => {
  const params = useLocalSearchParams();

  const { sellerName, sellerCity, sellerTaxAuthority, sellerAddress } = params;

  return (
    <Pressable style={styles.contentView} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Регистрация ИП</Text>
          </View>
          <View style={styles.mainContent}>
            <TextInput
              style={styles.loginTextField}
              placeholder="Название ИП"
              placeholderTextColor="#999999"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Город или область"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Налоговый орган"
              placeholderTextColor="#999999"
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Дом/Квартира/Офис"
              placeholderTextColor="#999999"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <CTAButton title="Продолжить" onPress={() => {}} variant="primary" />
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
    marginBottom: 20,
  },
  titleText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 40,
    textAlign: "center",
    fontWeight: "300",
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 45,
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "300",
  },
  mainContent: {
    flex: 6,
  },
});

export default VerifySeller;
