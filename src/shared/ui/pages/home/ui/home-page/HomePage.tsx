import { HomeHero } from "../home-hero/HomeHero";
import { HomeAbout } from "../home-about/HomeAbout";

import { Fag } from "@/shared/ui";

import { ProgramsSection } from "@/widgets/programs/ui";
import { TeamsSection } from "@/widgets/teams/ui";

export const HomePage = () => {
  return (
    <>
      <HomeHero />

      <HomeAbout />

      <ProgramsSection />

      <TeamsSection />

      <Fag />
    </>
  );
};

export default HomePage
