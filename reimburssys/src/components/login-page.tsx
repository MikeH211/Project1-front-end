import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage(props: {
  updateUser: Function;
  setEmployee: Function;
}) {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const navigate = useNavigate();

  async function login() {
    const loginPayload = {
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    };
    const response = await fetch(
      "http://679c-2600-1702-1af0-13a0-b9e9-833d-c2bd-4724.ngrok.io/login",
      {
        method: "PATCH",
        body: JSON.stringify(loginPayload),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    const employee = await response.json();

    props.setEmployee(employee);

    props.updateUser({
      username: employee.username,
      isManager: employee.isManager,
      id: employee.id,
    });

    sessionStorage.setItem("username", employee.username);
    sessionStorage.setItem("id", employee.id);
    sessionStorage.setItem("isManager", `${employee.isManager}`);

    if (employee.isManager) {
      navigate("/managers");
    } else {
      navigate("/employees");
    }
  }

  return (
    <>
      <h1>Login page</h1>
      <label htmlFor="usernameInput">Username</label>
      <input ref={usernameInput} type="text" id="usernameInput" />
      <label htmlFor="passwordInput">Password</label>
      <input ref={passwordInput} type="password" id="passwordInput" />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button className="btn btn-secondary" onClick={login}>
        login
      </button>
    </>
  );
}
