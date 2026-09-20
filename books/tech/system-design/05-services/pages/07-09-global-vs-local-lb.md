## Global vs local load balancing

- Up to this point, we have discussed Local Load Balancing. A local balancer lives inside a single data center (or region) and routes traffic to instances inside that same building
- What if your users are worldwide, and you have instances in New York, London, and Tokyo? A local load balancer in New York cannot help a user in Tokyo get to the Tokyo servers
- You need Global Load Balancing. This operates at the edge of the internet to direct the user to the closest healthy region

<svg viewBox="0 0 460 140" role="img" aria-label="Global vs Local LB. DNS points user to regional LB, which points to local instances." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="40" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="40" y="73" text-anchor="middle">User</text>
  
  <rect x="120" y="15" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89" stroke-width="2"/>
  <text x="160" y="33" text-anchor="middle">Global LB (DNS)</text>
  
  <rect x="250" y="55" width="80" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="290" y="73" text-anchor="middle">Local LB (NY)</text>
  
  <rect x="360" y="35" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="400" y="49" text-anchor="middle">Instance 1</text>
  
  <rect x="360" y="85" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="400" y="99" text-anchor="middle">Instance 2</text>
  
  <path d="M40 55 L120 30" stroke="#1a1a1a" fill="none" stroke-dasharray="2"/>
  <path d="M115 33 l5 -3 l2 5 z" fill="#1a1a1a"/>
  <text x="70" y="35" text-anchor="middle" font-size="7">1. Resolve IP</text>
  
  <path d="M60 70 L250 70" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <path d="M245 67 l5 3 l-5 3 z" fill="#1a1a1a"/>
  <text x="155" y="65" text-anchor="middle" font-size="7">2. HTTP Request</text>
  
  <path d="M330 70 L360 45" stroke="#1a1a1a" fill="none"/>
  <path d="M330 70 L360 95" stroke="#1a1a1a" fill="none"/>
</svg>

- **DNS Load Balancing:** The simplest global balancer. The DNS server checks the health of your regions. When a user in Tokyo looks up `api.example.com`, the DNS server returns the IP address of the Tokyo Local Load Balancer
- **Anycast:** A more advanced global routing method. All your local balancers advertise the exact same IP address to the global internet backbone (BGP). The internet's routers automatically calculate the shortest physical path from the user to the nearest location announcing that IP

### The failure

- The failure is relying solely on DNS to fail over during a regional outage. DNS records have a Time To Live (TTL). If you set the TTL to 5 minutes (300s), and the New York region loses power, you can update DNS to point New York users to London
- However, the users' internet providers will cache the old New York IP address for the full 5 minutes. Your users will experience 5 minutes of total downtime while the DNS caches slowly expire
