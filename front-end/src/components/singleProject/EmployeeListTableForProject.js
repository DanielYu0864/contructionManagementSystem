import AddModal from './AddEmployeeModal';
import { EmployeeAPI } from '../../api';
import { useState, useEffect } from 'react';

function EmployeeListTableForProject({ projectId, hasAuthority }) {
  const [allEmployeesInProject, setAllEmployeesInProject] = useState([]);
  const [allUnassignedEmployees, setAllUnassignedEmployees] = useState([]);

  useEffect(() => {
    EmployeeAPI.getAllEmployees().then((response) => {
      setAllUnassignedEmployees(
        [...response.data].filter((employee) => employee.project === null)
      );
      setAllEmployeesInProject(
        [...response.data].filter(
          (employee) => parseInt(employee.project?.id) === parseInt(projectId)
        )
      );
    });
  }, []);

  const handleAddEmployeeToProject = (employee) => {
    const updatedEmployee = {
      ...employee,
      projectId: projectId,
    };
    EmployeeAPI.putEmployee(updatedEmployee);
    setAllUnassignedEmployees((prevState) =>
      [...prevState].filter((emp) => emp.id !== employee.id)
    );
    setAllEmployeesInProject([...allEmployeesInProject, updatedEmployee]);
    alert("Employee Has Been Added To Project");
  };

  return (
    <div className='mt-3'>
      <h3>Architects</h3>
      <div
        className='table-reponsive mt-3 mb-3'
        style={{
          width: '100%',
        }}
      >
        <table className='table table-hover m-auto'>
          <thead>
            <tr>
              <th className='col-1'>Id</th>
              <th className='col-3'>Name</th>
              <th className='col-3'>Email</th>
              <th className='col-4'>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {allEmployeesInProject
              ?.filter((employee) => employee.title?.toLowerCase() === 'architect')
              .map((filteredEmployee) => (
                <tr className='table-active' key={filteredEmployee.id}>
                  <th scope='row'>{filteredEmployee.id}</th>
                  <td>{filteredEmployee.name}</td>
                  <td>{filteredEmployee.email}</td>
                  <td>{filteredEmployee.phoneNumber}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <h3 style={{marginTop:"10%"}}>Employees</h3>
      <div
        className='table-reponsive'
        style={{
          width: '100%',
        }}
      >
        <table className='table table-hover m-auto'>
          <thead>
            <tr>
              <th className='col-1'>Id</th>
              <th className='col-3'>Name</th>
              <th className='col-3'>Email</th>
              <th className='col-4'>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {allEmployeesInProject
              ?.filter((employee) => employee.title?.toLowerCase() === 'employee')
              .map((filteredEmployee) => (
                <tr className='table-active' key={filteredEmployee.id}>
                  <th scope='row'>{filteredEmployee.id}</th>
                  <td>{filteredEmployee.name}</td>
                  <td>{filteredEmployee.email}</td>
                  <td>{filteredEmployee.phoneNumber}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {hasAuthority && (
          <button
            type='button'
            disabled={!hasAuthority}
            className='btn btn-outline-warning'
            data-bs-toggle='modal'
            data-bs-target='#addEmployeeModal'
            style={{width:"100%", marginTop:"3%"}}
          >
            Add Employee
          </button>
        )}
      </div>

      <AddModal
        title='employee'
        modalId='addEmployeeModal'
        allUnassignedEmployees={allUnassignedEmployees}
        projectId={projectId}
        handleAddEmployeeToProject={handleAddEmployeeToProject}
      />
    </div>
  );
}

export default EmployeeListTableForProject;
