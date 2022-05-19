let visibleMinIndex = 0;
let visibleMaxIndex = 3;

let computerBtn = document.getElementById("pcFilter").addEventListener('click', (e) => filter(e));
let laptopBtn = document.getElementById("laptopFilter").addEventListener('click', (e) => filter(e));
let partBtn = document.getElementById("partFilter").addEventListener('click', (e) => filter(e));
let allBtn = document.getElementById("allFilter").addEventListener('click', (e) => filter(e));
let cardListItems = Array.from(document.getElementsByClassName('cardList')[0].children);

let cardsHidden = {
    'desktop': [],
    'laptop': [],
    'part': []
}

generateCards = async () => {
    await fetch('http://localhost:3000/home').then(res => res.json()).then(db => {
        let computers = Array.from(Object.values(db.computers))
        //maps data from computers/parts db property to template
        computers.map( pc => {
            pc = `<li class= ${pc.type}>
                <article class="cardContainer">
                    <div class="itemCard">
                        <div class="imgContainer"><img class="cardImg" src=${pc.imgPath}></img></div>
                        <div class="textContainer">
                            <p>${pc.model}</p>
                            <button><a href="/${pc.type}s/${pc.id}" onclick="route()">Show More</a></button>
                        </div>
                    </div>
                </article>
            </li>`
            $(".cardList").append(pc);
        })

        let parts = Array.from(Object.values(db.parts))
        parts.map( part => {
            part = `<li class="part">
                <article class="cardContainer">
                    <div class="itemCard">
                        <div class="imgContainer"><img class="cardImg" src=${part.imgPath}></img></div>
                        <div class="textContainer">
                            <p>${part.type}</p>
                            <button><a href="/parts/${part.type}" onclick="route()">Show More</a></button>
                        </div>
                    </div>
                </article>
            </li>`
            $(".cardList").append(part);
        })
    });
   moveCards()
}

filter = (event) => {
    visibleMinIndex = 0;
    visibleMaxIndex = 3;
    
    let filter = event.target.classList[1];

    //.children is a HTMLCollection so we must convert it to an array in order to iterate
    cardListItems = Array.from(document.getElementsByClassName('cardList')[0].children);
    
    cardListItems = cardListItems.forEach((child) => {

        //removes elements without filter and places them in cardsHidden
        if (!child.className.includes(filter)) {

            cardsHidden[child.classList[0]].push(child);
            child.parentElement.removeChild(child);
        }
    });
    console.log(filter)
    if(filter == 'all'){
        //goes into each property array and appends each element
        for (const filterType in cardsHidden) {
                cardsHidden[filterType].forEach(card => document.getElementsByClassName('cardList')[0].appendChild(card));
        }
    }else if(cardsHidden[filter].length != 0){
        //goes into specific property and appends each element
        cardsHidden[filter].forEach(card => {
            document.getElementsByClassName('cardList')[0].appendChild(card);
        });
    }
    
    moveCards();
    toggleArrows(filter);
}

moveCards = () => {

    cardListItems = Array.from(document.getElementsByClassName('cardList')[0].children);
        //only first 4 elements will be visible
        for (let i = 0; i < cardListItems.length; i++) {
            if(i < 4){
                cardListItems[i].style.display = 'inline';
            }else{
                cardListItems[i].style.display = 'none';
            }
        }        
    
}

moveRightClick = (cardList) => {

    if (visibleMaxIndex == cardList.length - 1) {
        return
    }
    visibleMinIndex++;
    visibleMaxIndex++;

    for (let i = 0; i < cardList.length; i++) {
        cardList[visibleMaxIndex].style.display = 'inline';
        if (visibleMinIndex > i || visibleMaxIndex < i) {
            cardList[i].style.display = 'none';
        }
    }

}
moveLeftClick = (cardList) => {
    if (visibleMinIndex == 0) {
        return
    }
    visibleMinIndex--;
    visibleMaxIndex--;

    for (let i = 0; i < cardList.length; i++) {
        if (visibleMinIndex > i || visibleMaxIndex < i) {
            cardList[i].style.display = 'none';
        }
        cardList[visibleMinIndex].style.display = 'inline';
    }
}

toggleArrows = () => {
    cardListItems = Array.from(document.getElementsByClassName('cardList')[0].children);
    let rightBtn = document.getElementsByClassName('rightBtn')[0];
    let leftBtn = document.getElementsByClassName('leftBtn')[0];

    if (cardListItems.length <= 4) {
        rightBtn.style.display = 'none';
        leftBtn.style.display = 'none';
    }
    else {
        rightBtn.style.display = 'inline';
        leftBtn.style.display = 'inline';
    }
}

generateCards()
moveCards()

document.getElementsByClassName('rightBtn')[0].addEventListener('click', () => moveRightClick(cardListItems))
document.getElementsByClassName('leftBtn')[0].addEventListener('click', () => moveLeftClick(cardListItems))
