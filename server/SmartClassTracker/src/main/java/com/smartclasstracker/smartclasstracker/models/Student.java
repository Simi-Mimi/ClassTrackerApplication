package com.smartclasstracker.smartclasstracker.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter//lombok
@Setter//lombok
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    @ManyToOne
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;

    public Student() {
    }
}

