package com.kodyanderson.studentsystem.service;

import com.kodyanderson.studentsystem.model.Section;
import com.kodyanderson.studentsystem.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SectionServiceImpl implements SectionService {
    @Autowired
    private SectionRepository sectionRepository;

    @Override
    public Section saveSection(Section section) { return sectionRepository.save(section); }

    @Override
    public List<Section> saveAllSections(List<Section> sections) {
        return sectionRepository.saveAll(sections);
    }
    @Override
    public List<Section> getAllSections() { return sectionRepository.findAll(); }
    @Override
    public List<Section> getSection(int course_id) { return sectionRepository.findSectionByCourse_id(course_id); }
    @Override
    public void removeSection(int id) { sectionRepository.deleteById(id); }
    @Override
    public List<Section> getSectionsByInstructor(int id) {
        return sectionRepository.findSectionByInstructor_id(id);
    }

}
