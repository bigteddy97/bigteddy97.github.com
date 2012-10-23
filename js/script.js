var start = new Date(1997, 7-1, 10);

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getDayAge(date) {
	var today=new Date();
	var one_day=1000*60*60*24;
	return Math.ceil((today.getTime()-date.getTime())/(one_day));
}

$(function() {
    refresh();
	setInterval(refresh, 1000);

    loadRepos();
});

function refresh() {
    $("#age").html(getAge(start));
    $("#days").html(getDayAge(start));
    var percent = getAge(start)/80 * 100;
    $("#percent").width(percent*8);
    $("#percText").html(percent);
}

function loadRepos() {
    $.getJSON("https://api.github.com/users/bigteddy97/repos?callback=?", function(data) {
        data.data.sort(custom_sort);
        for (var i = data.data.length - 1; i >= 0; i--) {
            var repo = data.data[i];
            $("#project-list").append("<li><a href=\""+repo.html_url+"\"><h2>"+repo.name+"</h2> <h3>"+repo.language+"</h3><p>"+repo.description+"</p></a></li>");
        } 
    });
    
}

function custom_sort(a, b) {
    return new Date(a.pushed_at).getTime() - new Date(b.pushed_at).getTime();
}