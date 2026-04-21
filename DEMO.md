# Text Extractor CLI - 演示

## 演示场景

让我们通过几个实际场景来演示这个工具的功能。

## 场景 1：基本提取

### 输入：
```
联系我们的销售团队：sales@company.com 或致电 13800138000
技术支持：support@tech.cn 电话 13912345678
```

### 命令：
```bash
npx ts-node src/index.ts -i "联系我们的销售团队：sales@company.com 或致电 13800138000 技术支持：support@tech.cn 电话 13912345678"
```

### 输出（人类可读格式）：
```
📧 Email Addresses Found:
  1. sales@company.com
  2. support@tech.cn

📱 Chinese Phone Numbers Found:
  1. 13800138000
  2. 13912345678

📊 Summary:
  Total emails: 2
  Total phones: 2
```

## 场景 2：包含重复项

### 输入：
```
重复的邮件：test@example.com test@example.com test@example.com
重复的电话：13800138000 13800138000 13800138000
```

### 命令：
```bash
npx ts-node src/index.ts -i "重复的邮件：test@example.com test@example.com test@example.com 重复的电话：13800138000 13800138000 13800138000" --no-json
```

### 输出：
```
📧 Email Addresses Found:
  1. test@example.com

📱 Chinese Phone Numbers Found:
  1. 13800138000

📊 Summary:
  Total emails: 1
  Total phones: 1
```

注意：重复项被自动移除！

## 场景 3：JSON 输出

### 输入：
```
用户信息：
邮箱：user1@test.com, user2@example.cn
电话：15098765432, 17654321098
```

### 命令：
```bash
npx ts-node src/index.ts -i "用户信息：邮箱：user1@test.com, user2@example.cn 电话：15098765432, 17654321098"
```

### 输出（JSON 格式）：
```json
{
  "emails": [
    "user1@test.com",
    "user2@example.cn"
  ],
  "phones": [
    "15098765432",
    "17654321098"
  ]
}
```

## 场景 4：从文件读取

### 创建测试文件：
```bash
echo "客户联系信息：
主要邮箱：customer@business.com
备用邮箱：backup@service.cn
联系电话：13987654321
紧急电话：15876543210" > contact.txt
```

### 命令：
```bash
npx ts-node src/index.ts -f contact.txt --no-json
```

### 输出：
```
📧 Email Addresses Found:
  1. customer@business.com
  2. backup@service.cn

📱 Chinese Phone Numbers Found:
  1. 13987654321
  2. 15876543210

📊 Summary:
  Total emails: 2
  Total phones: 2
```

## 场景 5：保存到文件

### 命令：
```bash
npx ts-node src/index.ts -f contact.txt -o extracted_data.json
```

### 输出：
```
✓ Results written to: D:\text-extractor-cli\extracted_data.json
```

### 生成的 JSON 文件内容：
```json
{
  "emails": [
    "customer@business.com",
    "backup@service.cn"
  ],
  "phones": [
    "13987654321",
    "15876543210"
  ]
}
```

## 场景 6：压缩 JSON 输出

### 命令：
```bash
npx ts-node src/index.ts -i "test@example.com 13800138000" --minify
```

### 输出：
```json
{"emails":["test@example.com"],"phones":["13800138000"]}
```

## 场景 7：无效数据过滤

### 输入：
```
有效数据：
邮箱：valid@email.com
电话：13800138000

无效数据：
邮箱：invalid-email
电话：12000000000（不是手机号）
电话：12345678901（无效前缀）
电话：1380013800（只有10位）
```

### 命令：
```bash
npx ts-node src/index.ts -i "有效数据：邮箱：valid@email.com 电话：13800138000 无效数据：邮箱：invalid-email 电话：12000000000 电话：12345678901 电话：1380013800" --no-json
```

### 输出：
```
📧 Email Addresses Found:
  1. valid@email.com

📱 Chinese Phone Numbers Found:
  1. 13800138000

📊 Summary:
  Total emails: 1
  Total phones: 1
```

注意：只有有效的电子邮件和手机号码被提取！

## 场景 8：管道输入

### 命令：
```bash
echo "管道测试：pipe@test.com 电话：15987654321" | npx ts-node src/index.ts
```

### 输出：
```
📧 Email Addresses Found:
  1. pipe@test.com

📱 Chinese Phone Numbers Found:
  1. 15987654321

📊 Summary:
  Total emails: 1
  Total phones: 1
```

## 总结

这个 CLI 工具提供了：
1. **灵活的输入方式** - 命令行参数、文件、标准输入
2. **智能提取** - 准确的电子邮件和手机号码识别
3. **自动去重** - 避免重复数据
4. **多种输出格式** - JSON 和人类可读格式
5. **文件支持** - 可读取文件并保存结果
6. **错误处理** - 友好的错误提示

工具已经准备就绪，可以开始使用了！