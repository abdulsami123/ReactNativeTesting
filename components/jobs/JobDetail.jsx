// components/jobs/JobDetail.jsx
import { View, Text, ScrollView, Platform } from "react-native"
import { useRouter } from "expo-router"
import useStore from "../../lib/store"
import Button from "../ui/Button"
import Badge from "../ui/Badge"

/**
 * @param {string} dateStr
 */
function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/**
 * @param {string} status
 */
function getBadgeVariant(status) {
  switch (status) {
    case "available": return "success"
    case "booked":    return "info"
    case "completed": return "neutral"
    case "rejected":  return "danger"
    default:          return "neutral"
  }
}

/**
 * A single detail row with a label and value
 */
function DetailRow({ icon, label, value }) {
  return (
    <View className="flex-row items-center py-3 border-b border-slate-100">
      <Text className="text-lg w-8">{icon}</Text>
      <Text className="text-sm text-slate-500 w-24">{label}</Text>
      <Text className="text-sm font-semibold text-slate-800 flex-1">{value}</Text>
    </View>
  )
}

/**
 * @param {{ jobId: string }} props
 */
export default function JobDetail({ jobId }) {
  const router = useRouter()
  const jobs = useStore((state) => state.jobs)
  const bookings = useStore((state) => state.bookings)
  const bookJob = useStore((state) => state.bookJob)

  const job = jobs.find((j) => j.id === jobId)

  // Check if this job is already booked by the user
  const existingBooking = bookings.find((b) => b.jobId === jobId)

  if (!job) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-slate-500">Job not found.</Text>
      </View>
    )
  }

  const isAvailable = job.status === "available"

  function handleBook() {
    bookJob(job.id)
    router.replace("/my-jobs")
  }

  function handleViewBooking() {
    router.push(`/submission/${existingBooking.id}`)
  }

  return (
    <ScrollView className="flex-1 bg-slate-50">
      <View
        style={
          Platform.OS === "web"
            ? { maxWidth: 680, width: "100%", alignSelf: "center" }
            : {}
        }
      >
        {/* Hero Card */}
        <View className="bg-white px-5 pt-6 pb-5 mb-3">
          <View className="flex-row items-start justify-between mb-1">
            <View className="flex-1 mr-3">
              <Text className="text-2xl font-bold text-slate-800">
                {job.address}
              </Text>
              <Text className="text-base text-slate-500 mt-1">{job.suburb}</Text>
            </View>
            <Badge label={job.status} variant={getBadgeVariant(job.status)} />
          </View>

          {/* Pay rate highlight */}
          <View className="mt-4 bg-blue-50 rounded-xl px-4 py-3">
            <Text className="text-sm text-blue-500 font-medium">
              Estimated Pay
            </Text>
            <Text className="text-3xl font-bold text-blue-700 mt-1">
              ${job.payRate}
              <Text className="text-base font-normal text-blue-500">/hr</Text>
            </Text>
          </View>
        </View>

        {/* Details Card */}
        <View className="bg-white px-5 py-2 mb-3">
          <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-3 pb-1">
            Job Details
          </Text>
          <DetailRow
            icon="📅"
            label="Date"
            value={formatDate(job.date)}
          />
          <DetailRow
            icon="⏰"
            label="Time"
            value={job.time}
          />
          <DetailRow
            icon="🛏"
            label="Bedrooms"
            value={`${job.rooms} bedroom${job.rooms > 1 ? "s" : ""}`}
          />
          <DetailRow
            icon="🚿"
            label="Bathrooms"
            value={`${job.bathrooms} bathroom${job.bathrooms > 1 ? "s" : ""}`}
          />
        </View>

        {/* Notes Card */}
        {job.notes && (
          <View className="bg-white px-5 py-4 mb-3">
            <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Client Notes
            </Text>
            <View className="bg-amber-50 rounded-xl px-4 py-3">
              <Text className="text-sm text-amber-800 leading-5">
                📝 {job.notes}
              </Text>
            </View>
          </View>
        )}

        {/* Action Area */}
        <View className="px-5 py-4">
          {isAvailable && (
            <Button
              label="Book This Job"
              onPress={handleBook}
              variant="primary"
              size="lg"
              fullWidth
            />
          )}

          {!isAvailable && existingBooking && (
            <View className="gap-y-3">
              <View className="bg-green-50 rounded-xl px-4 py-3 mb-2">
                <Text className="text-sm text-green-700 font-medium text-center">
                  ✅ You have booked this job
                </Text>
              </View>
              {/* Only show submit button on mobile */}
              {Platform.OS !== "web" && (
                <Button
                  label="Submit Photos"
                  onPress={handleViewBooking}
                  variant="primary"
                  size="lg"
                  fullWidth
                />
              )}
            </View>
          )}

          {!isAvailable && !existingBooking && (
            <View className="bg-slate-100 rounded-xl px-4 py-3">
              <Text className="text-sm text-slate-500 text-center">
                This job is no longer available
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}