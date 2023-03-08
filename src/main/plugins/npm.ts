import { constrain } from "../helpers/constrain"
import { Plugin } from "../plugin"

export const npmPlugin = constrain<Plugin>()({
  name: "npm",
  description: "Adds relevant npm documentation",
  technologies: [
    {
      name: "npm",
      description:
        "npm is the default package manager for Node.js. It consists of a command-line client, also called npm, and an online database of packages, called the npm registry, that enable developers to share and reuse code.",
      links: [
        { title: "Website", url: "https://www.npmjs.com/" },
        { title: "CLI Docs", url: "https://docs.npmjs.com/cli/" },
      ],
    },
  ],
} as const)