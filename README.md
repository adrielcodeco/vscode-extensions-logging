<p align="center">
  <h1>vscode-extensions-logging</h1>
</p>

This package help to control the logging on vscode extensions using `winston`.

## Install

using npm

```bash
npm i -D vscode-extensions-logging
```

using yarn

```bash
yarn add -D vscode-extensions-logging
```

## How to use it `?`

Call `ExtensionsLogging.register` static method on `ExtensionsLogging` class passing the extension name or extension id, this extension name will appear in output window on vscode

**example:**

```typescript
import { ExtensionsLogging } from 'vscode-extensions-logging'

export function activate (context: vscode.ExtensionContext) {
  const EXTENSION_ID = 'extension.name'
  const logger = ExtensionsLogging.register(EXTENSION_ID)
  logger.info('initializing extension')
}
```

To control the log level, pass the log level on register. Default log level: `info`

```typescript
ExtensionsLogging.register(EXTENSION_ID, 'warn')
```
