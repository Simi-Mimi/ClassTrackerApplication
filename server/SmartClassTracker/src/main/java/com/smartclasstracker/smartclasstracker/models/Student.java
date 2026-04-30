package com.smartclasstracker.smartclasstracker.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    @ManyToOne
    @JoinColumn(name = "classroom_id",nullable = true)
    private Classroom classroom;


//    @OneToOne
//    @JoinColumn(name = "device_id",nullable = true)
//    private TrackingDevice device;

}

