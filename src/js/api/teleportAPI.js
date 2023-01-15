// let's fetch the data from the API 

export async function retrieveCitiesData () {

    const response = await fetch('https://api.teleport.org/api/urban_areas/');

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    const citiesData = json._links[`ua:item`];

    return {
        data : citiesData,
        getCitiesNames: () => citiesData.map(city => city.name),
        getCitiesHrefs: () => citiesData.map(city => city.href),
    }
}










