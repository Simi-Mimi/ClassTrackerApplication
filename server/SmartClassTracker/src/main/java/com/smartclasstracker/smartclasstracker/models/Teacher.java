package com.smartclasstracker.smartclasstracker.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter//lombok
@Setter//lombok
public class Teacher {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    @OneToOne
    @JoinColumn(name = "classroom_id", unique = true)
    private Classroom classroom;

    public Teacher() {
    }
}
