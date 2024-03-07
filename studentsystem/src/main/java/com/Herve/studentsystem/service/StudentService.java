package com.Herve.studentsystem.service;

import com.Herve.studentsystem.model.Student;
import java.util.List;

public interface StudentService {
    Student saveStudent(Student student);
    List<Student> getAllStudents();
    void deleteStudent(Long id);
    Student updateStudent(Long id, Student student);
}
