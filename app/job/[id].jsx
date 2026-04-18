// app/job/[id].jsx
import { useLocalSearchParams } from "expo-router"
import JobDetail from "../../components/jobs/JobDetail"

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams()
  return <JobDetail jobId={id} />
}