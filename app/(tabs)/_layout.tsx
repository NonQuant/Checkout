import { Tabs } from "expo-router";
import * as React from "react";
import {
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
  Feather,
} from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
          title: "Home",
          tabBarActiveTintColor: "#41B06E",
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color={color}
            />
          ),
          title: "Scan",
          tabBarActiveTintColor: "#41B06E",
        }}
      />
      <Tabs.Screen
        name="receipts"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="receipt-outline" size={24} color={color} />
          ),
          title: "Receipts",
          tabBarActiveTintColor: "#41B06E",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          title: "Profile",
          tabBarActiveTintColor: "#41B06E",
        }}
      />
    </Tabs>
  );
};

export default Layout;
