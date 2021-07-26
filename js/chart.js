class MyGithubChart {
    constructor(Username, ChartName, Config) {
        this.github = new Github(Username);
        this.github.parseLastCommits(5);
        this.ctx = document.getElementById(ChartName).getContext("2d");
        this.chart = new Chart(this.ctx, Config);
        
    }

    setTitle (title) {
        this.chart.options.plugins.title = title;
        this.chart.update();
    }

    setLabel (Yaxis, labelName) {
        this.chart.data.datasets.forEach(label => {
            if (label.label == labelName)
                label.data.push(Yaxis);
        });
    }

    setLabels (xAxis, Yaxis, labelName) {
        this.github.repos.forEach(element => {
            this.chart.data.labels.push(element[xAxis])
            this.setLabel(element[Yaxis], labelName)
        });
        this.chart.update();
    }
}

// Chart start data
const Data = {
    labels: [],
    datasets: [{
        label: 'Stars',
        data: [],
        borderColor: "rgba(255,255,255,0.5)",
        backgroundColor: "rgba(255,255,255,0.05)"
    }]
}

// Chart config
const Config = {
    type: 'bar',
    data: Data,
    options: {
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                      min: 0,
                      stepSize: 1
                }
            }]
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                position: "bottom",
                text: ""
            }
        }
    }
}

// Change default font color
Chart.defaults.global.defaultFontColor = "#5990af";

// New chart object
var chart = new MyGithubChart("b0th", "myChart", Config);
setTimeout(`chart.setLabels("name", "stargazers_count", "Stars")`, 500);

// Set title
//chart.setTitle(`Public ${chart.github.username} GitHub data`);