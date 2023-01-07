package com.kodyanderson.studentsystem.model;


import jakarta.persistence.*;

import java.util.List;

@Entity
public class Student {
    @Id
    private int id;
    private String firstName;
    private String lastName;
    private String gender;
    private String role;
    private String phone;
    @OneToMany(targetEntity = Section.class, cascade = CascadeType.ALL)
    @JoinColumn(name="ss_fk", referencedColumnName = "id")
    private List<Section> current_courses;
    private String email;
    private String dob;
    private String address;

    public Student() {
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

    public List<Section> getCurrent_courses() {
        return current_courses;
    }

    public void setCurrent_courses(List<Section> current_courses) {
        this.current_courses = current_courses;
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
