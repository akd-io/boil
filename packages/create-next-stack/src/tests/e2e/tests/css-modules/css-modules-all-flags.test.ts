import { test } from "@jest/globals"
import { testArgsWithFinalChecks } from "../../helpers/test-args"
import { twentyMinutes } from "../../helpers/timeout"

test(
  "testCssModulesAllFlags",
  async () => {
    await testArgsWithFinalChecks([
      "--debug",
      "--package-manager=pnpm",
      "--prettier",
      "--styling=css-modules",
      "--react-hook-form",
      "--formik",
      "--framer-motion",
      "--formatting-pre-commit-hook",
      "--react-icons",
      "--react-query",
      "--plausible",
      "--vercel",
      "--netlify",
      ".",
    ])
  },
  twentyMinutes
)
