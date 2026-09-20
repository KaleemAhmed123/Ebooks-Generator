## Delivery

- Serving petabytes of video from a central AWS region is prohibitively expensive. You must use a CDN (Content Delivery Network, →05)
- For the most popular videos, the chunks are cached in Edge nodes physically located inside the user's local ISP
- **Netflix Open Connect:** Netflix literally builds hardware servers, ships them to ISPs (Comcast, Verizon), and plugs them into the ISP's local network. During off-peak hours (3 AM), Netflix pushes the next day's top 100 movies to these boxes. When you press play, the video never crosses the wider internet
- **The Long Tail:** If you watch an obscure 15-year-old video, it won't be in the CDN. The CDN must fetch it from the Origin Object Store, which takes time (buffer delay)

### The failure

- Relying solely on the Origin server to serve the first 1,000 views of a viral video. The sudden spike will crush the origin. The CDN shields the origin by serving the cached copies

:::interview
Netflix releases a new season of a hit show at midnight. 10 million people press play simultaneously. Why doesn't their AWS database crash?

Because the video files aren't in AWS. They were pre-positioned onto Open Connect CDN appliances located directly inside the local ISPs days in advance.
:::\n