
<script setup>
// import { Bootstrap4Pagination } from 'laravel-vue-pagination'
</script>
<template>
    <div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                <div class="modal-body">
                    <form @submit.prevent="save">
                            <label for="nama_siswa" class="form-label">Nama:</label>
                            <!-- <select v-model="peminjaman.id_siswa" id="nama_siswa" class="form-control">
                                    <option v-for="s in siswa" :key="s.id_siswa" :value="s.id_siswa">{{ s.nama_siswa }}</option>
                                    </select> -->
                            <input type="text" class="form-control" required v-model="peminjaman.nama" autocomplete="off"
                                placeholder="Masukkan nama..">


                            <label for="alamat" class="form-label">Alamat: </label>
                            <!-- <select v-model="peminjaman.id_kelas" class="form-control">
                                        <option v-for="s in kelas" :key="s.id_kelas" :value="s.id_kelas">{{ s.nama_kelas }}</option>
                                    </select> -->
                            <input type="text" class="form-control" required v-model="peminjaman.alamat" autocomplete="off"
                                placeholder="Masukkan alamat...">

                            <label for="buku" class="form-label">Buku</label>
                            <select v-model="peminjaman.id_buku" id="buku" required class="form-control">
                                <option v-for="b in buku" :key="b.id_buku" :value="b.id_buku">{{ b.judul_buku }}</option>
                            </select>

                            <input type="submit" class="btn btn-primary mt-3">
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>


        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data Peminjaman</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-20">
                            <div class="card card-primary card-outline">
                                <div class="card-body">

                                    <button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                        <i class="bi bi-file-plus"></i>
                                        Tambah
                                    </button>

                                    <!-- <a href="/tambahpinjam" class="btn btn-primary mb-2">Tambah</a> -->

                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">ID</th>
                                                <th>Nama Siswa</th>
                                                <th>Tanggal Pinjam</th>
                                                <th>Tanggal Kembali</th>
                                                <th>Tenggat</th>
                                                <th>Status</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="p in getpinjam" :key="p.id_peminjaman">
                                                <td>{{ p.id_peminjaman }}</td>
                                                <td>{{ p.nama }}</td>
                                                <td>{{ p.tgl_pinjam }}</td>
                                                <td>{{ p.tgl_kembali }}</td>
                                                <td>{{ p.tenggat }}</td>
                                                <td>
                                                    <span v-if="p.status == 'kembali'"
                                                        class="badge bg-success">Kembali</span>
                                                    <span v-else class="badge bg-danger">Belum kembali</span>
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <!-- <button class="btn btn-success" @click="detail()">Detail</button>   -->

                                                        <span v-if="p.status == 'dipinjam'"><button class="btn btn-warning"
                                                                @click="kembali(p)">Kembali</button></span>
                                                        <button type="button" @click="hapus(p)" class="btn btn-danger"><i
                                                                class="bi bi-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="pt-3 display-flex float-right pr-5">
                                        <Bootstrap4Pagination :data="getpinjam" @pagination-change-page="getpeminjaman" />
                                    </div>
                                    <!-- <TailwindPagination :data="getpinjam" @pagination-change-page="getpeminjaman"></TailwindPagination> -->
                                    <!-- <paginate-component :data="getpinjam" @pagination-change-page="getpeminjaman"></paginate-component> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import navbar from '../components/template/NavigationBar.vue'
import sidebar from '../components/template/AppSidebar.vue'
import axios from 'axios'
import Vue from 'vue'
import swal from 'sweetalert'
// import { Bootstrap4Pagination } from 'laravel-vue-pagination';
// import { Bootstrap5Pagination } from 'laravel-vue-pagination';
// import pagination from 'laravel-vue-pagination'


Vue.use(axios)

export default {
    components: {
        'navbar-component': navbar,
        'sidebar-component': sidebar,
        // 'paginate-component' : pagination
    },
    data() {
        return {
            pinjam: {},
            siswa: {},
            buku: {},
            kelas: {},
            peminjaman: {
                // id_siswa: '',
                // id_kelas: '',
                id_buku: '',
                nama: '',
                alamat: ''
            },
            getpinjam: {},
            getstatus: {},
        }
    },
    created() {
        this.getsiswa()
        this.getbuku()
        this.getpeminjaman()
        this.getkelas()
        this.filter()

    },
    methods: {
        getsiswa() {
            axios.get('http://localhost:8000/api/getsiswa',{headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    ({ data }) => {
                        this.siswa = data
                    }
                )
        },
        getbuku() {
            axios.get('http://localhost:8000/api/getbuku',{headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    ({ data }) => {
                        this.buku = data
                    }
                )
        },
        getkelas() {
            axios.get('http://localhost:8000/api/getkelas',{headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    ({ data }) => {
                        this.kelas = data
                    }
                )
        },
        save() {
            this.save_data()
        },
        save_data() {
            axios.post('http://localhost:8000/api/createpeminjaman', this.peminjaman, {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    ({ data }) => {
                        swal('Sukses tambah peminjaman', {
                            icon: 'success',
                            button: false
                        })
                        setTimeout(() => {
                            window.location.reload()
                        }, 1200)
                        this.peminjaman = data
                    }

                )
        },
        getpeminjaman() {
            axios.get('http://localhost:8000/api/peminjaman', {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    ({ data }) => {
                        this.getpinjam = data
                        // this.load = false
                    }
                )
        },
        detail() {
            swal({
                title: ':(',
                text: 'Masih belum tersedia!!',
                icon: 'error',
                button: false,
                timer: 1000
            })
        },
        hapus(p) {
            swal({
                title: "Are you sure?",
                text: "Kalo dah pencet 'OK' gk bisa di balikin!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    axios.delete('http://localhost:8000/api/deletepeminjaman/' + p.id_peminjaman, {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                    swal("Poof! data peminjaman sudah ke hapus!", {
                        icon: "success",
                        button: false
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 1200);
                } else {
                    swal("Oke datanya gk jadi di hapus!", { icon: 'success' });

                }
            });
        },
        kembali(p) {
            swal({
                title: "Ingin mengembalikan buku?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.put('http://localhost:8000/api/pengembalian/' + p.id_peminjaman, {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})  
                        swal("Poof! Berhasil mengembalikan buku!", {
                            icon: "success",
                            button: false
                        });
                        setTimeout(() => {
                            window.location.reload()
                        }, 1200);
                    } else {
                        swal("Ok gk jadi!", {
                            icon: 'success'
                        })

                    }
                });
        },

        //KALO MAU COPAS INI GK USAH DI COPAS
        filter() {
            axios.get('http://localhost:8000/api/getstatus/' + this.getstatus, {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    ({ data }) => {
                        this.siswa = data
                    }
                )
        }
    }
}

</script>