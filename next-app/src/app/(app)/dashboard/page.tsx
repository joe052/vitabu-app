import type { Metadata } from "next";
import ProjectList from "./_components/ProjectList";
import ProjectStats from "./_components/ProjectStats";
import WelcomeHeader from "./_components/WelcomeHeader";

export const metadata: Metadata = {
  title: "Dashboard",
};

/**
 * The page stays a Server Component (so it can export metadata).
 * The interactive, data-fetching parts are Client Components in ./_components.
 */
const DashboardPage = () => {
  /**COMPONENT */
  return (
    <>
      <WelcomeHeader />
      <ProjectStats />
      <ProjectList />
    </>
  );
};

export default DashboardPage;
