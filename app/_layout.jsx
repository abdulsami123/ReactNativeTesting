// app/_layout.jsx
import "../global.css"
import { Stack } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="job/[id]"
          options={{
            headerShown: true,
            headerTitle: "Job Details",
            headerBackTitle: "Back",
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="submission/[bookingId]"
          options={{
            headerShown: true,
            headerTitle: "Submit Photos",
            headerBackTitle: "Back",
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="result/[bookingId]"
          options={{
            headerShown: true,
            headerTitle: "Submission Result",
            // No back button — result is a terminal screen
            headerBackVisible: false,
            presentation: "card",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  )
}