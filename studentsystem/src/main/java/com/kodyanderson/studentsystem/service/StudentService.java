package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
    public Optional<Student> getStudent(int id);
}
