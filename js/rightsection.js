

const loadRightSection = (value) =>  { 

    fetch("assets/json/recorridos.geojson")
        .then(res => res.json())
        .then(data => {
            console.log(data.features[0].properties.nombre);
            console.log(value);
            const rightSection = document.querySelector("#rightsection");

            rightSection.innerHTML = ``;

            rightSection.innerHTML = `
                <div class="container fluid mt-4">
                    <div class="row mt-4">
                        <div class="col col-12 mt-4 text-center"> <h2>${data.features[value-1].properties.nombre}</h2></div>
                        <div class="col col-12 mt-3 text-justify"><h6>${data.features[value-1].properties.descripcion}</h6></div>
                        <div class="col col-12 mt-3 text-center"><img src="${data.features[value-1].properties.img1}" width="100%" class="img-fluid"></div>
                        <div class="col col-6 mt-4 text-center">
                            <p>${data.features[value-1].properties.recorrido}</p>
                        </div>
                        <div class="col col-6 mt-4 text-center">
                            <p>${data.features[value-1].properties.duracion}</p>
                        </div>
                    </div>
                </div>
            `;


        })
        .catch(err => console.error(err));


}
