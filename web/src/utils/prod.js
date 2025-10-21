// 判断当前环境
export const whatEnv = () => {
  const httpUrl = 'http://' + window.location.host

  return process.env.VUE_APP_ENV === 'development' ? process.env.VUE_APP_BASE_API : httpUrl
}
