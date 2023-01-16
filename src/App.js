import "./App.css";
import { useState } from 'react';


function App() {
 
  let [issue_id, setIssue_id] = useState(0);
  const [error, setError] = useState('')
 const [issue, setIssue] = useState({
  issue_description: "",
  issue_severity: "Low",
  issue_assigned_to: "",
 });
 const [issues, setIssues] = useState([]);

 function handleChange(evt) {
  const value = evt.target.value;
  setIssue({
    ...issue,
    [evt.target.name]: value,
  });
  
}

 function addIssue (event){
  event.preventDefault();
  const {issue_description, issue_severity, issue_assigned_to } = issue;
  const validateForm = issue_description && issue_severity && issue_assigned_to;
  if(!validateForm){
    setError("please fill all space");
    setTimeout(() => {
			setError("");
		}, 2000);
  } else {
  setIssue_id(++issue_id);
  setIssues((issues)=>[
    ...issues,
    {id:issue_id, issue_description, issue_severity, issue_assigned_to}
  ]);
      event.target.reset();
    issue.issue_assigned_to = '';
    issue.issue_description = '';
}
 };

 const deleteIssue = (index) =>{
  setIssues((issues)=> issues.filter((_, i)=>i !==index))
 };


  
  return (
    <div className="container">
      <h1>Issue Tracker</h1>
      <div className="flexing">
        <div className="Issue_form container bg-primary">
          <h2 className="text-center">What is the Issue Detected</h2>
          <p>{error}</p>
          <form id="issue_form" onSubmit={addIssue}>
            <label for="issue-description">Issue Description</label>
            <br />
            <textarea
              id="issue-description"
              name="issue_description"
              value={issue.issue_description}
              placeholder="Describe the Issue"
              onChange={handleChange}
              rows="5"
            ></textarea>
            <br />
            <label for="issue-severity">Issue Severity</label>
            <br />
            <select
              name="issue_severity"
              id="issue_severity"
              form="issue_form"
              value={issue.issue_severity}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="Very High">Very High</option>
            </select>
            <br />
            <label for="issue_assigned_to">Assigned To</label>
            <br />
            <input
              type="text"
              id="issue_assigned_to"
              name="issue_assigned_to"
              placeholder="Assign this issue to who"
              value={issue.issue_assigned_to}
              onChange={handleChange}
            ></input>
            <button type="submit" value="submit" className="btn btn-danger">
              Submit Issue
            </button>
          </form>
        </div>
        <div className="container bg-success">
          <h2>List of Available Issues</h2>
          <hr />
          <div className="Issue-record ">
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Severity</th>
                <th>Assign To</th>
                <th>Deleting</th>
              </tr>
            </thead>
            <tbody>
            {issues.map((issue, index) => {
        return (
          <tr key={issue.id}>
            <td>{issue.issue_description}</td>
            <td>{issue.issue_severity}</td>
            <td>{issue.issue_assigned_to}</td>
            <td> <button className="mydesign" type="button" onClick={() => deleteIssue(index)}>
              Delete
            </button></td>
          </tr>
        );
      })} 
            </tbody>
             
            </table>
          </div>
        </div>
      </div>
      <footer className="issue_footer">
        &copy; Designed by Triple Multipurpose Technology
      </footer>
    </div>
  );
}

export default App;
