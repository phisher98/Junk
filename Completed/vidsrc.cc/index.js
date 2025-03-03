const n = "385687";
const Z = crypto.getRandomValues(new Uint8Array(16));
const key = await crypto.subtle.importKey(
  "raw",
  new Uint8Array(
    await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode("j8MDyaub7B")
    )
  ),
  {
    name: "AES-CBC",
  },
  false,
  ["encrypt"]
);
const rn = await crypto.subtle.encrypt(
  {
    name: "AES-CBC",
    iv: Z,
  },
  key,
  new TextEncoder().encode(n)
);
const un = Array.from(new Uint8Array(rn))
  .map((n) => n.toString(16).padStart(2, "0"))
  .join("");
const cn = Array.from(Z)
  .map((n) => n.toString(16).padStart(2, "0"))
  .join("");
const vrf = cn + ":" + un;
const resp = await (
  await fetch(
    `https://vidsrc.cc/api/385687/servers?id=385687&type=movie&v=RmFzdCBYXzIwMjNfbnVsbA==&vrf=${vrf}`,
    {
      headers: {
        Referer: "https://vidsrc.cc/v2/embed/movie/385687?autoPlay=false",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/244.178.44.111 Safari/537.36",
      },
    }
  )
).text();
console.log(resp);
