// sync

const getUserSync = (id) => {
    const nama = id === 1 ? "terry" : "umay"
    return {id,nama}
}   

const satu = getUserSync(1)
console.log(satu)

const dua = getUserSync(2)
console.log(dua)

const halo = "Hello world"
console.log(halo)

// async
const getUser = (id,callback) => {
    let time = id === 1 ? 3000 : 2000
    setTimeout(() => {``
        const makanan = id === 1 ? "makanan" : "minuman"
        callback(makanan)
    }, time);
}

const makanan = getUser(1, (hasil) => {
    console.log(hasil)
})

const minuman = getUser(2, (hasil) => {
    console.log(hasil)
})

const halo2 = "hello world" 
console.log(halo2)