## CI/CD with GitHub Actions

In the old days of web development, deploying a website involved manually dragging and dropping files via an FTP client like FileZilla onto a server. 
If you accidentally dragged the wrong file, the production website broke. If you forgot to run the unit tests before dragging the files, the production website broke.

Modern engineering teams eliminate human error through **Continuous Integration and Continuous Deployment (CI/CD)**.

### Continuous Integration (CI)
CI is the process of automating the validation of your code. 
Whenever a developer opens a Pull Request (PR) on GitHub, a server automatically boots up, downloads their code, and runs a series of checks.

A standard Frontend CI Pipeline does the following:
1. **Linting:** Runs ESLint to check for syntax errors or bad practices.
2. **Formatting:** Runs Prettier to ensure the code matches the company's style guide.
3. **Type Checking:** Runs `tsc --noEmit` to ensure there are no TypeScript errors.
4. **Unit Tests:** Runs `jest` to ensure no existing components were broken.

If *any* of these steps fail, GitHub will literally block the "Merge" button, preventing the developer from merging broken code into the `main` branch.

### Continuous Deployment (CD)
Once the code passes CI and the PR is merged into `main`, the CD pipeline takes over.
The CD server automatically builds the production bundle (`npm run build`), creates a Docker container, and pushes the new code to the live production server. 
Zero human intervention is required.

:::mint
<svg viewBox="0 0 470 150" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .lbl { font: 10px Georgia, serif; fill: #1a1a1a; }
    .sm  { font: 8px Consolas, monospace; fill: #4a4a4a; }
    .tiny{ font: 7px Consolas, monospace; fill: #6a6a72; }
    .bx  { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .soft{ fill: #ffffff; stroke: #8fbfae; stroke-width: 1; stroke-dasharray: 3 2; }
    .ar  { stroke: #1a1a1a; stroke-width: 1.1; fill: none; }
    .hot { fill: #ef476e; font: bold 8px Consolas, monospace; }
    .hotln { stroke: #ef476e; stroke-width: 1.1; fill: none; }
  </style>
  <defs>
    <marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#1a1a1a"/>
    </marker>
    <marker id="r" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 z" fill="#ef476e"/>
    </marker>
  </defs>

  <text x="6" y="12" class="sm">ON EVERY PULL REQUEST</text>

  <rect class="bx" x="6"   y="22" width="80" height="26" rx="4"/>
  <text x="46"  y="39" class="lbl" text-anchor="middle">install</text>
  <rect class="bx" x="102" y="22" width="80" height="26" rx="4"/>
  <text x="142" y="39" class="lbl" text-anchor="middle">lint</text>
  <rect class="bx" x="198" y="22" width="80" height="26" rx="4"/>
  <text x="238" y="39" class="lbl" text-anchor="middle">tsc</text>
  <rect class="bx" x="294" y="22" width="80" height="26" rx="4"/>
  <text x="334" y="39" class="lbl" text-anchor="middle">vitest</text>
  <rect class="bx" x="390" y="22" width="74" height="26" rx="4"/>
  <text x="427" y="39" class="lbl" text-anchor="middle">playwright</text>

  <line class="ar" x1="88"  y1="35" x2="98"  y2="35" marker-end="url(#a)"/>
  <line class="ar" x1="184" y1="35" x2="194" y2="35" marker-end="url(#a)"/>
  <line class="ar" x1="280" y1="35" x2="290" y2="35" marker-end="url(#a)"/>
  <line class="ar" x1="376" y1="35" x2="386" y2="35" marker-end="url(#a)"/>

  <text x="6" y="66" class="hot">any red square blocks the merge button</text>

  <line x1="6" y1="76" x2="464" y2="76" stroke="#8fbfae" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="6" y="92" class="sm">ON MERGE TO MAIN</text>

  <rect class="bx" x="6"   y="102" width="92" height="26" rx="4"/>
  <text x="52"  y="119" class="lbl" text-anchor="middle">build</text>
  <rect class="bx" x="114" y="102" width="92" height="26" rx="4"/>
  <text x="160" y="119" class="lbl" text-anchor="middle">image</text>
  <rect class="bx" x="222" y="102" width="92" height="26" rx="4"/>
  <text x="268" y="119" class="lbl" text-anchor="middle">registry</text>
  <rect class="bx" x="330" y="102" width="134" height="26" rx="4"/>
  <text x="397" y="119" class="lbl" text-anchor="middle">deploy, then smoke test</text>

  <line class="ar" x1="100" y1="115" x2="110" y2="115" marker-end="url(#a)"/>
  <line class="ar" x1="208" y1="115" x2="218" y2="115" marker-end="url(#a)"/>
  <line class="ar" x1="316" y1="115" x2="326" y2="115" marker-end="url(#a)"/>

  <text x="6" y="144" class="sm">the same commit SHA tags the image, the release, and every error report</text>
</svg>
:::
