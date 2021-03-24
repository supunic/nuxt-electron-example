declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly NUXT_DEV_HOST: string
    readonly NUXT_DEV_PORT: string
    readonly API_URL: string
  }
}
