import { Tabs } from "expo-router"
import * as React from 'react';


export default () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="scan" />
            <Tabs.Screen name="receipts" />
            <Tabs.Screen name="profile" />
        </Tabs>
    )
}