package com.kodyanderson.studentsystem.repository;

import com.kodyanderson.studentsystem.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SectionRepository extends JpaRepository<Section, Integer> {

    @Query("SELECT s FROM Section s WHERE s.instructor_id = ?1")
    List<Section> findSectionByInstructor_id(int instructorId);
}
