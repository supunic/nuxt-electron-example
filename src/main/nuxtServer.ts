export class NuxtServer {
  private static instance: NuxtServer

  static getInstance(nuxt: any, builder: any, server: any) {
    if (NuxtServer.instance) return NuxtServer.instance
    NuxtServer.instance = new NuxtServer(nuxt, builder, server)
    return NuxtServer.instance
  }

  constructor(
    readonly nuxt: any,
    readonly builder: any,
    readonly server: any,
  ) {}

  public build(port: String) {
    this.builder.build()
      .catch((err: any) => {
        console.error(err)
        process.exit(1)
      })
    this.server.listen(port)
  }
}
