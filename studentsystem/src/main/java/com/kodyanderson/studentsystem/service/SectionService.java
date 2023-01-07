package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.Section;

import java.util.List;
import java.util.Optional;

public interface SectionService {
    public Section saveSection(Section section);
    public List<Section> saveAllSections(List<Section> sections);
    public List<Section> getAllSections();
    public Optional<Section> getSection(int id);
    public void removeSection(int id);

    /********** Potentially Moved to another class *********/
    public List<Section> getSectionsByInstructor(int id);
//    public List<Section> getSectionsByStudentId(int id);
}
