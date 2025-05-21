import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployeeById, updateEmployee } from '../../services/EmployeeService';

const EmployeeComponent = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployeeById(id)
                .then((response) => {
                    setEmployee(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching employee by ID:", error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const saveEmployee = (e) => {
        e.preventDefault();
        if (id) {
            updateEmployee(id, employee)
                .then(() => {
                    navigate('/employees');
                })
                .catch((error) => {
                    console.error("Error updating employee:", error);
                });
        } else {
            createEmployee(employee)
                .then(() => {
                    navigate('/employees');
                })
                .catch((error) => {
                    console.error("Error adding employee:", error);
                });
        }
    };

    const pageTitle = () => {
        if (id) {
            return <h2 className='text-center mb-4'>Update Employee</h2>;
        } else {
            return <h2 className='text-center mb-4'>Add Employee</h2>;
        }
    };

    return (
        <div className='container mt-5'>
            {pageTitle()}
            <form onSubmit={saveEmployee}>
                <div className='form-group mb-3'>
                    <label>First Name:</label>
                    <input
                        type='text'
                        className='form-control'
                        name='firstName'
                        value={employee.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group mb-3'>
                    <label>Last Name:</label>
                    <input
                        type='text'
                        className='form-control'
                        name='lastName'
                        value={employee.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='form-group mb-3'>
                    <label>Email:</label>
                    <input
                        type='email'
                        className='form-control'
                        name='email'
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type='submit' className='btn btn-success'>Save</button>
            </form>
        </div>
    );
};

export default EmployeeComponent;
