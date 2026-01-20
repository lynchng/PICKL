# Naming Convention

➤ [Home](../README.md)

While we're free to name variables, etc. anything we want, it's still good to establish some guidelines so there's some level of uniformity especially when multiple people begin working on the same page.

---

## General Guidelines

- When naming objects, always remember to keep it concise but straight to the point. The name should be descriptive enough that anyone looking for it would easily be able to determine which element it represents
- There's no maximum character limit, but try your best to keep it to a minimum. We wouldn't want to be using a 64-character long variable now, wouldn't we? :sweat_smile: Wouldn't we? :confused:

## Folders and files

- Folder names and filenames differ per context. They don't have one specific rule that they follow but here are some guidelines on how to name them
- The folder name and structure of the pages depend on its path in the URL from the app itself. If you would notice, it follows the kebab-case convention, because that's the naming convention followed by the URL path
- The documentation follows an upper case KEBAB-CASE convention to distinguish them from other files
- Auto-generated folders and files (like package-lock.json, test-results) follow the kebab-case
- All other folders and files follow the camelCase convention

## Classes

- When naming classes, we follow the PascalCase convention (words are separated by upper case instead of space, first letter of variable is always upper case)

## Methods

- When naming methods, we follow the camelCase convention (words are separated by upper case instead of space, first letter of variable is always lower case)

## Variables

- When naming variables, we follow the camelCase convention (words are separated by upper case instead of space, first letter of variable is always lower case)
- There are many different types of inputs available on the page, some may be of different types but serve the same purpose. For those cases, we use prefixes to distinguish the element type that the variable is representing (i.e. `btnContinue` for the Continue button) Here is a list of the prefixes we're going to use in PICKL:

| prefix | description                                                    |
| :----: | -------------------------------------------------------------- |
| `btn`  | for any clickable element that may or may not resemble buttons |
| `lnk`  | for any clickable element that look like links or `<a>`        |
| `lst`  | for lists                                                      |
| `tab`  | for tabs or menu options                                       |
| `tbl`  | for tables                                                     |
| `col`  | for columns                                                    |
| `row`  | for rows                                                       |
| `cel`  | for cells (but this can be based on the column name as well)   |
| `txt`  | for textboxes or text input fields                             |
|  `cb`  | for checkboxes (multiple choice)                               |
|  `rb`  | for radio buttons (single choice)                              |
| `img`  | for images                                                     |
| `lbl`  | for labels or texts that are meant for display purposes        |
|  `dd`  | for dropdown input fields                                      |
| `opt`  | for dropdown choices, list elements or options                 |
| `dlg`  | for dialog boxes or modal windows                              |
| `tgl`  | for toggle buttons or on/off switches                          |
|  `pb`  | for progress bar components                                    |
| `drw`  | for drawers/side menu                                          |

Let me know if I'm missing anything so that we can discuss what to name it.
