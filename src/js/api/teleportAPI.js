// let's fetch the data from the API 

export async function retrieveCitiesData () {
    try {
        const json = await axios.get('https://api.teleport.org/api/urban_areas/');
        const citiesData = _.get(json, 'data._links.ua:item');
        
        return {
            data: citiesData,
            getCitiesNames: () => citiesData.map(city => city.name)
        }
    } catch(err) {
        alert('HTTP error! ' + err);
    }
}










