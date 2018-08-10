# Backlog

> Simple multiplatform desktop app for storing TODOs, ideas or backlog items.
> You can organize them with boards as a plaintext or markdown. No dependencies, no internet connection required,
> no external accounts. Sleek flow.

<p align="center">
<img src="https://github.com/czytelny/backlog/raw/master/logo.png" width="100px" height="100px">
</p>

# Official website
[www.backlog.cloud](http://www.backlog.cloud)

# Download
No installation required. Just unzip archive and run executable
- [Windows version](https://github.com/czytelny/backlog/releases/download/v1.8.0/Backlog-win32-x64.zip)
- [MacOs version](https://github.com/czytelny/backlog/releases/download/v1.8.0/Backlog-darwin-x64.zip)
- [Linux version](https://github.com/czytelny/backlog/releases/download/v1.8.0/Backlog-linux-x64.tar.gz)

#### 32bit versions
- [Windows x32 version](https://github.com/czytelny/backlog/releases/download/v1.8.0/Backlog-win32-ia32.zip)
- [Linux x32 version](https://github.com/czytelny/backlog/releases/download/v1.8.0/Backlog-linux-ia32.tar.gz)

## Features
- Organize your thoughts with items & boards. Use Markdown or plaintext for adding new items
- Move items to other board or drag&drop for reordering within current one
- Filter board items by text
- Light/dark theme
- Simple progress bar
- Keyboard shortcuts [full list available here](http://www.backlog.cloud/help)

## Screenshots
<p align="center">
    <img src="https://github.com/czytelny/backlog/raw/master/backlog_screenshot_1.png" width="400px">
    <img src="https://github.com/czytelny/backlog/raw/master/backlog_screenshot_2.png" width="400px">
    <img src="https://github.com/czytelny/backlog/raw/master/backlog_screenshot_3.png" width="400px">
    <img src="https://github.com/czytelny/backlog/raw/master/backlog_screenshot_4.png" width="400px">
</p>

## Update
When new version is available just download it, unzip and enjoy. No additional action is required. All your boards and items will be available.

## Change log
### 1.8.0
> This is another huge update with number of significant improvements/features added.
> Hopefully it will stay for a longer.

### Features & improvements
- dark theme
- `search items` feature
- backup to file feature
- new top bar unified acroos OS
- modals can be closed by pressing ESC or click outside modal area
- scroolbar ui improved
- number of keyboard shortcuts added
- check for updates on app startup
- other minor ui improvements...

### Bug fixes
- fixed issue which makes impossible to move some item to newly created board
- fix bug when specific items can't be edited nor deleted
- fixed issue when items list was not fully visible (last item was truncated)

## Why I've wrote it ?
When programming I often have a number of ideas related to possible improvements for the future or a cool new project. Most often, it's just one sentence or a couple of words - just a draft of an idea to expand in the future.

I know that, there are hundreds of *todo list managers* or other *notes manager*,
but this one will finally perfectly fulfill my needs. So far I wrote my thoughts on sticky notes, I tried Evernote, Simplenote...
They are fine, but all of them were either bloated with unnecessary features or lacked the desired "flow" -
when I open a program I want type down thoughts, hit enter, and get back to my actual work. That's how I write Backlog. No dependencies, no internet connection required, no external accounts etc.

## License
It's free and opensource application under **MIT** license. You can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source

# Technical
#### How ?
This application is built with [Electron](https://electron.atom.io) and web technologies (javascript, css, html) more specifically: [Vue.js](https://vuejs.org). UI toolkit is [iView](https://www.iviewui.com/)

#### Build Setup
You can build it yourself instead of downloading executable:

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[ef811ba](https://github.com/SimulatedGREG/electron-vue/tree/ef811ba974d696ee965da747315f20a034ebc590) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
