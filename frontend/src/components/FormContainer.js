//
// import React from 'react';
//
// const FormContainer = () => {
//     return (
//         <div className="card bg-light p-3">
//             <h2 className="card-title">Employee Details Form</h2>
//             <form>
//                 <div class="mb-3">
//                     <label for="firstName" class="form-label">First Name</label>
//                     <input type="text" class="form-control" id="firstName" name="firstName" />
//                 </div>
//                 <div class="mb-3">
//                     <label for="lastName" class="form-label">Last Name</label>
//                     <input type="text" class="form-control" id="lastName" name="lastName" />
//                 </div>
//                 <div class="mb-3">
//                     <label for="salary" class="form-label">Select Salary</label>
//                     <select class="form-select" id="salary" name="salary" >
//                         <option value="">Select Salary</option>
//                         <option value="50000">$50,000</option>
//                         <option value="60000">$60,000</option>
//                     </select>
//                 </div>
//                 <div class="mb-3">
//                     <label for="qualifications" class="form-label">Select Qualifications</label>
//                     <select multiple class="form-select" id="qualifications" name="qualifications[]">
//                         <option value="Bachelor's Degree">Bachelor's Degree</option>
//                         <option value="Master's Degree">Master's Degree</option>
//                         <option value="Ph.D.">Ph.D.</option>
//                     </select>
//                 </div>
//                 <button type="submit" class="btn btn-primary">Submit</button>
//                 {/* Your form fields */}
//             </form >
//         </div >
//     );
// };
//
// export default FormContainer;
import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axios';

const FormContainer = ({ editingEmployee }) => {
    const [formData, setFormData] = useState({
        id: null,
        first_name: '',
        last_name: '',
        salary: '',
        qualifications: []
    });

    const [salaries, setSalaries] = useState([]);
    const [qualifications, setQualifications] = useState([]);

    useEffect(() => {
        // Fetch salaries from API using axios
        axiosInstance.get('/api/salaries/')
            .then(response => {
                setSalaries(response.data);
            })
            .catch(error => {
                console.error('Error fetching salaries:', error);
            });

        // Fetch qualifications from API using axios
        axiosInstance.get('/api/qualifications/')
            .then(response => {
                setQualifications(response.data);
                console.log(qualifications.map(qualification => qualification.name));
            })
            .catch(error => {
                console.error('Error fetching qualifications:', error);
            });
    }, []);

    useEffect(() => {
        if (editingEmployee) {
            // Set the form data with the editing employee's details
            setFormData({
                id: editingEmployee.id,
                first_name: editingEmployee.first_name,
                last_name: editingEmployee.last_name,
                salary: '' + editingEmployee.salary,
                qualifications: editingEmployee.qualifications,
                // Other fields...
            });
        }
    }, [editingEmployee]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.id) {
            // Update employee data using axios
            axiosInstance.put(`/api/employees/${formData.id}/`, formData)
                .then(response => {
                    // Handle success
                    console.log('Employee data updated:', response.data);
                    setFormData({
                        id: null,
                        first_name: '',
                        last_name: '',
                        // Reset other fields...
                    });
                    window.location.reload();
                })
                .catch(error => {
                    // Handle error
                    console.error('Error updating employee data:', error);
                });
        } else {
            // Create new employee using axios
            axiosInstance.post('/api/employees/', formData)
                .then(response => {
                    // Handle success
                    console.log('New employee created:', response.data);
                    setFormData({
                        id: null,
                        first_name: '',
                        last_name: '',
                        // Reset other fields...
                    });
                    window.location.reload()
                })
                .catch(error => {
                    // Handle error
                    console.error('Error creating new employee:', error);
                });
        }
    };
    return (
        <div className="card bg-light p-3">
            <h2 className="card-title">Employee Details Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="salary" className="form-label">Select Salary</label>
                    <select className="form-select" id="salary" name="salary" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} required>
                        <option value="">Select Salary</option>
                        {salaries.map(salary => (
                            <option key={salary.id} value={salary.id}>{salary.amount}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="qualifications" className="form-label">Select Qualifications</label>
                    <select multiple className="form-select" id="qualifications" name="qualifications" value={formData.qualifications} onChange={(e) => setFormData({ ...formData, qualifications: Array.from(e.target.selectedOptions, option => option.value) })}>
                        {qualifications.map(qualification => (
                            <option key={qualification.id} value={qualification.id}>{qualification.qualification}</option>
                        ))}
                    </select>
                </div>
                {formData.id ?
                    (<button type="submit" className="btn btn-primary">
                        Update </button>) :
                    (<button type="submit" className="btn btn-primary">
                        Submit
                    </button>)}
            </form>
        </div>
    );
};

export default FormContainer;
