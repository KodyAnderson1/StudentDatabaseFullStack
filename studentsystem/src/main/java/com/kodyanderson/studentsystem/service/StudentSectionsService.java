package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.StudentSections;

import java.util.List;

public interface StudentSectionsService {
    public StudentSections saveSection(StudentSections studentSections);
    public List<StudentSections> getAllSections();
    public List<StudentSections> getSection(int sectionId);
    public List<Object[]> getSectionsByStudentId(int studentId);
    public List<StudentSections> getSectionByFacultyId(int facultyId);
}
