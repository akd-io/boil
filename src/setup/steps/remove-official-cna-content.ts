import Command from "@oclif/command"
import fs from "fs/promises"

/**
 * Removes the content generated by the official Create Next App CLI tool.
 */
export async function removeOfficialCNAContent(
  this: Command,
  projectName: string
): Promise<void> {
  this.log("Cleaning up official Next.js boilerplate...")

  const remove = (path: string) => {
    return fs.rm(path, {
      recursive: true,
      force: true,
    })
  }

  try {
    await Promise.all([
      remove(`${projectName}/pages`),
      remove(`${projectName}/styles`),
      remove(`${projectName}/public/vercel.svg`),
      // TODO: Remove README.md when/if another one is generated.
    ])
  } catch (error) {
    // TODO: Add DEBUG logging
    this.error(
      "An error occurred while removing the content generated by the official Create Next App CLI tool.",
      {
        exit: 1,
      }
    )
  }
}