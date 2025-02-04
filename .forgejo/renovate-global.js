module.exports = {
  "platform": "gitea",
  "endpoint": "https://git.zyria.de/api/v1/",
  "gitAuthor": "Renovate Bot <renovate@zyria.de>",
  "username": "pyrox",
  "autodiscover": false,
  "onboardingConfig": {
    "$schema": "https://docs.renovatebot.com/renovate-schema.json",
    "extends": [
      "local>pyrox/renovate-config:default.json5"
    ]
  },
  "optimizeForDisabled": true,
  "persistRepoData": true
}
