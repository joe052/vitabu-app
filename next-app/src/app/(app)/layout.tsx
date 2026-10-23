import AuthGuard from "./_components/AuthGuard";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";

/** Layout for the signed-in area: every page in (app) gets the auth check, sidebar and top bar. */
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="page flex-1">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
};

export default AppLayout;
