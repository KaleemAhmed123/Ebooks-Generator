# Operating and Securing

## KMS and Secrets Manager

- **KMS** (Key Management Service) is AWS's managed cryptographic key store. You create a **KMS key**; AWS keeps the key material locked in hardware and never lets it leave, and **IAM controls who may use it** to encrypt or decrypt. Almost every "encryption at rest" checkbox in AWS is KMS underneath — **S3**, **EBS**, **RDS**, **DynamoDB** all encrypt with a KMS key you choose. The pattern it uses is **envelope encryption**: KMS doesn't encrypt your gigabytes directly — it issues a **data key**, the service encrypts the data with that, and then encrypts the *data key* with the KMS key and stores it alongside. Fast bulk encryption, with the small, central key still guarded by KMS.

<svg viewBox="0 0 360 66" role="img" aria-label="Envelope encryption: KMS issues a data key, the service encrypts data with it, then KMS encrypts the data key itself, which is stored next to the ciphertext" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.6" fill="#1a1a1a">
  <rect x="12" y="24" width="70" height="20" rx="3" fill="#fbf0dc" stroke="#8a5a00"/><text x="47" y="37" text-anchor="middle" font-size="6">KMS key</text>
  <rect x="120" y="24" width="80" height="20" rx="3" fill="#fdfaf3" stroke="#8a5a00"/><text x="160" y="33" text-anchor="middle" font-size="5.6">data key</text><text x="160" y="41" text-anchor="middle" font-size="5" fill="#777">encrypts the data</text>
  <rect x="244" y="24" width="104" height="20" rx="3" fill="#efe6d3" stroke="#8a5a00"/><text x="296" y="33" text-anchor="middle" font-size="5.6">ciphertext + encrypted</text><text x="296" y="41" text-anchor="middle" font-size="5.6">data key stored together</text>
  <path d="M82 34 L120 34" stroke="#1a1a1a" marker-end="url(#km)"/><text x="101" y="22" text-anchor="middle" font-size="5" fill="#777">issues</text>
  <path d="M200 34 L244 34" stroke="#1a1a1a" marker-end="url(#km)"/>
  <defs><marker id="km" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Secrets Manager** stores the secrets your app needs at runtime — database passwords, API keys, tokens — encrypted with KMS and released only to principals IAM allows. Its headline feature is **automatic rotation**: it can rotate an RDS password on a schedule, updating both the secret and the database, so credentials are short-lived without human toil. A lighter alternative is **SSM Parameter Store** (cheaper, simpler; `SecureString` parameters are KMS-encrypted) for config and secrets that don't need managed rotation.
- The pattern that ties Module 1 together and sets up Booklet 11: the app **assumes a role** (IRSA on EKS), and at **startup fetches its secret from Secrets Manager** using that role — so there is **no password in the image, the env file, or Git**. Combined with "no long-lived access keys" (Module 1) and "no public buckets" (Module 4), this is the backbone of a credential-leak-resistant system: secrets are fetched just-in-time by an identity, never baked in.
