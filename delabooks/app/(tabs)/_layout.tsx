import COLORS from "@/constant/color";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function TabsLayout() {
    const insects = useSafeAreaInsets()
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                headerTitleStyle: {
                    fontWeight: '600',
                    color: COLORS.textPrimary
                },
                headerShowVisible: false,
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: COLORS.border,
                    backgroundColor: COLORS.cardBackground, 
                    paddingTop: 5,
                    paddingBottom: insects.bottom,
                    height: insects.top + 50
                }
            }}
        >
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: "Home",
                    tabBarIcon: ({ color, size }: {color: string, size: string}) => (
                        <Ionicons
                            name="home-outline"
                            size={30}
                            color={color}
                        />  
                    )
                }}
            />
            <Tabs.Screen 
                name="create" 
                options={{ 
                    title: "Create",
                    tabBarIcon: ({ color, size }: {color: string, size: string}) => (
                        <Ionicons
                            name="add-circle-outline"
                            size={30}
                            color={color}
                        />  
                    )
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{ 
                    title: "Profile",
                    tabBarIcon: ({ color, size }: {color: string, size: string}) => (
                        <Ionicons
                            name="person-outline"
                            size={30}
                            color={color}
                        />  
                    )
                }}
            />
        </Tabs>
    )
}