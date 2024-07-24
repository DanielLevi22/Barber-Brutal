import { Footer } from './footer'

export interface PaginaProps {
    children: React.ReactNode
}
export function Pagina(props: PaginaProps) {
    return (
        <div className="flex flex-col min-h-screen w-screen">
            <main>{props.children}</main>
            <Footer />
        </div>
    )
}
