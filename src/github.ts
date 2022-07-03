import { script_props } from './constants'
import { decodeBase64Text } from './utils'

const { GITHUB_TOKEN, GITHUB_NAME } = script_props

export const getRepoNames = (): string[] => {
  const url = `https://api.github.com/users/${GITHUB_NAME}/repos`
  const options = {
    method: 'get',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  }
  const response = JSON.parse(UrlFetchApp.fetch(url, options).getContentText())
  return response.map((repo) => repo.name)
}

export const getRepoContents = (repo: string, path: string): string => {
  const url = `https://api.github.com/repos/${GITHUB_NAME}/${repo}/contents/${path}`
  const options = {
    method: 'get',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  }

  const response = UrlFetchApp.fetch(url, options)
  const content = JSON.parse(response.getContentText()).content
  return decodeBase64Text(content)
}
