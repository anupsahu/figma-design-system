#!/usr/bin/env node

/**
 * This script converts Figma Tokens JSON format to Style Dictionary format
 * It can be used to process tokens exported from Figma using the Tokens Studio plugin
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if a file path was provided
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Please provide a path to the Figma tokens JSON file');
  process.exit(1);
}

const inputFilePath = args[0];
const outputDir = path.join(__dirname, 'src');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read the input file
try {
  const figmaTokensRaw = fs.readFileSync(inputFilePath, 'utf8');
  const figmaTokens = JSON.parse(figmaTokensRaw);
  
  // Process the tokens
  processTokens(figmaTokens);
  
  console.log('✅ Figma tokens processed successfully');
} catch (error) {
  console.error('Error processing Figma tokens:', error);
  process.exit(1);
}

/**
 * Process Figma tokens and convert them to Style Dictionary format
 * @param {Object} tokens - The Figma tokens object
 */
function processTokens(tokens) {
  // Categories we want to extract
  const categories = {
    color: {},
    typography: {
      font: {
        family: {},
        weight: {},
        size: {},
        lineHeight: {}
      }
    },
    spacing: {
      spacing: {}
    },
    borderRadius: {
      radius: {}
    },
    borderWidth: {
      border: {
        width: {}
      }
    },
    shadow: {
      shadow: {}
    },
    opacity: {
      opacity: {}
    },
    theme: {
      theme: {
        light: {},
        dark: {}
      }
    }
  };
  
  // Process each token
  Object.entries(tokens).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      if (value.type === 'color') {
        // Process color token
        processColorToken(key, value, categories.color);
      } else if (value.type === 'typography') {
        // Process typography token
        processTypographyToken(key, value, categories.typography);
      } else if (value.type === 'spacing' || value.type === 'sizing') {
        // Process spacing token
        processSpacingToken(key, value, categories.spacing.spacing);
      } else if (value.type === 'borderRadius') {
        // Process border radius token
        processBorderRadiusToken(key, value, categories.borderRadius.radius);
      } else if (value.type === 'borderWidth') {
        // Process border width token
        processBorderWidthToken(key, value, categories.borderWidth.border.width);
      } else if (value.type === 'boxShadow') {
        // Process shadow token
        processShadowToken(key, value, categories.shadow.shadow);
      } else if (value.type === 'opacity') {
        // Process opacity token
        processOpacityToken(key, value, categories.opacity.opacity);
      } else if (key.startsWith('theme')) {
        // Process theme token
        processThemeToken(key, value, categories.theme.theme);
      } else {
        // Process nested tokens
        processNestedTokens(key, value, categories);
      }
    }
  });
  
  // Write the processed tokens to files
  writeTokenFiles(categories);
}

/**
 * Process a color token
 * @param {string} key - The token key
 * @param {Object} token - The token value
 * @param {Object} target - The target object to add the token to
 */
function processColorToken(key, token, target) {
  const parts = key.split('.');
  let current = target;
  
  // Create nested objects for each part of the key
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part]) {
      current[part] = {};
    }
    current = current[part];
  }
  
  // Add the token value
  const lastPart = parts[parts.length - 1];
  current[lastPart] = { value: token.value, type: 'color' };
}

/**
 * Process a typography token
 * @param {string} key - The token key
 * @param {Object} token - The token value
 * @param {Object} target - The target object to add the token to
 */
function processTypographyToken(key, token, target) {
  const { fontFamily, fontSize, fontWeight, lineHeight } = token.value;
  
  if (fontFamily) {
    target.font.family[key] = { value: fontFamily, type: 'fontFamily' };
  }
  
  if (fontSize) {
    target.font.size[key] = { value: fontSize, type: 'fontSize' };
  }
  
  if (fontWeight) {
    target.font.weight[key] = { value: fontWeight, type: 'fontWeight' };
  }
  
  if (lineHeight) {
    target.font.lineHeight[key] = { value: lineHeight, type: 'lineHeight' };
  }
}

/**
 * Process a spacing token
 * @param {string} key - The token key
 * @param {Object} token - The token value
 * @param {Object} target - The target object to add the token to
 */
