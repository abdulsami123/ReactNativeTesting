// app/result/[bookingId].jsx
import { useLocalSearchParams } from "expo-router"
import ResultScreen from "../../components/results/ResultScreen"

export default function ResultRoute() {
  const { bookingId } = useLocalSearchParams()
  return <ResultScreen bookingId={bookingId} />
}