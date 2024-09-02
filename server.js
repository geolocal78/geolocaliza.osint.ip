   const http = require('http');
   const fs = require('fs');
   const path = require('path');

   const server = http.createServer((req, res) => {
       let filePath = req.url === '/' ? './templates/index.html' : './templates' + req.url;
       const extname = path.extname(filePath).toLowerCase();
       const contentType = extname === '.js' ? 'text/javascript' : 'text/html';

       fs.readFile(filePath, (error, content) => {
           if (error) {
               res.writeHead(error.code === 'ENOENT' ? 404 : 500);
               res.end(error.code === 'ENOENT' ? '404 Not Found' : '500 Internal Server Error');
           } else {
               res.writeHead(200, { 'Content-Type': contentType });
               res.end(content, 'utf-8');
           }
       });
   });

   const PORT = process.env.PORT || 3000;
   server.listen(PORT, () => {
       console.log(`Servidor escuchando en http://localhost:${PORT}`);
   });
