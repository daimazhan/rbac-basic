// 导出数据
const download = (file, filename = '导出数据') => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => {
    let a = document.createElement('a')
    a.style.display = 'none'
    a.download = filename
    a.href = e.target.result
    const body = document.body
    body.appendChild(a)
    a.click()
    body.removeChild(a)
  }
}

export default download
