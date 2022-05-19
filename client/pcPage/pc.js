generateComputer = async () => {
    let computerId = window.location.pathname.split('/');
    await fetch(`http://localhost:3000/desktops/view/${computerId[2]}`).then(res => res.json()).then(computer => {

        $('.pcName').html(computer.model);
        $('.computerImg').attr('src', computer.imgPath);
        $('.RAM').html(computer.RAM);
        $('.CPU').html(computer.CPU);
        $('.GPU').html(computer.GPU);
        $('.HDD').html(computer.HDD);
        $('.Motherboard').html(computer.Motherboard);
    })
}
generateComputer()