import { DashboardProvider } from "@/src/context/DashBoardContext";
import { AdminSideBar } from "@src/components/admin/AdminSideBar";

function AdminLayout({ children }) {
  return (
    <div className="flex overflow-hidden text-zinc-200">
      <DashboardProvider>
        <AdminSideBar />
        {children}
      </DashboardProvider>
    </div>
  );
}

export default AdminLayout;

{
  /* <LuCalendar />;
<LuBell />; */
}
