import {
  CreateNextStackArgs,
  ValidCreateNextStackArgs,
} from "../create-next-stack-types"
import { promptProjectPath } from "./questions/project-name"
import { validateProjectPathInput } from "./questions/validate-project-path"

export const performArgsQuestionnaire = async (
  args: CreateNextStackArgs
): Promise<ValidCreateNextStackArgs> => {
  let projectPath: string | null = null

  const appNameArg = args["appName"]
  if (typeof appNameArg === "string") {
    const validationResult = validateProjectPathInput(appNameArg)
    if (validationResult === true) {
      projectPath = appNameArg
    } else {
      throw new Error("Invalid project name: " + validationResult)
    }
  } else {
    projectPath = await promptProjectPath()
  }

  return {
    appName: projectPath,
  }
}