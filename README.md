# ניהול טיולים בבתי ספר
## אודות הפרויקט
מטרת המערכת היא ניהול ובטיחות של טיולים בית- ספריים באמצעות איכון בזמן אמת.

המערכת כוללת:
- ממשק לניהול משתמשים (מורות ותלמידות)
- תצוגה גיאוגרפית חיה עם זיהוי והתרעה אוטומטית כאשר תלמידה מתרחקת מעבר לטווח המותר
- סימולטור המדמה מכשירי איכון תלמידים השולחים מיקומי GPS


---

## טכנולוגיות ומבנה המערכת

| שכבה | טכנולוגיה |
|------|------------|
| Client Side | React (JSX) + Leaflet (מפה) |
| Server Side | Java Spring Boot (REST API) |
| Database | H2 Database (SQL) |
| Simulator | Python (  לשרת JSON שליחת) |

---

## דרישות קדם 

### לפני הרצת הפרויקט יש לוודא התקנה של:
1. שרת- Java JDK גרסא 11 לפחות
2. לקוח- VS Code (מומלץ), Node.js+npm
3. סימולטור- Python 3.x


## הוראות הרצה

### 1. צד שרת (Java Spring Boot)

1. פתח את תיקיית ה-Server ב־IntelliJ IDEA  
2. המתן לטעינת Maven Dependencies  
3. הרץ את הפרויקט (Run Application)

גישה למסד הנתונים:
`http://localhost:8080/h2-console`

יש לוודא התאמה ל־JDBC URL בקובץ `application.properties`.

### 2. צד לקוח (React)

1. פתח את תיקיית ה-Client ב־VS Code  
2. פתח טרמינל והרץ:


`npm install`

3. הפעל את הפרויקט:

`npm run dev`

4. פתח את הקישור שיופיע



### ממשק משתמש



### 2. סימולטור (Python)
1. פתח את תיקיית הסימולטור ב־VS Code
2. הרץ:

`python simulator.py`

<img width="1366" height="610" alt="image" src="https://github.com/user-attachments/assets/89ad8406-e180-4a5d-a051-d97543c6d7a9" />
