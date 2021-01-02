declare namespace NodeJS {
  export interface ProcessEnv {
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    DISCORD_CALLBACK_URL: string;
    MONGODB_URI: string;
    JWT_SECRET: string;
  }
}
