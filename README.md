# DeclarativeNetRequestIssue

This is a sample Safari extension that redirects `https://www.example.com/hello` to `https://en.wikipedia.org/wiki/Apple_Inc.` using `getDynamicRules()` of the `declarativeNetRequest` API to demonstrate an issue I encountered.

## Details of the issue

`background.js` of the extension includes this code:

```js
// background.js
async function updateRules() {
  const oldRules = await browser.declarativeNetRequest.getDynamicRules();
  browser.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRules.map(rule => rule.id),
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            url: "https://en.wikipedia.org/wiki/Apple_Inc.",
          },
        },
        condition: {
          regexFilter: "https://www.example.com/hello",
          resourceTypes: ["main_frame"],
        },
      },
    ],
  });
}
updateRules();
```

And the redirection itself works as expected, but the following warning appears at the top of the webpage whenever it's triggered (AFAIK), which is annoying:

> This webpage was reloaded because a problem occurred.

Here's a video of what it actually look like:

https://github.com/mshibanami/DeclarativeNetRequestIssue/assets/1333214/140bf8c5-c9af-46d7-a85a-5a09c9a6c2c7
