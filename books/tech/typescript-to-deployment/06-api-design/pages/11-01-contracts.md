# Module 11 - Lifecycle and contracts

## Documenting and testing the contract

- An API is a promise to people who cannot read your code, and the promise breaks silently
- Nothing fails when the documentation and the implementation disagree, which is why hand-written docs are wrong within weeks

### Contract first or code first

- **Contract first** writes the OpenAPI document, then generates server stubs and client SDKs from it
- Better when several teams must agree before anyone builds, because the discussion happens on the contract
- **Code first** generates the document from the schemas already validating requests
- Better for one team moving quickly, and it cannot drift because the validator is the source

### Contract testing

- Integration tests between every pair of services get slow and flaky at scale
- **Consumer-driven contract testing** replaces that. Each consumer records what it needs, and the provider verifies it still supplies it
- The provider learns it broke someone at build time rather than at deploy time
- Pact is the usual tool. The value is highest when consumers and providers deploy independently

### Generated SDKs

- A typed client generated from the contract removes an entire class of integration bug
- It also means a breaking change is caught by the consumer's compiler rather than by a customer
