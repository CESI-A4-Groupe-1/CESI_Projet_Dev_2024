/*

    CECI EST LE FICHIER PRINCIPAL D'EXPRESS !!
    IL SERT A HEBERGER LE CODE DU FRONT END. LE RESTE EST A FAIRE DANS LES SERVICES

    C'EST GLOBALEMENT LA PARTIE DE CEUX QUI VEULENT REDIGER L'ENDPOINT DU PROJET CAR C'EST PAR ICI QUE TOUT VA PASSER

 */


var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8080);