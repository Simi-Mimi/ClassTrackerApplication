package com.smartclasstracker.smartclasstracker.models;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Location {
    @Id
    private String id;

//    @ManyToOne
//    @JoinColumn(name = "device_id")
//    private TrackingDevice device;

    private String userId;
    private double latitude;
    private double longitude;
    private LocalDateTime time;
}
