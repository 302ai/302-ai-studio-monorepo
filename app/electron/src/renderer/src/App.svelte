<script lang="ts">
  import { Button, Card } from '@302-ai-studio/ui';
  import { formatDate, type User } from '@302-ai-studio/shared';
  
  let user: User = {
    id: '1',
    name: '302 AI Studio User',
    email: 'user@302ai.com'
  };
  
  let currentDate = formatDate(new Date());
  
  async function testAPI() {
    try {
      const result = await window.api.ping();
      console.log('API test result:', result);
    } catch (error) {
      console.error('API test failed:', error);
    }
  }
</script>

<main class="container">
  <Card title="欢迎使用 302 AI Studio">
    <h1>Hello {user.name}!</h1>
    <p>今天是 {currentDate}</p>
    <p>邮箱: {user.email}</p>
    
    <div class="buttons">
      <Button variant="primary" on:click={testAPI}>
        测试 API
      </Button>
      <Button variant="secondary">
        次要按钮
      </Button>
    </div>
  </Card>
</main>

<style>
  .container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }
  
  .buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  h1 {
    color: #333;
    margin: 0 0 1rem 0;
  }
  
  p {
    margin: 0.5rem 0;
  }
</style>