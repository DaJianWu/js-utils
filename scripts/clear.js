const fs = require('fs');
const path = require('path');

// 指定输出目录
const outputDir = path.resolve(process.cwd(), process.argv[2]);
console.log(outputDir);

// 删除输出目录及其内容
function cleanOutputDir() {
  if (fs.existsSync(outputDir)) {
    fs.readdirSync(outputDir).forEach((file) => {
      const filePath = path.join(outputDir, file);
      fs.unlinkSync(filePath);
    });
    fs.rmdirSync(outputDir);
  }
}

// 创建输出目录
function createOutputDir() {
  fs.mkdirSync(outputDir);
}

// 清除之前的输出结果并重新创建输出目录
function cleanAndCreateOutputDir() {
  cleanOutputDir();
  createOutputDir();
}

// 执行清除操作
cleanAndCreateOutputDir();
console.log('清除成功');
