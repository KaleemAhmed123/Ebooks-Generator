## MongoDB on AWS

- Two reasonable options, and they are not the same product

| | DocumentDB | MongoDB Atlas |
|---|---|---|
| Who runs it | AWS | MongoDB, inside your cloud |
| Compatibility | emulates the MongoDB API, partially | it **is** MongoDB |
| Networking | in your VPC natively | VPC peering or PrivateLink |
| Missing pieces | some aggregation stages, change stream limits, text search | none |
| Billing | your AWS bill | a separate vendor |

- **DocumentDB is an emulation.** Most application code works, and the gaps appear in aggregation pipelines and newer features
- **Check your actual queries against it before committing**, not the feature list
- **Atlas is the safer choice if you are already using MongoDB seriously**, and it adds a vendor relationship and a private networking setup

```bash
aws docdb create-db-cluster \
  --db-cluster-identifier orders-docdb \
  --engine docdb --master-username app --manage-master-user-password \
  --vpc-security-group-ids sg-database --db-subnet-group-name private-data \
  --backup-retention-period 14 --storage-encrypted

aws docdb create-db-instance --db-instance-identifier orders-docdb-1 \
  --db-cluster-identifier orders-docdb --engine docdb --db-instance-class db.r6g.large
```
