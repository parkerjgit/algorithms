import { runTests } from "../utils/testing"
import * as problems from "./index.js"

Object.keys(problems).forEach(file => {
  runTests(file, problems[file])
})

