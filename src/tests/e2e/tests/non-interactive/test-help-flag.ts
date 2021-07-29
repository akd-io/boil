import execa from "execa"
import { minutesToMilliseconds } from "../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"
import { logTestInfo } from "../../test-logging"

export const testHelpFlag = async (createNextStackDir: string) => {
  const { pathToProdCLI, runDirectory } = await prepareE2eTest(
    createNextStackDir
  )

  const args = ["--help"]

  logTestInfo(`Running command: ${pathToProdCLI} ${args.join(" ")}`)

  await execa(pathToProdCLI, args, {
    timeout: minutesToMilliseconds(1),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })
}