// core module
// file system

// synchronous
try{
    fs.writeFileSync("data/test.txt","Membuat text denha synchronous")
}catch(err){
    console.log(err)
}

// asynchronous
fs.writeFile("data/test.txt", "membuat text dengan asynchronous", (e) => {
    console.log(e)
})

// meembaca isi file
const data = fs.readFileSync("data/test.txt", 'utf-8')
console.log(data)

// membaca iisi file asynchronous
fs.readFile("data/test.txt", 'utf-8', (err,data) => {
    if (err) throw err
    console.log(data)
})