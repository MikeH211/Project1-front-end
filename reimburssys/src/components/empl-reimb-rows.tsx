import { useNavigate, useParams } from "react-router-dom";
import { Reimbursement } from "../dtos/dtos";
import { useState, useEffect } from "react";

export default function ReimbursementRows(props: Reimbursement) {
  const { requestDate, amount, reason, status } = props;

  return (
    <tr>
      <td>{requestDate}</td>
      <td>${amount}</td>
      <td>{status}</td>
      <td>{reason}</td>
      <td></td>
    </tr>
  );
}
