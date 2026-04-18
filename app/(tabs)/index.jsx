// app/(tabs)/index.jsx
import { useMemo } from "react"
import useStore from "../../lib/store"
import JobList from "../../components/jobs/JobList"
import ScreenContainer from "../../components/ui/ScreenContainer"

export default function AvailableJobsScreen() {
  const jobs = useStore((state) => state.jobs)

  const availableJobs = useMemo(
    () => jobs.filter((j) => j.status === "available"),
    [jobs]
  )

  return (
    <ScreenContainer>
      <JobList jobs={availableJobs} />
    </ScreenContainer>
  )
}