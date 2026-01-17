<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// --- STATE ---
const events = ref([]);

// Membership Form Data
const memberForm = ref({
    fullName: '',
    email: '',
    message: ''
});

// Contact Form Data
const contactForm = ref({
    fullName: '',
    email: '',
    message: ''
});

// --- API CALLS ---

// 1. Load Events
onMounted(async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/events');
        // Get first 2 events for home page
        events.value = res.data.slice(0, 2); 
    } catch (error) {
        console.error("Backend offline?", error);
    }
});

// 2. Submit Membership
// 2. Submit Membership
const submitMembership = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/membership', memberForm.value);
        
        // Success (200/201 status)
        alert(res.data.message);
        memberForm.value = { fullName: '', email: '', message: '' }; // Reset form

    } catch (error) {
        // Error (400/500 status)
        // Check if the server sent a specific error message
        if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message); // Will show: "This email has already applied."
        } else {
            // Fallback for network errors (server offline)
            alert("Error sending application. Please check your connection.");
        }
    }
};

// 3. Submit Contact
const submitContact = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/contact', contactForm.value);
        alert(res.data.message);
        contactForm.value = { fullName: '', email: '', message: '' }; // Reset
    } catch (error) {
        alert("Error sending message");
    }
};
</script>

<template>
    <!-- SECTION 1: HERO -->
    <section class="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div class="section-overlay"></div>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-12 mb-5 mb-lg-0">
                    <h2 class="text-white">Welcome to the club</h2>
                    <h1 class="text-white mb-4 pb-2">Tiya is Modern</h1>
                    <div class="custom-btn-group">
                        <a href="#section_2" class="btn custom-btn smoothscroll me-3">Our Story</a>
                        <a href="#section_3" class="link smoothscroll">Become a member</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION 2: ABOUT -->
    <section class="about-section section-padding" id="section_2">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-12 text-center">
                    <h2 class="mb-lg-5 mb-4">About Tiya</h2>
                </div>
                <div class="col-lg-5 col-12 me-auto mb-4 mb-lg-0">
                    <h3 class="mb-3">Tiya Club History</h3>
                    <p><strong>Since 1984</strong>, Tiya is ranked #8 in the top 10 golf courses in the world.</p>
                    <p>Tiya Golf Club is a modern club with a rich history.</p>
                </div>
                <!-- Static Member Images -->
                <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
                    <div class="member-block">
                        <div class="member-block-image-wrap">
                            <img src="/images/members/portrait-young-handsome-businessman-wearing-suit-standing-with-crossed-arms-with-isolated-studio-white-background.jpg" class="member-block-image img-fluid" alt="">
                        </div>
                        <div class="member-block-info d-flex align-items-center">
                            <h4>Michael</h4>
                            <p class="ms-auto">Founder</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-12">
                    <div class="member-block">
                        <div class="member-block-image-wrap">
                            <img src="/images/members/successful-asian-lady-boss-red-blazer-holding-clipboard-with-documens-pen-working-looking-happy-white-background.jpg" class="member-block-image img-fluid" alt="">
                        </div>
                        <div class="member-block-info d-flex align-items-center">
                            <h4>Sandy</h4>
                            <p class="ms-auto">Co-Founder</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- INSERT THIS BETWEEN SECTION 2 AND SECTION 3 -->
<section class="section-bg-image">
    <svg viewBox="0 0 1265 144" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="rgba(255, 255, 255, 1)" d="M 0 40 C 164 40 164 20 328 20 L 328 20 L 328 0 L 0 0 Z" stroke-width="0"></path> <path fill="rgba(255, 255, 255, 1)" d="M 327 20 C 445.5 20 445.5 89 564 89 L 564 89 L 564 0 L 327 0 Z" stroke-width="0"></path> <path fill="rgba(255, 255, 255, 1)" d="M 563 89 C 724.5 89 724.5 48 886 48 L 886 48 L 886 0 L 563 0 Z" stroke-width="0"></path><path fill="rgba(255, 255, 255, 1)" d="M 885 48 C 1006.5 48 1006.5 67 1128 67 L 1128 67 L 1128 0 L 885 0 Z" stroke-width="0"></path><path fill="rgba(255, 255, 255, 1)" d="M 1127 67 C 1196 67 1196 0 1265 0 L 1265 0 L 1265 0 L 1127 0 Z" stroke-width="0"></path></svg>

    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-12">
                <div class="section-bg-image-block">
                    <h2 class="mb-lg-3">Get our newsletter</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ut labore et dolore.</p>
                    
                    <!-- We handle this with a simple alert for now -->
                    <form @submit.prevent="alert('Subscribed!')" class="custom-form mt-lg-4 mt-2">
                        <div class="input-group input-group-lg">
                            <span class="input-group-text bi-envelope" id="basic-addon1"></span>
                            <input type="email" class="form-control" placeholder="Email address" required>
                            <button type="submit" class="form-control">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <svg viewBox="0 0 1265 144" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="rgba(255, 255, 255, 1)" d="M 0 40 C 164 40 164 20 328 20 L 328 20 L 328 0 L 0 0 Z" stroke-width="0"></path> <path fill="rgba(255, 255, 255, 1)" d="M 327 20 C 445.5 20 445.5 89 564 89 L 564 89 L 564 0 L 327 0 Z" stroke-width="0"></path> <path fill="rgba(255, 255, 255, 1)" d="M 563 89 C 724.5 89 724.5 48 886 48 L 886 48 L 886 0 L 563 0 Z" stroke-width="0"></path><path fill="rgba(255, 255, 255, 1)" d="M 885 48 C 1006.5 48 1006.5 67 1128 67 L 1128 67 L 1128 0 L 885 0 Z" stroke-width="0"></path><path fill="rgba(255, 255, 255, 1)" d="M 1127 67 C 1196 67 1196 0 1265 0 L 1265 0 L 1265 0 L 1127 0 Z" stroke-width="0"></path></svg>
