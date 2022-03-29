function getColor(data)  {
    return data == 1 ? 'red' :
           data == 2 ? 'blue' :
           data == 3 ? 'purple' :
           data == 4 ? 'green' :
           data == 5 ? 'darkred' :
           data == 6 ? 'cadetblue' :
           data == 7 ? 'darkpurple' :
           data == 8 ? 'orange' :
           data == 9 ? 'darkgreen' :  '#FEB24C';
}


function getIcon(data)  {
    return data == 'start' ? 'street-view' :
           data == 'plaza' ? 'tree' : 
           data == 'publico' ? 'users' : 
           data == 'religioso' ? 'church' : 
           data == 'restauracion' ? 'utensils' : 
           data == 'educacion' ? 'school' : 
           data == 'cultural' ? 'landmark' : 
           data == 'artes' ? 'school' : 
           data == 'patrimonio' ? 'school' : 
           data == 'banco' ? 'school' : 
           data == 'comercio' ? 'school' : 
           data == 'civil' ? 'school' : 
           data == 'barrio' ? 'school' : 
           data == 'natural' ? 'school' : 
           data == 'club' ? 'school' : 
           data == 'hotel' ? 'school' : 
           data == 'pilares' ? 'school' :  '#FEB24C';
}

function getZoom(data)  {
    return data == 1 ? 18 :
        data == 2 ? 17 : 
        data == 3 ? 16 : 
        data == 4 ? 16 :
        data == 5 ? 17 : 
        data == 6 ? 18 : 
        data == 7 ? 16 :
        data == 8 ? 18 : 
        data == 9 ? 15 : 13
}


function getCoordinates(data)  {
    return data == 1 ? [-31.657462, -60.71049] :
        data == 2 ? [-31.657462, -60.71049] : 
        data == 3 ? [-31.6390, -60.6869] : 
        data == 4 ? [-31.6332, -60.6797] :
        data == 5 ? [-31.6493, -60.70736] : 
        data == 6 ? [-31.6578, -60.70986] : 
        data == 7 ? [-31.6501, -60.70048]  :
        data == 8 ? [-31.6161, -60.7189]  : 
        data == 9 ? [-31.6517, -60.7068]  : 13
}

var map = L.map('map').setView([-31.657462, -60.71049], 13);

map.options.minZoom = 16;
map.options.maxZoom = 18;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var puntosTuristicos;

fetch("assets/json/puntos_turisticos.geojson")
.then(res => res.json())
.then(data => {
    puntosTuristicos = L.geoJson(data,{
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h5 class='text-center'>" + feature.properties.nombre + "</h5><button class='btn btn-success' onClick='openSidebar()'>Saber Más</button>" ); 
            layer.setIcon(L.AwesomeMarkers.icon({ icon: getIcon(feature.properties.tipo), prefix:'fa', markerColor: getColor(feature.properties.circuito)}));
        }
    }).addTo(map);
})
.catch(err => console.error(err));



fetch("assets/json/recorridos.geojson")
.then(res => res.json())
.then(data => {
    recorridosTuristicos = L.geoJson(data,{
    }).addTo(map);
    // var pathPattern = L.polylineDecorator(
    //     recorridosTuristicos,
    //     {
    //         patterns: [
    //             { offset: 0, repeat: 10, symbol: L.Symbol.dash({pixelSize: 5, pathOptions: {color: '#000', weight: 1, opacity: 0.2}}) },
    //             { offset: '16%', repeat: '33%', symbol: L.Symbol.marker({rotate: true, markerOptions: {
    //                 icon: L.icon({
    //                     iconUrl: '../externo/Leaflet.PolylineDecorator-master/dist/icon_plane.png',
    //                     iconAnchor: [16, 16]
    //                 })
    //             }})}
    //         ]
    //     }
    // ).addTo(map);
})
.catch(err => console.error(err));



const featureSelected = (e) => {
    puntosTuristicos.remove();
    recorridosTuristicos.remove();

    if( e == '0') {  
        fetch("assets/json/puntos_turisticos.geojson")
        .then(res => res.json())
        .then(data => {
            puntosTuristicos = L.geoJson(data,{
                onEachFeature: function(feature, layer) {
                    layer.bindPopup("<h5 class='text-center'>" + feature.properties.nombre + "</h5><button class='btn btn-success' onClick='openSidebar()'>Saber Más</button>" ); 
                    layer.setIcon(L.AwesomeMarkers.icon({ icon: getIcon(feature.properties.tipo), prefix:'fa', markerColor: getColor(feature.properties.circuito)}));
                },
            }).addTo(map);
        })
        .catch(err => console.error(err));
    } else {   
        fetch("assets/json/puntos_turisticos.geojson")
        .then(res => res.json())
        .then(data => {
            puntosTuristicos = L.geoJson(data,{
                onEachFeature: function(feature, layer) {
                    if(feature.properties.tipo == "start") {
                        layer.bindPopup("<h5 class='text-center'> Aquí Comienza el Recorrido</h5><button class='btn btn-success' onClick='openSidebar(feature)'>Saber Más</button>" ).openPopup();
                    }else {
                        layer.bindPopup(`<h5 class='text-center'> ${feature.properties.nombre} </h5><button class='btn btn-success' onClick="openSidebar('${feature.properties.nombre}', '${feature.properties.direccion}', '${feature.properties.des}', '${feature.properties.img1}', '${feature.properties.img2}','${feature.properties.audio}')">Saber Más</button>`);
                    }
                    layer.setIcon(L.AwesomeMarkers.icon({ icon: getIcon(feature.properties.tipo), prefix:'fa', markerColor: getColor(feature.properties.circuito)}));
                    
                },
                filter: function(feature) {
                    if (feature.properties.circuito == parseInt(e)) {
                        map.flyTo(getCoordinates(feature.properties.circuito), getZoom(feature.properties.circuito));
                        return true;
                    }


                },

            }).addTo(map);
        })
        .catch(err => console.error(err));


        
        fetch("assets/json/recorridos.geojson")
        .then(res => res.json())
        .then(data => {
            recorridosTuristicos = L.geoJson(data,{
                filter: function(feature) {
                    if (feature.properties.id == parseInt(e)) {
                        return true;
                    }
                },
            }).addTo(map);
        })
        .catch(err => console.error(err));


    }
}



