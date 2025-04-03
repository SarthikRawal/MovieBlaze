import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name="movies/[id]"
          options={{
            headerShown: false,
          }} />
      </Stack>
    </>
  );
}
