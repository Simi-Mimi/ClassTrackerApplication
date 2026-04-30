import random
import requests
import time
from datetime import datetime

BASE_URL="http://localhost:8080/api"
GET_STUDENTS_URL=f"{BASE_URL}/students/class"
GET_TEACHERS_URL=f"{BASE_URL}/teachers"
POST_LOCATION_URL=f"{BASE_URL}/updateLocation"

def get_teachers():
    try:
        response = requests.get(GET_TEACHERS_URL)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"שגיאה במשיכת מורות: {response.status_code}")
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

def send_location(user_id,num):
    if num==1:
        json_location = {
        "id": str(user_id),
        "coordinates": {
        "longitude": {
                "degrees": 34, 
                "minutes":60, 
                "seconds": random.randint(0, 59)
        },
        "latitude": {
                "degrees": 30, 
                "minutes": 45, 
                "seconds": random.randint(0, 59)
        }
        },
        "time": datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    else:
        json_location = {
        "id": str(user_id),
        "coordinates": {
        "longitude": {
                "degrees": 34, 
                "minutes":57, 
                "seconds": random.randint(0, 59)
        },
        "latitude": {
                "degrees": 30, 
                "minutes": 45, 
                "seconds": random.randint(0, 59)
        }
        },
        "time": datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    }
    try:
       response = requests.post(POST_LOCATION_URL, json=json_location)
       print(f"Status: {response.status_code}, Response: {response.text}")
    except Exception as e:
       print(f"Connection Error: {e}")



while True:
    teachers=get_teachers()
    for s in teachers: 
        num=0
        teacher_id=s.get('id')
        send_location(teacher_id,num)
        students=get_students(teacher_id)
        for t in students:
            num+=1
            students_id=t.get('id')
            send_location(students_id,num)
    time.sleep(60)
