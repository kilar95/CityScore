import { retrieveCitiesData } from './api/teleportAPI.js';

const apiData = await retrieveCitiesData();

export default class City {
  constructor(name) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
    this.href = (apiData.data.find(city => city.name.toLowerCase() == this.name.toLowerCase())).href;
  }

  async getCityData() {
    try {

      // fetch full name and scores Href using lodash
      const mainJson = await axios.get(this.href);

      this.fullName = _.get(mainJson, 'data.full_name');
      this.nation = this.fullName.replace(`${this.name}, `, '');
      this.continent = _.get(mainJson, 'data.continent');
      this.scoresHref = _.get(mainJson, 'data._links.ua:scores.href');
      this.imgHref = _.get(mainJson, 'data._links.ua:images.href');

      // fetch summary and scores without using lodash
      const scoresJson = await axios.get(this.scoresHref);
      this.summary = scoresJson.data.summary;
      this.globalScore = scoresJson.data.teleport_city_score;
      this.categories = scoresJson.data.categories;

      // fetch city image 
      const imgJson = await axios.get(this.imgHref);
      this.image = imgJson.data.photos[0].image.web;

    } catch (err) {
      console.log('HTTP error! ' + err);
    }

  }
}
