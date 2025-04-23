import { create } from "zustand";
import  AsyncStorage from "@react-native-async-storage/async-storage";

type IUSer = {
    id? :string;
    username: string;
    email: string;
    profileImage: string
}
type AuthState = {
    user: IUSer | null; // You can define a proper `User` type later
    token: string | null;
    isLoading: boolean;
    register: (username: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
};

export const useAuthStore = create<AuthState>((set)=> ({
    user: null,
    token: null,
    isLoading: false,
    register: async (username,  email, password )=> {
        set({ isLoading: true })
        try {
            const response = await fetch("https://delabooks.onrender.com/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            })

            const data = await response.json()
            if(!response.ok) throw new Error(data?.message || "Something went wrong")

            await AsyncStorage.setItem("token", data.token)
            await AsyncStorage.setItem("user", JSON.stringify(data.user))

            set({ user: data?.user, token: data?.token, isLoading: false })

            return { success: true}
        } catch (error: any) {
            console.log(error)
            return { success: false, message: error.message }
            set({ isLoading: false })
        }
    },
    login: async(email: string, password: string ) => {
        set({ isLoading: true})
        try {
            const res = await fetch("https://delabooks.onerender.com/api/auth/login", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password})
            })
            const data = await res.json()
            if(!res.ok) throw new Error(data?.message || "Something went wrong")
        } catch (error) {
            
        }
    },
    checkAuth: async() => {
        try {
            const token = await AsyncStorage.getItem("token")
            const userJson = await AsyncStorage.getItem("user")
            const user = userJson ? JSON.parse(userJson) : null
            set({ token, user})
        } catch (error) {
            console.log("Error from checkAuth", error)
        }
    },
    log: async() => {
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("user")
        set({ token: null, user: null})
    }
     
}))