<script lang="ts">
  console.log('App.svelte is loading...');

  // 逐步添加依赖 - 先试试 shared 包
  import { formatDate, type User } from '@302-ai-studio/shared';

  let user: User = {
    id: '1',
    name: '302 AI Studio User',
    email: 'user@302ai.com'
  };

  let currentDate = formatDate(new Date());
  let count = 0;

  function increment() {
    count += 1;
    console.log('Count:', count);
  }
</script>

<main class="container">
  <div class="card">
    <h1>欢迎使用 302 AI Studio</h1>
    <p>Hello {user.name}!</p>
    <p>今天是 {currentDate}</p>
    <p>邮箱: {user.email}</p>
    <p>点击次数: {count}</p>

    <div class="buttons">
      <button class="btn primary" on:click={increment}>
        增加计数
      </button>
    </div>
  </div>
</main>

<style>
  .container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .card {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    padding: 1.25rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn.primary {
    background-color: #3b82f6;
    color: white;
  }

  .btn.primary:hover {
    background-color: #2563eb;
  }

  h1 {
    color: #333;
    margin: 0 0 1rem 0;
  }

  p {
    margin: 0.5rem 0;
  }
</style>