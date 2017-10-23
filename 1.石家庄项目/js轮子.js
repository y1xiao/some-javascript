//关于闭包
//循环使用匿名函数示例
for (var i = 0; i < json.length; i++) {
    var jsonObj = json[i];
    var pi = document.getElementsByClassName("everyclass")[i];
    var picn1 = pi.getElementsByTagName("div")[0].getElementsByTagName("p")[0].innerText;
    var picn2 = pi.getElementsByTagName("div")[1].getElementsByTagName("p")[0].innerText;
    var picn3 = pi.getElementsByTagName("div")[2].getElementsByTagName("p")[0].innerText;
    var picn4 = pi.getElementsByTagName("div")[3].getElementsByTagName("p")[0].innerText;
    var picn5 = pi.getElementsByTagName("div")[4].getElementsByTagName("p")[0].innerText;
    var picn6 = jsonObj.courseId;
    if (picn1 != jsonObj.courseName || picn2 != jsonObj.teacherName || picn3 != jsonObj.location || picn4 != jsonObj.courseSeq || picn5 != jsonObj.classes) {
        alert(picn1 != jsonObj.courseName || picn2 != jsonObj.teacherName || picn3 != jsonObj.location || picn4 != jsonObj.courseSeq || picn5 != jsonObj.classes);
        (function() {
            var pic1 = picn1;
            var pic2 = picn2;
            var pic3 = picn3;
            var pic4 = picn4;
            var pic5 = picn5;
            var pic6 = picn6;
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/guide/addCourse.action",
                data: {
                    courseName: pic1,
                    teacherName: pic2,
                    location: pic3,
                    courseSeq: pic4,
                    classes: pic5,
                    courseId: pic6
                },
                success: function(data) {
                    alert(pic1 + "修改成功");
                },
                error: function(jqXHR) {
                    alert(pic1 + "修改失败");
                },
            });
        })()
    }
}
//关于ajax
//js原生ajax示例
//直接执行：获取全部学员信息
function allinfo() {
    var lc = document.getElementsByClassName("learners")[0];
    var openvalue = "http://localhost:8080/guide/userPandect.action";
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var txt = xmlhttp.responseText;
            var obj = JSON.parse(txt);
            var txttable = "";

            function forin(json) {
                for (var i = 0; i < json.length; i++) {
                    var jsonObj = json[i];
                    txttable = txttable + "<div class=\"everylearner\">";
                    txttable = txttable + "<p class=\"learnerp\">" + jsonObj.userName + "</p>";
                    txttable = txttable + "<p class=\"learnerp learnerppn\">" + jsonObj.phoneNumber + "</p>";
                    txttable = txttable + "<p class=\"learnerp\">" + "详细信息" + "</p></div>";
                }
            }
            forin(obj);
            lc.innerHTML = txttable;
        } else {
            lc.style = 'color:red;';
            lc.innerHTML = "查找失败";
        }
    }
    xmlhttp.open("POST", openvalue, false);
    xmlhttp.send();
}
//查找一个学员信息
function oneinfo() {
    var isAjax = false;
    var detailed = document.getElementsByClassName("detailed")[0];
    var dr = document.getElementsByClassName("detailedpright");
    document.getElementsByClassName("searchbt")[0].onclick = function() {
        var isAjax = false;
        $(".detailed").attr('style', 'display:block;');
        $(".learnerscontainer").attr('style', 'display:none;');
        var str = document.getElementsByClassName("searchput")[0].value;
        if (isAjax) { return; } else {
            isAjax = true;

            function showHint1(s) {
                var openvalue = "http://localhost:8080/guide/getPersionalInfo.action?phoneNumber=";
                var xmlhttp;
                if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                } else { // code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                if (str.length == 0) {
                    detailed.style = 'color:red;'
                    $(".detailed").attr('style', 'display:block;');
                    detailed.innerHTML = "查找失败：空字符串";
                    isAjax = false;
                } else {
                    xmlhttp.onreadystatechange = function() {
                        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                            var txt = xmlhttp.responseText;
                            var obj = JSON.parse(txt);
                            forin(obj);
                            isAjax = false;
                        } else {
                            detailed.innerHTML = "查找失败:无效字符串";
                            isAjax = false;
                        }
                    }
                }
            }
            xmlhttp.open("POST", openvalue + s, true);
            xmlhttp.send();
        }
        showHint1(str);
    }
}
}
//jq  ajax实现
function allinfo() {
    $(".detailed").attr('style', 'display:none;');
    $(".Addlearnercontainer").attr('style', 'display:none;');
    $(".learnerscontainer").attr('style', 'display:block;');
    $(".addClass").attr('style', 'display:none;');
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/guide/getClass.action",
        async: false,
        success: function(data) {
            var lc = document.getElementById("choiceClass");
            var txt = data;
            var obj = JSON.parse(txt);
            var txttable = "";
            for (var i = 0; i < obj.length; i++) {
                var jsonObj = obj[i];
                txttable = txttable + " <div class=\"everyChoice class0\"><p>" + jsonObj.classes + "</p></div>";
            }
            /*txttable = txttable + " <div class=\"everyChoice\"><p class=\"changeclass \">" + "添加班级" + "</p></div>";*/
            lc.innerHTML += txttable;
            var c0 = document.getElementsByClassName("class0");
            for (var i = 0; i <= c0.length - 1; i++) {
                (function() {
                    var k = i;
                    c0[k].onclick = function() {
                        document.getElementsByClassName("Classes")[0].getElementsByTagName("p")[0].setAttribute("id", "");
                        $(".detailed").attr('style', 'display:none;');
                        $(".Addlearnercontainer").attr('style', 'display:none;');
                        $(".learnerscontainer").attr('style', 'display:block;');
                        $(".addClass").attr('style', 'display:none;');
                        $('.class0').attr('id', '');
                        $(this).attr('id', 'yearhover');
                        if (k == 0) {
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:8080/guide/userPandect.action",
                                async: false,
                                success: function(data) {
                                    var lc = document.getElementsByClassName("learners")[0];
                                    var txt = data;
                                    var obj = JSON.parse(txt);
                                    var txttable = "";

                                    function forin(json) {
                                        for (var i = 0; i < json.length; i++) {
                                            var jsonObj = json[i];
                                            txttable = txttable + "<div class=\"everylearner\">";
                                            txttable = txttable + "<p class=\"learnerp\">" + jsonObj.userName + "</p>";
                                            txttable = txttable + "<p class=\"learnerp learnerppn\">" + jsonObj.phoneNumber + "</p>";
                                            txttable = txttable + "<p class=\"learnerp everylearnerp\">" + "详细信息" + "</p></div>";
                                        }
                                    }
                                    forin(obj);
                                    lc.innerHTML = txttable;
                                    document.getElementsByClassName("Classes")[0].getElementsByTagName("p")[0].innerText = "选择班级";
                                },
                                error: function(jqXHR) {
                                    alert("发生错误：" + jqXHR.status);
                                },
                            });
                        } else if (k == c0.length - 1) {
                            document.getElementsByClassName("Classes")[0].getElementsByTagName("p")[0].setAttribute("id", "");
                            document.getElementsByClassName("Classes")[0].getElementsByTagName("p")[0].innerText = "选择班级";
                            $('.class0').attr('id', '');
                            $(".addClass").attr('style', 'display:block;');
                            $(".detailed").attr('style', 'display:none;');
                            $(".learnerscontainer").attr('style', 'display:none;');
                            $(".Addlearnercontainer").attr('style', 'display:none;');
                            document.getElementsByClassName("AddClassSubmit")[0].onclick = function() {
                                var a = k;
                                var ac = document.getElementsByClassName("addClassinput")[0].value;
                                var lc = document.getElementsByClassName("fourclass")[0];
                                var cc = document.getElementsByClassName("changeclass")[a - 1];
                                $.ajax({
                                    type: "POST",
                                    url: "http://localhost:8080/guide/addClass.action",
                                    async: false,
                                    data: { classes: ac },
                                    success: function(data) {
                                        /*var txttable = lc.innerHTML;
                                        cc.innerText = ac;
                                        txttable = txttable + " <div class=\"class0\"><p class=\"changeclass \">" + "添加班级" + "</p></div>";
                                        lc.innerHTML = txttable;*/
                                        if (data = "success") {

                                            alert("添加成功");
                                        } else {
                                            alert("添加失败");
                                        }
                                    },
                                    error: function(jqXHR) {
                                        alert("发生错误：" + jqXHR.status);
                                    },
                                });
                                document.getElementsByClassName("addClassinput")[0].value = "";
                                allinfo();
                            }
                        } else {
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:8080/guide/userPandect.action",
                                async: false,
                                success: function(data) {
                                    $('.class0').attr('id', '');
                                    document.getElementsByClassName("Classes")[0].getElementsByTagName("p")[0].setAttribute("id", "yearhover");
                                    var lc = document.getElementsByClassName("learners")[0];
                                    var txt = data;
                                    var obj = JSON.parse(txt);
                                    var txttable = "";
                                    document.getElementsByClassName("Classes")[0].getElementsByTagName("p")[0].innerText = c0[k].innerText;
                                    var lcp = document.getElementsByClassName("Classes")[0].getElementsByTagName("p")[0];

                                    function forin(json) {
                                        for (var i = 0; i < json.length; i++) {
                                            var jsonObj = json[i];
                                            if (jsonObj.classes == lcp.innerText) {
                                                txttable = txttable + "<div class=\"everylearner\">";
                                                txttable = txttable + "<p class=\"learnerp\">" + jsonObj.userName + "</p>";
                                                txttable = txttable + "<p class=\"learnerp learnerppn\">" + jsonObj.phoneNumber + "</p>";
                                                txttable = txttable + "<p class=\"learnerp everylearnerp\">" + "详细信息" + "</p></div>";
                                            }
                                        }
                                    }
                                    forin(obj);
                                    lc.innerHTML = txttable;
                                },
                                error: function(jqXHR) {
                                    alert("发生错误：" + jqXHR.status);
                                },
                            });
                        }
                        var everylearners = document.getElementsByClassName("everylearner");
                        var everylearnerps = document.getElementsByClassName("everylearnerp");
                        var learnerps = document.getElementsByClassName("learnerppn");
                        for (var i = 0; i <= everylearners.length - 1; i++) {
                            (function() {
                                var k = i;
                                var el = everylearners[k];
                                var elp = everylearnerps[k];
                                var ls = learnerps[k].innerText.toString();
                                var dr = document.getElementsByClassName("detailedpright");
                                elp.onclick = function() {
                                    $(".addClass").attr('style', 'display:none;');
                                    $(".detailed").attr('style', 'display:block;');
                                    $(".learnerscontainer").attr('style', 'display:none;');
                                    $(".Addlearnercontainer").attr('style', 'display:none;');
                                    $.ajax({
                                        type: "POST",
                                        url: "http://localhost:8080/guide/getPersionalInfo.action",
                                        data: { phoneNumber: ls },
                                        success: function(data) {
                                            var txt = data;
                                            var obj = JSON.parse(txt);
                                            /* function forin(json) {
                                                 for (var key in json) {*/
                                            dr[0].innerHTML = obj.userName;
                                            dr[1].innerHTML = obj.gender;
                                            dr[2].innerHTML = obj.IDNumber;
                                            dr[3].innerHTML = obj.email;
                                            dr[4].innerText = obj.phoneNumber;
                                            dr[5].innerHTML = obj.classes;
                                        },
                                        error: function() {
                                            var detailed = document.getElementsByClassName("detailed")[0];
                                            detailed.innerHTML = "查找失败:无效字符串";
                                        },
                                    });
                                }
                            })();
                        }
                    }
                })()
            }
        },
        error: function(jqXHR) {
            alert("发生错误：" + jqXHR.status);
        },
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/guide/userPandect.action",
        async: false,
        success: function(data) {
            var lc = document.getElementsByClassName("learners")[0];
            var txt = data;
            var obj = JSON.parse(txt);
            var txttable = "";

            function forin(json) {
                for (var i = 0; i < json.length; i++) {
                    var jsonObj = json[i];
                    txttable = txttable + "<div class=\"everylearner\">";
                    txttable = txttable + "<p class=\"learnerp\">" + jsonObj.userName + "</p>";
                    txttable = txttable + "<p class=\"learnerp learnerppn\">" + jsonObj.phoneNumber + "</p>";
                    txttable = txttable + "<p class=\"learnerp everylearnerp\">" + "详细信息" + "</p></div>";
                }
            }
            forin(obj);
            lc.innerHTML = txttable;
        },
        error: function(jqXHR) {
            alert("发生错误：" + jqXHR.status);
        },
    });
};
//关于mock
//mock以及json
var json2 = {
    "IDNumber": "1452484",
    "admin": "",
    "email": "undefined",
    "gender": "男",
    "openId": "",
    "password": "456789",
    "phoneNumber": "15531282504",
    "userName": "try",
    "classes": "电工班1",
    "verifCode": ""
};
$.mockjax({
    url: 'http://localhost:8080/guide/getPersionalInfo.action',
    data: { phoneNumber: "15531282504" },
    status: 200,
    responseTime: 50,
    responseText: JSON.stringify(json2)
});