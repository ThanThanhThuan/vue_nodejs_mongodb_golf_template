<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const event = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    try {
        // Fetch the specific event by ID from the URL
        const res = await axios.get(`http://localhost:5000/api/events/${route.params.id}`);
        event.value = res.data;
    } catch (error) {
        console.error("Error fetching event details");
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <main>
        <!-- 1. HERO SECTION -->
        <section class="hero-section hero-50 d-flex justify-content-center align-items-center" id="section_1">
            <div class="section-overlay"></div>

            <!-- SVG Curves -->
            <svg viewBox="0 0 1962 178" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#3D405B" d="M 0 114 C 118.5 114 118.5 167 237 167 L 237 167 L 237 0 L 0 0 Z" stroke-width="0"></path> <path fill="#3D405B" d="M 236 167 C 373 167 373 128 510 128 L 510 128 L 510 0 L 236 0 Z" stroke-width="0"></path> <path fill="#3D405B" d="M 509 128 C 607 128 607 153 705 153 L 705 153 L 705 0 L 509 0 Z" stroke-width="0"></path><path fill="#3D405B" d="M 704 153 C 812 153 812 113 920 113 L 920 113 L 920 0 L 704 0 Z" stroke-width="0"></path><path fill="#3D405B" d="M 919 113 C 1048.5 113 1048.5 148 1178 148 L 1178 148 L 1178 0 L 919 0 Z" stroke-width="0"></path><path fill="#3D405B" d="M 1177 148 C 1359.5 148 1359.5 129 1542 129 L 1542 129 L 1542 0 L 1177 0 Z" stroke-width="0"></path><path fill="#3D405B" d="M 1541 129 C 1751.5 129 1751.5 138 1962 138 L 1962 138 L 1962 0 L 1541 0 Z" stroke-width="0"></path></svg>

            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-12">
                        <h1 class="text-white mb-4 pb-2">Event Detail</h1>
                        <a href="#section_2" class="btn custom-btn smoothscroll me-3">Learn more</a>
                    </div>
                </div>
            </div>

            <svg viewBox="0 0 1962 178" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#ffffff" d="M 0 114 C 118.5 114 118.5 167 237 167 L 237 167 L 237 0 L 0 0 Z" stroke-width="0"></path> <path fill="#ffffff" d="M 236 167 C 373 167 373 128 510 128 L 510 128 L 510 0 L 236 0 Z" stroke-width="0"></path> <path fill="#ffffff" d="M 509 128 C 607 128 607 153 705 153 L 705 153 L 705 0 L 509 0 Z" stroke-width="0"></path><path fill="#ffffff" d="M 704 153 C 812 153 812 113 920 113 L 920 113 L 920 0 L 704 0 Z" stroke-width="0"></path><path fill="#ffffff" d="M 919 113 C 1048.5 113 1048.5 148 1178 148 L 1178 148 L 1178 0 L 919 0 Z" stroke-width="0"></path><path fill="#ffffff" d="M 1177 148 C 1359.5 148 1359.5 129 1542 129 L 1542 129 L 1542 0 L 1177 0 Z" stroke-width="0"></path><path fill="#ffffff" d="M 1541 129 C 1751.5 129 1751.5 138 1962 138 L 1962 138 L 1962 0 L 1541 0 Z" stroke-width="0"></path></svg>
        </section>

        <!-- 2. DETAIL CONTENT -->
        <section class="events-section events-detail-section section-padding" id="section_2">
            <div class="container">
                <div v-if="!isLoading && event" class="row">

                    <div class="col-lg-6 col-md-8 col-12 mx-auto">
                        <h2 class="mb-lg-5 mb-4">{{ event.title }}</h2>

                        <div class="custom-block-image-wrap">
                            <img :src="`/${event.image}`" class="custom-block-image img-fluid" alt="">
                        </div>

                        <div class="custom-block-info">
                            <h3 class="mb-3">{{ event.category }} Event</h3>

                            <p>{{ event.description }}</p>

                            <!-- Dynamic Info Box -->
                            <div class="events-detail-info row my-5">
                                <div class="col-lg-12 col-12">
                                    <h4 class="mb-3">Event Info</h4>
                                </div>

                                <div class="col-lg-4 col-12">
                                    <span class="custom-block-span">Date:</span>
                                    <p class="mb-0">{{ event.date }} {{ event.month }}</p>
                                </div>

                                <div class="col-lg-4 col-12 my-3 my-lg-0">
                                    <span class="custom-block-span">Location:</span>
                                    <p class="mb-0">{{ event.location }}</p>
                                </div>

                                <div class="col-lg-4 col-12">
                                    <span class="custom-block-span">Ticket:</span>
                                    <p class="mb-0">${{ event.price }}</p>
                                </div>
                            </div>

                            <!-- Static Contact Info (Matches Template) -->
                            <div class="contact-info">
                                <div class="contact-info-item">
                                    <div class="contact-info-body">
                                        <strong>London, United Kingdom</strong>
                                        <p class="mt-2 mb-1"><a href="tel:010-020-0340" class="contact-link">010-020-0340</a></p>
                                        <p class="mb-0"><a href="mailto:info@company.com" class="contact-link">info@company.com</a></p>
                                    </div>
                                    <div class="contact-info-footer">
                                        <a href="#">Directions</a>
                                    </div>
                                </div>
                                <img src="/images/WorldMap.svg" class="img-fluid" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-else class="text-center py-5">
                    <h3>Loading Event Details...</h3>
                </div>
            </div>
        </section>
    </main>
</template>