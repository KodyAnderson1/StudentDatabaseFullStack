package com.kodyanderson.studentsystem.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Faculty {
    @Id
    private int id;
    private String firstName;
    private String lastName;
    private String gender;
    private String role;
    private String phone;

    @OneToMany(targetEntity = Section.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "fs_fk", referencedColumnName = "id")
    private List<Section> sections;
    private String email;
    private String dob;
    private String address;

    public Faculty() {}
    public List<Section> getSections() {
        return sections;
    }

    public void setSections(List<Section> sections) {
        this.sections = sections;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
