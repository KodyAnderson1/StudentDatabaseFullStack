package com.kodyanderson.studentsystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Section {

    @Id
    @GeneratedValue
    private int id;
    private int instructor_id;
    private int student_id;
//    private String enrolled_students;
    private String course_name;
//    private int course_id;


}
