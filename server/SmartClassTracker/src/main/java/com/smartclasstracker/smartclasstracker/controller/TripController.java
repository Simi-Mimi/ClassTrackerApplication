package com.smartclasstracker.smartclasstracker.controller;

import com.smartclasstracker.smartclasstracker.models.Student;
import com.smartclasstracker.smartclasstracker.models.Teacher;
import com.smartclasstracker.smartclasstracker.repository.StudentRepository;

import com.smartclasstracker.smartclasstracker.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")

public class TripController {
    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private TeacherRepository teacherRepo;

    //חלק א'
    //הוספת תלמידה
    @PostMapping("/addStudent")
    public ResponseEntity<?> addStudent(@RequestBody Student student) {
        if (studentRepo.existsById(student.getId())) {
            Student existingStudent = studentRepo.findById(student.getId()).get();
            return ResponseEntity.status(HttpStatus.CONFLICT).body("התלמידה כבר קיימת במערכת: " + existingStudent.getFirstName());
        }
        Student savedStudent = studentRepo.save(student);
        return ResponseEntity.ok(savedStudent);
    }

    //הוספת מורה
    @PostMapping("/addTeacher")
    public ResponseEntity<?> addTeacher(@RequestBody Teacher teacher) {
        if (teacherRepo.existsById(teacher.getId())) {
            Teacher existingTeacher = teacherRepo.findById(teacher.getId()).get();
            return ResponseEntity.status(HttpStatus.CONFLICT).body("המורה כבר קיימת במערכת: " + existingTeacher.getFirstName());
        }
        Student savedStudent = teacherRepo.save(teacher);
        return ResponseEntity.ok(savedStudent);
    }

    // שליפת כל התלמידות בכיתה ספציפית
    @GetMapping("/students/class/{className}")
    public List<Student> getStudentsByClass(@PathVariable String className) {
        return studentRepo.findByClassroom(className);
    }
}

