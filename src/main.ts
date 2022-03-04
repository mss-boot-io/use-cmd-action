import * as core from '@actions/core'
import * as process from 'child_process'
// import * as httpm from '@actions/http-client'

async function run(): Promise<void> {
  try {
    // const http = new httpm.HttpClient('http-client')
    // http.get()
    process.exec('ls', (err, std) => {
      if (err) {
        core.error(err)
        return
      }
      core.debug(std)
    })
    core.debug(`ok`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
