import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { Redirect, router } from "expo-router";

const HomeScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
  }, []);

  return (
    <View>
      <Text>home</Text>
      {!user && <Redirect href="/" />}
    </View>
  );
};

export default HomeScreen;
