// import { Chart } from "./chart.js";

export default class ShowCity {
    constructor() {
        this.cityMainTitle = document.querySelector('.title');
        this.header = document.querySelector('header');
        this.descrTitle = document.querySelector('.descr-title');
        this.cityDetails = document.querySelector('.city-details');
        this.summary = document.querySelector('.descr-p');
        this.chartTitle = document.querySelector('.compare-title');
        this.chartDiv = document.querySelector('.chart');
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
    }

    displaySummary(summary) {
        this.summary.innerHTML = summary;
    }

    displayGlobalScore(score) {
        this.globalScore.innerHTML = score;
    }

    displayChartTitle() {
        this.chartTitle.innerHTML = 'Categories Scores';
    }

    // displayChart() {
    //     new Chart(this.chartDiv, {
    //         type: 'bar',
    //         data: {
    //             labels: 
    //         }
    //     })
    // }



}