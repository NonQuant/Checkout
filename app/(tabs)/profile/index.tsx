import {
  TouchableHighlight,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";

const ProfileScreen = () => {
  // Sample of one user data
  const user = {
    Name: "Altynai",
    Surname: "Isskendir",
    UserID: 10020,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.profileElement]}>
        <Image />
        <Text style={styles.profileName}>
          {user.Name} {user.Surname[0]}.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.profileElement, styles.profileButton]}
        onPress={() => {
          router.push("/receipts/");
        }}
      >
        <Text style={styles.profileButtonText}>Платежи</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.profileElement, styles.profileButton]}
        onPress={() => {
          console.log("You tapped the button!");
        }}
      >
        <Text style={styles.profileButtonText}>Гид</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.profileElement, styles.profileButton]}
        onPress={() => {
          router.push("/profile/about");
        }}
      >
        <Text style={styles.profileButtonText}>О нас</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.profileElement, styles.profileButton]}
        onPress={() => {
          auth()
            .signOut()
            .then(() => router.replace("/"));
        }}
      >
        <Text style={styles.profileButtonText}>Выход</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "space-between",
  },
  profileElement: {
    margin: 20,
  },
  profileName: {
    textAlign: "center",
    fontSize: 26,
  },
  profileButton: {
    borderWidth: 1,
    paddingVertical: 7,
  },
  profileButtonText: {
    textAlign: "center",
    fontSize: 22,
  },
});

export default ProfileScreen;
