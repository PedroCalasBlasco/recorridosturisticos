const closeSidebar = () => { 
    const sidebar = document.querySelector("#sidebar1");
    sidebar.style.display = 'none'; 
}


const openSidebar = ((nombre, direccion, descripcion, img1, img2, audio) => { 

    console.log(img1);

    const sidebar = document.querySelector("#sidebar1");
    sidebar.style.display = 'block'; 
   
    const sidebarContent = document.querySelector("#sidebarContent");  

    sidebarContent.innerHTML = ``;

    sidebarContent.innerHTML = 
        `<a onClick="closeSidebar()">X</a>
        <h2 class="text-center">${nombre}</h2>
        <h4 class="text-center mt-2">${direccion}</h4>
        <h5 class="text-justify mt-2">${descripcion}</h5> 
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${img1}" class="img-fluid w-80" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${img2}" class="img-fluid w-80" alt="..."> 
                </div>
                <div class="carousel-item">
                    <img src="${img1}" class="img-fluid w-80" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>   
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="mt-5 text-center">
        <audio controls autoplay><source src="${audio}" type="audio/mpeg">Your browser does not support the audio element.</audio>
        </div> `;


})      












