export const decodeBase64Text = (text: string): string => {
  const decoded = Utilities.base64Decode(text, Utilities.Charset.UTF_8)
  return Utilities.newBlob(decoded).getDataAsString()
}

export const createSpreadSheet = (
  sheetName: string,
  csv: string[][]
): string => {
  const spreadSheet = SpreadsheetApp.create(sheetName)
  const sheet = spreadSheet.getActiveSheet()
  const header = csv.slice(0, 1)
  const body = csv.slice(1)
  sheet
    .getRange(1, 1, header.length, header[0].length)
    .setHorizontalAlignment('center')
    .setValues(header)
  sheet
    .getRange(2, 1, body.length, body[0].length)
    .setHorizontalAlignment('right')
    .setValues(body)
  sheet.setFrozenRows(1)
  sheet.setFrozenColumns(1)
  sheet.autoResizeColumn(1)
  return spreadSheet.getUrl()
}
