import inquirer, { Separator } from "inquirer"
import { arrayToKeyToKeyMap } from "../../helpers/array-to-key-to-key-map"

const techValueArray = <const>[
  "yarn",
  "npm",
  "prettier",
  "emotion",
  "styledComponents",
  "cssModules",
  "cssModulesWithSass",
  "reactHookForm",
  "formik",
  "framerMotion",
  "preCommitHook",
]
export type TechValue = typeof techValueArray[number]
export const techValues = arrayToKeyToKeyMap(techValueArray)

const techChoices: {
  [K in TechValue]: {
    name: string
    value: K
    checked?: boolean
  }
} = {
  yarn: {
    value: "yarn",
    name: "Yarn",
    checked: true,
  },
  npm: {
    value: "npm",
    name: "npm",
  },
  prettier: {
    value: "prettier",
    name: "Prettier",
    checked: true,
  },
  emotion: {
    value: "emotion",
    name: "Emotion",
    checked: true,
  },
  styledComponents: {
    value: "styledComponents",
    name: "styled-components",
  },
  cssModules: {
    value: "cssModules",
    name: "CSS Modules",
  },
  cssModulesWithSass: {
    value: "cssModulesWithSass",
    name: "CSS Modules with Sass",
  },
  reactHookForm: {
    value: "reactHookForm",
    name: "React Hook Form",
    checked: true,
  },
  formik: {
    value: "formik",
    name: "Formik",
  },
  framerMotion: {
    value: "framerMotion",
    name: "Framer Motion",
  },
  preCommitHook: {
    value: "preCommitHook",
    name: "Formatting pre-commit hook (Husky & lint-staged)",
    checked: true,
  },
}

const answerName = "technologies"
type TechnologiesAnswers = {
  [answerName]: TechValue[]
}

export const promptTechnologies = async () => {
  const { technologies } = await inquirer.prompt<TechnologiesAnswers>({
    name: answerName,
    type: "checkbox",
    message: "What technologies are you looking to use?",
    pageSize: 10,
    choices: [
      new Separator("Package manager:"),
      techChoices.yarn,
      techChoices.npm,

      new Separator("Formatting:"),
      techChoices.prettier,

      new Separator("Styling:"),
      techChoices.emotion,
      techChoices.styledComponents,
      techChoices.cssModules,
      techChoices.cssModulesWithSass,

      new Separator("Form state management:"),
      techChoices.reactHookForm,
      techChoices.formik,

      new Separator("Animation:"),
      techChoices.framerMotion,

      new Separator("Miscellaneous:"),
      techChoices.preCommitHook,
    ],
    validate: (technologies) => {
      const onlyOnePackageManagerSelected = oneOf(
        technologies.includes(techValues.yarn),
        technologies.includes(techValues.npm)
      )
      if (!onlyOnePackageManagerSelected) {
        return `You have to pick exactly one package manager.`
      }

      if (
        technologies.includes(techValues.preCommitHook) &&
        !technologies.includes(techValues.prettier)
      ) {
        return `${techChoices.preCommitHook.name} requires ${techChoices.prettier.name}`
      }

      const onlyOneStylingSelected = oneOf(
        technologies.includes(techValues.emotion),
        technologies.includes(techValues.styledComponents),
        technologies.includes(techValues.cssModules),
        technologies.includes(techValues.cssModulesWithSass)
      )
      if (!onlyOneStylingSelected) {
        return `You have to pick exactly one styling solution.`
      }

      return true
    },
  })

  return technologies
}

const oneOf = (...booleans: boolean[]) => {
  const count = booleans.reduce((previous, current) => {
    return current ? previous + 1 : previous
  }, 0)
  return count === 1
}