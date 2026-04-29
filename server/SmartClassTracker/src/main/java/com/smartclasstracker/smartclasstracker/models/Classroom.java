package com.smartclasstracker.smartclasstracker.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Classroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @JsonIgnore
    @OneToOne(mappedBy = "classroom")
    private Teacher teacher;

    @JsonIgnore
    @OneToMany(mappedBy = "classroom")
    private List<Student> students;
}
