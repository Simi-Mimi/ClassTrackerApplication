package com.smartclasstracker.smartclasstracker.service;

import com.smartclasstracker.smartclasstracker.DTO.LocationDTO;
import com.smartclasstracker.smartclasstracker.models.Location;
import com.smartclasstracker.smartclasstracker.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LocationService {
    @Autowired
    private LocationRepository repository;

    //פונקיה הממירה  את המיקום
    public double convertToDecimal(int degrees, int minutes, int seconds) {
        return degrees + (minutes / 60.0) + (seconds / 3600.0);
    }
    public void processLocation(LocationDTO dto){
        Location location = new Location();
        location.setId(dto.getId().toString());

        double lat = convertToDecimal(
                dto.getCoordinates().getLatitude().getDegrees(),
                dto.getCoordinates().getLatitude().getMinutes(),
                dto.getCoordinates().getLatitude().getSeconds()
        );
        double lon = convertToDecimal(
                dto.getCoordinates().getLongitude().getDegrees(),
                dto.getCoordinates().getLongitude().getMinutes(),
                dto.getCoordinates().getLongitude().getSeconds()
        );

        location.setLatitude(lat);
        location.setLongitude(lon);
        location.setTime(LocalDateTime.now());

        repository.save(location);
    }
    public List<Location> getAllLocations() {
        return repository.findAll();
    }

}
