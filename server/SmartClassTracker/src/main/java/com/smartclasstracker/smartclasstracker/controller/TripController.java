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
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*") // הגדרה מדויקת למקור (CORS)
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
        Teacher savedTeacher = teacherRepo.save(teacher);
        return ResponseEntity.ok(savedTeacher);
    }

    // שליפת תלמידה לפי ת.ז.
    @GetMapping("/student")
    public ResponseEntity<Student> getStudentById(@RequestHeader("Student-ID") String id) {
        return studentRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // שליפת מורה לפי ת.ז.
    @GetMapping("/teacher")
    public ResponseEntity<Teacher> getTeacherById(@RequestHeader("Teacher-ID") String id) {
        return teacherRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//   שליפת כל התלמידות בכיתה ספציפית
   @GetMapping("/students/class")
   //@RequestHeader("Teacher-ID")
   public ResponseEntity<?> getStudentsByTeacher(@RequestHeader("Teacher-ID") String teacherId) {
       Optional<Teacher> teacherOpt = teacherRepo.findById(teacherId);
       if(teacherOpt.isPresent()){
           String classroom = teacherOpt.get().getClassroom();
           List<Student> students = studentRepo.findByClassroom(classroom);
           return ResponseEntity.ok(students);
       }else{
           return ResponseEntity.status(HttpStatus.FORBIDDEN)
                   .body("גישה נדחתה: מזהה זה אינו רשום כמורה במערכת");
       }
   }

    // שליפת כל המורות
    @GetMapping("/teachers")
    public List<Teacher> getStudentsByClass() {
        return teacherRepo.findAll();
    }
    //קליטת מיקומים
}

