import { Employee } from "../dtos/dtos";
import SubmitReimbursementForm from "./submit-reimbursement-form";

export default function ReimbursementSubmissionPage(props: {
  employee: Employee;
}) {
  const employee = props.employee;

  return (
    <>
      <h1>Reimbursement Submission Page</h1>
      <SubmitReimbursementForm employee={employee} />
    </>
  );
}
