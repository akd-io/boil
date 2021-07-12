import Command from "@oclif/command"
import { throwError } from "../../error-handling"
import { validateProjectPath } from "../../helpers/validate-project-name"

/**
 *
 * @param this Current Command instance
 * @param projectPath The project path the user input
 * @returns `true` if valid. If invalid, an error message of type `string` explaining the invalidity.
 */
export function validateProjectPathInput(
  this: Command,
  projectPath: unknown
): string | true {
  try {
    if (typeof projectPath !== "string") {
      throw new TypeError("Expected projectPath to be a string.")
    }

    const validation = validateProjectPath(projectPath.trim())

    if (!validation.valid) {
      const firstProblem = validation.problems[0]
      if (typeof firstProblem !== "undefined") {
        return firstProblem
      }
      throw new TypeError(
        "Expected validation.problems to be a non-empty array."
      )
    }
  } catch (error) {
    throwError.call(
      this,
      "An error occurred while validating project name.",
      error
    )
  }

  return true
}
