'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@barber/core'
import {useLocalStorage} from '../hooks/use-local-storage'

export interface AuthContextProps {
    loading: boolean
    user: User | null
    signIn: (user: User) => Promise<void>
    signOut: () => void

}

export const useAuthContext = createContext<AuthContextProps>({} as any)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { get, set } = useLocalStorage()
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    const loadingUser = useCallback(
        function () {
            try {
                const userLocal = get('user')
                if (userLocal) {
                    setUser(userLocal)
                }
            } finally {
                setLoading(false)
            }
        },
        [get]
    )

    async function signIn(user: User) {
        setUser(user)
        set('user', user)
    }

    function signOut() {
        router.push('/')
        setUser(null)
        set('user', null)
    }

    useEffect(() => loadingUser(), [loadingUser])

    return (
        <useAuthContext.Provider
            value={{
                loading,
                user,
                signIn,
                signOut,
            }}
        >
            {children}
        </useAuthContext.Provider>
    )
}

