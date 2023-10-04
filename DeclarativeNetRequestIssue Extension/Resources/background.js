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
