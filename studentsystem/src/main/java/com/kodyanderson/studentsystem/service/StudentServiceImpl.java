package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.Student;
import com.kodyanderson.studentsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;


    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Optional<Student> getStudent(int id) {
        return studentRepository.findById(id);
    }

    @Override
    public String removeStudent(int id) {
        return null;
    }

//    @Override
//    public String removeStudent(int id) {
//        return studentRepository.remove
//    }
}
