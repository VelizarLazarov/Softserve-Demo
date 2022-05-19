generateLaptop = async () => {
    let laptopId = window.location.pathname.split('/');
    console.log(laptopId)
    await fetch(`http://localhost:3000/laptops/view/${laptopId[2]}`).then(res => res.json()).then(laptop => {

        $('.pcName').html(laptop.model);
        $('.computerImg').attr('src', laptop.imgPath);
        $('.RAM').html(laptop.RAM);
        $('.CPU').html(laptop.CPU);
        $('.GPU').html(laptop.GPU);
        $('.SSD').html(laptop.SSD);
        $('.Weight').html(laptop.Weight);
    })
}
generateLaptop()