// components/ui/ScreenContainer.jsx
import { View, Platform, ScrollView } from "react-native"

/**
 * Wraps screen content with consistent padding and
 * a max-width constraint on web.
 * 
 * @param {{
 *   children: React.ReactNode,
 *   scroll?: boolean,
 *   className?: string,
 * }} props
 */
export default function ScreenContainer({ children, scroll = false, className = "" }) {
  const webStyle = Platform.OS === "web"
    ? { maxWidth: 680, width: "100%", alignSelf: "center", flex: 1 }
    : { flex: 1 }

  const Wrapper = scroll ? ScrollView : View

  return (
    <View className={`flex-1 bg-slate-50 ${className}`}>
      <Wrapper
        style={webStyle}
        contentContainerStyle={scroll ? { flexGrow: 1 } : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Wrapper>
    </View>
  )
}