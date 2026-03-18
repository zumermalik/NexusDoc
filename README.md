# nexusdoc

**I built something that actually works (i wanted it) :)**

this is a local-first engine that turns your technical thoughts into perfectly formatted prds and api docs. 
the goal is simple:
keep your data secure on your local machine
remove the bloated cloud dependencies
make document compilation instant and painless

### why i made this

i was trying to build an api documentation generator inside a cloud container (github codespaces). 

what caught my attention was how headless browsers (like puppeteer) handle pdfs. i spent hours fighting linux graphics drivers, missing `libatk` libraries, and out-of-memory container crashes just trying to get chrome to snap a picture of some html. 

that was the unlock for me.
why are we spinning up an entire invisible web browser just to draw a box and some text? 

so i ripped it all out. i built nexusdoc to bypass the linux dependency hell completely. it uses pure math and native javascript (`pdfkit` and `docx`) to draw the documents directly from the backend. no headless browsers. no graphics libraries. it just works.



### what it does

* generates structured product requirement documents (prds) into `.docx` files
* turns raw endpoints into beautifully formatted api documentation `.pdf` files
* runs completely locally with zero third-party api calls 
* provides a clean, "enterprise macos" glassmorphic ui
* orchestrates both the react frontend and express backend concurrently

### the flow (human language version)

**the old broken way:**
user clicks generate -> backend wakes up -> tries to launch invisible chrome -> linux panics because it has no monitor -> crashes with `Code: 127` -> user cries.

**the nexusdoc way:**
user clicks generate -> backend gets the json -> pure math calculates where the text should go -> buffers a raw file -> instantly downloads to the browser -> user ships their product.

### features

**clean glass ui**
* light-mode "neumorphic" glass design
* seamless sidebar navigation between document modules
* instant local server status indicators

**prd compiler**
* inputs: project name, target audience, core architecture
* outputs: a fully formatted microsoft word document ready to share with stakeholders

**api doc engine**
* inputs: service name, base url, markdown-style endpoints
* outputs: a crisp pdf with highlighted code blocks and structured spacing

### tradeoffs

* because we ditched html-to-pdf rendering, the pdf layout is hardcoded in the backend using `pdfkit`. changing the visual design of the pdf requires changing node.js code, not just writing css.
* it does not currently save history. once you hit refresh, the draft is cleared. (might add localstorage caching later).
* security audit tab is currently a placeholder while i figure out the best way to parse local codebases securely.

### setup (local)

you only need 1 terminal. the root package handles the rest.

**1) install dependencies**
you need to install the root orchestrator, then the two engines.
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

**2) start the engine**
in your root terminal run:
```bash
npm run dev:web
```
this boots the vite frontend (port 5173) and the express backend (port 4000) side-by-side in the same window.

**3) use it**
* open `localhost:5173` in your browser.
* pick a tool from the sidebar.
* fill out your specs.
* hit generate and watch the file drop instantly.

### how to use it well

* start your api docs with a clear base url.
* use markdown-style spacing in the endpoints box (e.g., `GET /users - fetches data` on one line, payload details on the next).
* don't worry about formatting the PRD text perfectly; the `docx` engine automatically handles spacing and heading weights.

### where this goes next (making it an actual product)

right now, nexusdoc is a basic structural engine. it solves the formatting headache and the linux dependency nightmare. but to make it a *real* product, here are the angles i'm looking at:

**1. the ai context layer**
instead of manually typing out endpoints or core features, the engine should just read your repo. the next step is plugging in an ml model to ingest the local codebase, understand the architecture, and auto-write the prd and api docs for you.

**2. the security & smart contract auditor**
that third "security audit" tab needs to come alive. the vision is to build a risk engine that parses your local code—or even acts as a static analyzer for web3 smart contracts—hunting for vulnerabilities and compiling a clean, readable pdf audit report.

**3. zero-touch ci/cd integration**
turning this from a ui dashboard into a headless cli tool or github action. imagine every time you merge to main, nexusdoc quietly wakes up, generates fresh `.pdf` and `.docx` files based on your latest code, and drops them right into your repo's `/docs` folder.

**4. ecosystem handoff**
downloading files locally is great, but the final boss is one-click publishing. wiring up webhooks to push the compiled documents straight into your team's notion, confluence, or github wikis.
