const CACHE = "test-v1"

self.addEventListener("install",(e)=>{
    console.log("sw.js instalado")
  e.waitUntil(
    caches.open(CACHE).then(cache =>{
      return cache.addAll([
        "./",
        "index.html",
        "style.css",
        "code.js",
        "icon-192.png",
        "icon-512.png",
        "manifest.json"
        ])
    }).catch(err=>{
      console.warn(`erro no: ${err}`)
    })
    )
})


self.addEventListener("activate",(e)=>{
  console.log("nova versão")
  e.waitUntil(
    caches.keys().then(keys=>{
      return Promise.all(
        keys.map(key=>{
          if(key !== CACHE){
            return caches.delete(key)
          }
        })
        )
    })
    )
})

self.addEventListener("fetch",(e)=>{
  e.respondWith(
    caches.match(e.request).then(r=>{
      return r || fetch(e.request).catch(err=>{
        console.log(`erro: ${err}`)
        return caches.match("./index.html")
      })
    })
    )
})