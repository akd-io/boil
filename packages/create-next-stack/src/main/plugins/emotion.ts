import { modifyJsonFile, toObject } from "../helpers/io"
import { createPlugin } from "../plugin"

export const emotionPlugin = createPlugin({
  id: "emotion",
  name: "Emotion",
  description: "Adds support for Emotion",
  active: ({ flags }) => flags.styling === "emotion",
  dependencies: [
    { name: "@emotion/react", version: "^11.0.0" },
    { name: "@emotion/styled", version: "^11.0.0" },
  ],
  technologies: [
    {
      id: "emotion",
      name: "Emotion",
      description:
        "Emotion is a React CSS-in-JS library designed for writing css styles inside JavaScript and TypeScript files. It provides powerful and predictable style composition in addition to a great developer experience. Developers can style their components using both string and object notation.",
      links: [
        { title: "Website", url: "https://emotion.sh/" },
        { title: "Docs", url: "https://emotion.sh/docs/introduction" },
        { title: "GitHub", url: "https://github.com/emotion-js/emotion" },
      ],
    },
  ],
  steps: {
    setUpEmotion: {
      id: "setUpEmotion",
      description: "setting up Emotion",
      run: async () => {
        /*
         *  Add TypeScript support for the css-prop as per the Emotion docs: https://emotion.sh/docs/typescript#css-prop
         */
        await modifyJsonFile("tsconfig.json", (tsConfig) => ({
          ...tsConfig,
          compilerOptions: {
            ...toObject(tsConfig["compilerOptions"]),
            jsxImportSource: "@emotion/react",
          },
        }))
      },
    },
  },
  slots: {
    nextConfigJs: {
      nextConfig: {
        compiler: {
          emotion: true,
        },
      },
    },
  },
} as const)
