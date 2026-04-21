#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { extractAll } from './extractor';
import chalk from 'chalk';

const program = new Command();

program
  .name('text-extractor')
  .description('CLI tool to extract email addresses and Chinese mobile phone numbers from text')
  .version('1.0.0')
  .option('-i, --input <text>', 'Input text to process')
  .option('-f, --file <path>', 'Read input from a file')
  .option('-o, --output <path>', 'Write output to a file')
  .option('--minify', 'Output minified JSON (without formatting)', false)
  .option('--human', 'Output human-readable format instead of JSON', false)
  .action(async (options) => {
    try {
      let inputText = '';

      // Get input text
      if (options.input) {
        inputText = options.input;
      } else if (options.file) {
        const filePath = path.resolve(options.file);
        if (!fs.existsSync(filePath)) {
          console.error(chalk.red(`Error: File not found: ${filePath}`));
          process.exit(1);
        }
        inputText = fs.readFileSync(filePath, 'utf-8');
      } else {
        // Read from stdin
        if (process.stdin.isTTY) {
          console.log(chalk.yellow('No input provided. Please provide text via --input, --file, or pipe to stdin.'));
          console.log(chalk.yellow('Example: text-extractor -i "Contact me at test@example.com or call 13800138000"'));
          program.help();
          process.exit(1);
        }
        
        // Read from stdin
        const chunks: string[] = [];
        for await (const chunk of process.stdin) {
          chunks.push(chunk.toString());
        }
        inputText = chunks.join('');
        
        if (!inputText.trim()) {
          console.error(chalk.red('Error: No input received from stdin'));
          process.exit(1);
        }
      }

      // Extract information
      const result = extractAll(inputText);
      
      // Output results
      if (options.human) {
        // Human-readable output
        console.log(chalk.cyan('\n📧 Email Addresses Found:'));
        if (result.emails.length > 0) {
          result.emails.forEach((email, index) => {
            console.log(`  ${index + 1}. ${chalk.green(email)}`);
          });
        } else {
          console.log(chalk.gray('  No email addresses found'));
        }

        console.log(chalk.cyan('\n📱 Chinese Phone Numbers Found:'));
        if (result.phones.length > 0) {
          result.phones.forEach((phone, index) => {
            console.log(`  ${index + 1}. ${chalk.green(phone)}`);
          });
        } else {
          console.log(chalk.gray('  No Chinese phone numbers found'));
        }

        console.log(chalk.cyan('\n📊 Summary:'));
        console.log(`  Total emails: ${chalk.yellow(result.emails.length.toString())}`);
        console.log(`  Total phones: ${chalk.yellow(result.phones.length.toString())}`);
      } else {
        // JSON output
        const outputJson = options.minify 
          ? JSON.stringify(result)
          : JSON.stringify(result, null, 2);
        
        if (options.output) {
          const outputPath = path.resolve(options.output);
          fs.writeFileSync(outputPath, outputJson);
          console.log(chalk.green(`✓ Results written to: ${outputPath}`));
        } else {
          console.log(outputJson);
        }
      }
      
    } catch (error) {
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse(process.argv);

// Show help if no arguments provided
if (process.argv.length <= 2) {
  program.help();
}