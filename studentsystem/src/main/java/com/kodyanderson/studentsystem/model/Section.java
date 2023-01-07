package com.kodyanderson.studentsystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Section {

    @Id
    private int id;
    private int instructor_id;
    private String enrolled_students;
    private String course_name;
    private int course_id;

    public Section() {
        this.id = id;
    }

    public Section(int id) {
        this.id = id;
    }

    public Section(int id,
                   int instructor_id,
                   String enrolled_students,
                   String course_name,
                   int course_id) {
        this.id = id;
        this.instructor_id = instructor_id;
        this.enrolled_students = enrolled_students;
        this.course_name = course_name;
        this.course_id = course_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getInstructor_id() {
        return instructor_id;
    }

    public void setInstructor_id(int instructor_id) {
        this.instructor_id = instructor_id;
    }

    public String getEnrolled_students() {
        return enrolled_students;
    }

    public void setEnrolled_students(String enrolled_students) {
        this.enrolled_students = enrolled_students;
    }

    public String getCourse_name() {
        return course_name;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }
}
