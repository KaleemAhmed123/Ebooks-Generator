# Preface

Most AI material teaches you to call an API. Import the client, paste the key, send a prompt, print the reply. You learn the vocabulary — embedding, token, agent, fine-tune — and you can hold a conversation about systems you have never built or operated.

That vocabulary is worth having. It is just not the part that is hard.

The hard part is that under every one of those words is a mechanism somebody has to understand. An embedding is a learned geometry, and whether two things land near each other decides whether your search works. A token is where cost, latency and context limits all meet. An agent is a loop around a model that can take actions, which means it can take the wrong one. Fine-tuning changes the weights, and most of the time retrieval was the thing you actually needed. Call the API and you have inherited all of it, whether or not you knew.

I wrote this series because I kept meeting those mechanisms the hard way. A model that was perfect in a notebook and useless in production. A retrieval pipeline that was confident and wrong. An agent that looped forever, or did something nobody had thought to forbid. Each one was a thing I could have drawn on a whiteboard a year earlier and still not understood.

So the six booklets are built from the ground up and organised around mechanisms, not tools. Not "how to use an LLM", but what the transformer actually computes and why attention costs what it does. Not "add RAG", but which part of the pipeline fails and how you measure that it did. The series assumes you can program and assumes nothing about machine learning — it starts at a vector and ends at a production serving stack. Where a version number or a benchmark appears, it comes from the paper, the documentation or the repository, and it was checked as this edition was built. Where a claim could not be verified against a primary source, it was cut rather than softened.

The booklets stand alone and they are ordered. Foundations first — the math and classical ML the rest leans on. Then deep learning, then language and the transformer, then large language models, then agents, then production. One idea owns one place: attention is explained once, the KV-cache once, RLHF once, and the later booklets point rather than repeat.

A note on what is not here. There is no vendor tour and no chapter that is only screenshots of a console. And the frontier moves faster than any book can print — some of these pages are already being overtaken, which is why so many of them tell you the one thing to go and check for yourself.

If a page states something you know to be wrong, I would rather hear it than have it quoted back to me.

**Kaleem Ahmed**
