import { useGlobalContext } from "@/context/globalContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
export const useAuth = () => {
    const router = useRouter()
    const { isAuthenticated } = useGlobalContext()
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated,router])
}