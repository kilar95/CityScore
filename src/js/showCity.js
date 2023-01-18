// import { Chart } from "chart.js/dist";

export default class ShowCity {
    constructor() {
        this.cityMainTitle = document.querySelector('.title');
        this.header = document.querySelector('header');
        this.descrTitle = document.querySelector('.descr-title');
        this.cityDetails = document.querySelector('.city-details');
        this.summary = document.querySelector('.descr-p');
        this.chartContainer = document.querySelector('.compare');
        this.globalScore = document.querySelector('.global-score');
    }

    displayMainTitle(title) {
        this.cityMainTitle.innerHTML = title.charAt(0).toUpperCase() + title.slice(1);
    }

    displayHeaderImg(image) {
        this.header.style.backgroundImage = `url(${image})`;
    }

    displayDescrTitle(cityNation, cityContinent) {
        this.descrTitle.innerHTML = 'Global Score: ';
        this.descrTitle.style.textDecoration = 'underline';
        this.cityDetails.innerHTML = `Nation: ${cityNation} <br> Continent: ${cityContinent}`;
        this.cityDetails.hidden = false;
    }

    displaySummary(summary) {
        this.summary.innerHTML = summary;
        this.summary.style.overflowY = 'scroll';
    }

    displayGlobalScore(score) {
        this.globalScore.classList.add('global-score-visible');
        this.globalScore.innerHTML = score;
        this.globalScore.hidden = false;
    }


    displayChart(colors, borderColors, labels, scores) {
        this.chartContainer.innerHTML = `<div class='top-compare-container'> 
        <h2 style="text-decoration: underline">Categories Scores</h2>
        <div class="compare-cities"></div>
        </div>
        <canvas class="chart"></canvas>`
        this.chartContainer.classList.add('chart-container-visible');
        this.chartCanvas = document.querySelector('.chart');
                
        let myChart = new Chart(this.chartCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Scores',
                    data: scores,
                    backgroundColor: colors,
                    borderColor: borderColors,
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

        this.chart = myChart;

    }

    displayCompareSearchBar() {
        this.compareCitiesDiv = document.querySelector('.compare-cities');
        this.compareCitiesDiv.innerHTML = `<label for='compare-input' style='font-weight: bold;'> Compare with: </label>
        <input type='search' name='compare-input' class='compare-input' placeholder='Add another city...'></input>
        <div class='add-icon'> <i class="fa-solid fa-plus"></i> </div>
        <div class='remove-icon'> <i class="fa-solid fa-xmark"></i> </div>
        <div class='results-container'></div>`;
    }
    


}