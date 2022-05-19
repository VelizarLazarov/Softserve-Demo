generatePart = async () => {
    let partType = window.location.pathname.split('/');
    await fetch(`http://localhost:3000/parts/view/${partType[2]}`).then(res => res.json()).then(part => {

        $('.partName').html(part.type);
        $('.partImg').attr('src', part.imgPath);
        $('.textArticle > h2').html('what is a '+ part.type);
        $('.partDesc').html(part.description);

        part.videos.map(link => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = link;
            a.innerText = link;
            li.appendChild(a);
            $('.linkList').append(li);
        })
    })
}
generatePart()