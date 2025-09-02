# LogBrow

Utility to browse logs in your browser. Pipe logs into the server and view them live at http://localhost:3000.

## Usage

```sh
cat your.log | npm start
# or
some-app | npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm install` to install dependencies
- `npm start` to run the server with ts-node

## Project Structure

- `src/server.ts` - Main server entry point
- `src/controllers/logsController.ts` - Log storage and API
- `src/routes/logs.ts` - API route for logs
- `src/views/index.html` - Simple log viewer UI

---
MIT License
