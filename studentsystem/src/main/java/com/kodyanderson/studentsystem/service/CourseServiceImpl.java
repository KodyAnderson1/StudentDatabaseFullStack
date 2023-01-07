package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.Course;
import com.kodyanderson.studentsystem.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Override
    public Course saveCourse(Course course) { return courseRepository.save(course); }

    @Override
    public List<Course> getAllCourses() { return courseRepository.findAll(); }

    @Override
    public Optional<Course> getCourse(int id) { return courseRepository.findById(id); }

    @Override
    public void removeCourse(int id) { courseRepository.deleteById(id); }
}
