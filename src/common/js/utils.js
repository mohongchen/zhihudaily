export const imgProxy = (imgUrl) => {
  return imgUrl && imgUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
}

export const goTop = (btnId) => {
  let btn = document.getElementById(btnId)
  let d = document.documentElement
  let b = document.body

  window.addEventListener('scroll', btnDisplay)

  function btnDisplay () {
    btn.style.display = (d.scrollTop + b.scrollTop > 200) ? 'block' : 'none'
  }

  btn.onclick = function () {
    btn.style.display = 'none'

    this.timer = setInterval(() => {
      d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.2)
      b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.2)
      if ((d.scrollTop + b.scrollTop) === 0) {
        clearInterval(btn.timer)
      }
    }, 10)
  }
}

export const prevDate = (str) => {
  const dt = new Date(str)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  return `${y}-${m}-${d}`
}
