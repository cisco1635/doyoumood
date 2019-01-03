function generateDonut() {
    var donut = document.createElement('canvas');
    var div = document.getElementById("donutDiv"); 
    donut.id     = "donutChart";
    div.appendChild(donut);
    donut.parentNode.style.width = '400px';
    
    var data = {
        label: '# de votes',
        labels: ["Overjoyed", "Happy", "Neutral", "Annoyed", "Angry"],
        datasets: [{
            data: [5, 4, 3, 10, 2],
            backgroundColor: [
                'rgb(0, 157, 224)',
                'rgb(151, 191, 14)',
                'rgb(242, 148, 0)',
                'rgb(127, 0, 55)',
                'rgb(255, 241, 96)'
            ],
            borderWidth: 0
        }]
    };

    var options = {
        animation : {animateRotate:true},
        legend: {display: false}
    };

    var myPieChart = new Chart(donut,{
        type: 'pie',
        data: data,
        options: options
    });
}

function generateLine() {
    var line = document.createElement('canvas');
    var div = document.getElementById("lineDiv"); 
    line.id     = "LineChart";
    div.appendChild(line);
    line.parentNode.style.height = '200px';
    line.parentNode.style.width = '800px';
    
    var data = {
        label: 'Tendance',
        labels: ["J1", "J2", "J3", "J4", "J5"],
        datasets: [{
            data: [3.5,2.9,2.9,2.6,3.6]
        }]
    };

    var options = {
        legend: {display: false}
    };

    var myLineChart = new Chart(line,{
        type: 'line',
        data: data,
        options: options
    });
}