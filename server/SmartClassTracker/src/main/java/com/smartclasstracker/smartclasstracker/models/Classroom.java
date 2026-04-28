package com.smartclasstracker.smartclasstracker.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Getter//lombok
@Setter//lombok
public class Classroom {
    @Id
    private String id;
    private String name;

    @JsonIgnore
    @OneToOne(mappedBy = "classroom")
    private Teacher teacher;

    @JsonIgnore
    @OneToMany(mappedBy = "classroom")
    private List<Student> students;
}
