// app/(tabs)/_layout.jsx
import { Tabs } from "expo-router"
import { Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"

/**
 * Small helper so tab icon markup stays clean
 */
function TabIcon({ name, color, size }) {
  return <Ionicons name={name} size={size} color={color} />
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopColor: "#E2E8F0",
          borderTopWidth: 1,
          paddingBottom: 4,
        },
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTitleStyle: {
          fontWeight: "600",
          color: "#0F172A",
        },
        headerShadowVisible: false,
      }}
    >
      {/* ── Available Jobs ── */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Available Jobs",
          tabBarLabel: "Jobs",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="briefcase-outline" color={color} size={size} />
          ),
        }}
      />

      {/* ── My Bookings ── */}
      <Tabs.Screen
        name="my-jobs"
        options={{
          title: "My Bookings",
          tabBarLabel: "My Jobs",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="calendar-outline" color={color} size={size} />
          ),
        }}
      />

      {/* ── Camera (mobile only) ── */}
      <Tabs.Screen
        name="camera"
        options={{
          title: "Submit Job",
          tabBarLabel: "Submit",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="camera-outline" color={color} size={size} />
          ),
          // Hide tab icon on web but keep route accessible
          tabBarItemStyle: Platform.OS === "web"
            ? { display: "none" }
            : undefined,
        }}
      />
    </Tabs>
  )
}