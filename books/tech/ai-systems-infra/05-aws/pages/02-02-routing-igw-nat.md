## Route tables, IGW, and NAT

- What makes a subnet "public" or "private" is its **route table** — the list of "destination CIDR → target" rules (Booklet 2's routing, as AWS config). Every subnet has one, and the key rule is the default route, `0.0.0.0/0` ("everything not local"):
  - **Public subnet** → `0.0.0.0/0` points at an **Internet Gateway (IGW)**, the VPC's door to the internet. Resources here with a public IP can be reached from, and reach, the internet directly.
  - **Private subnet** → has **no** route to the IGW, so nothing on the internet can initiate a connection to it. For **outbound** access (pulling images, calling APIs, OS updates), its `0.0.0.0/0` points at a **NAT Gateway**.
- A **NAT Gateway** lives in a *public* subnet and does Booklet 2's NAT: it lets private resources reach **out** (rewriting their source to its own address) while allowing **no inbound** initiation. So private app servers can call the internet, but the internet can't call them — exactly the asymmetry you want.

:::warn
The **NAT Gateway bill** is one of the most common "why is AWS so expensive?" surprises, and it's two charges: an hourly rate **per NAT Gateway** (and you want one per AZ for availability, so ×2–3), **plus a per-GB data-processing charge on everything that flows through it**. A fleet of private pods chatting heavily with S3, DynamoDB, or the internet can run up a NAT data bill larger than the compute. The fixes are concrete: use **VPC endpoints** (next page) so S3/DynamoDB traffic **skips NAT entirely**, keep chatty services in-VPC, and don't route internal traffic through NAT. Always check the NAT data-processing line when a cloud bill jumps.
:::

- Availability note that ties to Module 2.1: a NAT Gateway is **per-AZ**. If you run one NAT in AZ-a and it (or the AZ) fails, private subnets in other AZs that routed through it lose outbound access. Production runs **one NAT per AZ**, each serving its own AZ's private subnets — more cost, but no cross-AZ dependency for something as critical as "can my pods reach the internet."
