export interface AppConfig {
  name: string;
  version: string;
  environment: 'development' | 'production' | 'test';
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}