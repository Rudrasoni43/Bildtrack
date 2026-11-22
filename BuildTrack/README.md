# BuildTrack – Construction Project Management Portal

BuildTrack is a beginner-friendly, single-page web project for tracking a small construction project. It is built with **HTML** (`index.html`), **CSS** (`style.css`) and **plain JavaScript** (`script.js`). It has no libraries, frameworks, backend or build step.

> Student / demonstration project. All names, IDs and figures are fictional sample data.

---

## Features

| Section | What it does |
|---|---|
| **Dashboard** | Shows today's date and four live counters: Total, Completed, In progress and Delayed tasks. |
| **Work phases & task tracker** | A table of tasks with assignee, deadline, a status badge and a progress bar. You can change a task's status or delete it from the table. |
| **Assign a new task** | A form with a task name, worker/team, deadline, status and a progress slider. |
| **Export to CSV** | Downloads every task as `buildtrack-tasks.csv`. |
| **Reset demo data** | Restores the four original sample tasks. |
| **Material requirements** | A sample checklist (cement, steel, bricks, sand) with stock badges and a field for adding reminders. |
| **Team records** | A static table of sample team members. |
| **Safety audio** | An `<audio>` player for `safety-reminder.mp3`, a 45-second spoken daily safety announcement, with the text shown below it. |
| **Status announcement** | A scrolling `<marquee>` message, included only for syllabus practice. |

### Automatic rules
- **Delayed:** a task counts as delayed when its deadline has passed and its status is not `Completed`.
- Setting a task to **Completed** sets its progress to 100%.
- Moving a completed task back to another status resets its progress to 50%.

---

## Project structure

```
BuildTrack/
├── index.html   # Page structure: header, nav, sections, footer
├── style.css    # CSS variables, Flexbox/Grid layout, components, @media rules
├── script.js    # Task data, saving and loading, rendering, form handling, CSV export
├── safety-reminder.mp3  # Spoken site safety announcement
└── README.md    # This file
```

`index.html` loads the other two files:
```html
<link rel="stylesheet" href="style.css">   <!-- in <head> -->
<script src="script.js"></script>          <!-- end of <body> -->
```
Keep all three files in the same folder.

---

## How to open it in VS Code

1. Install **[Visual Studio Code](https://code.visualstudio.com/)**.
2. Keep `index.html`, `style.css`, `script.js` and `README.md` together in one folder.
3. In VS Code, choose **File → Open Folder…** and select that folder.
4. To preview this README, open `README.md` and press **Ctrl+Shift+V** (macOS: **Cmd+Shift+V**).

### Run the app
Use either option:

- **Option A (simplest):** double-click `index.html` in your file manager, or right-click it and open it with Chrome, Edge or Firefox.
- **Option B (recommended):** use the **Live Server** extension.
  1. Open the Extensions panel with **Ctrl+Shift+X**.
  2. Search for **Live Server** (by Ritwick Dey) and install it.
  3. Right-click `index.html` and choose **Open with Live Server**.
  4. The page opens at `http://127.0.0.1:5500/` and reloads every time you save.

---

## Data storage

- Tasks are saved in the browser's **localStorage** under the key `buildTrackTasks`.
- The data stays only in **that browser on that computer**. It is not sent to any server.
- Material reminders are **not saved**. They disappear when you refresh the page.
- To clear saved tasks, click **Reset demo data**, or open DevTools (F12) and go to **Application → Local Storage** to delete the key.

> **Note:** the sample deadlines are in October–November 2026. Once those dates pass, unfinished sample tasks show as **Delayed**. That is expected. Edit `startingTasks` in `script.js` to use later dates.

---

## Customising

| To change… | Edit this |
|---|---|
| Colours | `style.css`: the CSS variables in `:root` (`--navy`, `--blue`, `--gold`, …) |
| Sample tasks | `script.js`: the `startingTasks` array |
| Materials list | `index.html`: the `<ul class="material-list">` in the `#materials` section |
| Team members | `index.html`: the `<tbody>` rows in the `#team` section |
| Announcement text | `index.html`: the text inside `<marquee>` |

After changing `startingTasks`, click **Reset demo data**. Old saved tasks in localStorage override the array until you do.

---

## Concepts practised

- **HTML:** semantic tags (`header`, `nav`, `main`, `section`, `article`, `footer`), forms (`input`, `select`, `range`, `date`), tables, inline SVG, `audio`, `marquee`, anchor links
- **CSS:** variables, selectors, pseudo-classes (`:hover`, `:focus`), Flexbox, CSS Grid, gradients, media queries
- **JavaScript:** arrays of objects, DOM creation (`createElement`, `textContent`), event listeners, `localStorage` with JSON, `Blob` file download, array methods (`filter`, `map`, `forEach`)
- **Safety and accessibility:** `textContent` for user input (prevents HTML injection), `aria-label`s and `<label for>` links

---

## Known limitations

- There is no backend, login or multi-user sharing.
- You cannot edit a task's name, assignee or deadline after adding it. You can only delete it and add it again.
- The materials list and team table are hard-coded in `index.html`.
- `<marquee>` is obsolete. A CSS animation would replace it in a real project.

---

## Browser support

Works in current versions of Chrome, Edge, Firefox and Safari. The CSV export uses `String.replaceAll`, which needs a browser from 2020 or later.

## License

Free to use for learning and demonstration.
