const http = require('http')
const fs = require('fs');

const allFiles = fs.readdirSync('./', { withFileTypes: true })
const port = process.env.PORT || 3000

function getLastFive(fname) {

    //console.log(fname);
    if (fname.length <= 5) {
        return fname;
    }
    else {
        let l = fname.length;
        let lastf = "";
        for (let i = l - 5; i < l; i++) {
            lastf += fname[i];
        }
        return lastf;

    }

}


const htmlFiles = allFiles.filter((el) => {

    let lastf = getLastFive(el.name);
    return lastf == ".html"

}).map((el) => {
    return el.name.slice(0, -5);
})
htmlFiles.push("");
console.log(htmlFiles);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    let requestedUrl = req.url.slice(1);
    //console.log("noluyo aq")
    //console.log(requestedUrl);
    if (htmlFiles.includes(requestedUrl)) {
        
        if (requestedUrl === "") {
            //console.log("buraya giriyor mu");
            const file = fs.readFileSync("./index.html", "utf8");
            //console.log(file);
            res.end(file);
        }
        
        else {
            //console.log("merhaba dünya");
            const file = fs.readFileSync("./" + req.url.slice(1) + ".html");
            res.end(file);
        }
    } else {
        const file = fs.readFileSync("./404.html", "utf8");
        res.end(file);
    }
})




server.listen(port, () => {
    console.log("You're connected!");
});
