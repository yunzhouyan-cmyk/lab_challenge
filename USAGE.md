# Text Extractor CLI - 使用说明

## 项目概述

这是一个基于 TypeScript 的 CLI 工具，用于从文本中提取电子邮件地址和中国手机号码，并以结构化 JSON 格式输出。

## 功能特性

- ✅ **提取电子邮件地址** - 支持标准电子邮件格式
- ✅ **提取中国手机号码** - 11位数字，以13-19开头
- ✅ **去重处理** - 自动移除重复项
- ✅ **多种输入方式** - 命令行参数、文件输入、标准输入
- ✅ **多种输出格式** - JSON 格式和人类可读格式
- ✅ **文件输出支持** - 可将结果保存到文件

## 安装和使用

### 1. 安装依赖
```bash
npm install
```

### 2. 构建项目
```bash
npm run build
```

### 3. 运行测试
```bash
npm test
```

### 4. 使用方式

#### 方式一：直接输入文本
```bash
# 人类可读格式输出
npx ts-node src/index.ts -i "联系我：test@example.com 或电话 13800138000" --no-json

# JSON 格式输出
npx ts-node src/index.ts -i "联系我：test@example.com 或电话 13800138000"
```

#### 方式二：从文件读取
```bash
# 从文件读取并输出到控制台
npx ts-node src/index.ts -f example.txt

# 从文件读取并保存到 JSON 文件
npx ts-node src/index.ts -f example.txt -o result.json
```

#### 方式三：标准输入
```bash
# 通过管道输入
echo "test@example.com 13800138000" | npx ts-node src/index.ts
```

## 命令行选项

```
Options:
  -V, --version        显示版本号
  -i, --input <text>   输入文本
  -f, --file <path>    从文件读取输入
  -o, --output <path>  将输出写入文件
  --minify             输出压缩的 JSON（无格式化）
  --no-json            输出人类可读格式而不是 JSON
  -h, --help           显示帮助信息
```

## 示例

### 示例 1：基本使用
```bash
npx ts-node src/index.ts -i "Email: user@example.com Phone: 13912345678"
```

输出（人类可读格式）：
```
📧 Email Addresses Found:
  1. user@example.com

📱 Chinese Phone Numbers Found:
  1. 13912345678

📊 Summary:
  Total emails: 1
  Total phones: 1
```

### 示例 2：复杂文本提取
```bash
npx ts-node src/index.ts -i "联系方式：sales@company.com, support@test.cn。电话：13800138000, 15012345678。备用：admin@org.net 和 17698765432"
```

### 示例 3：从文件读取并保存 JSON
```bash
npx ts-node src/index.ts -f example.txt -o extracted.json
```

### 示例 4：压缩 JSON 输出
```bash
npx ts-node src/index.ts -i "test@example.com 13800138000" --minify
```

## 正则表达式规则

### 电子邮件地址
- 模式：`/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g`
- 支持标准电子邮件格式
- 自动去重

### 中国手机号码
- 模式：`/1[3-9]\d{9}/g`
- 11位数字
- 以13-19开头
- 自动去重

## 项目结构

```
text-extractor-cli/
├── src/
│   ├── index.ts          # CLI 入口点
│   ├── extractor.ts      # 核心提取逻辑
│   └── extractor.test.ts # 单元测试
├── dist/                 # 编译后的 JavaScript
├── example.txt          # 示例输入文件
├── package.json         # 项目配置
├── tsconfig.json       # TypeScript 配置
└── README.md           # 项目说明
```

## 开发说明

### 运行开发模式
```bash
npm run dev
```

### 运行构建版本
```bash
npm start
```

### 运行测试
```bash
npm test
```

## 注意事项

1. 工具会自动去重，不会返回重复的电子邮件或手机号码
2. 中国手机号码只识别以13-19开头的11位数字
3. 电子邮件地址识别遵循标准格式
4. 输出格式默认为 JSON，使用 `--no-json` 切换为人类可读格式