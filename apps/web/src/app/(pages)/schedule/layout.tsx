import { ForceUser } from '@/components/shared/force-user'
import {Pagina} from '@/components/shared/page'

export default function Layout(props: any) {
    return (
        <ForceUser>
                <Pagina>{props.children}</Pagina>
        </ForceUser>
    )
}
