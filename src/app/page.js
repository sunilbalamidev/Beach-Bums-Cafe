import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Menu from "@/components/Menu";
import VisitUs from "@/components/VisitUs";
import Footer from "@/components/Footer";
import SeoLocalBusiness from "@/components/SeoLocalBusiness";
import TopAnnouncement from "@/components/TopAnnocement";
import NepaleseDelights from "@/components/NepaleseDelights";
export default function Home() {
  return (
    <main>
      <SeoLocalBusiness />
      <Header />
      <TopAnnouncement />
      <Hero />
      <Story />
      <Menu />
      <NepaleseDelights />
      <VisitUs />
      <Footer />
    </main>
  );
}
