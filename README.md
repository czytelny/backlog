# Backlog

> Simple multiplatform desktop app for storing TODOs, ideas or backlog items. 
> You can organize them with boards. No dependencies, no internet connection required, 
> no external accounts. Sleek flow.

<p align="center">
<img src="https://github.com/czytelny/backlog/raw/master/logo.png">
</p>


# Download
No installation required. Just unzip archive and run executable
- [Windows version](https://github.com/czytelny/backlog/releases/download/v1.4.2/Backlog-win32-x64.zip)
- [MacOs version](https://github.com/czytelny/backlog/releases/download/v1.4.2/Backlog-darwin-x64.zip) 
- [Linux version](https://github.com/czytelny/backlog/releases/download/v1.4.2/Backlog-linux-x64.tar.gz)

#### 32bit versions
- [Windows x32 version](https://github.com/czytelny/backlog/releases/download/v1.4.2/Backlog-win32-ia32.zip)
- [Linux x32 version](https://github.com/czytelny/backlog/releases/download/v1.4.2/Backlog-linux-ia32.tar.gz)

## Screenshot
![image](screenshot.png)

## Update
When new version is available just download it, unzip and enjoy. No additional action is required. All your boards and items will be available.

## Versions
### 1.5.0
Features: 
- When entering http link in an item, app will show it as a hyperlink and make it clickable
- User can embed html tags like `<b>, <i>` etc

Fixed bugs: 
- Fix issue which caused that in some cases after opening application current board input was not focused
- Clicking on "+" icon in input will cause adding new item (just as pressing Enter)

### 1.4.2
- fixed bug - when after opening settings modal user lost newly created boards
 
### 1.4.1
Fixed bugs:
- Prevent creating empty task
- ShowDone button placement corrected
- Prevent create empty board with empty name
- Fix issue with re-opening modal (settings, add new board) after closing it by clicking outside of the modal
- Fix issue with lack of scrooling option when have more boards that windows width allows
- Added notifications when adding/removing item from board

### 1.4.0
- Added item creation date - it's turned off by default (you can turn in on in settings). Old entries won't have date, though - only new one.
- Limit of 4 boards removed
- x32 build versions added for linux and windows

### 1.3.0
- added confirmation dialog before removing board
- double click on board bar trigger adding new board modal window
- item's action buttons visible on mouse hover 
- tooltip placement improved
- minor ui readability improvements

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
