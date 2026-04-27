package com.smartclasstracker.smartclasstracker.repository;

import com.smartclasstracker.smartclasstracker.models.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location,String> {
    List<Location> findByIdIn(List<String> allIds);
}