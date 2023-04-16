<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <h5 class="card-title">Selamat Datang</h5>

                                    <p class="card-text">
                                        Website Sistem Informasi Perpustakaan
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="width: 300px; height: 300px;">
                    <canvas id="piechart" width="300" height="300"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import NavigationBar from '../components/template/NavigationBar.vue'
import AppSidebar from '../components/template/AppSidebar.vue'

import axios from 'axios'
import Chart from 'chart.js/auto'

export default {
    components: {
        'navbar-component': NavigationBar,
        'sidebar-component': AppSidebar,
    },
    data() {
        return {
            databuku: {},
        }
    },
    mounted() {
        axios.get('http://localhost:8000/api/getbuku')
            .then(
                (response) => {
                    const data = response.data.map(item => item.jumlah_pinjam)
                    const nama = response.data.map(item => item.judul_buku)

                    const chartData = {
                        labels: nama,
                        datasets: [{
                            data: data,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                        }]
                    }

                    new Chart(document.getElementById('piechart'), {
                        type: 'bar',
                        data: chartData,
                        options: {
                            responsive: true
                        }
                    })
                })
            .catch(
                err => {
                    console.log(err)
                }
            )
    }
}
</script>