package com.kodyanderson.studentsystem.controller;

import com.kodyanderson.studentsystem.model.Faculty;
import com.kodyanderson.studentsystem.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/faculty")
@CrossOrigin
public class FacultyController {
    @Autowired
    private FacultyService facultyService;

    @PostMapping("/add")
    public String add(@RequestBody Faculty faculty) {
        facultyService.saveFaculty(faculty);
        return "New Faculty has been added!";
    }

    @GetMapping("/getAll")
    public List<Faculty> getAllFaculty() {
        return facultyService.getAllFaculty();
    }

    @GetMapping("/{id}")
    public Optional<Faculty> getFaculty(@PathVariable int id) {
        return facultyService.getFaculty(id);
    }

    @DeleteMapping("/delete/{id}")
    public String removeFaculty(@PathVariable int id) {
        facultyService.removeFaculty(id);
        return "Faculty has been removed!";
    }

}
