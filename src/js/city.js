import { retrieveCitiesData } from './api/teleportAPI.js';

const apiData = await retrieveCitiesData();

export default class City {
  constructor(name) {
    this.name = name;
    this.href = this.getCityLink();
  }

  getCityLink() {
    const city = apiData.data.find(city => city.name.toLowerCase() == this.name.toLowerCase());
    const cityHref = city.href;

    return cityHref;
  }

  async getCityDetails() {
    const response = await fetch(this.href);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    return {
      fullName: json.full_name,
      scoresHref: json._links['ua:scores'].href
    }
  }

  async getCitySummaryAndScores() {
    const scoresHref = (await this.getCityDetails()).scoresHref;

    const response = await fetch(scoresHref);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    return {
      summary: json.summary,
      globalScore: json.teleport_city_score,
      categories: json.categories
    }
  }
}

