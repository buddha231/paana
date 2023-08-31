import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

const QualificationContainer = () => {
    const [qualifications, setQualifications] = useState([]);
    const [editQualification, setEditQualification] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [newQualification, setNewQualification] = useState('');

    useEffect(() => {
        // Fetch qualifications from API using axios
        axios.get('/api/qualifications/')
            .then(response => {
                setQualifications(response.data);
            })
            .catch(error => {
                console.error('Error fetching qualifications:', error);
            });
    }, []);

    const handleCreateQualification = () => {
        const newQualificationData = {
            qualification: newQualification, // Use snake_case for the field name
        };

        // Create the qualification using axios
        axios.post('/api/qualifications/', newQualificationData)
            .then(response => {
                setQualifications([...qualifications, response.data]);
                setNewQualification(''); // Clear the input field
                window.location.reload(); // Reload the page
            })
            .catch(error => {
                console.error('Error creating qualification:', error);
            });
    };

    const handleEditQualification = (qualification) => {
        setEditQualification(qualification);
        setUpdatedName(qualification.qualification); // Initialize the name input with the current name
    };

    const handleUpdateQualification = () => {
        if (editQualification) {
            const updatedQualification = {
                id: editQualification.id,
                qualification: updatedName,
            };

            // Update the qualification using axios
            axios.put(`/api/qualifications/${editQualification.id}/`, updatedQualification)
                .then(response => {
                    // Update the state
                    const updatedQualifications = qualifications.map(qualification =>
                        qualification.id === editQualification.id ? response.data : qualification
                    );
                    setQualifications(updatedQualifications);
                    setEditQualification(null); // Close the modal
                    setUpdatedName(''); // Reset the updated name
                })
                .catch(error => {
                    console.error('Error updating qualification:', error);
                });
        }
    };

    const handleDelete = (id) => {
        // Delete a qualification using axios
        axios.delete(`/api/qualifications/${id}/`)
            .then(response => {
                setQualifications(qualifications.filter(qualification => qualification.id !== id));
            })
            .catch(error => {
                console.error('Error deleting qualification:', error);
            });
    };

    return (
        <div className="card bg-light mb-3">

            <div class="card-header">
                <h2 class="card-title">Qualifications</h2>
            </div>
            <ul className="list-group">
                {qualifications.map(qualification => (
                    <li key={qualification.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {qualification.qualification}
                        <div className="btn-group">
                            <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editQualificationModal" onClick={() => handleEditQualification(qualification)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(qualification.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mb-4">
                <label htmlFor="newQualification" className="form-label fw-bold m-1">New Qualification</label>
                <input
                    type="text"
                    className="form-control"
                    id="newQualification"
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                    required
                />
            </div>
            <button type="button" className="btn btn-primary ms-3 me-3" onClick={handleCreateQualification}>Create Qualification</button>
            {/* Edit Qualification Modal */}
            <div className="modal fade" id="editQualificationModal" tabIndex="-1" aria-labelledby="editQualificationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editQualificationModalLabel">Edit Qualification</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Edit Qualification form */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="editName" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="editName"
                                        value={updatedName}
                                        onChange={(e) => setUpdatedName(e.target.value)}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdateQualification}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QualificationContainer;
