package com.smartclasstracker.smartclasstracker.repository;

import com.smartclasstracker.smartclasstracker.models.StudentLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentLocationRepository extends JpaRepository<StudentLocation,String> {
}
