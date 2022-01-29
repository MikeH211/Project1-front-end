import { useEffect, useState } from "react";
import { Reimbursement, Employee } from "../dtos/dtos";
import ReimbursementRows from "./empl-reimb-rows";

export default function EmployeePastReimbursementsPage() {
  const [reimbursements, setReimbursements] = useState([]);
  const tableRows = reimbursements.map((r) => (
    <ReimbursementRows key={r.id} {...r} />
  ));
  const id = sessionStorage.getItem("id");

  async function getReimbursements() {
    const response = await fetch(
      `http://679c-2600-1702-1af0-13a0-b9e9-833d-c2bd-4724.ngrok.io/employees/${id}/reimbursements`
    );
    const reimbursements: Reimbursement[] = await response.json();
    setReimbursements(reimbursements);
  }

  useEffect(() => {
    getReimbursements();
  }, []);

  return (
    <>
      <h1>Your Past Reimbursements</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
}
