// app/(tabs)/my-jobs.jsx
import useStore from "../../lib/store"
import BookingList from "../../components/jobs/BookingList"
import ScreenContainer from "../../components/ui/ScreenContainer"

export default function MyJobsScreen() {
  const bookings = useStore((state) => state.bookings)
  const jobs = useStore((state) => state.jobs)

  return (
    <ScreenContainer>
      <BookingList bookings={bookings} jobs={jobs} />
    </ScreenContainer>
  )
}