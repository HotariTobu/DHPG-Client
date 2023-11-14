const animations = [
  'image/apng',
  'image/avif',
  'image/gif',
  'image/webp',
]

const rasters = [
  'image/jpeg',
  'image/png',
]

const vectors = [
  'image/svg+xml',
]

enum ImageType {
  Animation = 1,
  Raster,
  Vector,
  NotAnimation = Raster | Vector,
  All = Animation | NotAnimation,
}

export default (blob: Blob, type: ImageType = ImageType.All) => {
  if ((type & ImageType.Animation) !== 0 && animations.includes(blob.type)) {
    return true
  }

  if ((type & ImageType.Raster) !== 0 && rasters.includes(blob.type)) {
    return true
  }

  if ((type & ImageType.Vector) !== 0 && vectors.includes(blob.type)) {
    return true
  }

  return false
}
