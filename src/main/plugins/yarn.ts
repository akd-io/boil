import { constrain } from "../helpers/constrain"
import { Plugin } from "../plugin"

export const yarnPlugin = constrain<Plugin>()({
  name: "Yarn",
  description: "Adds support for Yarn",
  dependencies: { yarn: { name: "yarn", version: "^1.0.0" } },
  technologies: [
    {
      name: "Yarn",
      description:
        "Yarn is a JavaScript package manager compatible with the npm registry that helps developers automate the process around npm packages such as installing, updating, removing, and more.",
      links: [
        { title: "Website", url: "https://yarnpkg.com/" },
        { title: "CLI Docs", url: "https://yarnpkg.com/cli" },
        { title: "GitHub", url: "https://github.com/yarnpkg/berry" },
      ],
    },
  ],
} as const)
