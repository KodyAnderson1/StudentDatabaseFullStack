package com.kodyanderson.studentsystem.controller;

import com.kodyanderson.studentsystem.model.Faculty;
import com.kodyanderson.studentsystem.model.Student;
import com.kodyanderson.studentsystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public String add(@RequestBody Student student){
        studentService.saveStudent(student);
        return "New student has been added!";
    }

    @GetMapping("/getAll")
        public List<Student> getAllStudents() {
        return studentService.getAllStudents();
        }
    @GetMapping("/{id}")
    public Optional<Student> getStudent(@PathVariable int id) {
        return studentService.getStudent(id);
    }

    @DeleteMapping("/delete/{id}")
    public String removeStudent(@PathVariable int id) {
        studentService.removeStudent((id));
        return "Student Removed!";
    }
}
