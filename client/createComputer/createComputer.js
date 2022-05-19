onDesktopCreate = (e) =>{
    e.preventDefault()
    
    let formData = {
        'model': $('[name="Model"]').val(),
        'RAM': $('[name="RAM"]').val(),
        'CPU': $('[name="CPU"]').val(),
        'GPU': $('[name="GPU"]').val(),
        'HDD': $('[name="HDD"]').val(),
        'Motherboard': $('[name="Motherboard"]').val()
    }
    
    fetch('http://localhost:3000/desktops/add',{
        method:'POST',
        headers: { 'Content-Type': 'text/plain'},
        body: JSON.stringify(formData)
    }).catch(err => console.log(err)) 

}

