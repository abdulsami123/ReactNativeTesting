// components/camera/CameraScreen.web.jsx
import { View, Text } from "react-native"

export default function CameraScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 px-8">
      <Text className="text-5xl mb-4">📱</Text>
      <Text className="text-xl font-bold text-slate-700 mb-2 text-center">
        Mobile Only Feature
      </Text>
      <Text className="text-sm text-slate-400 text-center leading-6">
        Photo submission is only available on the mobile app.{"\n"}
        Download the app on your iOS or Android device to submit cleaning photos.
      </Text>
    </View>
  )
}