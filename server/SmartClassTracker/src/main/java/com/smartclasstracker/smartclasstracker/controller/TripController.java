package com.smartclasstracker.smartclasstracker.controller;

import com.smartclasstracker.smartclasstracker.DTO.LocationDTO;
import com.smartclasstracker.smartclasstracker.models.Classroom;
import com.smartclasstracker.smartclasstracker.models.Student;
import com.smartclasstracker.smartclasstracker.models.Location;
import com.smartclasstracker.smartclasstracker.models.Teacher;
import com.smartclasstracker.smartclasstracker.repository.ClassroomRepository;
import com.smartclasstracker.smartclasstracker.repository.LocationRepository;
import com.smartclasstracker.smartclasstracker.repository.StudentRepository;
import com.smartclasstracker.smartclasstracker.repository.TeacherRepository;
import com.smartclasstracker.smartclasstracker.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*") // הגדרה מדויקת למקור (CORS)
public class TripController {
    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private TeacherRepository teacherRepo;

    @Autowired
    private LocationRepository locationRepo;

    @Autowired
    private ClassroomRepository classroomRepo;

    //שליפת כיתה
    @GetMapping("/classrooms")
    public ResponseEntity<List<Classroom>> getAllClassrooms() {
        return ResponseEntity.ok(classroomRepo.findAll());
    }
    //חלק א'
    //הוספת תלמידה
    @PostMapping("/addStudent")
    public ResponseEntity<?> addStudent(@RequestBody Student student) {
        //בדיקה אם יש תלמידה עם אותה ת.ז.
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
        //בדיקה אם יש מורה עם אותה ת.ז.
        if (teacherRepo.existsById(teacher.getId())) {
            Teacher existingTeacher = teacherRepo.findById(teacher.getId()).get();
            return ResponseEntity.status(HttpStatus.CONFLICT).body("המורה כבר קיימת במערכת: " + existingTeacher.getFirstName());
        }
        //מוודא שאכן יש כיתב בJSON שהגיע
        if (teacher.getClassroom() != null) {
            Optional<Teacher> existingTeacher = teacherRepo.findByClassroom(teacher.getClassroom());
            if (existingTeacher.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("שגיאה: לכיתה זו כבר רשומה מורה אחרת (" +
                                existingTeacher.get().getFirstName() + ").");
            }
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
           Classroom classroom = teacherOpt.get().getClassroom();
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

    @Autowired
    private LocationService service;

    //עדכון מיקום ממכשיר האיכון
    @PostMapping("/updateLocation")
    public ResponseEntity <String>  updateLocation(@RequestBody LocationDTO dto){
        try {
            service.processLocation(dto);
            return ResponseEntity.ok("המיקום עודכן ב-DB");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("שגיאה בעדכון המיקום: " + e.getMessage());
        }
    }
    //שליפת מיקומים של תלמידים לפי כיתה עבור המפה
    @GetMapping("/allLocation")
    public  ResponseEntity<List<Location>> getAllLocations(@RequestHeader("Teacher-ID") String teacherId){
        Teacher teacher = teacherRepo.findById(teacherId)
                .orElseThrow(() -> new RuntimeException(teacherId + "לא מצאנו מורה עם ת.ז."));
        Classroom classroom = teacher.getClassroom();
        List<Student> students = studentRepo.findByClassroom(classroom);
        List<String> allIds = students.stream()
                .map(Student::getId)
                .collect(Collectors.toList());
        allIds.add(teacherId);
        List<Location> locations = locationRepo.findByIdIn(allIds);
        return ResponseEntity.ok(locations);
    }



}

