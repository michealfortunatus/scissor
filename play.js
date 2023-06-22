// import isUrl from "is-url";


//   const  url= "hs://gogle.cm"
//   const result = isUrl(url);

//  console.log(result)



function validateUrl(str) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
  }



  const  url= "https://www.google.com"
 
  
  console.log(validateUrl(url));