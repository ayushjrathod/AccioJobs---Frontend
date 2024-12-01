import DefaultLayout from "@/layouts/default";
import { Card } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
        {users.map((user) => (
          <Card key={user.id} style={{ width: "300px", margin: "16px" }}>
            <div style={{ padding: "16px" }}>
              <h4>{user.fullName}</h4>
              <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
              <p>Gender: {user.gender}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phoneNumber}</p>
              <p>Address: {user.address}</p>
              <p>City: {user.city}</p>
              <p>State: {user.state}</p>
              <p>Postal Code: {user.postalCode}</p>
              <p>Country: {user.country}</p>
              <p>Job Title: {user.currentJobTitle}</p>
              <p>Job Type Preferences: {user.jobTypePreferences}</p>
              <p>
                Availability Start:{" "}
                {user.availabilityStart ? new Date(user.availabilityStart).toLocaleDateString() : "N/A"}
              </p>
              <p>Willing to Relocate: {user.willingToRelocate ? "Yes" : "No"}</p>
              <p>Skills: {user.skills.join(", ")}</p>
              <p>References: {user.references.join(", ")}</p>
              <p>Interested Categories: {user.intrestedCategories.join(", ")}</p>
              <p>
                LinkedIn:{" "}
                <a href={user.linkedInUrl} target="_blank" rel="noopener noreferrer">
                  {user.linkedInUrl}
                </a>
              </p>
            </div>
          </Card>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Users;
