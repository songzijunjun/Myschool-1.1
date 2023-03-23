//添加学生前的准备工作
function addstudent() {
    var title = document.getElementById("title");
    title.innerHTML = "Add Students";
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('get', "/admin/student/insert");
    ajaxObj.send();
    ajaxObj.onreadystatechange = function () {
        if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
            console.log('Load successfully!');
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

            container.appendChild(createDivWithInput("Name", "name", "false", ""));
            container.appendChild(createDivWithSelection("Gender", "sexes", "", new Array("Male","Female")));
            container.appendChild(createDivWithInput("Date of Birth", "birth_year", "false", ""));
            container.appendChild(createDivWithInput("Region", "province", "false", ""));
            container.appendChild(createDivWithInput("Date of Enrollment", "enter_year", "false", ""));
            container.appendChild(createDivWithSelection("Major Name", "majors", "", major_list));
            container.appendChild(createButton("Confirm", "0px", insertstudent));
        }
        else if(ajaxObj.readyState == 4 && ajaxObj.status == 404) {
            var last=ajaxObj.responseText; //将JSON对象转化为JSON字符
            var obj = JSON.parse(last);
            alert("Add unsuccessfully: " + obj.error);
        }
    }
}

//添加教师前的准备工作
function addteacher() {
    var title = document.getElementById("title");
    title.innerHTML = "添加教师";

    var container = document.getElementById("container");
    while(container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }

    container.appendChild(createDivWithInput("Name", "name", "false", ""));
    container.appendChild(createDivWithSelection("Gender", "sexes", "", new Array("Male","Female")));
    container.appendChild(createDivWithInput("Date of Birth", "birth_year", "false", ""));
    container.appendChild(createButton("Confirm", "0px", insertteacher));
}

//添加课程前的准备工作
function addcourse() {
    var title = document.getElementById("title");
    title.innerHTML = "Add course";
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('get', "/admin/course/insert");
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
            for (var i = 0; i < obj.teachers.length; i ++) {
                teacher_list[i] = obj.teachers[i].teacher_id + "/" + obj.teachers[i].teacher_name;
            }
            
            container.appendChild(createDivWithInput("Course name", "name", "false", ""));
            container.appendChild(createDivWithInput("Scheduled year", "year", "false", ""));
            container.appendChild(createDivWithSelection("scheduled semester", "semester", "", new Array("sem1","sem2")));
            container.appendChild(createDivWithInput("Credit", "credit", "false", ""));
            container.appendChild(createDivWithSelection("Teacher number", "teachers", "", teacher_list));
            container.appendChild(createButton("Confirm", "0px", insertcourse));
        }
        else if(ajaxObj.readyState == 4 && ajaxObj.status == 404) {
            var last=ajaxObj.responseText; //将JSON对象转化为JSON字符
            var obj = JSON.parse(last);
            alert("Add failed: " + obj.error);
        }
    }
}

//添加专业前的准备工作
function addmajor() {
    var title = document.getElementById("title");
    title.innerHTML = "Add major";

    var container = document.getElementById("container");
    while(container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }

    container.appendChild(createDivWithInput("Major name", "name", "false", ""));
    container.appendChild(createButton("Confirm", "0px", insertmajor));
}

//添加专业选课前的准备工作
function addmajorcourse() {
    var title = document.getElementById("title");
    title.innerHTML = "Confirm enrollment";
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('get', "/admin/major_course/insert");
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

            major_list = new Array();
            for (var i = 0; i < obj.majors.length; i ++) {
                major_list[i] = obj.majors[i].major_id + "/" + obj.majors[i].major_name;
            }
            course_list = new Array();
            for (var i = 0; i < obj.courses.length; i ++) {
                course_list[i] = obj.courses[i].course_id + "/" + obj.courses[i].course_name;
            }
            container.appendChild(createDivWithSelection("Major name/id", "major", "false", major_list));
            container.appendChild(createDivWithSelection("Course name/id", "course", "false", course_list));
            container.appendChild(createButton("Confirm", "0px", insertmajorcourse));
        }
        else if(ajaxObj.readyState == 4 && ajaxObj.status == 404) {
            var last=ajaxObj.responseText; //将JSON对象转化为JSON字符
            var obj = JSON.parse(last);
            alert("Add failed: " + obj.error);
        }
    }
}