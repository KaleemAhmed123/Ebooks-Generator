### Where to set the number

Not at your current size. Set it slightly above, so there is a little headroom,
and ratchet it down when you make a real improvement.

A reasonable starting point for a content-led page is around 100kB of compressed
JavaScript before interaction. An application dashboard will be several times
that, and that is fine, as long as the number is chosen deliberately and does
not drift.

The rule is not the absolute figure. It is that the figure is **written down and
enforced**, so growth is a conversation instead of an accident.

### Budget the metrics too

Bundle size is a proxy. Budget the thing users experience as well.

```js
// lighthouserc.js
module.exports = {
  ci: {
    collect: { url: ['http://localhost:3000/', 'http://localhost:3000/checkout'], numberOfRuns: 3 },
    assert: {
      assertions: {
        'categories:performance':   ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 1.0 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift':  ['error', { maxNumericValue: 0.1 }],
        'total-byte-weight':        ['warn',  { maxNumericValue: 1000000 }],
      },
    },
  },
};
```

```yaml
- run: npm install -g @lhci/cli && lhci autorun
```

`numberOfRuns: 3` matters. A single Lighthouse run on a shared CI runner is
noisy enough to fail a clean build, and a check that fails randomly gets
disabled within a month. Three runs and a median is the minimum that holds up.

Set accessibility to 1.0 and treat it as a hard failure. It is the one category
where a perfect automated score is achievable and any regression is a real bug.
