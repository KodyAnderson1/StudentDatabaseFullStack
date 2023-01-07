package com.kodyanderson.studentsystem.controller;

import com.kodyanderson.studentsystem.repository.SectionRepository;
import com.kodyanderson.studentsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClassAssignmentController {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private SectionRepository sectionRepository;


}
