// components/submission/SubmissionScreen.web.jsx
import { View, Text } from "react-native"

export default function SubmissionScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-semibold text-slate-700 mb-2">
        Not available on web
      </Text>
      <Text className="text-slate-400 text-center px-8">
        Photo submission is only available on the mobile app.
      </Text>
    </View>
  )
}