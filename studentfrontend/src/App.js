import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for styling

function App() {
    const [students, setStudents] = useState([]);
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentAddress, setNewStudentAddress] = useState('');
    const [error, setError] = useState('');
    const [editingStudentId, setEditingStudentId] = useState(null); // New state to hold the ID of the student being edited

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

    const addOrUpdateStudent = async() => {
        if (!newStudentName.trim() || !newStudentAddress.trim()) {
            setError('All fields are required');
            return;
        }

        try {
            if (editingStudentId) {
                // If editing an existing student, update the student instead of adding a new one
                await axios.put(`http://localhost:8080/student/edit/${editingStudentId}`, { name: newStudentName, address: newStudentAddress });
            } else {
                await axios.post('http://localhost:8080/student/add', { name: newStudentName, address: newStudentAddress });
            }
            fetchStudents();
            setNewStudentName('');
            setNewStudentAddress('');
            setEditingStudentId(null); // Reset editingStudentId after successful add/update
            setError('');
        } catch (error) {
            console.error('Error adding/updating student:', error);
        }
    };

    const deleteStudent = async(id) => {
        try {
            await axios.delete(`http://localhost:8080/student/delete/${id}`);
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleEditClick = (id, name, address) => {
        setEditingStudentId(id);
        setNewStudentName(name);
        setNewStudentAddress(address);
    };

    return ( <
        div className = "container" >
        <
        h1 > Student System < /h1> <
        div className = "add-student" >
        <
        h2 > { editingStudentId ? 'Edit Student' : 'Add New Student' } < /h2> <
        div className = "form-group" >
        <
        label htmlFor = "name" > Name: < /label> <
        input type = "text"
        id = "name"
        value = { newStudentName }
        onChange = {
            (e) => setNewStudentName(e.target.value) }
        placeholder = "Enter student name" /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label htmlFor = "address" > Address: < /label> <
        input type = "text"
        id = "address"
        value = { newStudentAddress }
        onChange = {
            (e) => setNewStudentAddress(e.target.value) }
        placeholder = "Enter student address" /
        >
        <
        /div> {
            error && < div className = "error" > { error } < /div>} <
                button onClick = { addOrUpdateStudent } > { editingStudentId ? 'Update Student' : 'Add Student' } < /button> <
                /div> <
                div className = "students-list" >
                <
                h2 > All Students < /h2> <
                table >
                <
                thead >
                <
                tr >
                <
                th > Name < /th> <
                th > Address < /th> <
                th > Action < /th> <
                /tr> <
                /thead> <
                tbody > {
                    students.map((student) => ( <
                        tr key = { student.id } >
                        <
                        td > { student.name } < /td> <
                        td > { student.address } < /td> <
                        td >
                        <
                        button className = "edit"
                        onClick = {
                            () => handleEditClick(student.id, student.name, student.address) } > Edit < /button> <
                        button className = "delete"
                        onClick = {
                            () => deleteStudent(student.id) } > Delete < /button>

                        <
                        /td> <
                        /tr>
                    ))
                } <
                /tbody> <
                /table> <
                /div> <
                /div>
        );
    }

    export default App;