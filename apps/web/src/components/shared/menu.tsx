'use client'

import Link from 'next/link'
import Logo from './logo'
import MenuUsuario from './user-menu'
import  { useAuth } from '@/data/hooks/use-User'

export  function Menu() {
    const { user } = useAuth()

    return (
        <header className="self-stretch flex justify-center items-center h-24 bg-black/60">
            <nav className="flex items-center justify-between container">
                <Logo />
                <div>
                    {user ? (
                        <MenuUsuario usuario={user} />
                    ) : (
                        <Link href="/entrar">Entrar</Link>
                    )}
                </div>
            </nav>
        </header>
    )
}
