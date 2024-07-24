import { clients } from '@barber/core'
import { LayoutGrid } from '../ui/layout-grid'
import { ItemClient} from './item-client'
import { Title } from '../shared/title'

export  function OurClients() {
    const classes = ['md:col-span-2', 'col-span-1', 'col-span-1', 'md:col-span-2']
    const cards = clients.map((client, i) => {
        return {
            id: client.id,
            content: <ItemClient name={client.name} testimony={client.testimony} />,
            className: classes[i],
            thumbnail: client.imagemURL,
        }
    })

    return (
        <div className="container flex flex-col items-center gap-16">
            <Title
                tag="Clientes"
                primary="Quem Manda Aqui"
                secondary="Nossos clientes são os chefes! Aqui, eles mandam, desmandam e ainda saem com estilo de rockstar!"
            />
            <div className="h-[900px] w-full">
                <LayoutGrid cards={cards} />
            </div>
        </div>
    )
}
