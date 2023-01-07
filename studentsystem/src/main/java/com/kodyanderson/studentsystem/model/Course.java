package com.kodyanderson.studentsystem.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Course {
    @Id
    private int id;
    private String name;

    @OneToMany(targetEntity = Section.class, cascade = CascadeType.ALL)
    @JoinColumn(name="cs_fk", referencedColumnName = "id")
    private List<Section> active_sections;

    public Course() {
    }

    public Course(int id) {
        this.id = id;
    }

    public Course(int id, String name, List<Section> active_sections) {
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

    public List<Section> getActive_sections() {
        return active_sections;
    }

    public void setActive_sections(List<Section> active_sections) {
        this.active_sections = active_sections;
    }
}
