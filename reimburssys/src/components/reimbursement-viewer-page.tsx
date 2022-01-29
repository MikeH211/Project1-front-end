import { useState } from "react";
import ReimbursementTable from "./reimbursement-table";

export default function ReimbursementViewerPage() {
  return (
    <>
      <h1 className="text-primary">Reimbursements Viewer</h1>
      <ReimbursementTable />
    </>
  );
}
