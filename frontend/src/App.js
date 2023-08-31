import React, { useState } from 'react';
import './App.css'; // Add your custom CSS if needed
import SalaryContainer from './components/SalaryContainer';
import FormContainer from './components/FormContainer';
import QualificationContainer from './components/QualificationContainer';
import EmployeeList from './components/EmployeeList';

const App = () => {
    const [editingEmployee, setEditingEmployee] = useState(null);

    const handleEditEmployee = (employee) => {
        setEditingEmployee({ ...employee });
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <EmployeeList onEditEmployee={handleEditEmployee} />
                    <SalaryContainer />
                    <QualificationContainer />
                </div>
                <div className="col-md-8 mt-3">
                    <FormContainer editingEmployee={editingEmployee} />
                </div>
            </div>
        </div>
    );
};

export default App;
