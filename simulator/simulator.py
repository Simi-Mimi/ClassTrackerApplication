import random
import requests
import time
from datetime import datetime

BASE_URL="http://localhost:8080/api"
GET_STUDENTS_URL=f"{BASE_URL}/students/class"
GET_TEACHERS_URL=f"{BASE_URL}/teachers"
POST_LOCATION_URL=f"{BASE_URL}/updateLocationStu"

def get_teachers():
    try:
        response = requests.get(GET_TEACHERS_URL)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"שגיאה במשיכת תלמידות: {response.status_code}")
            return []
    except Exception as e:
        print(f"שגיאה: {e}")
        return []

def get_students(teacher_id):
    headers = {"Teacher-ID": str(teacher_id)}
    try:
        response = requests.get(GET_STUDENTS_URL, headers=headers)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"שגיאה במשיכת תלמידות: {response.status_code}")
            return []
    except Exception as e:
        print(f"שגיאה: {e}")
        return []

def send_location(student_id):
    json_location = {
        "id": str(student_id),
        "coordinates": {
"longitude": {
                "degrees": 34, 
                "minutes": random.randint(40, 50), 
                "seconds": random.randint(0, 59)
            },
            "latitude": {
                "degrees": 32, 
                "minutes": random.randint(0, 40), 
                "seconds": random.randint(0, 59)
            }
        },
        "time": datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    try:
        requests.post(POST_LOCATION_URL, json=json_location)
    except:
        pass


while True:
    teachers=get_teachers()
    for s in teachers:
        teacher_id=s.get('id')
        students=get_students(teacher_id)
        for t in students:
            students_id=t.get('id')
            send_location(students_id)
    time.sleep(3)