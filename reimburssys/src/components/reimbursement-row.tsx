import { useNavigate, useParams } from "react-router-dom";
import { Reimbursement } from "../dtos/dtos";
import { useState, useEffect } from "react";
import ReimbursementTable from "./reimbursement-table";

export default function ReimbursementRow(props: Reimbursement) {
  const { requestDate, amount, reason, id } = props;
  const navigate = useNavigate();

  const [status, setStatus] = useState(props.status);

  async function approveStatus() {
    const response = await fetch(
      `http://679c-2600-1702-1af0-13a0-b9e9-833d-c2bd-4724.ngrok.io/reimbursements/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status: "approved" }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updatedReimbursement = await response.json();
    setStatus(updatedReimbursement.status);
  }
  async function denyStatus() {
    const response = await fetch(
      `http://679c-2600-1702-1af0-13a0-b9e9-833d-c2bd-4724.ngrok.io/reimbursements/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status: "denied" }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updatedReimbursement = await response.json();
    setStatus(updatedReimbursement.status);
  }

  return (
    <tr>
      <td>{requestDate}</td>
      <td>${amount}</td>
      <td>{status}</td>
      <td>{reason}</td>
      <td></td>

      <td>
        <button className="btn btn-success" onClick={approveStatus}>
          Approve
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={denyStatus}>
          Deny
        </button>
      </td>
    </tr>
  );
}
