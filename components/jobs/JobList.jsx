// components/jobs/JobList.jsx
import { FlatList, View, Text } from "react-native"
import { useRouter } from "expo-router"
import JobCard from "./JobCard"
import Button from "../ui/Button"

/**
 * @param {{ jobs: import('../../lib/types').Job[] }} props
 */
export default function JobList({ jobs }) {
  const router = useRouter()

  if (jobs.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <Text className="text-4xl mb-4">🎉</Text>
        <Text className="text-lg font-semibold text-slate-700 mb-1">
          No jobs available
        </Text>
        <Text className="text-sm text-slate-400 text-center px-8">
          Check back later for new cleaning jobs in your area.
        </Text>
      </View>
    )
  }

  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View className="bg-blue-600 rounded-2xl px-5 py-4 mb-4">
          <Text className="text-white text-sm font-medium opacity-80">
            Jobs available near you
          </Text>
          <Text className="text-white text-3xl font-bold mt-1">
            {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"}
          </Text>
          <Text className="text-white text-xs opacity-70 mt-1">
            Tap a job to view details and book
          </Text>
        </View>
      }
      renderItem={({ item }) => <JobCard job={item} />}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    />
  )
}