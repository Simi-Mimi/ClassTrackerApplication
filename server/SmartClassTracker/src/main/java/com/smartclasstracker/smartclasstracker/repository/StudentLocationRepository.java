package com.smartclasstracker.smartclasstracker.repository;

import com.smartclasstracker.smartclasstracker.models.StudentLocation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentLocationRepository extends JpaRepository<StudentLocation,String> {
    List<StudentLocation> findByIdIn(List<String> studentIds);
}