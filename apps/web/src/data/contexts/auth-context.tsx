'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@barber/core'
import {useLocalStorage} from '../hooks/use-local-storage'

export interface AuthContextProps {
    carregando: boolean
    user: User | null
    entrar: (user: User) => Promise<void>
    sair: () => void

}

export const useAuthContext = createContext<AuthContextProps>({} as any)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { get, set } = useLocalStorage()
    const router = useRouter()
    const [carregando, setCarregando] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    const loadingUser = useCallback(
        function () {
            try {
                const userLocal = get('user')
                if (userLocal) {
                    setUser(userLocal)
                }
            } finally {
                setCarregando(false)
            }
        },
        [get]
    )

    async function entrar(user: User) {
        setUser(user)
        set('user', user)
    }

    function sair() {
        router.push('/')
        setUser(null)
        set('user', null)
    }

    useEffect(() => loadingUser(), [loadingUser])

    return (
        <useAuthContext.Provider
            value={{
                carregando,
                user,
                entrar,
                sair,
            }}
        >
            {children}
        </useAuthContext.Provider>
    )
}

