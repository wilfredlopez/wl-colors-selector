/*************** Patch for react-scripts TS Error ***************************
  node_modules/react-scripts/scripts/utils/verifyTypeScriptSetup.js:239
  appTsConfig.compilerOptions[option] = value;

  TypeError: Cannot assign to read only property 'jsx' of object '#<Object>'
*****************************************************************************/
const path = require('path')
const fs = require('fs')

const rootFilePath = path.join(
  __dirname,
  'node_modules',
  'react-scripts',
  'scripts',
  'utils'
)

const filePath = path.join(rootFilePath, 'verifyTypeScriptSetup.js')

const textToReplace = 'ts.JsxEmit.ReactJsx'
const replaceWith = 'ts.JsxEmit.ReactJSX' // they have an typo error

//Read File
const original = fs.readFileSync(filePath, { encoding: 'utf-8' })

//Update and Repalce
const updated = original.replace(textToReplace, replaceWith)
fs.writeFileSync(filePath, updated, { encoding: 'utf-8' })
