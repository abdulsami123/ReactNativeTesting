// components/results/ResultScreen.jsx
import { View, Text, ScrollView, Platform } from "react-native"
import { useRouter } from "expo-router"
import useStore from "../../lib/store"
import Button from "../ui/Button"

/**
 * @param {{ bookingId: string }} props
 */
export default function ResultScreen({ bookingId }) {
  const router = useRouter()
  const getBookingWithJob = useStore((state) => state.getBookingWithJob)

  const bookingWithJob = getBookingWithJob(bookingId)

  // ─── Guard: booking not found ───────────────────────────
  if (!bookingWithJob) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-lg font-semibold text-slate-700 mb-2">
          Result not found
        </Text>
        <Text className="text-sm text-slate-400 text-center mb-6">
          This submission may no longer be available.
        </Text>
        <Button
          label="Go to My Jobs"
          onPress={() => router.replace("/my-jobs")}
          variant="primary"
        />
      </View>
    )
  }

  // ─── Guard: result not yet available ────────────────────
  if (bookingWithJob.status === "submitted") {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-4xl mb-4">⏳</Text>
        <Text className="text-lg font-semibold text-slate-700 mb-2">
          Processing your submission
        </Text>
        <Text className="text-sm text-slate-400 text-center">
          Your photos are being reviewed. Please wait.
        </Text>
      </View>
    )
  }

  const passed = bookingWithJob.status === "completed"
  const { job, feedback, submittedPhotos = [] } = bookingWithJob

  // ─── Render ──────────────────────────────────────────────

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View
        style={
          Platform.OS === "web"
            ? { maxWidth: 680, width: "100%", alignSelf: "center" }
            : {}
        }
      >
        {/* Result Hero */}
        <View
          className={`mx-4 mt-6 mb-3 rounded-2xl px-6 py-8 items-center ${
            passed ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <Text className="text-6xl mb-4">{passed ? "✅" : "❌"}</Text>
          <Text
            className={`text-2xl font-bold mb-2 ${
              passed ? "text-green-700" : "text-red-700"
            }`}
          >
            {passed ? "Job Approved!" : "Resubmission Required"}
          </Text>
          <Text
            className={`text-sm text-center leading-5 ${
              passed ? "text-green-600" : "text-red-600"
            }`}
          >
            {passed
              ? "Great work! Your cleaning has been verified and approved."
              : "Your submission did not meet the required standard. Please review the feedback below."}
          </Text>
        </View>

        {/* Feedback Card */}
        {feedback && (
          <View className="bg-white mx-4 mb-3 rounded-2xl px-5 py-4">
            <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Feedback
            </Text>
            <View
              className={`rounded-xl px-4 py-3 ${
                passed ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <Text
                className={`text-sm leading-6 ${
                  passed ? "text-green-800" : "text-red-800"
                }`}
              >
                {feedback}
              </Text>
            </View>
          </View>
        )}

        {/* Job Summary */}
        <View className="bg-white mx-4 mb-3 rounded-2xl px-5 py-4">
          <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Job Summary
          </Text>
          <Text className="text-base font-bold text-slate-800">{job.address}</Text>
          <Text className="text-sm text-slate-500">{job.suburb}</Text>
          <View className="h-px bg-slate-100 my-3" />
          <View className="flex-row justify-between">
            <Text className="text-sm text-slate-500">
              📅 {job.date} · {job.time}
            </Text>
            <Text className="text-sm font-bold text-blue-600">
              ${job.payRate}/hr
            </Text>
          </View>
          <Text className="text-sm text-slate-500 mt-1">
            🛏 {job.rooms} bed · {job.bathrooms} bath
          </Text>
          <View className="mt-3 flex-row items-center">
            <Text className="text-sm text-slate-500">
              📸 {submittedPhotos.length} photo{submittedPhotos.length !== 1 ? "s" : ""} submitted
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View className="mx-4 mb-10 gap-y-3">
          {/* Resubmit — mobile only */}
          {!passed && Platform.OS !== "web" && (
            <Button
              label="Resubmit Photos"
              onPress={() => router.replace(`/submission/${bookingId}`)}
              variant="primary"
              size="lg"
              fullWidth
            />
          )}

          {/* Web resubmit nudge */}
          {!passed && Platform.OS === "web" && (
            <View className="bg-slate-50 rounded-xl px-4 py-3">
              <Text className="text-xs text-slate-400 text-center">
                📱 Use the mobile app to resubmit photos for this job
              </Text>
            </View>
          )}

          <Button
            label="Back to My Jobs"
            onPress={() => router.replace("/my-jobs")}
            variant={passed ? "primary" : "ghost"}
            size="lg"
            fullWidth
          />

          {passed && (
            <Button
              label="Browse More Jobs"
              onPress={() => router.replace("/")}
              variant="ghost"
              size="lg"
              fullWidth
            />
          )}
        </View>
      </View>
    </ScrollView>
  )
}