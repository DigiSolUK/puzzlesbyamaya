# Puzzles by Amaya

Six browser games for ages 4–8. Each has Easy and Trickier levels and an optional read-aloud button. Rounds run in the browser and reset on reload.

## Preview locally

From the repository root, run `python -m http.server 8000`, then open `http://localhost:8000`. Serve the files over HTTP so the browser can load the game modules. Python’s preview server does not process `.htaccess`. Open a game’s `.html` file directly in the preview, or use an Apache-compatible server to test the clean links.

## Upload to Hostinger

1. In hPanel, open **Websites**, select the site that will host Puzzles by Amaya, and open **File Manager**.
2. Open that domain’s `public_html` folder. If it already serves a site, back up the existing files before replacing them.
3. Upload the supplied ZIP and extract it. Place `index.html`, the six game pages, the CSS and JavaScript files, the complete `assets` folder, and the hidden `.htaccess` file directly in `public_html`. If `.htaccess` already exists, merge the supplied game rules into it before any catch-all routing rules. Move the files up one level if the extractor creates a containing folder. Remove the uploaded ZIP after extraction.
4. Visit the domain over HTTPS and use **Let’s play**. Open each of the six games and check that its URL has no `.html` suffix. Open `/number-garden.html` directly to confirm it redirects to `/number-garden`. Refresh the page while in a game, switch to **Trickier**, play a prompt with **Read aloud**, and use **All games** to return.
5. If Hostinger still shows a placeholder, check the selected domain and the location of `index.html`. For a new site, remove the default Hostinger placeholder after confirming it is only the starter page.

See the [Hostinger File Manager guide](https://www.hostinger.com/support/4548688-basic-actions-in-the-file-manager-in-hostinger/).

## Edit the puzzles

The question sets and board instructions are in `puzzles.js`. Quiz prompts use `assets/audio/<game>-<level>-<question-number>.mp3` with one-based question numbers. The jigsaw and memory instructions use `assets/audio/<game>.mp3`. Update the matching clips when changing prompt text or order. The bundled clips were synthesised locally in UK English.

Fredoka and Nunito are served locally. Their licences are in `assets`.