function processSpacingToken(key, token, target) {
  target[key] = { value: token.value, type: 'spacing' };
}

/**
 * Process a border radius token
 * @param {string} key - The token key
 * @param {Object} token - The token value
 * @param {Object} target - The target object to add the token to
 */
function processBorderRadiusToken(key, token, target) {
  target[key] = { value: token.value, type: 'borderRadius' };
}

/**
 * Process a border width token
 * @param {string} key - The token key
 * @param {Object} token - The token value
 * @param {Object} target - The target object to add the token to
 */
function processBorderWidthToken(key, token, target) {
  target[key] = { value: token.value, type: 'borderWidth' };
}

/**
 * Process a shadow token
 * @param {string} key - The token key
 * @param {Object} token - The token value
 * @param {Object} target - The target object to add the token to
 */
function processShadowToken(key, token, target) {
  // Convert Figma shadow format to CSS shadow
  const { x, y, blur, spread, color } = token.value;
  const shadowValue = `${x} ${y} ${blur} ${spread} ${color}`;
  target[key] = { value: shadowValue, type: 'shadow' };
}

/**
 * Process an opacity token
 * @param {string} key - The token key
 * @param {Object} token - The token value
 * @param {Object} target - The target object to add the token to
 */
function processOpacityToken(key, token, target) {
  target[key] = { value: token.value, type: 'opacity' };
}

/**
 * Process a theme token
 * @param {string} key - The token key
 * @param {Object} token - The token value
 * @param {Object} target - The target object to add the token to
 */
function processThemeToken(key, token, target) {
  // Determine if it's a light or dark theme token
  const theme = key.includes('dark') ? 'dark' : 'light';
  const tokenName = key.replace(`theme.${theme}.`, '');
  
  // Add reference to the original token
  if (typeof token.value === 'string' && token.value.startsWith('{') && token.value.endsWith('}')) {
    // This is a reference to another token
    const reference = token.value.slice(1, -1); // Remove the curly braces
    target[theme][tokenName] = { value: `{${reference}}`, type: 'color' };
  } else {
    // This is a direct value
    target[theme][tokenName] = { value: token.value, type: 'color' };
  }
}

/**
 * Process nested tokens
 * @param {string} key - The token key
 * @param {Object} value - The token value
 * @param {Object} categories - The categories object
 */
function processNestedTokens(key, value, categories) {
  // Check if this is a category we're interested in
  if (categories[key]) {
    // Process each token in the category
    Object.entries(value).forEach(([subKey, subValue]) => {
      if (typeof subValue === 'object' && subValue !== null) {
        if (subValue.type === 'color') {
          processColorToken(`${key}.${subKey}`, subValue, categories.color);
        } else if (subValue.type === 'typography') {
          processTypographyToken(`${key}.${subKey}`, subValue, categories.typography);
        } else if (subValue.type === 'spacing' || subValue.type === 'sizing') {
          processSpacingToken(`${key}.${subKey}`, subValue, categories.spacing.spacing);
        } else if (subValue.type === 'borderRadius') {
          processBorderRadiusToken(`${key}.${subKey}`, subValue, categories.borderRadius.radius);
        } else if (subValue.type === 'borderWidth') {
          processBorderWidthToken(`${key}.${subKey}`, subValue, categories.borderWidth.border.width);
        } else if (subValue.type === 'boxShadow') {
          processShadowToken(`${key}.${subKey}`, subValue, categories.shadow.shadow);
        } else if (subValue.type === 'opacity') {
          processOpacityToken(`${key}.${subKey}`, subValue, categories.opacity.opacity);
        } else {
          // Recursively process nested tokens
          processNestedTokens(`${key}.${subKey}`, subValue, categories);
        }
      }
    });
  }
}

/**
 * Write the processed tokens to files
 * @param {Object} categories - The categories object
 */
function writeTokenFiles(categories) {
  // Write each category to a separate file
  Object.entries(categories).forEach(([category, tokens]) => {
    if (Object.keys(tokens).length > 0) {
      const filePath = path.join(outputDir, `${category}.json`);
      fs.writeFileSync(filePath, JSON.stringify(tokens, null, 2));
      console.log(`✓ Wrote ${category} tokens to ${filePath}`);
    }
  });
}
