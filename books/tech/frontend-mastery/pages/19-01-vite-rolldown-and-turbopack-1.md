# Module 19: Build Tools And Repositories

## Vite, Rolldown, and Turbopack

The browser cannot run your source code. It does not understand JSX, it does not understand TypeScript, and until recently it could not efficiently load a thousand separate ES modules over the network. A build tool is the machine that turns what you wrote into what the browser can load.

Understanding what each generation of that machine was solving explains why the current ones look the way they do.

### The Webpack era

Webpack starts at your entry file, follows every `import` through the whole codebase, transpiles each file, and concatenates the result into one bundle.

That model is correct and it does not scale. Every file must be processed before the dev server can serve anything. On a small app that is two seconds. On a large one it is five minutes, and each save costs another ten seconds before the change shows in the browser.

The bottleneck was never the algorithm. It was that Webpack is written in JavaScript, which is single threaded and garbage collected, doing work that is embarrassingly parallel.
