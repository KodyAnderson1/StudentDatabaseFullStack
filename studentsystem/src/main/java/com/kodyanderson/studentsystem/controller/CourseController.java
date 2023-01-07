package com.kodyanderson.studentsystem.controller;

import com.kodyanderson.studentsystem.model.Course;
import com.kodyanderson.studentsystem.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/course")
@CrossOrigin
public class CourseController {

    @Autowired
    private CourseService coursesService;

    @PostMapping("/add")
    public String add(@RequestBody Course course) {
        coursesService.saveCourse(course);
        return "New Course has been added!";
    }

    @GetMapping("/getAll")
    public List<Course> getAllCourses() { return coursesService.getAllCourses(); }

    @GetMapping("/{id}")
    public Optional<Course> getCourse(@PathVariable int id) {
        return coursesService.getCourse(id);
    }

    @DeleteMapping("/delete/{id}")
    public String removeCourse(@PathVariable int id) {
        coursesService.removeCourse(id);
        return "Course has been removed!";
    }

}
