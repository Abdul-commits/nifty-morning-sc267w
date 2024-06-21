import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [planetData, setPlanetData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const allowedCredentials = [
    { username: "Luke Skywalker", password: "19BBY" },
    { username: "Watto", password: "unknown" },
  ];

  const fetchUserData = async () => {
    const planetUrl = "https://swapi.dev/api/planets";
    try {
      const data = await fetch(planetUrl);
      console.log("data", data);
      const responseData = await data.json();
      console.log("responseData", responseData);
      setPlanetData(responseData.results);
      console.log("planetData", planetData);
      navigate("/planet", { state: { planetData: responseData.results } });
    } catch (error) {
      alert("Error fetching data");
    }
  };

  const handleChangeName = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const isValid = allowedCredentials.some(
      (check) => check.username === username && check.password === password,
    );
    if (isValid) {
      fetchUserData();
    } else {
      setError(
        "Invalid username or password / Enter a valid Username: for ex : - Luke Skywalker, Password:19BBY; Username: Watto, Password: unknown",
      );
    }
  };

  return (
    <div className="flex-container">
      <div className="flex">
        <label className="label-login" htmlFor="username">
          Name{" "}
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleChangeName}
        />
      </div>
      <br />
      <div className="flex">
        <label className="label-password" htmlFor="password">
          Password{" "}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <br />
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;
