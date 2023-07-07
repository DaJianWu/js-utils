const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 输出当前模块文件所在的目录的绝对路径
// console.log(__dirname);

// Node.js 进程启动时所在的目录
// console.log(process.cwd());

// 指定允许访问的文件的根路径
const rootPath = path.resolve(__dirname, '../');

// 启动 TypeScript 监听
const tscProcess = exec('tsc --outDir dist --watch');

// 验证文件路径
function validateFilePath(filePath) {
  // 检查请求的文件路径是否在允许访问的根目录中
  return filePath.startsWith(rootPath);
}

const server = http.createServer((req, res) => {
  // 获取请求的 URL 路径
  const url = req.url;

  // 根据 URL 路径确定要提供的文件路径
  let filePath;

  if (url === '/') {
    // 如果请求的是根路径，指定 HTML 文件的路径
    filePath = path.join(rootPath, 'public', 'index.html');
  }
  else if (url === '/index.js') {
    // 如果请求的是根路径下的 index.js 文件，指定 JavaScript 文件的路径
    filePath = path.join(rootPath, 'public', 'index.js');
  }
  else {
    // 否则访问的应该就是 dist 目录了，根据 URL 路径拼接 JavaScript 文件的路径
    filePath = path.join(rootPath, url);
  }

  console.log(url, filePath);

  // 验证文件路径
  if (!validateFilePath(filePath)) {
    console.log('Invalid file path');
    res.statusCode = 403; // Forbidden
    res.end('Forbidden');
    return;
  }

  // 检查文件是否存在
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      // 文件不存在或不可读
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } else {
      // 读取文件内容并根据文件类型设置相应的 Content-Type
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          if (url.endsWith('.js')) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
          }
          res.end(content);
        }
      });
    }
  });
});

// 服务器监听的端口号
const port = 3000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// 监听 tsc 进程的输出

tscProcess.stdout.on('data', (data) => {
  console.log(`TypeScript: ${data}`);
});

tscProcess.stderr.on('data', (data) => {
  console.error(`TypeScript: ${data}`);
});
