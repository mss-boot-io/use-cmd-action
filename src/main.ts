import * as core from '@actions/core'
import * as child from 'child_process'
import * as httpm from '@actions/http-client'

class cmdApp {
  app?: string
  source?: string
}

async function run(): Promise<void> {
  const app = core.getInput("app")
  const url = core.getInput("url")
  try {
    const http = new httpm.HttpClient('http-client')
    const {
      result,
      statusCode
    } = await http.getJson<cmdApp[]>(url)
    if (statusCode != 200 || result == null) {
      core.error('source get error')
    }
    let source = ''
    for (const e of result||[]) {
      if (app == e.app) {
        source= e.source || ''
      }
    }
    if (source === '') {
      core.error('source get error')
    }

    child.exec(`curl -o ${app} ${source}`, (err, std) => {
      if (err) {
        core.error(err)
        return
      }
      core.debug(std)
    })
    child.exec(`./${app}`, (err, std) => {
      if (err) {
        core.error(err)
        return
      }
      core.debug(std)
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