</section>

    <!-- SECTION 3: MEMBERSHIP -->
    <section class="membership-section section-padding" id="section_3">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-12 text-center mx-auto mb-lg-5 mb-4">
                    <h2><span>Membership</span> at Tiya - THAN THANH THUAN</h2>
                </div>
                <div class="col-lg-6 col-12 mb-3 mb-lg-0">
                    <h4 class="mb-4 pb-lg-2">Membership Fees</h4>
                    <div class="table-responsive">
                        <table class="table text-center">
                            <thead>
                                <tr>
                                    <th style="width: 34%;">Yearly Access</th>
                                    <th style="width: 22%;">T1 $420</th>
                                    <th style="width: 22%;">T2 $640</th>
                                    <th style="width: 22%;">T3 $860</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" class="text-start">Golf Insurance</th>
                                    <td><i class="bi-check-circle-fill"></i></td>
                                    <td><i class="bi-check-circle-fill"></i></td>
                                    <td><i class="bi-check-circle-fill"></i></td>
                                </tr>
                                <tr>
                                    <th scope="row" class="text-start">Club Facilities</th>
                                    <td><i class="bi-check-circle-fill"></i></td>
                                    <td><i class="bi-check-circle-fill"></i></td>
                                    <td><i class="bi-check-circle-fill"></i></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- MEMBERSHIP FORM -->
                <div class="col-lg-5 col-12 mx-auto">
                    <h4 class="mb-4 pb-lg-2">Please join us!</h4>
                    <form @submit.prevent="submitMembership" class="custom-form membership-form shadow-lg">
                        <h4 class="text-white mb-4">Become a member</h4>
                        
                        <div class="form-floating">
                            <input type="text" v-model="memberForm.fullName" class="form-control" placeholder="Full Name" required>
                            <label>Full Name</label>
                        </div>

                        <div class="form-floating">
                            <input type="email" v-model="memberForm.email" class="form-control" placeholder="Email address" required>
                            <label>Email address</label>
                        </div>

                        <div class="form-floating">
                            <textarea class="form-control" v-model="memberForm.message" placeholder="Describe message here"></textarea>
                            <label>Comments</label>
                        </div>

                        <button type="submit" class="form-control">Submit Application</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION 4: EVENTS -->
    <section class="events-section section-padding" id="section_4">
        <div class="container">
            <h2 class="mb-lg-3">Upcoming Events</h2>
            <div v-for="event in events" :key="event._id" class="row custom-block mb-3">
                <div class="col-lg-2 col-md-4 col-12 order-2 order-md-0 order-lg-0">
                    <div class="custom-block-date-wrap d-flex d-lg-block align-items-center mt-3 mt-lg-0">
                        <h6 class="custom-block-date mb-lg-1">{{ event.date }}</h6>
                        <strong class="text-white">{{ event.month }}</strong>
                    </div>
                </div>
                <div class="col-lg-4 col-md-8 col-12 order-1 order-lg-0">
                    <div class="custom-block-image-wrap">
                        <router-link :to="`/event/${event._id}`">
                            <img :src="`/${event.image}`" class="custom-block-image img-fluid" alt="">
                            <i class="custom-block-icon bi-link"></i>
                        </router-link>
                    </div>
                </div>
                <div class="col-lg-6 col-12 order-3 order-lg-0">
                    <div class="custom-block-info mt-2 mt-lg-0">
                        <router-link :to="`/event/${event._id}`" class="events-title mb-3">{{ event.title }}</router-link>
                        <p>{{ event.description }}</p>
                        <div class="d-flex flex-wrap border-top mt-4 pt-3">
                            <div class="mb-4 mb-lg-0">
                                <span class="custom-block-span">Location: {{ event.location }}</span>
                                <span class="custom-block-span ms-3">Price: ${{ event.price }}</span>
                            </div>
                            <div class="d-flex align-items-center ms-lg-auto">
                                <router-link :to="`/event/${event._id}`" class="btn custom-btn">Buy Ticket</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SECTION 5: CONTACT -->
    <section class="contact-section section-padding" id="section_5">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-12">
                    <!-- CONTACT FORM -->
                    <form @submit.prevent="submitContact" class="custom-form contact-form">
                        <h2 class="mb-4 pb-2">Contact Tiya</h2>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-12">
                                <div class="form-floating">
                                    <input type="text" v-model="contactForm.fullName" class="form-control" placeholder="Full Name" required>
                                    <label>Full Name</label>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-12"> 
                                <div class="form-floating">
                                    <input type="email" v-model="contactForm.email" class="form-control" placeholder="Email address" required>
                                    <label>Email address</label>
                                </div>
                            </div>
                            <div class="col-lg-12 col-12">
                                <div class="form-floating">
                                    <textarea class="form-control" v-model="contactForm.message" placeholder="Message"></textarea>
                                    <label>Message</label>
                                </div>
                                <button type="submit" class="form-control">Submit Form</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-lg-6 col-12">
                    <div class="contact-info mt-5">
                        <div class="contact-info-item">
                            <div class="contact-info-body">
                                <strong>London, United Kingdom</strong>
                                <p class="mt-2 mb-1"><a href="tel:0100200340" class="contact-link">010-020-0340</a></p>
                                <p class="mb-0"><a href="mailto:info@company.com" class="contact-link">info@company.com</a></p>
                            </div>
                        </div>
                        <img src="/images/WorldMap.svg" class="img-fluid" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>