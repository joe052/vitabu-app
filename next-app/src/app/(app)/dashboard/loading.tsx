import StateLoading from "@/components/ui/StateLoading";

/** Shown automatically by Next.js while the dashboard route loads. */
const DashboardLoading = () => {
  return <StateLoading label="Loading dashboard..." />;
};

export default DashboardLoading;
