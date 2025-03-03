import Feature from "@/components/Feature";
import Hero from "@/components/Hero";
import Packages from "@/components/Packages";
// import SereneHavenLodge from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto">
      <Hero />
      <Feature />
      <Packages />
      {/* <Image /> */}
      {/* <SereneHavenLodge /> */}
    </main>
  );
}
