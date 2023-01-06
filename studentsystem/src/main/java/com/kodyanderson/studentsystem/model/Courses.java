package com.kodyanderson.studentsystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Courses {
    @Id
    private int id;
    private String name;
    private String active_sections;

    public Courses() {
    }

    public Courses(int id) {
        this.id = id;
    }

    public Courses(int id, String name, String active_sections) {
        this.id = id;
        this.name = name;
        this.active_sections = active_sections;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getActive_sections() {
        return active_sections;
    }

    public void setActive_sections(String active_sections) {
        this.active_sections = active_sections;
    }
}
