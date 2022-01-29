import { useEffect, useState } from "react";
import { Reimbursement } from "../dtos/dtos";
import ReimbursementRow from "./reimbursement-row";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import ManagerStatsTable from "./Manager-stats-table";
import { propTypes } from "react-bootstrap/esm/Image";

export default function ReimbursementTable() {
  const [reimbursements, setReimbursements] = useState([]);
  const [showButton, setShowButton] = useState(true);

  const tableRows = reimbursements.map((r) => (
    <ReimbursementRow key={r.id} {...r} />
  ));
  const navigate = useNavigate();

  async function getReimbursements() {
    const response = await fetch(
      "http://679c-2600-1702-1af0-13a0-b9e9-833d-c2bd-4724.ngrok.io/reimbursements"
    );
    const reimbursements: Reimbursement[] = await response.json();
    setReimbursements(reimbursements);
  }

  useEffect(() => {
    getReimbursements();
  }, []);

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr className="table-secondary">
            <th scope="col">DATE</th>
            <th scope="col">AMOUNT</th>
            <th scope="col">STATUS</th>
            <th scope="col">REASON</th>
          </tr>
        </thead>
        <tbody className="text-warning">{tableRows}</tbody>
        <Routes>
          <Route
            path="/stats"
            element={<ManagerStatsTable reimbursements={reimbursements} />}
          />
        </Routes>

        {showButton && (
          <button
            className="btn btn-lg btn-primary"
            onClick={() => {
              navigate("/managers/stats");
              setShowButton(!showButton);
            }}
          >
            View Reimbursement Stats
          </button>
        )}
      </table>
    </>
  );
}
