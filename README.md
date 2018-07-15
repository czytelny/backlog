# Backlog

> Simple multiplatform desktop app for storing TODOs, ideas or backlog items.
> You can organize them with boards as a plaintext or markdown. No dependencies, no internet connection required,
> no external accounts. Sleek flow.

<p align="center">
<img src="https://github.com/czytelny/backlog/raw/master/logo.png" width="100px" height="100px">
</p>


# Download
No installation required. Just unzip archive and run executable
- [Windows version](https://github.com/czytelny/backlog/releases/download/v1.7.0/Backlog-win32-x64.zip)
- [MacOs version](https://github.com/czytelny/backlog/releases/download/v1.7.0/Backlog-darwin-x64.zip)
- [Linux version](https://github.com/czytelny/backlog/releases/download/v1.7.0/Backlog-linux-x64.tar.gz)

#### 32bit versions
- [Windows x32 version](https://github.com/czytelny/backlog/releases/download/v1.7.0/Backlog-win32-ia32.zip)
- [Linux x32 version](https://github.com/czytelny/backlog/releases/download/v1.7.0/Backlog-linux-ia32.tar.gz)

## Screenshot
<p align="center">
<img src="https://github.com/czytelny/backlog/raw/master/screenshot.png" width="400px">
</p>

## Update
When new version is available just download it, unzip and enjoy. No additional action is required. All your boards and items will be available.

## Versions
### 1.7.0
> A lot of significant changes and improvements this time. Most of them according to your comments. Thank you and enjoy! 👍

# Changes/Improvements
- **feature request**: changed items drag&drop behaviour (to move items user has dedicated handler on the left)
- **feature request**: after clicking in text item is not marked as done now (user has to use checkbox directly)
- **feature request**: context menu for copy/cut/paste
- **feature request**: action button with: move to top/bottom of the board, and "move to another boad"
- **feature request**: setting added: board list fixed on the top of the screen
- **feature request**: saving board items as a JSON file (in settings modal)
- **feature request**: added Markdown mode (to turn on in settings modal)
- removed support for HTML tags (it wasn't the best idea to add it). now user has plaintext/markdown mode
- added information about database location in settings modal
- changed reordering tabs feature - now it requires full app restart + added dedicated handler for drag&drop on the left
- dependency bump of electron (v2.0.2), iview, vue and others



# Bug fixes
- fix bug which causes data lost in some cases - related to settings modal
- fix bug related to freezing ui when adding first item (on some systems)

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
This application is builded with [Electron](https://electron.atom.io) and web technologies (javascript, css, html) more specifically: [Vue.js](https://vuejs.org). UI toolkit is [iView](https://www.iviewui.com/)

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
