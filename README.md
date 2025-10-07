# CSS Governance

A powerful web application that uses AI to generate CSS code and validates it against web standards baseline support. This tool helps developers ensure their CSS is widely supported across modern browsers.

## Project Summary

CSS Governance is an intelligent CSS validation tool that combines the power of OpenAI's GPT models with the web-features package to generate and validate CSS code. It analyzes each CSS property to determine if it's part of the Baseline standard, helping developers make informed decisions about browser compatibility.

## Features

### 🎨 AI-Powered CSS Generation
- Generate CSS code from natural language prompts
- Leverages OpenAI's advanced language models
- Expert-level CSS recommendations

### ✅ Baseline Validation
- Automatically checks every CSS property against web standards
- Uses the official `web-features` package for accurate baseline data
- Identifies properties that may have limited browser support

### 🖥️ Interactive Web Interface
- Clean, user-friendly interface
- Real-time CSS generation and validation
- Color-coded results (green for baseline, red for non-baseline)
- Side-by-side display of raw CSS and validation results

### 🔌 RESTful API
- Multiple endpoints for different use cases
- JSON-based communication
- Easy integration with other tools

## Functionality

### Core Workflow
1. **User Input**: Enter a natural language prompt describing the desired CSS
2. **AI Generation**: OpenAI generates appropriate CSS code based on the prompt
3. **CSS Parsing**: PostCSS parses the generated CSS into a structured format
4. **Baseline Validation**: Each CSS property is checked against the web-features database
5. **Results Display**: Shows both the raw CSS and validation results with visual indicators

### Validation Logic
The application checks each CSS property against the Baseline standard by:
- Matching CSS properties to their Browser Compatibility Data (BCD) keys
- Determining if the property is widely available ("high" baseline)
- Determining if the property is newly available ("low" baseline)
- Flagging properties that are not yet baseline-supported

## Technologies Used

### Backend
- **Node.js (v20)**: JavaScript runtime environment
- **Fastify**: High-performance web framework for API endpoints
- **OpenAI API**: GPT-4 for intelligent CSS generation
- **PostCSS**: CSS parser and processor
- **web-features**: Official package for web platform feature data

### Frontend
- **HTML5**: Modern semantic markup
- **CSS3**: Responsive styling
- **Vanilla JavaScript**: Client-side interactivity with Fetch API

### Key Dependencies
- `fastify` - Web server framework
- `@fastify/static` - Static file serving
- `openai` - OpenAI API client
- `postcss` - CSS transformation tool
- `web-features` - Web platform baseline data

## API Endpoints

### GET /
Status check endpoint
```json
{ "status": "ok" }
```

### GET /check/:property
Check if a specific CSS property is baseline-supported
```
GET /check/display
```
Response:
```json
{ "property": "display", "isBaseline": true }
```

### GET /generate
Generate CSS from a prompt (returns plain CSS text)
```
GET /generate?prompt=create a button with rounded corners
```

### POST /govern
Generate CSS and validate against baseline (main endpoint)
```json
POST /govern
{
  "prompt": "create a card with shadow"
}
```
Response:
```json
{
  "generatedCss": ".card { box-shadow: 0 4px 6px rgba(0,0,0,0.1); ... }",
  "validationResults": [
    { "property": "box-shadow", "isBaseline": true },
    ...
  ]
}
```

## How to Use

1. **Open the web interface** in your browser
2. **Enter a CSS prompt** in the textarea (e.g., "create a flexbox navigation bar")
3. **Click "Govern this Prompt"** to generate and validate
4. **Review the results**:
   - Left panel: Raw AI-generated CSS
   - Right panel: Property validation (green = baseline, red = not baseline)

## License

This project is licensed under the MIT License - see the LICENSE.txt file for details.

Judges and evaluators have full rights to open, test, and evaluate this project.
