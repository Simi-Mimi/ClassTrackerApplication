package com.smartclasstracker.smartclasstracker.repository;

import com.smartclasstracker.smartclasstracker.models.Classroom;
import com.smartclasstracker.smartclasstracker.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface StudentRepository extends JpaRepository<Student,String> {
    List<Student> findByClassroom(Classroom classroom);
}

