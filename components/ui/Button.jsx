// components/ui/Button.jsx
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native"

/**
 * @param {{
 *   label: string,
 *   onPress: () => void,
 *   variant?: 'primary' | 'secondary' | 'danger' | 'ghost',
 *   size?: 'sm' | 'md' | 'lg',
 *   loading?: boolean,
 *   disabled?: boolean,
 *   fullWidth?: boolean,
 * }} props
 */
export default function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
}) {
  const baseClasses = "rounded-xl items-center justify-center flex-row"

  const variantClasses = {
    primary:   "bg-blue-600 active:bg-blue-700",
    secondary: "bg-slate-100 active:bg-slate-200",
    danger:    "bg-red-600 active:bg-red-700",
    ghost:     "bg-transparent border border-slate-300 active:bg-slate-50",
  }

  const sizeClasses = {
    sm: "px-3 py-2",
    md: "px-5 py-3",
    lg: "px-6 py-4",
  }

  const textVariantClasses = {
    primary:   "text-white font-semibold",
    secondary: "text-slate-700 font-semibold",
    danger:    "text-white font-semibold",
    ghost:     "text-slate-700 font-semibold",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : "self-start"}
        ${isDisabled ? "opacity-50" : "opacity-100"}
      `}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "secondary" || variant === "ghost" ? "#334155" : "#ffffff"}
          className="mr-2"
        />
      )}
      <Text className={`${textVariantClasses[variant]} ${textSizeClasses[size]}`}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}