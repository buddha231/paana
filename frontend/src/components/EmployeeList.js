//
import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const EmployeeList = (props) => {
    const { onEditEmployee } = props;
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Fetch employees from API using axios
        axios.get('/api/employees')
            .then(response => {
                setEmployees(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            });
    }, []);

    const handleDelete = (id) => {
        // Delete an employee using axios
        axios.delete(`/api/employees/${id}`)
            .then(response => {
                setEmployees(employees.filter(employee => employee.id !== id));
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
            });
    };

    return (
        <div className="card bg-light mb-3">
            <div className="card-header">
                <h2 className="card-title">Employee List</h2>
            </div>
            <ul className="list-group">
                {employees.map(employee => (
                    <li key={employee.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {`${employee.first_name} ${employee.last_name}`}
                        <div className="btn-group">
                            <button className="btn btn-primary btn-sm" onClick={() => onEditEmployee(employee)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employee.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
