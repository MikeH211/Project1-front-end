import { useEffect, useState } from "react";
import { Employee, Reimbursement } from "../dtos/dtos";

export default function ManagerStatsTable(props: {
  reimbursements: Reimbursement[];
}) {
  const reimbursements = props.reimbursements;

  const [mostSpender, setMostSpender] = useState(null);
  const [highestReimbursements, setHighestReimbursement] = useState(null);
  const [averageReimbursement, setAverageReimburusement] = useState(null);

  async function getEmployees() {
    const response = await fetch(
      "http://679c-2600-1702-1af0-13a0-b9e9-833d-c2bd-4724.ngrok.io/employees"
    );
    const employees: Employee[] = await response.json();

    setMostSpender(findMostSpender(employees));
    setHighestReimbursement(highestReimbursement(employees));
    setAverageReimburusement(getAverageReimbursement(reimbursements));
  }

  useEffect(() => {
    getEmployees();
  }, []);

  function getAverageReimbursement(reimbursements) {
    let total = 0;
    for (let i = 0; i < reimbursements.length; i++) {
      total += reimbursements[i].amount * 1;
    }
    console.log(total);
    return Math.floor(total / reimbursements.length);
  }

  function findMostSpender(employees) {
    let x = [];

    for (let i = 0; i < employees.length; i++) {
      let z = 0;
      employees[i].reimbursements ??= [];
      for (let a = 0; a < employees[i].reimbursements.length; a++) {
        z += Number(employees[i].reimbursements[a].amount);
      }
      x.push(z);
    }
    return (
      employees[x.indexOf(Math.max(...x))].fname +
      " " +
      employees[x.indexOf(Math.max(...x))].lname
    );
  }

  function highestReimbursement(employees) {
    let amountArray: number[] = [];
    for (let i = 0; i < reimbursements.length; i++) {
      amountArray.push(Number(reimbursements[i].amount));
    }
    let highestReimb = Math.max(...amountArray);
    return highestReimb;
  }

  return (
    <>
      <h1>Reimbursement Statistics</h1>
      <br />
      <h3 className="text-warning">
        Highest reimbursement:
        <br />
        {highestReimbursements}
      </h3>
      <br />
      <h3 className="text-warning">
        Employee who spends the most:
        <br />
        {mostSpender}
      </h3>
      <br />
      <h3 className="text-warning">
        Average Reimbursement:
        <br />
        {averageReimbursement}
      </h3>
      <br />
    </>
  );
}
