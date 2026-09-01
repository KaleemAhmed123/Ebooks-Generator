# Module 10 - WebRTC

## Why media does not go through your server

- A video call is roughly 1.5 megabits per second in each direction
- Routing that through your server means paying for every byte twice, and adding a detour that shows up as lag
- **WebRTC** lets two browsers send audio, video and arbitrary data **directly to each other**, peer to peer
- Your server carries none of the media. It only helps the two sides find each other
- The problem it has to solve is that neither browser has a public address. Both sit behind home routers doing network address translation
- Neither can be dialed, so something has to help them discover a path that works
- Built into every modern browser with no plugin, standardized by the W3C and IETF, and first shipped in 2011

### The three things it needs from you

- **Signalling.** A channel to exchange connection details, because they cannot talk yet. Usually WebSockets
- **STUN.** A server that tells a browser what its own public address looks like from outside
- **TURN.** A relay for the cases where no direct path exists at all

### What is actually peer to peer

- The media, once connected. Everything before that goes through your infrastructure
- And roughly one connection in five ends up relayed anyway, which is where the cost is
