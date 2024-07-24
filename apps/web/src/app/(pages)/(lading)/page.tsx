import { ServicesOverview } from "@/components/service/services-overview";
import ContainerBackground from "@/components/shared/container-background";
import {SloganTitle} from "@/components/TituloSlogan";

export default function Home() {
  return (
    <main>
     <SloganTitle />
     <ContainerBackground>
        <ServicesOverview />
     </ContainerBackground>
    </main>
  );
}
