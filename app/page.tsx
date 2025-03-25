import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
import Destinations from "@/components/Destinations";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Feature />
      <Destinations />
      <Packages />
    </main>
  );
}
