import TopAnnouncement from "@/components/TopAnnoucement";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Menu from "@/components/Menu";
import VisitUs from "@/components/VisitUs";
export default function Home() {
  return (
    <main>
      <TopAnnouncement />
      <Header />
      <Hero />
      <Story />
      <Menu />
      <VisitUs />
    </main>
  );
}
