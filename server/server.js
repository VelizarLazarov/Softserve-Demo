const http = require('http')
const fs = require('fs')
const url = require('url')
const db = require('./database.json')
const path = require('path')

const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:4500',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*'
}

const server = http.createServer((req,res) => {
    let parsedUrl = url.parse(req.url, true)
    //remove leading and trailing slashes
    let path = parsedUrl.path.replace(/^\/+|\/+$/,"")
    let file = __dirname + '\\' + path;

    if(path.includes('.png')|| path.includes('.jpg') || path.includes('.jpeg') && req.method === "GET"){

        fs.readFile(file,(err, data) => {
            if(err){
                console.log(err);
                res.writeHead(404);
                res.end();
            }
            res.writeHead(200, headers);
            res.write(data);
            res.end();
        })
    }
    if(req.url === '/home' && req.method === 'GET'){
        try {
            res.writeHead(200, headers);
            res.write(JSON.stringify(db));
            res.end();
            
        } catch (error) {
            console.log(error)
        }
    }else if(req.url.includes('/desktops/view/') && req.method === 'GET'){
        try {
            let query = req.url.split('/')
            let desktop = db.computers.find(pc => pc.id == query[3]);

            res.writeHead(200, headers);
            res.write(JSON.stringify(desktop));
            res.end();
            
        } catch (error) {
            res.writeHead(404);
            res.end
            console.log(error)
        }
    }else if(req.url.includes('/laptops/view/') && req.method === 'GET'){
        try {
            let query = req.url.split('/')
            let laptop = db.computers.find(pc => pc.id == query[3]);

            res.writeHead(200, headers);
            res.write(JSON.stringify(laptop));
            res.end();
            
        } catch (error) {
            res.writeHead(404);
            res.end
            console.log(error)
        }
    }else if(req.url.includes('/parts/view/') && req.method === 'GET'){
        try {
            let query = req.url.split('/')
            let part = db.parts.find(part => part.type == query[3]);

            res.writeHead(200, headers);
            res.write(JSON.stringify(part));
            res.end();
            
        } catch (error) {
            res.writeHead(404);
            res.end
            console.log(error)
        }
    }else if(req.url.includes('/laptops/add') && req.method === 'POST'){

        let body = '';
        req.on('data', function(chunk){
            body += chunk;
        }).on('end', function(){
            body = JSON.parse(body);
            
            let d = new Date;
            let id = d.getMilliseconds();
            let laptop = {'type':'laptop',...body, 'id':id, 'imgPath':'http://localhost:3000/images/laptop.jpg'}

            db.computers.push(laptop)
            fs.writeFile('./database.json', JSON.stringify(db), (err,data) =>{if (err)console.log(err);})

            res.writeHead(200, headers);
            res.end()
        });
    }else if(req.url.includes('/desktops/add') && req.method === 'POST'){

        let body = '';
        req.on('data', function(chunk){
            body += chunk;
        }).on('end', function(){
            body = JSON.parse(body);

            let d = new Date;
            let id = d.getMilliseconds();
            let desktop = {'type':'desktop',...body, 'id':id, 'imgPath':'http://localhost:3000/images/computer1.jpg'}

            db.computers.push(desktop)
            fs.writeFile('./database.json', JSON.stringify(db), (err,data) =>{if (err)console.log(err);})

            res.writeHead(200, headers);
            res.end()
        });
    }
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`running on port ${PORT}`))

