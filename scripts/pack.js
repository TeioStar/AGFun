const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const pkg = require(path.join(ROOT, 'package.json'));
const releaseName = `${pkg.name}-v${pkg.version}`;
const releaseDir = path.join(ROOT, 'release', releaseName);

console.log(`📦 打包 ${releaseName}...`);

// 清理
fs.rmSync(path.join(ROOT, 'release'), { recursive: true, force: true });

// 创建发布目录结构
fs.mkdirSync(releaseDir, { recursive: true });

// 复制 standalone（自包含服务端）
copyDir(
  path.join(ROOT, '.next', 'standalone'),
  releaseDir
);

// 修复 required-server-files.json 中的构建机器路径
const rsfPath = path.join(releaseDir, '.next', 'required-server-files.json');
if (fs.existsSync(rsfPath)) {
  const rsf = JSON.parse(fs.readFileSync(rsfPath, 'utf-8'));
  // 将构建机器绝对路径替换为当前目录（相对路径）
  rsf.appDir = '.';
  fs.writeFileSync(rsfPath, JSON.stringify(rsf));
  console.log('🔧 已修复 required-server-files.json 路径');
}

// 复制 static 到正确位置
copyDir(
  path.join(ROOT, '.next', 'static'),
  path.join(releaseDir, '.next', 'static')
);

// 复制 public
if (fs.existsSync(path.join(ROOT, 'public'))) {
  copyDir(path.join(ROOT, 'public'), path.join(releaseDir, 'public'));
}

// 创建启动脚本
// Windows
fs.writeFileSync(path.join(releaseDir, 'start.bat'), `@echo off
echo 🚀 AGFun 番游更新提醒 v${pkg.version}
echo 访问 http://localhost:3000
echo.
node server.js
pause
`);

// Linux/Mac
fs.writeFileSync(path.join(releaseDir, 'start.sh'), `#!/bin/bash
echo "🚀 AGFun 番游更新提醒 v${pkg.version}"
echo "访问 http://localhost:3000"
echo ""
node server.js
`);
fs.chmodSync(path.join(releaseDir, 'start.sh'), 0o755);

// 创建发布描述文件
fs.writeFileSync(path.join(releaseDir, 'VERSION.txt'), `AGFun v${pkg.version}
===================

番游更新提醒 - 追番、新游、Steam史低一站掌握

启动方式:
  Windows: 双击 start.bat
  Linux/Mac: ./start.sh

默认访问: http://localhost:3000
`);

// 计算大小
const size = getDirSize(releaseDir);
console.log(`✅ 打包完成: release/${releaseName}/ (${formatSize(size)})`);

// 压缩为 zip（如果有 tar/zip 命令）
try {
  const zipFile = path.join(ROOT, 'release', `${releaseName}.zip`);
  const relPath = path.relative(ROOT, releaseDir);
  execSync(`powershell -Command "Compress-Archive -Path '${releaseDir}' -DestinationPath '${zipFile}' -Force"`, { stdio: 'pipe' });
  const zipSize = fs.statSync(zipFile).size;
  console.log(`📦 压缩包: release/${releaseName}.zip (${formatSize(zipSize)})`);
} catch (e) {
  console.log('⚠️  未找到压缩工具，跳过压缩。手动压缩 release/ 目录即可。');
}

// === 工具函数 ===

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getDirSize(dir) {
  let size = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      size += getDirSize(p);
    } else {
      size += fs.statSync(p).size;
    }
  }
  return size;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
