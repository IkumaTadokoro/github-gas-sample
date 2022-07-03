import { format } from 'date-fns'
import { getRepoContents, getRepoNames } from './github'
import { createCsv, PackageJson } from 'comparing-dependencies'
import { createSpreadSheet } from './utils'
import { script_props } from './constants'

const main = (): void => {
  const { GITHUB_NAME } = script_props
  const packageJsons: PackageJson[] = []
  getRepoNames().forEach((repo) => {
    try {
      const packageJson = getRepoContents(repo, 'package.json')
      packageJsons.push(JSON.parse(packageJson) as PackageJson)
    } catch {
      return
    }
  })
  const csv = createCsv(packageJsons)
    .replace(/"/g, '')
    .split('\n')
    .map((row) => row.split(','))
  const sheetName = `${format(
    new Date(),
    'yyyy-MM-dd'
  )}の${GITHUB_NAME}のpackage.json`
  const sheetUrl = createSpreadSheet(sheetName, csv)
  console.log('スプレッドシートを作成しました: ', sheetUrl)
}

declare let global: any
global.main = main
