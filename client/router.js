const route = (event) =>{
    event = event || window.event;
    event.preventDefault();
    //sets url to href
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const routes = {
    404: {
        "html": "/404/404.html",
        "css": "/404/404style.css"},
    "/": {
        "html":"/homePage/home.html",
        "js":"/homePage/home.js",
        "css":"/homePage/home.css"
    },
    "/desktops": {
        "html":"/pcPage/pc.html",
        "css":"/pcPage/pcStyle.css",
        "js":"/pcPage/pc.js",

        "/create":{
            "html":"/createComputer/createComputer.html",
            "css":"/createComputer/createComputer.css",
            "js":"/createComputer/createComputer.js"
        }
    },
    "/laptops": {
        "html":"/laptopPage/laptop.html",
        "css":"/laptopPage/laptopStyle.css",
        "js":"/laptopPage/laptop.js",

        "/create":{
            "html":"/createLaptop/createLaptop.html",
            "css":"/createLaptop/createLaptop.css",
            "js":"/createLaptop/createLaptop.js"
        }
    },
    "/parts": {
        "html":"/partPage/part.html",
        "css":"/partPage/partStyle.css",
        "js":"/partPage/part.js",
    }
}

const handleLocation = async () => {
    const path = window.location.pathname.split('/');
    let route = routes[404];
    if(path[2] == 'create'){
        route = routes['/'+path[1]]['/'+path[2]] || routes[404];
    }else{
        route = routes['/'+path[1]] || routes[404];
    }

    // generate page data by routes prop
    const html = await fetch(route.html).then(data => data.text());
    document.getElementById("main").innerHTML = html;

    let style = document.createElement("link");
    style.href = route.css;
    style.rel = "stylesheet";
    style.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(style);
    
    let script = document.createElement("script");
    script.src = route.js;
    document.getElementsByTagName("head")[0].appendChild(script);
}

//uses handlelocation for forward and back buttons
window.onpopstate = handleLocation;
window.route = route;

handleLocation();