<script setup>
import { ref } from 'vue';
import axios from 'axios';

const memberId = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
    errorMessage.value = '';
    isLoading.value = true;

    try {
        const response = await axios.post('http://localhost:5000/api/login', {
            memberId: memberId.value,
            password: password.value
        });

        if (response.data.success) {
            // 1. Save data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.user);
            
            // 2. Clear form
            memberId.value = '';
            password.value = '';

            // 3. Force Close the Offcanvas (Using the global Bootstrap object)
            const offcanvasEl = document.getElementById('offcanvasExample');
            // Check if bootstrap is available globally from the script tag
            if (window.bootstrap) {
                const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            } else {
                // Fallback: Click the X button if bootstrap object isn't found
                const closeBtn = offcanvasEl.querySelector('.btn-close');
                if(closeBtn) closeBtn.click();
            }

            // 4. Refresh page to update Navbar state
            alert("Login Successful!");
            window.location.reload(); 
        }
    } catch (error) {
        console.error(error);
        errorMessage.value = "Login failed. Check console for details.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">                
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Member Login</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        
        <div class="offcanvas-body d-flex flex-column">
            <form class="custom-form member-login-form" @submit.prevent="handleLogin">
                <div class="member-login-form-body">
                    <div class="mb-4">
                        <label class="form-label mb-2">Membership No.</label>
                        <input type="text" v-model="memberId" class="form-control" placeholder="11002560" required>
                    </div>

                    <div class="mb-4">
                        <label class="form-label mb-2">Password</label>
                        <input type="password" v-model="password" class="form-control" placeholder="1234" required>
                    </div>

                    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

                    <div class="col-lg-5 col-md-7 col-8 mx-auto">
                        <button type="submit" class="form-control" :disabled="isLoading">
                            {{ isLoading ? 'Loading...' : 'Login' }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>