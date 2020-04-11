import md5 from 'md5'

// testar depois com função
class ApiService {
  getApi( res, query) {
    const timestamp = Date.now()
    const hash = md5(`${timestamp}${process.env.REACT_APP_MARVEL_PRIVATE_KEY}${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`)
    const auth = `ts=${timestamp}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}=hash=${hash}`

    return fetch(
      `${process.env.REACT_APP_MARVEL_BASE_URL}${res}${auth}${query}`
    )
  }

  pagination(params) {
    const query = ''
    if (params.hasOwnProperty("offset")){
      query += `&offset=${params.offset}`;
    }
    
    if (params.hasOwnProperty("limit")){
      query += `&limit=${params.limit}`
    }

    return query
  }
}

export default ApiService

