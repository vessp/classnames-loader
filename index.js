function loader(content, map, meta) {
  const exportsStart = content.indexOf('exports.locals')
  if (exportsStart == -1)
    return content

  const preContent = content.substring(0, exportsStart)
  const exportContent = content.substring(exportsStart)
  const openBrace = exportContent.indexOf('{')
  const closeSemi = exportContent.indexOf(';') // should be at the end of the json object
  if (openBrace == -1 || closeSemi == -1)
    throw new Error('classnames-loader:: unexpectedly unable to find exported locals object')

  const locals = JSON.parse(exportContent.substring(openBrace, closeSemi))

  const localer = function(...args) {
    const self = this

    let classString = ''
    for (const chunk of args) {
      processChunk(chunk)
    }
    return classString

    function processChunk(chunk) {
      if (typeof(chunk) === 'function') {
        pushClass(chunk())
      } else if (Array.isArray(chunk)) {
        chunk.forEach(o => processChunk(o))
      } else if (typeof(chunk) === 'object' && chunk != null) {
        Object.keys(chunk)
          .filter(key => {
            let flag = chunk[key]
            if (typeof(flag) === 'function')
              flag = flag()
            return Boolean(flag)
          })
          .forEach(key => processChunk(key))
      }
      else {
        pushClass(chunk)
      }
    }
    function pushClass(s) {
      if (s) { // block falsy
        if (s in self)
          s = self[s]
        if (classString.length > 0)
          classString += ' '
        classString += s
      }
    }
  }

  let output = preContent
  output += 'const locals = ' + JSON.stringify(locals) + ';\n'
  output += 'const localer = ' + localer.toString() + ';\n'
  output += 'for (const k in locals) { localer[k] = locals[k]; }\n'
  output += 'exports.locals = localer;'
  return output
}

module.exports = loader