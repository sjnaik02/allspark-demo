import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function Configure() {
  return (
    <div className="p-6">
      <Alert variant="warning" className="mb-6">
        <AlertTitle>Under Development</AlertTitle>
        <AlertDescription>
          This page is currently under development. Check back later for updates.
        </AlertDescription>
      </Alert>
      <h1 className="text-3xl font-bold">Settings</h1>
      {/* Add your settings content here */}
    </div>
  );
}