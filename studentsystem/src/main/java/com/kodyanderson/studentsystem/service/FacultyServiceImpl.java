package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.Faculty;
import com.kodyanderson.studentsystem.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyServiceImpl implements FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;
    @Override
    public Faculty saveFaculty(Faculty faculty) { return facultyRepository.save(faculty); }
    @Override
    public List<Faculty> getAllFaculty() { return facultyRepository.findAll(); }

    @Override
    public Optional<Faculty> getFaculty(int id) {
        return facultyRepository.findById(id);
    }
}
