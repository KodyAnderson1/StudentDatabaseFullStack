package com.kodyanderson.studentsystem.controller;

import com.kodyanderson.studentsystem.model.StudentSections;
import com.kodyanderson.studentsystem.service.StudentSectionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student/sections")
@CrossOrigin
public class StudentSectionsController {
    @Autowired
    private StudentSectionsService studentSectionsService;

    @GetMapping("/{id}")
    public List<StudentSections> getSectionByStudentId(@PathVariable int id) { return studentSectionsService.getSectionsByStudentId(id); }

    @PostMapping("/add")
    public StudentSections addSection(@RequestBody StudentSections section) {
        return studentSectionsService.saveSection(section);
    }

    @DeleteMapping("/{id}")
    public void removeSectionForStudent(@PathVariable int id) {
        studentSectionsService.removeSection(id);
    }
}
