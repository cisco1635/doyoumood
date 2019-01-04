function generateDonut() {
    var donut = document.createElement('canvas');
    var div = document.getElementById("donutDiv");
    removeChild(div);
    donut.id = "DonutChart";
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
        animation: { animateRotate: true },
        legend: { display: false },
        circumference: Math.PI,
        rotation: Math.PI
    };

    var myPieChart = new Chart(donut, {
        type: 'pie',
        data: data,
        options: options
    });
}

function generateLine() {
    var line = document.createElement('canvas');
    var div = document.getElementById("lineDiv");
    removeChild(div);
    line.id = "LineChart";
    div.appendChild(line);
    line.parentNode.style.height = '200px';
    line.parentNode.style.width = '1100px';

    var data = {
        label: 'Tendance',
        labels: ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11"],
        datasets: [{
            data: [3.5, 2.9, 2.9, 2.6, 3.6, 4.1, 4.2, 3.9, 4.5, 4.6, 4.3],
            color: "#FFF",
            pointBorderColor: "#000",
            borderColor: "#000",
            borderWidth: 3
        }]
    };

    var options = {
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 5,
                    stepSize: 1,
                    fontColor: "#FFF"
                },
                gridLines: {
                    color: "#FFF"
                }
            }],
            xAxes: [{
                display: true,
                gridLines: {
                    display: false,
                    color: "#FFF"
                },
                ticks: {
                    fontColor: "#FFF"
                },
            }]
        },

    };

    var myLineChart = new Chart(line, {
        type: 'line',
        data: data,
        options: options
    });
}

function removeChild(div) {
    while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
    }
}