import { Button, Card, Checkbox, Input, Link, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const [formData, setFormData] = useState({
    // ... same state as before
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users", formData);

      console.log("User added:", response.data);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <DefaultLayout>
      <div className="py-10">
        <Card className="p-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              isRequired
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />

            <Input
              isRequired
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            />

            <Select label="Gender" value={formData.gender} onChange={(e) => handleChange("gender", e.target.value)}>
              <SelectItem key="male" value="male">
                Male
              </SelectItem>
              <SelectItem key="female" value="female">
                Female
              </SelectItem>
              <SelectItem key="other" value="other">
                Other
              </SelectItem>
            </Select>

            <Input
              isRequired
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
              <Input
                label="Address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="City" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} />
              <Input label="State" value={formData.state} onChange={(e) => handleChange("state", e.target.value)} />
              <Input
                label="Postal Code"
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
              />
            </div>

            <Input label="Country" value={formData.country} onChange={(e) => handleChange("country", e.target.value)} />

            <Input
              label="Current Job Title"
              value={formData.currentJobTitle}
              onChange={(e) => handleChange("currentJobTitle", e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Resume URL"
                type="url"
                value={formData.resumeUrl}
                onChange={(e) => handleChange("resumeUrl", e.target.value)}
              />
              <Input
                label="LinkedIn URL"
                type="url"
                value={formData.linkedInUrl}
                onChange={(e) => handleChange("linkedInUrl", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Cover Letter URL"
                type="url"
                value={formData.coverLetterUrl}
                onChange={(e) => handleChange("coverLetterUrl", e.target.value)}
              />
              <Input
                label="Profile Picture URL"
                type="url"
                value={formData.profilePictureUrl}
                onChange={(e) => handleChange("profilePictureUrl", e.target.value)}
              />
            </div>

            <Input
              label="Job Type Preferences"
              value={formData.jobTypePreferences}
              onChange={(e) => handleChange("jobTypePreferences", e.target.value)}
            />

            <Input
              label="Availability Start"
              type="date"
              value={formData.availabilityStart}
              onChange={(e) => handleChange("availabilityStart", e.target.value)}
            />

            <Checkbox
              isSelected={formData.willingToRelocate}
              onValueChange={(checked) => handleChange("willingToRelocate", checked)}
            >
              Willing to Relocate
            </Checkbox>

            <div className="flex gap-4">
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button as={Link} href="/users" variant="bordered">
                View Users
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DefaultLayout>
  );
}
