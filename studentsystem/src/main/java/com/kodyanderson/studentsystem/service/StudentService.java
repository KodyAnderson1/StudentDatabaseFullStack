package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
    public String getStudent();
}
