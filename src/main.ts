import * as child from 'child_process'
import * as core from '@actions/core'
import * as httpm from '@actions/http-client'
import {existsSync} from 'fs'

class cmdApp {
  app?: string
  source?: string
}

export async function run(): Promise<void> {
  const app = core.getInput('app')
  const url = core.getInput('url')
  const args = core.getInput('args')
  try {
    const http = new httpm.HttpClient('http-client')
    const {result, statusCode} = await http.getJson<cmdApp[]>(url)
    if (statusCode !== 200 || result === null) {
      core.setFailed('source get error')
    }
    let source = ''
    for (const e of result || []) {
      if (app === e.app) {
        source = e.source || ''
      }
    }
    if (source === '') {
      core.setFailed('source get error')
    }

    existsSync(`./${app}`) ||
      child.execSync(`curl -o ${app} ${source} && chmod +x ${app}`)

    child.exec(`./${app} ${args}`, (err, std) => {
      if (err) {
        core.setFailed(err)
        return
      }
      core.debug(std)
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
