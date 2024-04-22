import { Stack } from "expo-router";
import * as React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="client" options={{ headerShown: false }} />
      <Stack.Screen name="seller" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
