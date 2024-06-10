self.__uv$config = {
  prefix: "/service/",

  /* Bare server URL */
  bare: "https://tomp.app",

  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: "pr0xy/uv/uv.handler.js",
  client: "pr0xy/uv/uv.client.js",
  bundle: "pr0xy/uv/uv.bundle.js",
  config: "pr0xy/uv/uv.config.js",
  sw: "pr0xy/uv/uv.sw.js",
};
