import { Stack } from "expo-router";
import * as React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="verification" options={{ headerShown: false }} />
      <Stack.Screen name="passwordSetup" options={{ headerShown: false }} />
      <Stack.Screen name="userInfoSetup" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
