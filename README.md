# Job Post Manager - Chrome Extension

Stop wasting time scrolling past the same job opportunities. This extension adds a "Hide" feature to your job search, allowing you to focus only on what's new and relevant.

## 🚀 Features

- **One-Click Hiding**: Injects a clean "X" button into job cards.
- **Smart Persistence**: Remembers your hidden jobs using `chrome.storage.local`.
- **Infinite Scroll Support**: Automatically detects and processes new job posts as they load.
- **Privacy Focused**: Operates locally on your browser.

## 🛠️ Installation (Local/Developer Mode)

Since this extension is not yet on the Chrome Web Store, you can install it manually:

1.  **Download/Clone** this repository to your computer.
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  In the top-right corner, toggle **Developer mode** to **ON**.
4.  Click the **Load unpacked** button that appears.
5.  Select the folder containing this extension's files (where `manifest.json` is located).
6.  The "Jobfound Job Manager" icon should now appear in your extensions list!

## 📖 How to Use

1.  Navigate to the supported job portal.
2.  You will see a red **X** icon in the top-right corner of every job card.
3.  Click the **X** to hide a job you are not interested in.
4.  The job will disappear instantly and will **stay hidden** even if you refresh the page.

## 📁 Project Structure

- `manifest.json`: Extension configuration and permissions.
- `content.js`: Logic for DOM injection and state management.
- `styles.css`: Styling for the injected UI elements.

---

*Built with ❤️ to make job hunting a little less exhausting.*
