export default async (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      }
      else {
        reject(new Error('Unexpected type: FileReader.result'))
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsDataURL(blob)
  })
}
