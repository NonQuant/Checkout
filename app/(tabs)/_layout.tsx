import { Tabs } from "expo-router";
import * as React from "react";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="scan" />
      <Tabs.Screen name="receipts" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default Layout;