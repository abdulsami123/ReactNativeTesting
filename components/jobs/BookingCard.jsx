// components/jobs/BookingCard.jsx
import { View, Text, TouchableOpacity, Platform } from "react-native"
import { useRouter } from "expo-router"
import Badge from "../ui/Badge"
import Card from "../ui/Card"
import Button from "../ui/Button"
import useStore from "../../lib/store"

/**
 * @param {string} dateStr
 */
function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

/**
 * @param {string} status
 * @returns {{ variant: string, label: string }}
 */
function getStatusDisplay(status) {
  switch (status) {
    case "upcoming":    return { variant: "info",    label: "Upcoming" }
    case "in_progress": return { variant: "warning", label: "In Progress" }
    case "submitted":   return { variant: "warning", label: "Submitted" }
    case "completed":   return { variant: "success", label: "Completed" }
    case "rejected":    return { variant: "danger",  label: "Needs Resubmission" }
    default:            return { variant: "neutral", label: status }
  }
}

/**
 * @param {{
 *   booking: import('../../lib/types').Booking,
 *   job: import('../../lib/types').Job
 * }} props
 */
export default function BookingCard({ booking, job }) {
  const router = useRouter()
  const cancelBooking = useStore((state) => state.cancelBooking)

  if (!job) return null

  const { variant, label } = getStatusDisplay(booking.status)
  const canSubmit = booking.status === "upcoming" || booking.status === "rejected"
  const canCancel = booking.status === "upcoming"
  const hasResult = booking.status === "completed" || booking.status === "rejected"

  function handleSubmit() {
    router.push(`/submission/${booking.id}`)
  }

  function handleViewResult() {
    router.push(`/result/${booking.id}`)
  }

  function handleCancel() {
    cancelBooking(booking.id)
  }

  return (
    <Card className="mb-3">
      {/* Header */}
      <View className="flex-row items-start justify-between mb-1">
        <View className="flex-1 mr-3">
          <Text className="text-base font-bold text-slate-800">
            {job.address}
          </Text>
          <Text className="text-sm text-slate-500">{job.suburb}</Text>
        </View>
        <Badge label={label} variant={variant} />
      </View>

      {/* Divider */}
      <View className="h-px bg-slate-100 my-3" />

      {/* Job meta */}
      <View className="flex-row justify-between mb-1">
        <Text className="text-sm text-slate-500">
          📅 {formatDate(job.date)} · {job.time}
        </Text>
        <Text className="text-sm font-bold text-blue-600">
          ${job.payRate}/hr
        </Text>
      </View>
      <Text className="text-sm text-slate-500">
        🛏 {job.rooms} bed · {job.bathrooms} bath
      </Text>

      {/* Feedback snippet if rejected */}
      {booking.status === "rejected" && booking.feedback && (
        <View className="mt-3 bg-red-50 rounded-xl px-3 py-2">
          <Text className="text-xs text-red-700">
            ❌ {booking.feedback}
          </Text>
        </View>
      )}

      {/* Completed feedback */}
      {booking.status === "completed" && booking.feedback && (
        <View className="mt-3 bg-green-50 rounded-xl px-3 py-2">
          <Text className="text-xs text-green-700">
            ✅ {booking.feedback}
          </Text>
        </View>
      )}

      {/* Actions */}
      <View className="mt-4 gap-y-2">
        {/* Submit photos — mobile only */}
        {canSubmit && Platform.OS !== "web" && (
          <Button
            label={booking.status === "rejected" ? "Resubmit Photos" : "Submit Photos"}
            onPress={handleSubmit}
            variant="primary"
            fullWidth
          />
        )}

        {/* Web nudge for submit */}
        {canSubmit && Platform.OS === "web" && (
          <View className="bg-slate-50 rounded-xl px-4 py-3">
            <Text className="text-xs text-slate-400 text-center">
              📱 Use the mobile app to submit photos for this job
            </Text>
          </View>
        )}

        {/* View result */}
        {hasResult && (
          <Button
            label="View Result"
            onPress={handleViewResult}
            variant="ghost"
            fullWidth
          />
        )}

        {/* Cancel */}
        {canCancel && (
          <Button
            label="Cancel Booking"
            onPress={handleCancel}
            variant="danger"
            fullWidth
          />
        )}
      </View>
    </Card>
  )
}