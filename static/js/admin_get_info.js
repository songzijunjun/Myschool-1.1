//获取学生信息，加载界面
function getstudentinfo(student_id) {
    var title = document.getElementById("title");
    title.innerHTML = "StudentInfo";
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('get', "/admin/student/update?student_id="+student_id);
    ajaxObj.send();
    ajaxObj.onreadystatechange = function () {
        if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
            console.log('Return successfully');
            console.log(ajaxObj.responseText);
            var last=ajaxObj.responseText; //将JSON对象转化为JSON字符
            var obj = JSON.parse(last);

            var container = document.getElementById("container");
            while(container.hasChildNodes()) {
                container.removeChild(container.firstChild);
            }

            var major_list = new Array();
            for (var i = 0; i < obj.majors.length; i ++) {
                major_list[i] = obj.majors[i].major_id + "/" + obj.majors[i].major_name;
            }

            container.appendChild(createDivWithInput("Student Number", "id", "true", obj.student_id));
            container.appendChild(createDivWithInput("Name", "name", "false", obj.student_name));
            container.appendChild(createDivWithSelection("Gender", "sexes", obj.sex, new Array("Male","Female")));
            container.appendChild(createDivWithInput("Date of Birth", "birth_year", "false", obj.birth_year));
            container.appendChild(createDivWithInput("Nationality", "province", "false", obj.province));
            container.appendChild(createDivWithInput("Enroll date", "enter_year", "false", obj.enter_year));
            container.appendChild(createDivWithSelection("Major", "major_ids", obj.major_id+"/"+obj.major_name, major_list));
            
            container.appendChild(createButton("Change", "25px", modifystudent));
            container.lastChild.appendChild(createButtonWithoutDiv("Delete", "0px", deletestudent));
        }
    }
}

//获取老师信息，加载页面
function getteacherinfo(teacher_id) {
    var title = document.getElementById("title");
    title.innerHTML = "TeacherInfo";
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('get', "/admin/teacher/update?teacher_id="+teacher_id);
    ajaxObj.send();
    ajaxObj.onreadystatechange = function () {
        if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
            console.log('Return successfully');
            console.log(ajaxObj.responseText);
            var last = ajaxObj.responseText; //将JSON对象转化为JSON字符     
            var obj = JSON.parse(last);
            var container = document.getElementById("container");
            while(container.hasChildNodes()) {
                container.removeChild(container.firstChild);
            }
            container.appendChild(createDivWithInput("Teacher Number","id","true",obj.teacher_id));
            container.appendChild(createDivWithInput("Name","name","false",obj.teacher_name));
            container.appendChild(createDivWithSelection("Gender", "sexes", obj.sex, new Array("Male","Female")));
            container.appendChild(createDivWithInput("Date of Birth", "birth_year", "false", obj.birth_year));
            // container.appendChild(createDivWithInput("Course taken", "number_of_courses", "false", obj.number_of_courses));
            
            container.appendChild(createButton("Change", "25px", modifyteacher));
            container.lastChild.appendChild(createButtonWithoutDiv("Delete", "0px", deleteteacher));
        }
    }
}

//获取课程信息，加载页面
function getcourseinfo(course_id) {
    var title = document.getElementById("title");
    title.innerHTML = "CourseInfo";
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('get', "/admin/course/update?course_id="+course_id);
    ajaxObj.send();
    ajaxObj.onreadystatechange = function () {
        if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
            console.log('Return successfully');
            console.log(ajaxObj.responseText);
            var last=ajaxObj.responseText; //将JSON对象转化为JSON字符     
            var obj = JSON.parse(last);
            var container = document.getElementById("container");
            while(container.hasChildNodes()) {
                container.removeChild(container.firstChild);
            }

            var teacher_list = new Array();
            var default_value;
            for (var i = 0; i < obj.teachers.length; i ++) {
                teacher_list[i] = obj.teachers[i].teacher_id + "/" + obj.teachers[i].teacher_name;
                if (teacher_list[i].match(obj.teacher_id)) {
                    default_value = teacher_list[i];
                }
            }

            container.appendChild(createDivWithInput("Course Number", "id", "true", obj.course_id));
            container.appendChild(createDivWithInput("Course Name", "name", "false", obj.course_name));
            container.appendChild(createDivWithInput("Scheduled Year", "year", "false", obj.year));
            container.appendChild(createDivWithSelection("Scheduled Semester", "semester", obj.semester, new Array("春","秋")));
            container.appendChild(createDivWithInput("Credits", "credit", "false", obj.credit));
            container.appendChild(createDivWithSelection("Teacher Number", "teacher_ids", default_value, teacher_list));
            
            container.appendChild(createButton("修改", "25px", modifycourse));
            container.lastChild.appendChild(createButtonWithoutDiv("删除", "0px", deletecourse));
        }
    }
}

//获取专业信息，加载界面
function getmajorinfo(major_id) {
    var title = document.getElementById("title");
    title.innerHTML = "Major Information";
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('get', "/admin/major/update?major_id="+major_id);
    ajaxObj.send();
    ajaxObj.onreadystatechange = function () {
        if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
            console.log('Return successfully');
            console.log(ajaxObj.responseText);
            var last=ajaxObj.responseText; //将JSON对象转化为JSON字符     
            var obj = JSON.parse(last);
            var container = document.getElementById("container");
            while(container.hasChildNodes()) {
                container.removeChild(container.firstChild);
            }

            container.appendChild(createDivWithInput("Major number", "id", "true", obj.major_id));
            container.appendChild(createDivWithInput("Major name", "name", "false", obj.major_name));
            
            container.appendChild(createButton("Change", "25px", modifymajor));
            container.lastChild.appendChild(createButtonWithoutDiv("Delete", "0px", deletemajor));
        }
    }
}

//获取专业选课信息，加载界面
function getmajorcourseinfo(major_id, course_id) {
    var title = document.getElementById("title");
    title.innerHTML = "Enrollment Info";
    var container = document.getElementById("container");
    while(container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }

    container.appendChild(createDivWithInput("Major number", "major_id", "true", major_id));
    container.appendChild(createDivWithInput("Course number ", "course_id", "true", course_id));
    
    container.appendChild(createButton("Delete", "0px", deletemajorcourse));
}