import execa from "execa"
import { throwError } from "../../error-handling"
import { techValues } from "../../questionnaire/questions/technologies"
import { Step } from "../step"

export const installFormikStep: Step = {
  shouldRun: (answers) => answers.technologies.includes(techValues.formik),

  run: async function (this) {
    this.log("Installing Formik...")

    try {
      await execa("yarn add formik")
    } catch (error) {
      throwError.call(this, "An error occurred while installing Formik.", error)
    }
  },
}