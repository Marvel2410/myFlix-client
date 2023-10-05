import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    //if (username && password) {
    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movies-myflix-85528af4e39c.herokuapp.com/login", {
      //currently do not have enpoint for login
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
        if (data.user) {
          onLoggedIn(data.user, data.token);
        } else {
          alert("User does not exist");
        }
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          minLength='5'
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength='6'
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
