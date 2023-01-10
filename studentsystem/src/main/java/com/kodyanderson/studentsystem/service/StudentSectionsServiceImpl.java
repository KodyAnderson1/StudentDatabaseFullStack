package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.StudentSections;
import com.kodyanderson.studentsystem.repository.StudentSectionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentSectionsServiceImpl implements StudentSectionsService {

    @Autowired
    private StudentSectionsRepository studentSectionsRepository;

    @Override
    public StudentSections saveSection(StudentSections studentSections) {
        return studentSectionsRepository.save(studentSections);
    }
    @Override
    public List<StudentSections> getAllSections() {
        return studentSectionsRepository.findAll();
    }
    @Override
    public List<StudentSections> getSection(int sectionId) {
        return studentSectionsRepository.findStudentsSectionsBySection_id(sectionId);
    }
    @Override
    public List<StudentSections> getSectionsByStudentId(int studentId) {
        return studentSectionsRepository.findStudentSectionsByStudent_id(studentId);
    }
    @Override
    public List<StudentSections> getSectionByFacultyId(int facultyId) {
        return studentSectionsRepository.findStudentSectionsByInstructor_id(facultyId);
    }
    @Override
    public void removeSection(int id) { studentSectionsRepository.deleteById(id); }


}
