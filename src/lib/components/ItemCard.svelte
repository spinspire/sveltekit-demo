<script lang="ts">
  export let item;
  const { name, phone_number, email, image_url } = item;
</script>

<div class="d-flex flex-row">
  {#if image_url}
    <img src={image_url} alt="location logo" />
  {/if}
  <div class="d-flex flex-column p-2">
    <h6>{name}</h6>
    {#if phone_number}
      <a href={`tel:${phone_number}`}>{phone_number}</a>
    {/if}
    {#if email}
      <a href={`mailto:${email}`}>{email}</a>
    {/if}
  </div>
</div>

<style>
  img {
    height: 80px;
    width: 80px;
  }
</style>
