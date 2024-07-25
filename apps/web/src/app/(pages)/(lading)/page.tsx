import { OurClients } from "@/components/client/our-clients";
import OurProfessionals from "@/components/professional/our-professionals";
import { ServicesOverview } from "@/components/service/services-overview";
import ContainerBackground from "@/components/shared/container-background";
import {SloganTitle} from "@/components/TituloSlogan";

export default function Home() {
  return (
    <main>
     <SloganTitle />
     <ContainerBackground image="/banners/servicos.webp">
        <ServicesOverview />
     </ContainerBackground>
     <ContainerBackground image="/banners/profissionais.webp">
        <OurProfessionals />
     </ContainerBackground>
     <ContainerBackground image="/banners/clientes.webp">
        <OurClients/>
     </ContainerBackground>

    </main>
  );
}
