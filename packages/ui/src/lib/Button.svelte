<script lang="ts">
  export let variant: 'primary' | 'secondary' = 'primary';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let disabled = false;
</script>

<button
  class="btn btn-{variant} btn-{size}"
  {disabled}
  on:click
>
  <slot />
</button>

<style>
  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .btn-primary {
    background-color: #3b82f6;
    color: white;
  }
  
  .btn-primary:hover:not(:disabled) {
    background-color: #2563eb;
  }
  
  .btn-secondary {
    background-color: #e5e7eb;
    color: #374151;
  }
  
  .btn-secondary:hover:not(:disabled) {
    background-color: #d1d5db;
  }
  
  .btn-small {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }
  
  .btn-medium {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  
  .btn-large {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }
</style>