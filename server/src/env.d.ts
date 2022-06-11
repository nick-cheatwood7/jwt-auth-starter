declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_NAME: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}

export {}
