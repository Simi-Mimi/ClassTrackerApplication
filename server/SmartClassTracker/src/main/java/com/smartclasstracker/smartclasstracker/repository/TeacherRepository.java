package com.smartclasstracker.smartclasstracker.repository;


import com.smartclasstracker.smartclasstracker.models.Classroom;
import com.smartclasstracker.smartclasstracker.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeacherRepository extends JpaRepository<Teacher, String> {
    Optional<Teacher> findById(String id);
    Optional<Teacher> findByClassroom(Classroom classroom);
}
