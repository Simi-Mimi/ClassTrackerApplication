package com.smartclasstracker.smartclasstracker.repository;


import com.smartclasstracker.smartclasstracker.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, String> {

}
