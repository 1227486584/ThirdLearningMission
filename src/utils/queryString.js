export default (name) => {
    //let parStr = window.location.search.substr(1)
    let parStr = window.location.href.split('?')[1]
    if(parStr == "" || parStr == undefined){
      return ''
    }else{
      parStr = parStr.replace("#/", "") 
      let parList = parStr.split('&')
      let newList = []
      parList.forEach((item, index, arr) => {
        let tmpList = item.split('=')
        if(tmpList.length > 1){
          newList[tmpList[0]] = tmpList[1]
        }
      })
      return newList[name]
    }
  }