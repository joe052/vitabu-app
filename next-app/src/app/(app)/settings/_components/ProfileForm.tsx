"use client";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

/** Read-only for now. Add an `updateProfile` mutation in store/api/authApi.ts to make it editable. */
const ProfileForm = () => {
  /**VARIABLES */
  const { user } = useAuth();

  /**COMPONENT */
  return (
    <Card
      className="mt-8"
      title="Profile"
      footer={
        <p className="muted text-xs">
          Profile editing is not connected to the API yet.
        </p>
      }
    >
      <div className="flex flex-col gap-5">
        <Input
          id="profile-name"
          name="name"
          label="Name"
          defaultValue={user?.name}
          readOnly
        />
        <Input
          id="profile-email"
          name="email"
          label="Email"
          type="email"
          defaultValue={user?.email}
          readOnly
        />
      </div>
    </Card>
  );
};

export default ProfileForm;
