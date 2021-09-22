
// data change

// data 


let root = d3.hierarchy(packageJson, function(d) {
    if(typeof d == "object")
     return Object.keys(d).filter(d=>d!="$name").map(k=>{
       if(typeof d[k] == "object") d[k].$name = k;
       else d[k] = k + " : " + d[k];
       return d[k];
     }); 
  })

// layout function 


//  *******************************************************************

// create hierarchiic graph


