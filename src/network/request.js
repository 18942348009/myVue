import axios from "axios";

const  baseUrl = "http://152.136.185.210:7878/api/m5"

export function request(config)
{
  const instance1 = axios.create({
    baseURL: baseUrl,
    timeout:5000
  })
  instance1.interceptors.response.use(
    res=>{
      return res.data
    },
    err => {
      return err;
    })

  return instance1(config);
}
