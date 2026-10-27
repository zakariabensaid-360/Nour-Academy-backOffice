//
let db = JSON.parse(window.localStorage.getItem("db"));


 function getByid(id) {

    for(let i = 0; i < db.length; i++) {
        if(db[i].id == id) return db[i]
    }

    return "not foud"  
}