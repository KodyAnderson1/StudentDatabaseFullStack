package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.Section;

import java.util.List;
import java.util.Optional;

public interface SectionService {
    public Section saveSection(Section section);
    public List<Section> getAllSections();
    public Optional<Section> getSection(int id);
    public void removeSection(int id);
}
