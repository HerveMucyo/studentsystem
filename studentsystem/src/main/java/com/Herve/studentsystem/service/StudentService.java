package com.Herve.studentsystem.service;
import com.Herve.studentsystem.model.Student;

import java.util.List;
//import org.springframework.stereotype.Service;

//@Service
public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
