package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.Course;

import java.util.List;
import java.util.Optional;

public interface CoursesService {
    public Course saveCourse(Course course);
    public List<Course> getAllCourses();
    public Optional<Course> getCourse(int id);
    public void removeCourse(int id);

}
