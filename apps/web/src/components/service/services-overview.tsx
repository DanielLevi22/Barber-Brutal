'use client'
import {  Service } from '@barber/core'
import { useRouter } from 'next/navigation'
import {ItemService} from './item-service'
import { Title } from '../shared/title'
import { useServices } from '@/data/hooks/use-service'

export  function ServicesOverview() {
    const router = useRouter()
    const { service } = useServices()

    function iniciarAgendamento() {
        router.push('/schedule')
    }

    return (
        <div className="flex flex-col gap-16">
            <Title
                tag="Serviços"
                primary="Do Classico ao Rock"
                secondary="Cabelo afiado, barba de lenhador e mãos de motoqueiro, tudo ao som de rock pesado!"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {service.map((item: Service) => (
                    <ItemService key={item.id} service={item} onClick={iniciarAgendamento} />
                ))}
            </div>
        </div>
    )
}
