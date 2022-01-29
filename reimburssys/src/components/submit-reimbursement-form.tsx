import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Employee, Reimbursement } from "../dtos/dtos";

export default function SubmitReimbursementForm(props: { employee: Employee }) {
  const { id, username, password, fname, lname, isManager, reimbursements } =
    props.employee;
  const amountInput = useRef(null);
  const reasonInput = useRef(null);
  const dateInput = useRef(null);

  const navigate = useNavigate();

  async function submitReimbursement() {
    const reimbursement: Reimbursement = {
      id: "",
      amount: amountInput.current.value,
      reason: reasonInput.current.value,
      status: "",
      message: "",
      requestDate: dateInput.current.value,
    };

    const response = await fetch(
      `http://679c-2600-1702-1af0-13a0-b9e9-833d-c2bd-4724.ngrok.io/employees/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(reimbursement),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    // if(response.status === 201){
    //     alert("your reimbursement request has been submitted")
    // }else{
    //     alert("Error occurred, your request hasn't been submitted")
    // }
    // navigate("/employees/receipt")
  }

  return (
    <>
      <h3>Submit New Reimbursement</h3>

      <label htmlFor="amount">Amount:&nbsp;</label>
      <input ref={amountInput} type="text" id="amount" placeholder="0.0" />
      <br />
      <br />
      <label htmlFor="reason">Reason:&nbsp;&nbsp;&nbsp;</label>
      <input
        ref={reasonInput}
        type="text"
        id="reason"
        placeholder="work trip"
      />
      <br />
      <br />
      <label htmlFor="date">Date:&nbsp;&nbsp;&nbsp;</label>
      <input ref={dateInput} type="text" id="date" placeholder="01-01-2021" />
      <br />
      <br />
      <Link to="/receipt">
        <button className="btn btn-secondary" onClick={submitReimbursement}>
          Submit
        </button>
      </Link>
    </>
  );
}
