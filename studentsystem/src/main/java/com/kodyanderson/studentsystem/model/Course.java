package com.kodyanderson.studentsystem.model;

import jakarta.persistence.*;


@Entity
public class Course {
    @Id
    private int id;
    private String name;

    public Course() {
    }

    public Course(int id) {
        this.id = id;
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

}
