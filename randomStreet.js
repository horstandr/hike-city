
async function getRandomStreet(method, info) {

    const overpassUrl = 'https://overpass-api.de/api/interpreter';

    let query;

    if (method == 'city') {

        query = `
            [out:json][timeout:25];
            rel["name"="${cityname}"]["boundary"="administrative"]["admin_level"="8"];
            map_to_area -> .searchArea;
            nwr["highway"="residential"](area.searchArea);
            out geom;
        `;

    } else if (method == 'latlng') {

        //TODO Do some complicated math first

        const south = 52.337017;
        const west = 4.826088;
        const north = 52.372665;
        const east = 4.940071;

        query = `
            [out:json][timeout:25];
            // gather results
            nwr["highway"="residential"](${south},${west},${north},${east});
            // print results
            out geom;
        `;

        L.circle(location, info[1]*1000);
    }


    const response = await fetch(overpassUrl, {
        method: 'POST',
        body: query
    });
    // alert('request sent.');

    const data = await response.json();
    const ways = data.elements.filter(el => el.type === 'way' && el.geometry);


    if (ways.length === 0) {
        alert("No streets found.");
        return;
    }

    const randomWay = ways[Math.floor(Math.random() * ways.length)];
    const latlngs = randomWay.geometry.map(pt => [pt.lat, pt.lon]);

    L.polyline(latlngs, { color: 'blue' }).addTo(map);
    L.marker(latlngs[0]).addTo(map);
}


let params = new URLSearchParams(location.search);

const method = params.get('method');
const cityname = params.get('cityname');
const latlngrange = params.get('latlngrange');
console.log(method);
console.log(cityname);
console.log(latlngrange);

getRandomStreet(method, [cityname, latlngrange]);