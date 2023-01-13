let citiesNames = []; 
let citiesData;
// let citiesHref = [];


// let's fetch the data from the API 

    fetch('https://api.teleport.org/api/urban_areas/')
    .then(response => {
        const data = response.json();
        return data;
    }).then(data => {
        citiesData = data._links[`ua:item`];

        citiesData.forEach(objectItem => {
            citiesNames.push(objectItem.name);
        });

        // citiesData.forEach(objItem => {
        //     citiesHref.push(objItem.href);
        // });
        
    }).catch(err => console.log(err));    

    // console.log(citiesNames);
    // setTimeout(clg, 5000);

    // function clg() {
    //     console.log(citiesData);
    // }


export { citiesNames };
export { citiesData };