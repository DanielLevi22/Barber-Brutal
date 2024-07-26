'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/data/hooks/use-User'

export  function ForceUser(props: any) {
    const { loading, user } = useAuth()
    const caminho = usePathname()
    const router = useRouter()

    function redirecionarPara(url: string) {
        router.push(url)
        return <div className="flex justify-center items-center h-screen">Direcionando...</div>
    }

    if (!user?.email && loading) return <div>loading...</div>
    if (!user?.email) return redirecionarPara(`/entrar?destino=${caminho}`)

    return props.children
}
