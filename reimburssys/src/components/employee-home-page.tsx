import ReimbursementSubmissionPage from "./reimbursement-submission-page";
import { useNavigate } from "react-router-dom";
import { Employee } from "../dtos/dtos";

export default function EmployeeHomePage(props: { employee: Employee }) {
  const employee = props.employee;

  let navigate = useNavigate();

  return (
    <>
      <h1>Employee Home Page</h1>
      <ReimbursementSubmissionPage employee={employee} />
      <br />
      <br />
      <button
        className="btn btn-info"
        onClick={() => {
          navigate("/employees/pastreimbs");
        }}
      >
        View Past Reimbursements
      </button>
    </>
  );
}
