function cetakNama(nama) {
    return `halo nama saya ${nama}`
}

const PI = 3.12

const Mahasiswa = {
    nama : "terry",
    umur : 17,
    Hello() {
        return `halo nama saya ${this.nama}, umur ${this.umur}`
    }
}
class Orang {
    constructor() {
        console.log("class di jalankan")
    }
} 



module.exports = {cetakNama,PI,Mahasiswa,Orang}