<script setup>
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(false);
const userName = ref('');

onMounted(() => {
    const user = localStorage.getItem('user');
    if (user) {
        isLoggedIn.value = true;
        userName.value = user;
    }
});

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
};
</script>

<template>
    <nav class="navbar navbar-expand-lg">                
        <div class="container">
            <router-link class="navbar-brand d-flex align-items-center" to="/">
                <img src="/images/logo.png" class="navbar-brand-image img-fluid" alt="Tiya Golf Club">
                <span class="navbar-brand-text">Tiya <small>Golf Club</small></span>
            </router-link>

            <!-- MOBILE TOGGLE -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-lg-auto">
                    <li class="nav-item">
                        <a class="nav-link click-scroll" href="/#section_1">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link click-scroll" href="/#section_2">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link click-scroll" href="/#section_3">Membership</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link click-scroll" href="/#section_4">Events</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link click-scroll" href="/#section_5">Contact</a>
                    </li>
                </ul>

                <!-- LOGIN / LOGOUT SECTION -->
                <div class="d-none d-lg-block ms-lg-3">
                    
                    <!-- NOT LOGGED IN -->
                    <div v-if="!isLoggedIn">
                        <a class="btn custom-btn custom-border-btn" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button">Member Login</a>
                    </div>

                    <!-- LOGGED IN -->
                    <div v-else class="d-flex align-items-center">
                        <!-- FIX 1: Use 'nav-link' class so the text color changes automatically on scroll -->
                        <span class="nav-link" style="cursor: default; opacity: 1;">Hi, {{ userName }}</span>
                        
                        <!-- FIX 2: Use 'custom-btn' so it matches the other buttons and is visible on white -->
                        <button @click="logout" class="btn custom-btn custom-border-btn btn-sm ms-2">Logout</button>
                    </div>

                </div>
            </div>
        </div>
    </nav>
</template>