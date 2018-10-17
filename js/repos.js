function getRepos(num) {
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.github.com/users/jessicalemos/repos", true);
    xhr.send(null);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304))
            listRepos(xhr.responseText, num);
    }
}

function listRepos(data, num) {

    var objectsData = [];
    var parsedData = JSON.parse(data);

    // Get data from response to an array
    for (var i = 0; i < parsedData.length; i++) {
              var tmp = {
            name: parsedData[i].name,
            description: parsedData[i].description,
            isFork: parsedData[i].fork,
            url: parsedData[i].html_url,
            pushed_at: parsedData[i].pushed_at
        };

        objectsData.push(tmp);
    }

    show_page(num, objectsData);
}

function show_page(num, objectsData) {
    
    if (num == null)
        num = objectsData.length;

    objectsData.sort(function (a, b) {
        if (a.pushed_at > b.pushed_at)
            return -1;
        else
            return 1;
    });

    var ul = document.getElementById('show');
    ul.innerHTML = "";

    for (var i = 0; i < num; i++) {
        var li = document.createElement('li');

        li.innerHTML = 
        "<a href='" + 
        objectsData[i].url + "'>" + "<img class='img-fluid3' src='img/ui.png' alt='' style='display: block !important; margin-left: auto !important; width:30px'>"
        + "<div class='col-lg-4 text-center mb-4'>" + "<h3>" + objectsData[i].name + "</h3>" + "</a>" +
        objectsData[i].description + "</div>" + "<hr>";
        
        ul.appendChild(li);
    }
}
