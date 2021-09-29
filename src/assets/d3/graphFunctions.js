// takes json and js objects trnasforms them
//  for d3.hirarchy function exabtable 
// 
// 

function makeDataHirarchic(d) {
  if(typeof d == "object")
  return Object.keys(d).filter(d=>d!="$name").map(k=>{
    if(typeof d[k] == "object") d[k].$name = k;
    else d[k] = k + " : " + d[k];
    return d[k];
  }); 

}



export {makeDataHirarchic}

