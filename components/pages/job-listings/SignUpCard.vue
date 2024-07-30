<script setup lang="ts">
const userType = useState('userType');
function selectUserType() {
  userType.value = 'jobSeeker'  // opens signup form for job seeker
}
</script>

<template>
  <div class="flex justify-center bg-white border border-brand-500 shadow-xs rounded-xl text-center p-5">
    <div class="flex flex-col items-center justify-center gap-3">
      <p class="font-semibold">
        Create your account to <br> apply to jobs faster
      </p>
      <BaseButton navigate-to="/signup" label="Sign up" @click.stop="selectUserType" />
    </div>
  </div>
</template>
