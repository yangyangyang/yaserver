import { createServer } from './index';
import * as path from 'path';
import * as http from 'http';

let port = 8888;
let root = './';

for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] === '--port' && i + 1 < process.argv.length) {
        port = parseInt(process.argv[i + 1], 10);
        i++;
    }
    if (process.argv[i] === '--root' && i + 1 < process.argv.length) {
        root = process.argv[i + 1];
    }
}

createServer({ rootDir: path.join(process.cwd(), root) }).then((yaserver) => {
    const server = http.createServer((request, response) => {
        yaserver.handle(request, response);
    });
    server.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });
});
