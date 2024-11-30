import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface JobDetailsProps {
  title: string;
  description: string;
  resumeUrl: string;
  company: string;
  location: string;
  salary: string;
}

export default function JobDetails({ title, description, resumeUrl, company, location, salary }: JobDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Function to limit description to 300 words
  const limitDescription = (text: string = "", limit: number) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  const handleEditClick = () => {
    navigate("/edit/resume");
  };

  return (
    <div className="max-w-4xl mx-auto p-2">
      <Card className="p-4">
        <CardHeader className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-default-500">{company}</p>
          </div>
          <Chip color="primary">{salary}</Chip>
        </CardHeader>

        <Divider className="my-4" />

        <CardBody>
          <p className="text-default-600">{limitDescription(description, 300)}</p>
          <div className="mt-4">
            <Chip variant="flat" className="mr-2">
              {location}
            </Chip>
          </div>
        </CardBody>

        <CardFooter className="flex gap-4">
          <Button color="primary" onPress={() => setIsOpen(true)} aria-label="View Resume">
            View Resume
          </Button>
          <Button color="secondary" variant="bordered" onPress={handleEditClick} aria-label="Edit Resume">
            Edit Resume
          </Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="2xl" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Resume</ModalHeader>
          <ModalBody>
            <iframe src={resumeUrl} className="w-full h-[80vh]" title="Resume PDF" />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
