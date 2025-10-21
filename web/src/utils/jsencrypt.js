import { JSEncrypt } from 'jsencrypt'

// http://web.chacuo.net/netrsakeypair

// public key
const PUBLIC_KEY = `
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsQdoq1fov6cuk9KC1fjC
  8h+zztDk8p6hGi5Id9w/Nli4M6v8ynU9bTtFWWfLCUfAbPm6PkCoQ2XTFCbnM/Fc
  PVyaWqrdDLrNqzawauBXq3TYVlT7683CN8g5bTjG3Ljehpv926oCXLScTBQSQ5Gd
  MVoINSnuBADh1oAEznSXvP0GlMEUfSgxKRZAS/mHZuedZdn9wFxra3ISCZ4hNuSI
  dHYVdHMOI5uPfJeJK1aoyXWKpPJT6oWIk1a4SPN0YAXQ/OherNvfd2VNsr0ln+80
  c7f+JxZaz9G021/EbTczXxRI+IlF2r+XEVYXlgwWuuGBE910XaVaoOc+EIGQwHbO
  /wIDAQAB
`
// private key
const PRIVATE_KEY = `
  MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxB2irV+i/py6T
  0oLV+MLyH7PO0OTynqEaLkh33D82WLgzq/zKdT1tO0VZZ8sJR8Bs+bo+QKhDZdMU
  Jucz8Vw9XJpaqt0Mus2rNrBq4FerdNhWVPvrzcI3yDltOMbcuN6Gm/3bqgJctJxM
  FBJDkZ0xWgg1Ke4EAOHWgATOdJe8/QaUwRR9KDEpFkBL+Ydm551l2f3AXGtrchIJ
  niE25Ih0dhV0cw4jm498l4krVqjJdYqk8lPqhYiTVrhI83RgBdD86F6s2993ZU2y
  vSWf7zRzt/4nFlrP0bTbX8RtNzNfFEj4iUXav5cRVheWDBa64YET3XRdpVqg5z4Q
  gZDAds7/AgMBAAECggEAO+6BLfjN8Aw+RYcwChZ0kRnQesTXrZesfLuMhx+GOvTg
  L4YbR8NXL2KwgKsV3qdu6rXEqoyjKmYPhrQA8+HTU2bFTsqnmUaomD0kjpoys/YT
  w25z9wmqpc3gOyzMji78DuBCmho9QHtYqpzk7gEfEXUkcDMoxCw0SLUAa5CnSjBi
  0itFE/m4indDMBfh9fiSo2DIbaZblxlpyP6YsJqvElPNqZt7R7OVq1X9Oe38BymQ
  uAyZdyMhMEYrLa9RSVoYdS6+hA6vcwjsM4bh4hrkBlN0I6j9y5osxseTC5qOgp+j
  1y8sFXIQVuoP2RxnNdDijfejmmcrTu9UCpgeQ2cimQKBgQDbuKYcfekergul64Oc
  IavzEULypOgbI9zY34DkXaoUgB05ZKA+A+XjodrTqefSrmNp3fy60DZeBm68vHUx
  uGHWFh5+k1C6dQYuWdaiDYlQwxnCrldNso2cEDF/fV8QVzvvemoMsqe5EhRzT5pY
  SgHbOiG53srU1CYoxjPZknXgswKBgQDOQjTkdbxBtGaIVp4eJ+5i66ftF1ZwLX6q
  0s+ldsGays+K5ZGQtRMI7FZD/ivDx//049YF+ykY/vsqYmhHvz5UeFSI05KyQK+B
  yWjJvID61U3oruHnNEYQxmxEOyLed9KNUCoxbizSvGkVEkzFgugoqWuWqDiTFzn+
  P8pUqOemhQKBgQCytWSmF+LcCUOAGCZbfyeT8544LNh7+pdN7buwAl6rfehHHgkX
  Z6Q7mRGaxr6/JQfGu78rUt5la2X2LHJFlmo87pCu8rLedQAqAvgHpmrhPU5egd6Q
  W4HCRYl84EPJzqn5Bd/rpAO3C3WGtGAdH1STMpzryMHAiSzgTRUvCWjG8QKBgAyE
  NgN7JY5zLRmu7+9yiuPT2x/nH6a1DA+/tTwcRcln70pFfhzi8CHFfcKohO1fkKfC
  v7UjNa4/ouxChoN8FoM3viGDfU514HCm0UYUu1r9YLnzCuBl6q6P6/gEAqyvZsaO
  i9DuF6g+KL5PmvsNY5s8FLxSvwQmD63fHx8eFNilAoGBAKbkXSGlDVlyvwQfNg0K
  6itcEs4OOFMPOiveOXitvBzjObdZzSvEVR+JNHNh9uSKR2N+CyFMlEKvl5WwpbC8
  L/6XpSmuPHllDAufyylvrSIj0lWscCeEIhIMSmpLZTv1OwSzy74uuYfbDpky5Tdw
  w5zHFL3qHJV40vJMTQpWfnah
`
/**
 * @description encryption with PUBLIC_KEY
 * @param txt {string} need encrypt text
 * @returns encrypted text
 */
export const encrypt = txt => {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(PUBLIC_KEY)
  return encryptor.encrypt(txt)
}

/**
 * @description decryption by PRIVATE_KEY
 * @param txt {string} need decrypt text
 * @returns decrypted text
 */
export const decrypt = txt => {
  const decryptor = new JSEncrypt()
  decryptor.setPrivateKey(PRIVATE_KEY)
  return decryptor.decrypt(txt)
}
