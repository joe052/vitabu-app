import type { Metadata } from "next";
import ProfileForm from "./_components/ProfileForm";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = () => {
  /**COMPONENT */
  return (
    <div className="max-w-2xl">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="muted mt-1 text-sm">Your account details.</p>
      </header>
      <ProfileForm />
    </div>
  );
};

export default SettingsPage;
