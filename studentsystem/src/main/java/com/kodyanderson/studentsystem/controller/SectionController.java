package com.kodyanderson.studentsystem.controller;

import com.kodyanderson.studentsystem.model.Section;
import com.kodyanderson.studentsystem.model.StudentSections;
import com.kodyanderson.studentsystem.service.SectionService;
import com.kodyanderson.studentsystem.service.StudentSectionsService;
import com.kodyanderson.studentsystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/section")
@CrossOrigin
public class SectionController {

    @Autowired
    private SectionService sectionService;
    @Autowired
    private StudentService studentService;


    @PostMapping("/add")
    public String add(@RequestBody Section section) {
        sectionService.saveSection(section);
        return "New Section has been added!";
    }

    @PostMapping("/addAll")
    public String addAll(@RequestBody List<Section> sections) {
        sectionService.saveAllSections(sections);
        return "New Sections has been added!";
    }

    @GetMapping("/getAll")
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }

    @GetMapping("/{id}")
    public Optional<Section> getSection(@PathVariable int id) { return sectionService.getSection(id); }

    @GetMapping("/faculty/{id}")
    public List<Section> getSectionByInstructorId(@PathVariable int id) { return sectionService.getSectionsByInstructor(id); }

    @DeleteMapping("/delete/{id}")
    public String removeSection(@PathVariable int id) {
        sectionService.removeSection(id);
        return "Section has been removed!";
    }

}
