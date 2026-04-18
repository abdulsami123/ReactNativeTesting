// components/ui/Card.jsx
import { View } from "react-native"

/**
 * @param {{
 *   children: React.ReactNode,
 *   className?: string,
 * }} props
 */
export default function Card({ children, className = "" }) {
  return (
    <View
      className={`
        bg-white rounded-2xl p-4
        border border-slate-100
        shadow-sm
        ${className}
      `}
    >
      {children}
    </View>
  )
}