import {Footer} from "@/components/shared/footer";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
        <div className="flex flex-col min-h-screen w-screen">
          <main>{children}</main>
          <Footer />
       </div>
  )

}