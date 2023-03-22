import { NextConfig } from "next"
import { ValidCNSInputs } from "./create-next-stack-types"
import { DeeplyReadonly } from "./helpers/deeply-readonly"

export const createPlugin = <TPluginConfig extends PluginConfig>(
  pluginConfig: TPluginConfig
): Plugin<TPluginConfig> => {
  const plugin = {
    ...pluginConfig,
  }
  const enhancements = {
    steps:
      pluginConfig.steps != null
        ? Object.entries(pluginConfig.steps).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: createStep(value, plugin as Plugin<TPluginConfig>),
            }),
            {} as Record<string, Step>
          )
        : undefined,
  }
  for (const [key, value] of Object.entries(enhancements)) {
    Object.defineProperty(plugin, key, {
      value,
      enumerable: true,
    })
  }
  return plugin as Plugin<TPluginConfig>
}

export const createStep = <TRawStep extends RawStep = RawStep>(
  step: TRawStep,
  plugin: Plugin
): Step<TRawStep> => {
  return {
    // defaults
    shouldRun: true,

    // step
    ...step,

    // enhancements
    plugin,
  }
}

export type Plugin<TPluginConfig extends PluginConfig = PluginConfig> =
  TPluginConfig & {
    steps?: {
      [key in keyof TPluginConfig["steps"]]: Step<RawStep> // TODO: Fix type. This should be Step<TPluginConfig["steps"][key]>, but that doesn't work.
    }
  }

export type Step<TStep extends RawStep = RawStep> = TStep & {
  shouldRun: NonNullable<RawStep["shouldRun"]>
  plugin: Plugin
}

type PluginConfig = DeeplyReadonly<{
  /** Name of the plugin */
  name: string
  /** Description of the plugin */
  description: string
  /** Whether the plugin is active or not. This determines if dependencies are installed, technologies and scripts added, steps run, and more. */
  active: boolean | ((inputs: ValidCNSInputs) => boolean)
  /** Dependencies that are added to the package.json file. */
  dependencies?: Record<string, Package>
  /** Dev dependencies that are added to the package.json file. */
  devDependencies?: Record<string, Package>
  /** Temporary dependencies uninstalled when Create Next Stack is done. */
  tmpDependencies?: Record<string, Package>
  /** Technology descriptions */
  technologies?: Technology[]
  /** Scripts that are added to the package.json file. */
  scripts?: Script[]
  /** A series of functions that are run by Create Next Stack. */
  steps?: Record<string, RawStep>
  /** Compiler options to set. */
  compilerOptions?: NextConfig["compiler"] // TODO: Strength type
}>

export type Package = {
  /** Name of the package. */
  name: string
  /** Version of the package */
  version: string
}

type Technology = {
  /** The name of the technology. */
  name: string
  /** Description of a technology. This is displayed in the generated README.md file, as well as in the landing page's list of technologies. */
  description: string
  /** Links relevant for getting to know and learning the technology. */
  links: Array<{
    /** Title of the link. */
    title: string
    /** Url of the link. */
    url: string
  }>
}

/**
 * A script that is added to the package.json file.
 *
 * For example:
 * ```js
 * {
 *   name: "dev",
 *   description: "Runs the Next.js development server.",
 *   command: "next dev"
 * }
 * ```
 */
type Script = {
  /** Name of the script, eg. `dev` */
  name: string
  /** Description of the script, eg. "" */
  description: string
  /** The command run by the npm script, eg. `next dev` */
  command: string
}

type RawStep = {
  /**
   * `description` should be written in present continuous tense, without punctuation, and with a lowercase first letter unless the description starts with a name or similar.
   *
   * Eg. "setting up Prettier" or "adding ESLint"
   */
  description: string

  // TODO: Consider memoizing shouldRun, as it is sometimes called multiple times. See the lint-staged setup step.
  /**
   * A boolean or function that determines whether the custom run function should run.
   *
   * Default is true
   */
  shouldRun?: boolean | ((inputs: ValidCNSInputs) => Promise<boolean> | boolean)

  /** Custom run function. */
  run: (inputs: ValidCNSInputs) => Promise<void>
}

export const evalActive = (
  active: PluginConfig["active"],
  inputs: ValidCNSInputs
): boolean => {
  if (typeof active === "function") return active(inputs)
  return active
}

export const evalShouldRun = async (
  shouldRun: Step["shouldRun"],
  inputs: ValidCNSInputs
): Promise<boolean> => {
  if (typeof shouldRun === "function") return await shouldRun(inputs)
  return shouldRun
}
