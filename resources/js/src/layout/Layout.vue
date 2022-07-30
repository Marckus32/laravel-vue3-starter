<template>
    <div class="wrapper">
        <Navbar></Navbar>
        <Sidebar></Sidebar>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                        <h1 class="m-0">Starter Page</h1>
                        </div>
                        <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Starter Page</li>
                        </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <router-view></router-view>            
            </div>
        </div>
    </div>
    <!-- <div id="sidebar-overlay"></div> -->
    <!-- <Footer></Footer> -->
</template>

<script>
import { defineComponent } from 'vue'
import Navbar from "./partials/Navbar.vue"
import Sidebar from "./partials/Sidebar.vue"
import Footer from "./partials/Footer.vue"
export default defineComponent({
    components:{
        Navbar,
        Sidebar,
        Footer
    },
    setup() {
        
    },
})
</script>
