# LYRS SPACE V2

Personal digital space built for GitHub Pages. Responsive monochrome design, with a lime accent.

## Upload
Upload the contents of this folder to the root of your GitHub Pages repository (keep `index.html`, `style.css`, `app.js`, `profile.json`, and the `assets` folder together).

## Edit profile from GitHub
Open `profile.json` in GitHub, tap the pencil icon, edit values, then commit changes. GitHub Pages will publish the changes automatically after its deployment finishes.

Example:
```json
{
  "name": "Rayy",
  "handle": "@rayy · Creative designer & web explorer",
  "bio": "Your new bio goes here.",
  "avatar": "rayy.jpg",
  "tags": ["✳ Design", "⌘ Web", "☕ Matcha"],
  "title": "Rayy"
}
```

### Change profile picture
1. Upload an image to the `assets` folder, e.g. `assets/rayy.jpg` (or a GIF like `assets/rayy.gif`).
2. Edit `profile.json` and set `"avatar": "assets/rayy.jpg"`.
3. Commit changes.

Use a relative path exactly as written. The avatar can be JPG, PNG, WebP, or GIF. Keep the JSON syntax valid: double quotes, commas between fields, no comma after the last field.

## Notes
- Profile details are edited from GitHub, not from a visitor's browser, so the public profile updates for everyone after the site deploys.
- Music upload plays a file locally in the current browser session only; it is not uploaded to the site.
- Project links are set in `index.html` and can be edited there.
