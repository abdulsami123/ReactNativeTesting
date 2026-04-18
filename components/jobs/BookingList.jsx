// components/jobs/BookingList.jsx
import { FlatList, View, Text } from "react-native"
import { useRouter } from "expo-router"
import BookingCard from "./BookingCard"
import Button from "../ui/Button"

/**
 * @param {{
 *   bookings: import('../../lib/types').Booking[],
 *   jobs: import('../../lib/types').Job[]
 * }} props
 */
export default function BookingList({ bookings, jobs }) {
  const router = useRouter()

  const completed = bookings.filter((b) => b.status === "completed").length
  const upcoming = bookings.filter((b) => b.status === "upcoming").length
  const rejected = bookings.filter((b) => b.status === "rejected").length

  if (bookings.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <Text className="text-4xl mb-4">📋</Text>
        <Text className="text-lg font-semibold text-slate-700 mb-1">
          No bookings yet
        </Text>
        <Text className="text-sm text-slate-400 text-center px-8 mb-6">
          Browse available jobs and book your first cleaning shift.
        </Text>
        <Button
          label="Browse Jobs"
          onPress={() => router.push("/")}
          variant="primary"
        />
      </View>
    )
  }

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View className="flex-row gap-x-3 mb-4">
          <View className="flex-1 bg-blue-50 rounded-2xl px-4 py-3 items-center">
            <Text className="text-2xl font-bold text-blue-700">{upcoming}</Text>
            <Text className="text-xs text-blue-500 mt-1">Upcoming</Text>
          </View>
          <View className="flex-1 bg-green-50 rounded-2xl px-4 py-3 items-center">
            <Text className="text-2xl font-bold text-green-700">{completed}</Text>
            <Text className="text-xs text-green-500 mt-1">Completed</Text>
          </View>
          <View className="flex-1 bg-red-50 rounded-2xl px-4 py-3 items-center">
            <Text className="text-2xl font-bold text-red-700">{rejected}</Text>
            <Text className="text-xs text-red-500 mt-1">Needs Resubmit</Text>
          </View>
        </View>
      }
      renderItem={({ item }) => {
        const job = jobs.find((j) => j.id === item.jobId)
        return <BookingCard booking={item} job={job} />
      }}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    />
  )
}