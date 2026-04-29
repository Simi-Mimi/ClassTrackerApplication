package com.smartclasstracker.smartclasstracker.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Teacher {
    @Id
    private String id;
    private String firstName;
    private String lastName;


    @OneToOne
    @JoinColumn(name = "classroom_id", unique = true, nullable = true)
    private Classroom classroom;

    @Enumerated(EnumType.STRING)
    private Role role;
}
