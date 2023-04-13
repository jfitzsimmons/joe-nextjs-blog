let lineDash = 0
let lineSpace = 0
const rndmRng = (h, l) => Math.random() * (h - l) + l
const gradientArray = [
  '360, 0%',
  '204, 100%',
  '260, 31%',
  '340, 89%',
  '179, 79%',
]

function shuffle(array) {
  let currentIndex = array.length
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    // testjpf ???
    // eslint-disable-next-line no-param-reassign
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

function coinflip(a, b) {
  return Math.floor(Math.random() * 2) === 0 ? a : b
}

function pickGradient(i) {
  const gradients = shuffle(gradientArray)

  return `hsla(${gradients[i]},${Math.round(rndmRng(99, 60))}%, ${rndmRng(
    0.6,
    0.2,
  )})`
}

const cosmos = (ctx, w, h) => {
  ctx.clearRect(0, 0, w, h)

  function drawSpeck(x, y) {
    ctx.moveTo(x, y)
    ctx.lineTo(x + rndmRng(5, 1), y + rndmRng(5, 1))
    ctx.stroke()
    ctx.beginPath()
  }

  function setDashedLines() {
    ctx.lineWidth = rndmRng(5, 1)
    lineDash = rndmRng(5, 1)
    lineSpace = rndmRng(6, 3)
    ctx.setLineDash([lineDash, lineSpace])
  }

  function backgroundGradients(layers) {
    for (let i = layers; i--; ) {
      const outR = rndmRng(w * 0.4, w * 0.1)
      const outX = rndmRng(w + w * 0.1, 0 - w * 0.1)
      const outY = rndmRng(h + h * 0.1, 0 - h * 0.1)
      const inR = rndmRng(outR * 0.3, outR * 0.01)

      const grd = ctx.createRadialGradient(outX, outY, inR, outX, outY, outR)
      grd.addColorStop(
        0,
        `rgba(${rndmRng(255, 229)}, ${rndmRng(215, 185)}, ${rndmRng(
          218,
          192,
        )}, ${rndmRng(0.5, 0.1)})`,
      )
      grd.addColorStop(
        1,
        `rgba(${rndmRng(255, 229)}, ${rndmRng(215, 185)}, ${rndmRng(
          218,
          192,
        )}, 0)`,
      )

      ctx.fillStyle = grd
      ctx.fillRect(outX - outR, outY - outR, outR * 2, outR * 2)
    }
  }

  function randomSpots() {
    const spots = Math.round((h * w) / 10000)
    for (let s = spots; s--; ) {
      const x = rndmRng(w, 0)
      const y = rndmRng(h, 0)

      ctx.beginPath()
      ctx.strokeStyle = pickGradient(0)
      ctx.lineWidth = rndmRng(5, 1)

      drawSpeck(x, y)
    }
  }

  function bursts(amt) {
    for (let b = 0; b < amt; b++) {
      const gradients = shuffle(gradientArray)
      const x = rndmRng(w, 0)
      const y = rndmRng(h, 0)
      const size = Math.round(rndmRng(h * 0.3, h * 0.1))
      let g = 0

      for (let i = 0; i < size; i++) {
        if (i < size / 40) {
          g = 0
        } else if (i < size / 13) {
          g = 1
        } else if (i < size / 6) {
          g = 2
        } else {
          g = 3
        }
        ctx.beginPath()
        ctx.strokeStyle = `hsla(${gradients[g]},${Math.round(
          rndmRng(99, 60),
        )}%, ${rndmRng(1, 0.5)})`
        ctx.lineWidth = rndmRng(5, 1)
        const modX = rndmRng(2.5, 1.5)
        const modY = rndmRng(2.5, 1.5)
        const dotX = rndmRng(x + size / modX, x - size / modX)
        const dotY = rndmRng(y + size / modY, y - size / modY)
        ctx.moveTo(dotX, dotY)
        ctx.lineTo(dotX + rndmRng(-1, -5), dotY + rndmRng(-1, -5))
        ctx.stroke()
      }
    }
  }

  function splatterPoints(ox, oy, layers) {
    for (let m = 1; m <= layers; m++) {
      ctx.strokeStyle = `hsla(204, 100%, ${
        48 + Math.round(rndmRng(51, 0))
      }%, ${rndmRng(1, 0.5)})`
      ctx.lineWidth = rndmRng(5, 1)
      let x = ox + rndmRng(10 * m, 5 * m)
      let y = oy + rndmRng(-5 * m, -10 * m)
      drawSpeck(x, y)

      ctx.strokeStyle = `hsla(260, 31%, ${
        70 + Math.round(rndmRng(29, 0))
      }%, ${rndmRng(1, 0.5)})`
      ctx.lineWidth = rndmRng(5, 1)
      x = ox + rndmRng(-5 * m, -10 * m)
      y = oy + rndmRng(-5 * m, -10 * m)
      drawSpeck(x, y)

      ctx.strokeStyle = `hsla(340, 89%, ${
        74 + Math.round(rndmRng(25, 0))
      }%, ${rndmRng(1, 0.5)})`
      ctx.lineWidth = rndmRng(5, 1)
      x = ox + rndmRng(-5 * m, -10 * m)
      y = oy + rndmRng(10 * m, 5 * m)
      drawSpeck(x, y)

      ctx.strokeStyle = `hsla(179, 79%, ${
        74 + Math.round(rndmRng(25, 0))
      }%, ${rndmRng(1, 0.5)})`
      ctx.lineWidth = rndmRng(5, 1)
      x = ox + rndmRng(10 * m, 5 * m)
      y = oy + rndmRng(10 * m, 5 * m)
      drawSpeck(x, y)
    }
  }

  function curvedLine() {
    let counter = 0
    let x = 0
    const startX = rndmRng(-500, 0)
    const height = rndmRng(350, 40)
    const startY = rndmRng(500, -200)
    let y = startY
    let splatter = Math.round(rndmRng(8, 1))

    for (let i = startX; i <= w + 100; i += lineDash + lineSpace) {
      ctx.strokeStyle = `rgba(254, 254, 254, ${rndmRng(1, 0.1)})`
      setDashedLines()
      ctx.moveTo(x, y)
      const increase = ((90 / 180) * Math.PI) / rndmRng(30, 15)
      x = i + lineDash + lineSpace
      y = startY + i / 2 - Math.sin(counter) * height
      counter += increase
      ctx.lineTo(x, y)
      ctx.stroke()
      splatter = Math.round(rndmRng(16, 1))
      splatterPoints(x, y, splatter)
    }
  }

  function circleShading(x, y, size) {
    const gradients = shuffle(gradientArray)
    const startAngle = Math.floor(rndmRng(2 * Math.PI, 0))
    let endAngle = startAngle + 1
    let increment = rndmRng(6, 3.3)
    const layers = Math.round(size / 28)

    for (let i = 0; i < layers; i++) {
      ctx.strokeStyle = `hsla(${gradients[0]},${Math.round(
        rndmRng(99, 60),
      )}%, ${rndmRng(1 - i * 0.05, 0.9 - i * 0.05)})`
      ctx.beginPath()
      endAngle =
        startAngle - i / 30 + increment > 2 * Math.PI
          ? startAngle - i / 30 + increment - 2 * Math.PI
          : startAngle - i / 30 + increment
      ctx.arc(
        x,
        y,
        size - (i / 2) * 10,
        startAngle + i / rndmRng(30, 20),
        endAngle,
      )
      ctx.stroke()
      increment -=
        rndmRng(increment * 0.03, increment * 0.001) + (layers / 10) * 0.01
    }
  }

  function createArc(x, y, size) {
    let start = 0
    let end = rndmRng(2 * Math.PI, start + 0.2)

    while (start < 2 * Math.PI) {
      ctx.strokeStyle = pickGradient(0)
      setDashedLines()
      ctx.beginPath()
      ctx.arc(x, y, size, start, end)
      ctx.stroke()
      start = end
      end = rndmRng(2 * Math.PI, start + 0.2)
    }
  }

  function createHalfArc(x, y, size) {
    const direction = coinflip(true, false)
    ctx.strokeStyle = pickGradient(0)
    setDashedLines()
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI, direction)
    ctx.stroke()
  }

  function circles(n) {
    for (let i = n; i--; ) {
      const x = rndmRng(w, 0)
      const y = rndmRng(h, 0)
      let size = Math.round(rndmRng(h * 0.3, h * 0.09))
      const rings = Math.round(rndmRng(5, 2))
      for (let c = 1; c <= rings; c++) {
        createArc(x, y, size)
        if (Math.random() > 0.5) circleShading(x, y, size)
        size *= rndmRng(1.6, 1.2)
      }
    }
  }

  function mainCircle() {
    let x = 0
    const y = rndmRng(h * 0.66, h * 0.33)

    while (x < w) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.strokeStyle = pickGradient(0)
      setDashedLines()
      x += rndmRng(w * 0.3, w * 0.05)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    x = w / 2
    ctx.beginPath()
    ctx.moveTo(x, y)
    let size = Math.round(rndmRng(h * 0.3, h * 0.09))

    while (size < h) {
      // testjpf fix:::
      // eslint-disable-next-line no-unused-expressions
      coinflip(true, false) ? createHalfArc(x, y, size) : createArc(x, y, size)
      if (Math.random() > 0.5) circleShading(x, y, size)
      size *= rndmRng(1.8, 1.4)
    }
  }

  function points() {
    for (let s = 2; s--; ) {
      const x = rndmRng(w, 0)
      const y = rndmRng(h, 0)
      let size = Math.round(rndmRng(h * 0.3, h * 0.09))
      const edge = w > h ? w : h
      const rings = Math.round(rndmRng(3, 1))
      const lines = Math.round(rndmRng(25, 10))

      for (let i = 0; i < lines; i++) {
        ctx.strokeStyle = pickGradient(0)
        setDashedLines()
        const x1 = x + size * Math.cos((2 * Math.PI * i) / lines)
        const y1 = y + size * Math.sin((2 * Math.PI * i) / lines)
        const x2 = x + edge * Math.cos((2 * Math.PI * i) / lines)
        const y2 = y + edge * Math.sin((2 * Math.PI * i) / lines)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }

      for (let c = 1; c <= rings; c++) {
        size *= rndmRng(2.2, 1.8)
        createArc(x, y, size)
        if (Math.random() > 0.5) circleShading(x, y, size)
      }
    }
  }

  const bgSpots = Math.round(rndmRng(6, 2))
  backgroundGradients(bgSpots)

  randomSpots()

  const burstAmount = Math.round(((h / 2) * (w / 2)) / 90000)
  bursts(burstAmount)

  curvedLine()

  const circleAmount =
    burstAmount <= 1 ? 1 : Math.round(rndmRng(burstAmount - 1, 1))
  circles(circleAmount)

  points()

  mainCircle()
}

export default cosmos
