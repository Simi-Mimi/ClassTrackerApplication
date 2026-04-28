package com.smartclasstracker.smartclasstracker.models;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter//lombok
@Setter//lombok
public class Location {
    @Id
    private String id;

    private double latitude;
    private double longitude;
    private LocalDateTime time;
}
