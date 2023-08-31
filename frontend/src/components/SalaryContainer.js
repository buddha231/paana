
import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axios';

const SalaryContainer = () => {
    const [salaries, setSalaries] = useState([]);
    const [editSalary, setEditSalary] = useState(null);
    const [updatedAmount, setUpdatedAmount] = useState('');
    const [newSalary, setNewSalary] = useState('');

    useEffect(() => {
        // Fetch salaries from API using axios
        axiosInstance.get('/api/salaries/')
            .then(response => {
                setSalaries(response.data);
            })
            .catch(error => {
                console.error('Error fetching salaries:', error);
            });
    }, []);

    const handleCreateSalary = () => {
        const newSalaryData = {
            amount: newSalary,
        };

        // Create the salary using axios
        axiosInstance.post('/api/salaries/', newSalaryData)
            .then(response => {
                setSalaries([...salaries, response.data]);
                setNewSalary(''); // Clear the input field
                window.location.reload()
            })
            .catch(error => {
                console.error('Error creating salary:', error);
            });
    };

    const handleEditSalary = (salary) => {
        setEditSalary(salary);
        setUpdatedAmount(salary.amount); // Initialize the amount input with the current amount
    };

    const handleUpdateSalary = () => {
        if (editSalary) {
            const updatedSalary = {
                id: editSalary.id,
                amount: updatedAmount,
            };

            // Update the salary using axios
            axiosInstance.put(`/api/salaries/${editSalary.id}/`, updatedSalary)
                .then(response => {
                    // Update the state
                    const updatedSalaries = salaries.map(salary =>
                        salary.id === editSalary.id ? response.data : salary
                    );
                    setSalaries(updatedSalaries);
                    setEditSalary(null); // Close the modal
                    setUpdatedAmount(''); // Reset the updated amount
                    window.alert("successfully updated")
                })
                .catch(error => {
                    console.error('Error updating salary:', error);
                });
        }
    };

    const handleDelete = (id) => {
        // Delete a salary using axios
        axiosInstance.delete(`/api/salaries/${id}/`)
            .then(response => {
                setSalaries(salaries.filter(salary => salary.id !== id));
            })
            .catch(error => {
                console.error('Error deleting salary:', error);
            });
    };

    return (
        <div className="card bg-light mb-3">

            <div class="card-header">
                <h2 class="card-title">Salaries</h2>
            </div>
            <ul className="list-group">
                {salaries.map(salary => (
                    <li key={salary.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {salary.amount}
                        <div className="btn-group">
                            <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editSalaryModal" onClick={() => handleEditSalary(salary)}>Edit</button>
                            {/* <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editSalaryModal">Edit</button> */}
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(salary.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Create Salary Form */}
            <div className="mb-3">
                <label htmlFor="newSalary" className="form-label fw-bold m-1">New Salary</label>
                <input
                    type="text"
                    className="form-control"
                    id="newSalary"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    required
                />
            </div>
            <button type="button" className="btn btn-primary ms-3 me-3" onClick={handleCreateSalary}>Create Salary</button>
            {/* Edit Salary Modal */}
            <div className="modal fade" id="editSalaryModal" tabIndex="-1" aria-labelledby="editSalaryModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editSalaryModalLabel">Edit Salary</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Edit Salary form */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="editAmount" className="form-label">Amount</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="editAmount"
                                        value={updatedAmount}
                                        onChange={(e) => setUpdatedAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdateSalary}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryContainer;
