# Meteor Methods Navigation

A VS Code extension that allows you to quickly navigate to Meteor collection and method definitions using "Go to Definition" (F12).

## Features

- **Navigate to collections** : Click on a collection name (e.g., `CollectionName`) to go to its definition
- **Navigate to methods** : Click on a method's name (e.g., `CollectionName.methods.methodsName`) to go to its definition by clicking on *"methodsName"*
- **Multi-language support** : Works with JavaScript, TypeScript, JSX, and TSX

## How to use

1. Place your cursor on a Meteor collection or method
2. Press `F12` or right-click → "Go to Definition" **OR** On MacOS → CMD + Left-Click
3. The extension will take you directly to the definition

### Examples

```javascript
// Click on "Booking" to go to the collection definition
Booking.methods.create({ ... });

// Click on "create" to go to the method definition
Booking.methods.create({ ... });
```

## Expected project structure

The extension looks for files in the following structure:

```
project/
├── imports/
│   └── api/
│       └── [collection-name]/
│           ├── index.js          (collection definition)
│           └── server/
│               └── methods.js     (method definitions)
```

## Installation

### From VS Code marketplace

1. Open VSCode or Cursor
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Meteor Methods Navigation"
4. Click Install

### From a .vsix file

1. Download the `.vsix` file
2. In VS Code, go to Extensions
3. Click the three dots (...) → "Install from VSIX..."
4. Select the downloaded file

## Development

```bash
# Install dependencies
npm install

# Create the .vsix package
npm run package
```

## License

MIT License - See the [LICENSE](LICENSE) file for more details.

## Contributing

Contributions are welcome! Feel free to open an issue or a pull request.
