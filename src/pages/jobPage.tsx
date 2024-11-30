import DefaultLayout from "@/layouts/default";
import JobDetails from "../components/jobdetails";

export default function JobPage() {
  const jobData = [
    {
      id: 1,
      title: "Software Engineer",
      description:
        "We are seeking a talented Software Engineer to join our dynamic team. The ideal candidate will have a strong background in web development, with expertise in React, Node.js, and database technologies. You will be responsible for designing, developing, and maintaining high-performance web applications. Collaboration with cross-functional teams, including product managers and designers, is crucial in this role. We value innovation, clean code practices, and a passion for solving complex problems. If you're excited about creating cutting-edge software solutions and thrive in a fast-paced environment, we want to hear from you!",
      resumeUrl: "/sample-resume.pdf",
      company: "Tech Corp Inc.",
      location: "San Francisco, CA",
      salary: "$120,000 - $160,000",
    },
    {
      id: 2,
      title: "Frontend Developer",
      description:
        "Looking for an experienced Frontend Developer proficient in React, TypeScript and modern CSS. Must have strong UI/UX sensibilities and experience with responsive design.",
      resumeUrl: "/frontend-resume.pdf",
      company: "Digital Solutions Ltd",
      location: "Remote",
      salary: "$100,000 - $140,000",
    },
    {
      id: 3,
      title: "Backend Developer",
      description:
        "We are looking for a Backend Developer to join our team. The ideal candidate will have experience with Node.js, Express, and MongoDB. You will be responsible for building scalable APIs and integrating with third-party services. Strong problem-solving skills and attention to detail are essential for this role. If you enjoy working on complex systems and have a passion for backend development, we want to hear from you!",
      resumeUrl: "/backend-resume.pdf",
      company: "Cloud Innovations Inc.",
      location: "New York, NY",
      salary: "$110,000 - $150,000",
    },
    {
      id: 4,
      title: "Full Stack Developer",
      description:
        "We are seeking a Full Stack Developer to join our team. The ideal candidate will have experience with both frontend and backend technologies, including React, Node.js, and SQL databases. You will be responsible for designing and implementing end-to-end solutions for our web applications. Collaboration with cross-functional teams is key in this role. If you're passionate about building innovative software products and thrive in a collaborative environment, we want to hear from you!",
      resumeUrl: "/fullstack-resume.pdf",
      company: "Code Solutions Ltd",
      location: "Austin, TX",
      salary: "$120,000 - $160,000",
    },
  ];

  return (
    <DefaultLayout>
      <div className="py-2">
        <h1 className="py-2 my-2 text-xl">Job Details</h1>
        {jobData.map((job) => (
          <JobDetails
            key={job.id}
            title={job.title}
            description={job.description}
            resumeUrl={job.resumeUrl}
            company={job.company}
            location={job.location}
            salary={job.salary}
          />
        ))}
      </div>
    </DefaultLayout>
  );
}
