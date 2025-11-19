const vscode = require("vscode");
const path = require("path");
const fs = require("fs");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log("Meteor Methods Navigation extension is now active!");

    // Enregistrer le provider de définitions
    const provider = new MeteorDefinitionProvider();
    const disposable = vscode.languages.registerDefinitionProvider(
        [
            { scheme: "file", language: "javascript" },
            { scheme: "file", language: "javascriptreact" },
            { scheme: "file", language: "typescript" },
            { scheme: "file", language: "typescriptreact" },
        ],
        provider,
    );

    context.subscriptions.push(disposable);
}

class MeteorDefinitionProvider {
    provideDefinition(document, position, token) {
        const line = document.lineAt(position.line);
        const text = line.text;
        const wordRange = document.getWordRangeAtPosition(position);

        if (!wordRange) {
            return null;
        }

        const word = document.getText(wordRange);
        const wordStart = wordRange.start.character;
        const wordEnd = wordRange.end.character;

        // Pattern: CollectionName.methods.methodName
        const methodPattern = /(\w+)\.methods\.(\w+)/;
        const match = text.match(methodPattern);

        if (!match) {
            // Si on clique sur juste le nom de la collection (Booking)
            const collectionPattern = /^(\w+)(?:\.methods)?/;
            const collectionMatch = text.match(collectionPattern);

            if (collectionMatch && word === collectionMatch[1]) {
                return this.findCollectionDefinition(collectionMatch[1], document);
            }
            return null;
        }

        const collectionName = match[1];
        const methodName = match[2];
        const fullMatchStart = text.indexOf(match[0]);
        const fullMatchEnd = fullMatchStart + match[0].length;

        // Vérifier si on clique sur le nom de la collection ou sur le nom de la méthode
        if (wordStart >= fullMatchStart && wordStart < fullMatchStart + collectionName.length) {
            // Clic sur le nom de la collection
            return this.findCollectionDefinition(collectionName, document);
        } else if (wordStart >= fullMatchStart + collectionName.length + 8 && wordStart <= fullMatchEnd) {
            // Clic sur le nom de la méthode (8 = longueur de ".methods.")
            return this.findMethodDefinition(collectionName, methodName, document);
        }

        return null;
    }

    findCollectionDefinition(collectionName, document) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        if (!workspaceFolder) {
            return null;
        }

        const possiblePaths = [
            path.join(workspaceFolder.uri.fsPath, "imports", "api", collectionName.toLowerCase(), "index.js"),
            path.join(workspaceFolder.uri.fsPath, "imports", "api", this.toCamelCase(collectionName), "index.js"),
        ];

        for (const filePath of possiblePaths) {
            if (fs.existsSync(filePath)) {
                const uri = vscode.Uri.file(filePath);
                // Chercher la ligne avec globalThis.CollectionName
                return this.findLineInFile(uri, `globalThis.${collectionName}`);
            }
        }

        return null;
    }

    findMethodDefinition(collectionName, methodName, document) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        if (!workspaceFolder) {
            return null;
        }

        const possiblePaths = [
            path.join(workspaceFolder.uri.fsPath, "imports", "api", collectionName.toLowerCase(), "server", "methods.js"),
            path.join(workspaceFolder.uri.fsPath, "imports", "api", this.toCamelCase(collectionName), "server", "methods.js"),
        ];

        for (const filePath of possiblePaths) {
            if (fs.existsSync(filePath)) {
                const uri = vscode.Uri.file(filePath);
                // Chercher la ligne avec CollectionName.methods.methodName
                const pattern = `${collectionName}.methods.${methodName}`;
                return this.findLineInFile(uri, pattern);
            }
        }

        return null;
    }

    findLineInFile(uri, searchText) {
        return vscode.workspace.openTextDocument(uri).then((doc) => {
            for (let i = 0; i < doc.lineCount; i++) {
                const line = doc.lineAt(i);
                if (line.text.includes(searchText)) {
                    const position = new vscode.Position(i, line.text.indexOf(searchText));
                    return new vscode.Location(uri, position);
                }
            }
            return null;
        });
    }

    toCamelCase(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
