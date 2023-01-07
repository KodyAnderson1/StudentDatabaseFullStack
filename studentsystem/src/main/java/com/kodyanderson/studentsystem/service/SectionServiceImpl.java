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
    public List<Section> getAllSections() { return sectionRepository.findAll(); }
    @Override
    public Optional<Section> getSection(int id) { return sectionRepository.findById(id); }
    @Override
    public void removeSection(int id) { sectionRepository.deleteById(id); }

}
