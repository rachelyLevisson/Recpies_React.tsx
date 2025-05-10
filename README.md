פרויקט סיכום: הנושא מתכונים

שימו לב מצורף קישור לגיט של הפרויקט בNODE צד שרת ובסוף הדפים יש הוראות כיצד להריץ אותו
https://github.com/saraareact/react-recipy.git

חומר לימודי שהפרויקט צריך לכלול:
●	React-hooks  
●	React-hooks-form – כולל שימוש בולידציה  
React Hook Form - performant, flexible and extensible form library (react-hook-form.com)
https://react-hook-form.com/get-started
●	react-router-dom – ניתובים בין הדפים
●	מעבר על מערכים (map)
●	שימוש בuseState
●	שימוש בuseEffect
●	קריאות axios
●	שימוש באתר חיצוני עבור עיצוב
MUI: The React component library you always wanted
simanti ui
●	React-redux/mobx/useContext
●	חלוקה הגיונית של הקומפוננטות וגם של התיקיות
מומלץ להשתמש בgithub
אז מה המסכים שלנו:
●	חובה ניתוב של header  מתאים כל הזמן(לפי אם יש משתמש זמין או לא)
●	כניסה
●	)הרשמה(
●	דף הבית
●	הצגת מתכונים(המשתמש שהוסיף את המתכון יכול למחוק אותו או לעבור לדף עריכה)
יש לאפשר סינון לפי קטגוריה, משך זמן, רמת קושי, נוצר ע"י
●	הוספת מתכון- עם טופס של react-hooks-form ולשלוח post
●	עריכת מתכון-כמובן רק משתמש שהוסיף או מנהל מערכת

 
שמות האובייקטים והURL  לפרויקט:
פונקציות שרת:
משתמשים
1.	כניסה:
 http://localhost:8080/api/user/login
מסוג post
פרמטרים לשליחה:
Username- מחרוזת
Password – סיסמה
תשובה: אוביקט מסוג לקוח כולל Id

2.	הרשמה:
http://localhost:8080/api/user/sighin
מסוג post
פרמטרים לשליחה:
<אובייקט לקוח>
❖	Id מזהה לקוח
❖	Username- שם משתמש
❖	- מחרוזת
❖	Password – סיסמה
❖	Name - שם
❖	Phone- מספר טלפון
❖	Email- כתובת מייל
❖	Tz מספר זהות
תשובה האובייקט כמו שהוא + מזהה Id יתמלא
מתכונים
3.	קבלת כל המתכונים:
http://localhost:8080/api/recipe
מסוג get
פרמטרים- לא נשלח פרמטרים
תשובה מערך של כל המתכונים

4.	הוספת מתכון-
http://localhost:8080/api/recipe
מסוג post
פרמטרים לשליחה:
<אובייקט מתכון>

❖	Id מזהה מתכון
❖	Name שם המתכון
❖	Instructions - מערך של הוראות
❖	Difficulty רמת קושי
❖	Duration - זמן הכנה
❖	Description - תיאור קצר
❖	UserId משתמש מוסיף
❖	CategoryId- (מספר) מזהה קטגוריה
❖	Img- מסוג מחרוזת url  קישור לתמונה מתאימה
❖	Ingrident מערך של:
<אובייקט מוצר למתכון>
o	Name  שם המוצר
o	Count כמות
o	Type וסוג הכמות (כפות, כוסות, חבילות, גרם וכו')
תשובה המתכון החדש כולל id

5.	עריכת מתכון-(כמובן לא מאפשר לשנות את הID ואת המשתמש שהוסיף אותו)
http://localhost:8080/api/recipe/edit
מסוג post
פרמטרים לשליחה: אובייקט מתכון
פרמטרים תשובה: אובייקט מתכון מעודכן

6.	מחיקת מתכון-(רק למשתמש שהוסיף אותו)
http://localhost:8080/api/recipe/delete/:id
מסוג post
פרמטרים לשליחה: מזהה מתכון
פרמטרים תשובה: הצלחה או כשלון


קטגוריות
7.	קבלת קטגוריות-
http://localhost:8080/api/category
מסוג get
פרמטרים לשליחה: ריק
תשובה: מערך של כל הקטגוריות

עבור הרצת הפרויקט של node:
יש להתקין npm i -g nodemon
להתקין npm i עבור כל ההתקנות שכבר הכנסתי
הרצת הפרויקט nodemon index.js   או node index.js


