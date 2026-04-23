package com.smartclasstracker.smartclasstracker.repository;

import com.smartclasstracker.smartclasstracker.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

//בשביל לעזור בשליפת כל התלמידות
public interface StudentRepository extends JpaRepository<Student,String> {
    List<Student> findByClassroom(String classroom);
}

