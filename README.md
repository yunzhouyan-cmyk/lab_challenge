# Text Extractor CLI

![Git](https://img.shields.io/badge/typescript-blue?style=sh&&)
![Git](https://img.shields.io/badge/Node.js-green?style=sh&logo=node.js)

### A simple CLI tool to extract email addresses and Chinese mobile phone numbers from text.

## Features
- ✅ **Extracts emails**
- ✅ **Extracts Chinese mobile phone numbers**
- ✅ **Command Line Interface (CLI)**
- ✅ **Human Readable Output**
- ✅ **JSON Formatting**

## How to Install

You'll need Node.js >=20. After that, just follow:

1. Clone this repository:
   ```bash
   git clone
   ```

2. Navigate into the project:
   ```bash
   cd text-extractor
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the CLI:
   ```bash
   npm run build
   ```

5. To install globally:
   ```bash
   npm link
   ```

## How to Use

### Basic Usage

```bash
# Extract from command line input
npx ts-node src/index.ts -i "Contact me at test@example.com or call 13800138000"

# Extract from file
npx ts-node src/index.ts -f example.txt

# Save results to JSON file
npx ts-node src/index.ts -f example.txt -o results.json
```

### Options

```bash
  -i, --input <text>    Input text to process
  -f, --file <path>     Read input from a file
  -o, --output <path>   Write output to a file
  --human               Output human-readable format instead of JSON
  --minify              Output minified JSON (without formatting)
  -h, --help            Display help information
  -V, --version         Display version number
```

### Example usage:

```bash
# Human-readable output
$ npx ts-node src/index.ts -i "Contact me at test@example.com or call 13800138000" --human

📧 Email Addresses Found:
  1. test@example.com

📱 Chinese Phone Numbers Found:
  1. 13800138000

📊 Summary:
  Total emails: 1
  Total phones: 1

# JSON output (default)
$ npx ts-node src/index.ts -i "Contact me at test@example.com or call 13800138000"

{
  "emails": ["test@example.com"],
  "phones": ["13800138000"]
}

# Minified JSON
$ npx ts-node src/index.ts -i "Contact me at test@example.com or call 13800138000" --minify

{"emails":["test@example.com"],"phones":["13800138000"]}

## Project Structure

```bash
├── package.json      // Node configuration file
├── tsconfig.json    // TypeScript compiler configuration
├── jest.config.js   // Jest configuration for testing
├── README.md       // This file
├── src
│   └── extractor.ts // Core extraction logic
│   └── index.ts    // Main CLI application
├── dist
│   └── index.js    // Compiled JavaScript entry point
└── .gitignore       // Configuration files ignored by Git
```