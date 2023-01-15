<template>
  <div class="basic-card flex flex-col justify-between bg-card-light dark:bg-card-dark text-center m-6 p-6 w-full md:w-1/2 hover:rounded shadow-md dark:shadow-shadow-dark hover:shadow-none transition">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'basic-card',
};
</script>
