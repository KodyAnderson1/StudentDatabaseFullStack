package com.kodyanderson.studentsystem.model;

public class StudentWithSection {
    private Integer section_id;
    private Integer course_id;
    private Integer instructor_id;
    private String name;

    public StudentWithSection(int section_id, int course_id, int instructor_id, String name) {
        this.section_id = section_id;
        this.course_id = course_id;
        this.instructor_id = instructor_id;
        this.name = name;
    }

    public int getSection_id() {
        return section_id;
    }

    public void setSection_id(int section_id) {
        this.section_id = section_id;
    }

    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }

    public int getInstructor_id() {
        return instructor_id;
    }

    public void setInstructor_id(int instructor_id) {
        this.instructor_id = instructor_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
