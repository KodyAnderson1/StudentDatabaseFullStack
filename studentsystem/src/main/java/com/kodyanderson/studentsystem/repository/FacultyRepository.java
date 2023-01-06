package com.kodyanderson.studentsystem.repository;

import com.kodyanderson.studentsystem.model.Faculty;
import com.kodyanderson.studentsystem.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Integer> {
}
