import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for styling

function App() {
    const [students, setStudents] = useState([]);
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentAddress, setNewStudentAddress] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async() => {
        try {
            const response = await axios.get('http://localhost:8080/student/getAll');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const addStudent = async() => {
        try {
            await axios.post('http://localhost:8080/student/add', { name: newStudentName, address: newStudentAddress });
            fetchStudents();
            setNewStudentName('');
            setNewStudentAddress('');
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    return ( <
        div className = "container" >
        <
        h1 > Student System < /h1> <
        div className = "add-student" >
        <
        h2 > Add New Student < /h2> <
        div >
        <
        input type = "text"
        value = { newStudentName }
        onChange = {
            (e) => setNewStudentName(e.target.value) }
        placeholder = "Enter student name" /
        >
        <
        /div> <
        div >
        <
        input type = "text"
        value = { newStudentAddress }
        onChange = {
            (e) => setNewStudentAddress(e.target.value) }
        placeholder = "Enter student address" /
        >
        <
        /div> <
        button onClick = { addStudent } > Add Student < /button> <
        /div> <
        div className = "students-list" >
        <
        h2 > All Students < /h2> <
        ul > {
            students.map((student) => ( <
                li key = { student.id } >
                <
                strong > Name: < /strong> {student.name}, <strong>Address:</strong > { student.address } <
                /li>
            ))
        } <
        /ul> <
        /div> <
        /div>
    );
}

export default App;