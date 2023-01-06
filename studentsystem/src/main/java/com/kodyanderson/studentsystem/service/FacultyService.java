package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.Faculty;

import java.util.List;
import java.util.Optional;

public interface FacultyService {

    public Faculty saveFaculty(Faculty faculty);
    public List<Faculty> getAllFaculty();
    public Optional<Faculty> getFaculty(int id);
    public void removeFaculty(int id);
}
