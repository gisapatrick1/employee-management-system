
import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        listEmployees()
            .then(response => setEmployees(response.data))
            .catch(error => console.error(error));
    };

    const addNewEmployee = () => {
        navigate('/add-employee');
    };

    const editEmployee = (id) => {
        navigate(`/edit-employees/${id}`);
    };

    const removeEmployee = (id) => {
        deleteEmployee(id)
            .then(() => {
                fetchEmployees(); // refresh list
            })
            .catch(error => console.error("Delete failed:", error));
    };

    return (
        <div className='container mt-4'>
            <h2 className='text-center mb-4'>List of Employees</h2>
            <div className='d-flex justify-content-start mb-3'>
                <button className='btn btn-primary' onClick={addNewEmployee}>
                    Add Employee
                </button>
            </div>
            <table className='table table-striped table-bordered'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Employee Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info me-2' onClick={() => editEmployee(employee.id)}>
                                    Update
                                </button>
                                <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
