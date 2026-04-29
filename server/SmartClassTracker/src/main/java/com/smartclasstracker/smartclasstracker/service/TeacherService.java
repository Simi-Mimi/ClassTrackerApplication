package com.smartclasstracker.smartclasstracker.service;

import com.smartclasstracker.smartclasstracker.models.Role;
import com.smartclasstracker.smartclasstracker.models.Teacher;
import com.smartclasstracker.smartclasstracker.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    public Teacher createTeacher(Teacher newTeacher, String currentUserId) {
        //המורה הראשון שנרשם הופך למנהל
        long count = teacherRepository.count();
        if (count == 0) {
            newTeacher.setRole(Role.SCHOOL_MANAGER);
            newTeacher.setClassroom(null);
            System.out.println("המנהל נרשם למערכת: " + newTeacher.getFirstName());
            return teacherRepository.save(newTeacher);
        } else {
            Teacher currentUser = teacherRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("משתמש מחובר לא נמצא"));
            if (currentUser.getRole() != Role.SCHOOL_MANAGER) {
                throw new RuntimeException("אין לך הרשאה לרשום מורות חדשות!");
            }
            if (newTeacher.getId().equals(currentUserId)) {
                if (newTeacher.getClassroom() != null && newTeacher.getClassroom().getId() != null) {
                    Long requestedClassId = newTeacher.getClassroom().getId();
                    if (teacherRepository.existsByClassroomId(requestedClassId)) {
                        throw new RuntimeException("לכיתה זו כבר קיים מורה במערכת");
                    }
                }
                currentUser.setClassroom(newTeacher.getClassroom());
                System.out.println("מעדכן כיתה למנהל: " + currentUser.getFirstName());
                return teacherRepository.save(currentUser);
            }
            if (teacherRepository.existsById(newTeacher.getId())) {
                Teacher existing = teacherRepository.findById(newTeacher.getId()).get();
                throw new RuntimeException("מורה עם תעודת זהות זו כבר קיימת במערכת: " + existing.getFirstName() + " " + existing.getLastName());
            }
            if (newTeacher.getClassroom() != null && newTeacher.getClassroom().getId() != null) {
                Long classroomId = newTeacher.getClassroom().getId();
                if (teacherRepository.existsByClassroomId(classroomId)) {
                    throw new RuntimeException("לכיתה זו כבר קיים מורה במערכת");
                }
            }
            if (newTeacher.getRole() == null) {
                newTeacher.setRole(Role.TEACHER);
            }
            return teacherRepository.save(newTeacher);
        }
    }
}
