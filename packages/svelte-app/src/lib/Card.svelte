<script lang="ts">
  export let title: string = '';
  export let padding: 'small' | 'medium' | 'large' = 'medium';
</script>

<div class="card card-{padding}">
  {#if title}
    <h3 class="card-title">{title}</h3>
  {/if}
  <div class="card-content">
    <slot />
  </div>
</div>

<style>
  .card {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid #e5e7eb;
  }
  
  .card-small {
    padding: 0.75rem;
  }
  
  .card-medium {
    padding: 1.25rem;
  }
  
  .card-large {
    padding: 2rem;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: #111827;
  }
  
  .card-content {
    color: #374151;
  }
</style>