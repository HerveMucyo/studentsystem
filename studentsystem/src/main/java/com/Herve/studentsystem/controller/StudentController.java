package com.Herve.studentsystem.controller;

import com.Herve.studentsystem.model.Student;
import com.Herve.studentsystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public String add(@RequestBody Student student){
        studentService.saveStudent(student);
        return "New student saved successfully";
    }

    @GetMapping("/getAll")
    public List<Student> list(){
        return studentService.getAllStudents();
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id){
        studentService.deleteStudent(id);
        return "Student deleted successfully";
    }

    @PutMapping("/edit/{id}")
    public String edit(@PathVariable Long id, @RequestBody Student student){
        studentService.updateStudent(id, student);
        return "Student updated successfully";
    }
}
