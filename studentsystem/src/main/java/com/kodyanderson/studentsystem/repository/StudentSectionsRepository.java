package com.kodyanderson.studentsystem.repository;

import com.kodyanderson.studentsystem.model.StudentSections;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentSectionsRepository extends JpaRepository<StudentSections, Integer> {

    @Query("SELECT s.section_id, s.course_id, s.instructor_id, c.name FROM StudentSections s, Course c WHERE s.student_id = ?1 AND c.id = s.course_id")
    List<Object[]> findStudentSectionsByStudent_id(int studentId);
    @Query("select sc FROM StudentSections sc WHERE sc.section_id = ?1")
    List<StudentSections> findStudentsSectionsBySection_id(int sectionId);
    @Query("select sc FROM StudentSections sc WHERE sc.instructor_id = ?1")
    List<StudentSections> findStudentSectionsByInstructor_id(int instructorId);

}
