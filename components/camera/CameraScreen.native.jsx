// components/camera/CameraScreen.native.jsx
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { useState, useRef } from "react"
import { useRouter } from "expo-router"
import { CameraView, useCameraPermissions } from "expo-camera"
import Button from "../ui/Button"

const STATES = {
  CAMERA: "camera",
  PREVIEW: "preview",
  SUBMITTING: "submitting",
}
//checked
export default function CameraScreen() {
  const router = useRouter()
  const cameraRef = useRef(null)

  const [permission, requestPermission] = useCameraPermissions()
  const [screenState, setScreenState] = useState(STATES.CAMERA)
  const [photoUri, setPhotoUri] = useState(null)

  // ─── Permission: not yet determined ─────────────────────
  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator color="#ffffff" />
      </View>
    )
  }

  // ─── Permission: denied ──────────────────────────────────
  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 px-8">
        <Text className="text-5xl mb-4">📷</Text>
        <Text className="text-lg font-bold text-slate-700 mb-2 text-center">
          Camera Access Required
        </Text>
        <Text className="text-sm text-slate-400 text-center mb-6">
          Please allow camera access to take photos of completed cleaning jobs.
        </Text>
        <Button
          label="Grant Camera Access"
          onPress={requestPermission}
          variant="primary"
        />
      </View>
    )
  }

  // ─── Actions ─────────────────────────────────────────────

  async function handleCapture() {
    if (!cameraRef.current) return
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 })
    setPhotoUri(photo.uri)
    setScreenState(STATES.PREVIEW)
  }

  function handleRetake() {
    setPhotoUri(null)
    setScreenState(STATES.CAMERA)
  }

  async function handleSubmit() {
    setScreenState(STATES.SUBMITTING)

    // Simulate backend call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Navigate back to jobs tab
    router.replace("/")
  }

  // ─── Submitting ──────────────────────────────────────────
  if (screenState === STATES.SUBMITTING) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 px-8">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-base font-semibold text-slate-700 mt-4">
          Submitting photo...
        </Text>
        <Text className="text-sm text-slate-400 mt-1">
          Please wait
        </Text>
      </View>
    )
  }

  // ─── Preview ─────────────────────────────────────────────
  if (screenState === STATES.PREVIEW) {
    return (
      <View className="flex-1 bg-black">
        {/* Photo preview */}
        <Image
          source={{ uri: photoUri }}
          style={{ flex: 1 }}
          resizeMode="cover"
        />

        {/* Overlay actions */}
        <View className="absolute bottom-0 left-0 right-0 px-6 pb-12 pt-6 bg-black/40">
          <Text className="text-white font-semibold text-center text-base mb-4">
            Does this photo look good?
          </Text>
          <View className="gap-y-3">
            <Button
              label="✓  Submit Photo"
              onPress={handleSubmit}
              variant="primary"
              size="lg"
              fullWidth
            />
            <Button
              label="↩  Retake"
              onPress={handleRetake}
              variant="ghost"
              size="lg"
              fullWidth
            />
          </View>
        </View>
      </View>
    )
  }

  // ─── Camera View ─────────────────────────────────────────
  return (
    <View className="flex-1 bg-black">
      {/* CameraView has no children */}
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
      />

      {/* Top hint — sibling to CameraView, absolutely positioned */}
      <View
        className="absolute top-0 left-0 right-0 px-6 pt-12 pb-4"
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <Text className="text-white text-sm text-center opacity-90">
          Take a photo of the completed cleaning job
        </Text>
      </View>

      {/* Capture button — sibling to CameraView, absolutely positioned */}
      <View className="absolute bottom-0 left-0 right-0 items-center pb-12">
        <TouchableOpacity onPress={handleCapture} activeOpacity={0.8}>
          <View className="w-20 h-20 rounded-full border-4 border-white items-center justify-center">
            <View className="w-14 h-14 rounded-full bg-white" />
          </View>
        </TouchableOpacity>
        <Text className="text-white text-xs opacity-70 mt-3">
          Tap to capture
        </Text>
      </View>
    </View>
  )
}