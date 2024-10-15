import { Calendar, Contact, FileText, Settings } from "lucide-react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex px-4">
      <DashboardSidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;

const DashboardSidebar = () => {
  return (
    <aisde className="h-screen w-56  border-r-2 py-4 pr-4">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold font-mono">AllSpark</p>
        <div className="flex flex-col gap-2">
          <span
            href="/dashboard"
            className="flex items-center gap-2 bg-gray-200 rounded-md px-2 py-1"
          >
            <FileText className="h-4 w-4" />
            Matter Hub
          </span>

          <span href="/dashboard/contacts" className="flex items-center gap-2 hover:bg-gray-200 rounded-md px-2 py-1">
            <Contact className="h-4 w-4" />
            Contacts
          </span>

          <span href="/dashboard/calendar" className="flex items-center gap-2 hover:bg-gray-200 rounded-md px-2 py-1">
            <Calendar className="h-4 w-4" />
            Calendar
          </span>

          <span
            className="flex items-center gap-2 hover:bg-gray-200 rounded-md px-2 py-1"
          >
            <Settings className="h-4 w-4" />
            Settings
          </span>
        </div>
      </div>
    </aisde>
  );
};
