// components/jobs/JobCard.jsx
import { View, Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import Badge from "../ui/Badge"
import Card from "../ui/Card"

/**
 * Maps job status to badge variant
 * @param {string} status
 */
function getBadgeVariant(status) {
  switch (status) {
    case "available":  return "success"
    case "booked":     return "info"
    case "completed":  return "neutral"
    case "rejected":   return "danger"
    default:           return "neutral"
  }
}

/**
 * Formats date string to readable format
 * "2026-04-22" → "Tue 22 Apr"
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
 * @param {{ job: import('../../lib/types').Job }} props
 */
export default function JobCard({ job }) {
  const router = useRouter()

  return (
    <TouchableOpacity
      onPress={() => router.push(`/job/${job.id}`)}
      activeOpacity={0.7}
    >
      <Card className="mb-3">
        {/* Header row — address + badge */}
        <View className="flex-row items-start justify-between mb-1">
          <View className="flex-1 mr-3">
            <Text className="text-base font-bold text-slate-800">
              {job.address}
            </Text>
            <Text className="text-sm text-slate-500">{job.suburb}</Text>
          </View>
          <Badge label={job.status} variant={getBadgeVariant(job.status)} />
        </View>

        {/* Divider */}
        <View className="h-px bg-slate-100 my-3" />

        {/* Details row */}
        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Text className="text-sm text-slate-500">📅 </Text>
            <Text className="text-sm text-slate-600">
              {formatDate(job.date)} · {job.time}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between mt-2">
          <View className="flex-row items-center">
            <Text className="text-sm text-slate-500">🛏 </Text>
            <Text className="text-sm text-slate-600">
              {job.rooms} bed · {job.bathrooms} bath
            </Text>
          </View>
          <Text className="text-sm font-bold text-blue-600">
            ${job.payRate}/hr
          </Text>
        </View>

        {/* Notes if present */}
        {job.notes && (
          <View className="mt-3 bg-amber-50 rounded-lg px-3 py-2">
            <Text className="text-xs text-amber-700">📝 {job.notes}</Text>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  )
}