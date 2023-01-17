// import { Chart } from "chart.js/dist";

export default class ShowCity {
    constructor() {
        this.cityMainTitle = document.querySelector('.title');
        this.header = document.querySelector('header');
        this.descrTitle = document.querySelector('.descr-title');
        this.cityDetails = document.querySelector('.city-details');
        this.summary = document.querySelector('.descr-p');
        this.chartTitle = document.querySelector('.compare-title');
        this.comparePar = document.querySelector('.compare-p');
        this.chartContainer = document.querySelector('.chart-container');
        this.chartCanvas = document.querySelector('.chart');
        this.globalScore = document.querySelector('.global-score');
    }

    displayMainTitle(title) {
        this.cityMainTitle.innerHTML = title;
    }

    displayHeaderImg(image) {
        this.header.style.backgroundImage = `url(${image})`;
    }

    displayDescrTitle(cityNation, cityContinent) {
        this.descrTitle.innerHTML = 'Global Score: ';
        this.descrTitle.style.textDecoration = 'underline';
        this.cityDetails.innerHTML = `Nation: ${cityNation} <br> Continent: ${cityContinent}`;
        this.cityDetails.removeAttribute('hidden');
    }

    displaySummary(summary) {
        this.summary.innerHTML = summary;
        this.summary.style.overflowY = 'scroll';
    }

    displayGlobalScore(score) {
        this.globalScore.classList.add('global-score-visible');
        this.globalScore.innerHTML = score;
        this.globalScore.removeAttribute('hidden');
    }

    displayChartTitle() {
        this.chartTitle.innerHTML = 'Categories Scores';
        this.chartTitle.style.textDecoration = 'underline';
    }

    displayChart(colors, labels, scores) {
        this.comparePar.setAttribute('hidden', true);
        this.chartCanvas.removeAttribute('hidden');
        this.chartContainer.classList.add('chart-container-visible');
                
        const myChart = new Chart(this.chartCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Scores',
                    data: scores,
                    backgroundColor: colors,
                    borderColor: colors,
                }]
            },
            options: {
                indexAxis: 'y',
                elements: {
                    bar: {
                        borderWidth: 1,
                    }
                },
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        this.myChart = myChart;

    }



}