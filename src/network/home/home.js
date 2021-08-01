import {request} from "network/request";

export  function queryDataOfHome()
{
     return request({
     url:"/home/multidata"
    })
}

export  function getGoodListOfHome(page,type)
{
  return request({
    url:"/home/data",
    params:{
      page,
      type
    }
  })
}
