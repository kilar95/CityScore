
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
                        label: `${this.cityMainTitle.innerHTML}`,
                        data: scores,
                        backgroundColor: colors,
                        borderColor: borderColors,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }); 

        this.chart = myChart;
        this.chartContainer.style.marginBottom = '5rem';

    }

    displayCompareSearchBar() {
        this.compareCitiesDiv = document.querySelector('.compare-cities');
        this.compareCitiesDiv.innerHTML = `<label for='compare-input' style='font-weight: bold;'> Compare with: </label>
        <input type='text' name='compare-input' class='compare-input'>
        <div class='remove-icon'> <i class="fa-solid fa-xmark"></i> </div>
        <div class='compare-hints'></div>`;
    }

    addCityToChart(newCityName, newScores, global) {
        const newChartData = {
            label: `${newCityName}, Global Score: ${global}`,
            data: newScores,
            backgroundColor: 'rgba(122, 122, 122, .5)',
            borderColor: 'rgba(122, 122, 122, 1)',
        };

        this.chart.config.data.datasets.push(newChartData);
        this.chart.update();
    }

    removeCityfromChart() {
        this.chart.config.data.datasets.pop();
        this.chart.update();
    }

}