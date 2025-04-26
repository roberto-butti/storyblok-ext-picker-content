# 3rd Party Content Picker

This repository contains a custom field plugin for Storyblok, built using the Picker Starter template.
It allows users to select external data — specifically fetching and picking content from a different Storyblok space — directly within the Storyblok visual editor.

This plugin is ideal for cases where you need to reference content maintained in another project or space, while keeping a seamless editing experience for your content editors.

## ✨ Features

- Fetch external stories from a different Storyblok space
- Filter stories dynamically using starts_with and other parameters
- Pick and link external content easily within the editor
- Built on top of the official Storyblok Picker Starter
- Lightweight and easy to customize for different APIs or spaces

## ⚙️ How it works

The plugin uses Storyblok’s Field-Type Plugin API combined with the Content Delivery API to fetch stories from another space.
It allows content editors to browse, search, and select external items, storing the selection as a reference inside the field.

Internally, it:

- Sends a fetch request to the external Storyblok space using the Content Delivery API access token.
- Filters the available stories based on a starts_with parameter or custom queries.
- Displays the results in a simple picker UI.
- Saves the selected story’s identifier or custom data into the field value.

## 🛠️ Usage

- Add the plugin to your content type schema as a custom field.
- Configure the plugin options if needed (e.g., API token, space ID, starts_with path).
- Editors can now pick external stories directly from the field.
- The field will store the selected story’s ID or custom payload, ready for use in rendering or API queries.

## ⚙️ Configuration options



| Option        | Type     | Description                                                  | Example                    |
| ------------- | -------- | ------------------------------------------------------------ | -------------------------- |
| `accessToken` | `string` | **Required.** The API access token for the external Storyblok space you want to fetch stories from. | `"your-public-token"`      |
| `version`     | `string` | **Optional.** Defines whether to fetch `draft` or `published` content. Defaults to `"draft"`. | `"draft"` or `"published"` |
| `startsWith`  | `string` | **Optional.** Filters the fetched stories to only those whose full slug starts with the given prefix. Defaults to `"default"` | `"blog/"` or `"products/"` |

### Notes:

- If `startsWith` is omitted, all stories in the space will be fetched (use with caution in large spaces).
- Make sure the `accessToken` has access to the correct content version (`draft` or `published`) you want to fetch.

## 📚 References

- [Storyblok Field Plugin Documentation](https://www.storyblok.com/docs/plugins/field-plugins/)
   Official guide on how to build, configure, and use custom field-type plugins in Storyblok.
- [Picker Starter Boilerplate](https://github.com/storyblok/field-type-examples/tree/main/picker-starter)
   This plugin is built on top of Storyblok’s **Picker Starter** example, providing a solid foundation for custom picker implementations.
