import fs from 'fs'
import path from 'path'

interface Row {
  id: number
}

function getNewId<Type extends Row>(array: Type[]) {
  if (array.length > 0) {
    return array[array.length - 1].id + 1
  } else {
    return 1
  }
}
const newDate = () => new Date().toString()

function mustBeInArray<Type extends Row>(array: Type[], id: string): Promise<Type | undefined> {
  return new Promise((resolve, reject) => {
    const row = array.find(r => r.id == +id)
    if (!row) {
      reject({
        message: 'Record with this ID is not defined',
        status: 404,
      })
    }
    resolve(row)
  })
}

function writeJSONFile(filename: string, content: any) {
  fs.writeFileSync(path.join(__dirname + '/../mock/') + filename, JSON.stringify(content), 'utf8')
}

export {
  getNewId,
  newDate,
  mustBeInArray,
  writeJSONFile,
}
