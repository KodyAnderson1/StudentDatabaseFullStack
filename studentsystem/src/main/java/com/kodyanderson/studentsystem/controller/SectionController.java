package com.kodyanderson.studentsystem.controller;

import com.kodyanderson.studentsystem.model.Section;
import com.kodyanderson.studentsystem.service.SectionService;
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

    @PostMapping("/add")
    public String add(@RequestBody Section section) {
        sectionService.saveSection(section);
        return "New Section has been added!";
    }

    @GetMapping("/getAll")
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }

    @GetMapping("/{id}")
    public Optional<Section> getSection(@PathVariable int id) { return sectionService.getSection(id); }

    @DeleteMapping("/delete/{id}")
    public String removeSection(@PathVariable int id) {
        sectionService.removeSection(id);
        return "Section has been removed!";
    }
}
