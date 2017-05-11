import { readFile } from 'modules/file-storage'
import mime from 'mime'

export const ONE_YEAR = 31557600

export default function () {

  return async function(req, res) {

    const { key } = req.params
    const { download } = req.query

    const result = await readFile(key, req.headers.range)

    const { stream, ext, start, end, size } = result

    if (ext === '.json') {

      let data = ''

      stream.on('data', chunk => data += chunk.toString())
      stream.on('end', () => {
        log(`json ${key}`)
        res.setHeader('Content-Type', 'application/json')

        const json = JSON.parse(data)
        res.json(json)
      })

    } else {

      const dot = ext.includes('.') ? '' : '.'
      const disposition = download ? 'attachment;' : 'inline;'
      const fn = download ? download : key + dot + ext
      const mimeType = mime.lookup(fn)

      res.setHeader('Content-Disposition', `${disposition}; filename=${fn}`)
      res.setHeader('Content-Type', mimeType)
      res.setHeader('Cache-Control', `public, max-age=${ONE_YEAR}`)

      if (isFinite(start) && isFinite(end) && isFinite(size)) {

        const chunk = (end - start) + 1

        res.status(206)

        res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
        res.setHeader('Accept-Ranges', 'bytes')
        res.setHeader('Content-Length', chunk)

        log(`serving ${fn} bytes ${start}-${end}`)

      } else

        log(`serving ${fn}`)


      stream.pipe(res)

    }
  }
}
