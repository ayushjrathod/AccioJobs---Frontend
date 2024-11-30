import { Button, Card, Checkbox, Input, Link, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

const validateFileSize = (file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size cannot exceed ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }
  return true;
};

export default function IndexPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    currentJobTitle: "",
    resume: null,
    linkedInUrl: "",
    coverLetter: null,
    profilePicture: null,
    jobTypePreferences: "",
    availabilityStart: "",
    willingToRelocate: false,
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
      const formDataToSend = { ...formData };

      if (formData.resume) {
        validateFileSize(formData.resume);
        const base64Resume = await fileToBase64(formData.resume);
        formDataToSend.resume = base64Resume;
      }
      if (formData.coverLetter) {
        validateFileSize(formData.coverLetter);
        const base64CoverLetter = await fileToBase64(formData.coverLetter);
        formDataToSend.coverLetter = base64CoverLetter;
      }
      if (formData.profilePicture) {
        validateFileSize(formData.profilePicture);
        const base64ProfilePic = await fileToBase64(formData.profilePicture);
        formDataToSend.profilePicture = base64ProfilePic;
      }

      const response = await axios.post("http://localhost:3000/api/users", formDataToSend);
      console.log("User added:", response.data);
      navigate("/");
    } catch (error: any) {
      alert("Error: " + (error.response?.data?.error || error.message));
    }
  };

  // Helper function to convert File to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <DefaultLayout>
      <div className="py-2">
        <h1 className="py-2 my-2 text-xl">Fill User Details for one last time!</h1>
        <Card className="p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              isRequired
              label="Full Name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />

            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                isRequired
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <Input
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
            </div>
            <Input label="Address" value={formData.address} onChange={(e) => handleChange("address", e.target.value)} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input label="City" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} />
              <Input label="State" value={formData.state} onChange={(e) => handleChange("state", e.target.value)} />
              <Input
                label="Postal Code"
                value={formData.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
              />
              <Input
                label="Country"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Current Job Title"
                value={formData.currentJobTitle}
                onChange={(e) => handleChange("currentJobTitle", e.target.value)}
              />

              <Input
                label="LinkedIn URL"
                type="url"
                value={formData.linkedInUrl}
                onChange={(e) => handleChange("linkedInUrl", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Resume" type="file" onChange={(e) => handleChange("resume", e.target.files[0])} />
              <Input
                label="Cover Letter"
                type="file"
                onChange={(e) => handleChange("coverLetter", e.target.files[0])}
              />
              <Input
                label="Profile Picture"
                type="file"
                onChange={(e) => handleChange("profilePicture", e.target.files[0])}
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
