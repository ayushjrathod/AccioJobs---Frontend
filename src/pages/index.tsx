import DefaultLayout from "@/layouts/default";
import { Button, Card, Checkbox, Input, Link, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const categories = [
  "All Other Remote",
  "All others",
  "Back-End Programming",
  "Customer Service",
  "Customer Support",
  "Data Analysis",
  "Design",
  "DevOps / Sysadmin",
  "DevOps and Sysadmin",
  "Finance / Legal",
  "Front-End Programming",
  "Full-Stack Programming",
  "Human Resources",
  "Management and Finance",
  "Marketing",
  "Product",
  "Project Management",
  "QA",
  "Sales / Business",
  "Sales and Marketing",
  "Software Development",
  "Writing",
];

const skills = ["JavaScript", "React", "Node.js", "Python", "TypeScript", "Java", "SQL"];

interface Education {
  degree: string;
  fieldOfStudy?: string;
  institutionName?: string;
  startDate?: string;
  endDate?: string;
}

interface WorkExperience {
  companyName: string;
  position: string;
  startDate: string;
  endDate?: string;
}

interface FormData {
  fullName: string;
  dateOfBirth: string;
  gender?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  currentJobTitle?: string;
  resume?: File | null;
  linkedInUrl?: string;
  coverLetter?: File | null;
  profilePicture?: File | null;
  jobTypePreferences?: string;
  availabilityStart?: string;
  willingToRelocate: boolean;
  education: Education[];
  workExperience: WorkExperience[];
  skills: string[];
  references: string[];
  interestedCategories: string[];
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const validateFileSize = (file: File | null) => {
  if (!file) return true;
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size cannot exceed ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }
  return true;
};

export default function IndexPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dateOfBirth: "",
    email: "",
    willingToRelocate: false,
    education: [{ degree: "", fieldOfStudy: "", institutionName: "", startDate: "", endDate: "" }],
    workExperience: [{ companyName: "", position: "", startDate: "", endDate: "" }],
    skills: [],
    references: [],
    interestedCategories: [],
  });

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index: number, name: string, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [name]: value };
    setFormData((prev) => ({ ...prev, education: newEducation }));
  };

  const handleWorkExperienceChange = (index: number, name: string, value: string) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index] = { ...newWorkExperience[index], [name]: value };
    setFormData((prev) => ({ ...prev, workExperience: newWorkExperience }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "" }],
    }));
  };

  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, { companyName: "", position: "", startDate: "" }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend: any = { ...formData };

      // Handle files
      if (formData.resume) {
        validateFileSize(formData.resume);
        formDataToSend.resume = await fileToBase64(formData.resume);
      }
      if (formData.coverLetter) {
        validateFileSize(formData.coverLetter);
        formDataToSend.coverLetter = await fileToBase64(formData.coverLetter);
      }
      if (formData.profilePicture) {
        validateFileSize(formData.profilePicture);
        formDataToSend.profilePicture = await fileToBase64(formData.profilePicture);
      }

      // Convert dates
      if (formData.dateOfBirth) {
        formDataToSend.dateOfBirth = new Date(formData.dateOfBirth).toISOString();
      }
      if (formData.availabilityStart) {
        formDataToSend.availabilityStart = new Date(formData.availabilityStart).toISOString();
      }

      // Handle education dates
      formDataToSend.education = formData.education.map((edu) => ({
        ...edu,
        startDate: edu.startDate ? new Date(edu.startDate).toISOString() : null,
        endDate: edu.endDate ? new Date(edu.endDate).toISOString() : null,
      }));

      // Handle work experience dates
      formDataToSend.workExperience = formData.workExperience.map((exp) => ({
        ...exp,
        startDate: new Date(exp.startDate).toISOString(),
        endDate: exp.endDate ? new Date(exp.endDate).toISOString() : null,
      }));

      // Clean up undefined/null values
      Object.keys(formDataToSend).forEach((key) => {
        if (formDataToSend[key] === undefined || formDataToSend[key] === null) {
          delete formDataToSend[key];
        }
      });

      try {
        const response = await axios.post("http://localhost:3000/api/users", formDataToSend);
        console.log("User added:", response.data);
        navigate("/");
      } catch (error: any) {
        console.error("Submission error:", error);
        alert("Error: " + (error.response?.data?.error || error.message));
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      alert("Error: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <DefaultLayout>
      <div className="py-2">
        <h1 className="py-2 my-2 text-xl">Fill User Details</h1>
        <Card className="p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              isRequired
              label="Full Name"
              value={formData.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                isRequired
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              />
              <Select label="Gender" value={formData.gender} onChange={(e) => handleChange("gender", e.target.value)}>
                {["male", "female", "other"].map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                isRequired
                label="Email"
                type="email"
                value={formData.email || ""}
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

            <Select
              label="Job Type Preferences"
              placeholder="Select job type"
              className="max-w-xs"
              value={formData.jobTypePreferences}
              onChange={(value) => handleChange("jobTypePreferences", value)}
            >
              <SelectItem key="full-time" value="full-time">
                Full Time
              </SelectItem>
              <SelectItem key="part-time" value="part-time">
                Part Time
              </SelectItem>
              <SelectItem key="contract" value="contract">
                Contract
              </SelectItem>
              <SelectItem key="freelance" value="freelance">
                Freelance
              </SelectItem>
              <SelectItem key="internship" value="internship">
                Internship
              </SelectItem>
            </Select>

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

            <div>
              <h2 className="text-lg font-semibold mb-2">Education</h2>
              {formData.education.map((edu, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <Input
                    label="Degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                  />
                  <Input
                    label="Field of Study"
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleEducationChange(index, "fieldOfStudy", e.target.value)}
                  />
                  <Input
                    label="Institution Name"
                    value={edu.institutionName}
                    onChange={(e) => handleEducationChange(index, "institutionName", e.target.value)}
                  />
                  <Input
                    label="Start Date"
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                  />
                  <Input
                    label="End Date"
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                  />
                </div>
              ))}
              <Button color="secondary" variant="bordered" onClick={addEducation}>
                Add More Education
              </Button>
            </div>

            {/* Work Experience Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
              {formData.workExperience.map((exp, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <Input
                    label="Company Name"
                    value={exp.companyName}
                    onChange={(e) => handleWorkExperienceChange(index, "companyName", e.target.value)}
                  />
                  <Input
                    label="Position"
                    value={exp.position}
                    onChange={(e) => handleWorkExperienceChange(index, "position", e.target.value)}
                  />
                  <Input
                    label="Start Date"
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleWorkExperienceChange(index, "startDate", e.target.value)}
                  />
                  <Input
                    label="End Date"
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => handleWorkExperienceChange(index, "endDate", e.target.value)}
                  />
                </div>
              ))}
              <Button color="secondary" variant="bordered" onClick={addWorkExperience}>
                Add More Work Experience
              </Button>
            </div>

            {/* Skills Section */}
            <Select
              label="Skills"
              placeholder="Select skills"
              selectionMode="multiple"
              value={new Set(formData.skills || [])}
              onChange={(value) => handleChange("skills", Array.from(value))}
            >
              {["JavaScript", "React", "Node.js", "Python", "TypeScript", "Java", "SQL"].map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </Select>

            {/* References Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">References</h2>
              {formData.references.map((ref, index) => (
                <Input
                  key={index}
                  label={`Reference ${index + 1}`}
                  value={ref}
                  onChange={(e) => {
                    const newReferences = [...formData.references];
                    newReferences[index] = e.target.value;
                    handleChange("references", newReferences);
                  }}
                  className="mb-2"
                />
              ))}
              <Button
                color="secondary"
                variant="bordered"
                onClick={() => handleChange("references", [...formData.references, ""])}
              >
                Add Reference
              </Button>
            </div>

            {/* Interested Categories Section */}
            <Select
              label="Interested Categories"
              placeholder="Select categories"
              selectionMode="multiple"
              value={new Set(formData.interestedCategories)}
              onChange={(value) => handleChange("interestedCategories", Array.from(value))}
            >
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>

            <div className="flex gap-4">
              <Button onClick={handleSubmit} color="primary" type="submit">
                Submit
              </Button>
              <Button as={Link} href="/get-users" variant="bordered">
                View Users
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DefaultLayout>
  );
}
