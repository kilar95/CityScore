import { retrieveCitiesData } from './api/teleportAPI.js';

const apiData = await retrieveCitiesData();

export default class City {
  constructor(name) {
    this.name = name;
  }

  async getCityData() {
    const city = apiData.data.find(city => city.name.toLowerCase() == this.name.toLowerCase());

    // fetch full name and scores Href

    const response = await fetch(city.href);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    this.fullName = json.full_name;
    this.nation = this.fullName.replace(`${this.name}, `, '');
    this.continent = json.continent;
    this.scoresHref = json._links['ua:scores'].href;
    this.imgHref = json._links['ua:images'].href;

    // fetch summary and scores

    const scoresResponse = await fetch(this.scoresHref);
    if (!scoresResponse.ok) {
      throw new Error(`HTTP error! status: ${scoresResponse.status}`);
    }

    const scoresJson = await scoresResponse.json();

    this.summary = scoresJson.summary;
    this.globalScore = scoresJson.teleport_city_score;
    this.categories = scoresJson.categories;
    console.log(this.categories);

    // fetch city image 
    const imgResponse = await fetch(this.imgHref);
    if (!imgResponse.ok) {
      throw new Error(`HTTP error! status: ${imgResponse.status}`);
    }

    const imgJson = await imgResponse.json();
    this.desktopImage = imgJson.photos[0].image.web;
    this.mobileImage = imgJson.photos[0].image.mobile;

  }
}

// const rome = new City('Rome');
// rome.getCityData();

// console.log(rome);
