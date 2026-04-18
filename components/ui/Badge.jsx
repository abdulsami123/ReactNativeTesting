// components/ui/Badge.jsx
import { View, Text } from "react-native"

/**
 * @param {{
 *   label: string,
 *   variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral',
 * }} props
 */
export default function Badge({ label, variant = "neutral" }) {
  const containerClasses = {
    success: "bg-green-100",
    warning: "bg-amber-100",
    danger:  "bg-red-100",
    info:    "bg-blue-100",
    neutral: "bg-slate-100",
  }

  const textClasses = {
    success: "text-green-700",
    warning: "text-amber-700",
    danger:  "text-red-700",
    info:    "text-blue-700",
    neutral: "text-slate-600",
  }

  return (
    <View className={`px-2 py-1 rounded-full self-start ${containerClasses[variant]}`}>
      <Text className={`text-xs font-semibold capitalize ${textClasses[variant]}`}>
        {label}
      </Text>
    </View>
  )
}