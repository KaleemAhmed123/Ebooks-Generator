## Embedding Drift

The embedding model or its preprocessing changing, so new vectors are no longer
comparable with old ones. Retrieval quality degrades quietly.

A library upgrade changed default normalisation. New documents were embedded
slightly differently and stopped matching queries that the old ones matched
fine.

### How it works

Every vector in your index was produced by a specific model, with specific
preprocessing, at a specific version. Vectors are only comparable to others
produced the same way.

Drift is when that quietly stops being true. A library upgrade changes a
default. The provider updates the model behind an unversioned name. Someone
adjusts the text-cleaning step for new documents and not for the existing ones.

Now part of the index lives in one space and part in another. Distances between
them are arbitrary. Retrieval degrades in a way that looks random rather than
systematic — some queries fine, some inexplicably poor, no pattern anyone can
name.

**Nothing errors, because nothing is structurally wrong.** The vectors are all
the right shape and the right length. They simply no longer mean the same thing.

### In practice

Store the embedding model name, its version, and a preprocessing version
alongside every vector. Then assert on startup that the query path uses the same
combination the index was built with.

It is a few lines of code, and it converts a class of silent multi-week
degradation into a loud failure at deploy time. That is exactly the trade you
want, and it is unavailable retrospectively — once the index is mixed, there is
no way to tell which vectors came from where.
