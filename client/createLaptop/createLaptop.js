onLaptopCreate = (e) =>{
    e.preventDefault()
    
    let formData = {
        'model': $('[name="Model"]').val(),
        'RAM': $('[name="RAM"]').val(),
        'CPU': $('[name="CPU"]').val(),
        'GPU': $('[name="GPU"]').val(),
        'SSD': $('[name="SSD"]').val(),
        'Weight': $('[name="Weight"]').val()
    }
    
    fetch('http://localhost:3000/laptops/add',{
        method:'POST',
        headers: { 'Content-Type': 'text/plain'},
        body: JSON.stringify(formData)
    }).catch(err => console.log(err)) 

}

