import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function TopHuntersPage() {
  const [topUsers, setTopUsers] = useState([]);

  const getTopUsers = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/users/count`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setTopUsers(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTopUsers();
  }, []);

  return (
    <>
      <h1>Estos putos conocen mil estadios</h1>

      {topUsers.map((user) => (
        <>
          <h2>{user.name}</h2>
          <p>"Stadiums Hunted :{user.huntedStadiums.length}"</p>
        </>
      ))}
    </>
  );
}

export default TopHuntersPage;
