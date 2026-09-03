## Debounce vs Throttle

Debounce waits for activity to stop, then fires once. Throttle fires at most
once per interval while activity continues. Search boxes want debounce; scroll
and resize handlers want throttle.

Typing `production` into a search box sends ten requests with neither, and those
ten responses arrive out of order — the answer for `produc` can overwrite the
answer for `production`. Debounced at 300ms it is one request. Throttled at
300ms it is about four.

<svg viewBox="0 0 460 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A timeline of ten keystrokes showing debounce firing once after typing stops, while throttle fires at regular intervals during typing">
  <text x="4" y="16" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">typing</text>
  <path d="M62 12 H392" stroke="#e0e0e4" stroke-width="1"/>
  <path d="M66 6 V18 M98 6 V18 M130 6 V18 M162 6 V18 M194 6 V18 M226 6 V18 M258 6 V18 M290 6 V18 M322 6 V18 M354 6 V18" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="4" y="44" font-family="Consolas,monospace" font-size="8.5" fill="#5b2fa8">debounce</text>
  <path d="M62 40 H392" stroke="#e0e0e4" stroke-width="1"/>
  <rect x="378" y="33" width="7" height="14" fill="#5b2fa8"/>
  <text x="400" y="44" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">1 call</text>
  <text x="4" y="70" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">throttle</text>
  <path d="M62 66 H392" stroke="#e0e0e4" stroke-width="1"/>
  <rect x="66" y="59" width="7" height="14" fill="#1a1a1a"/><rect x="152" y="59" width="7" height="14" fill="#1a1a1a"/><rect x="238" y="59" width="7" height="14" fill="#1a1a1a"/><rect x="324" y="59" width="7" height="14" fill="#1a1a1a"/>
  <text x="400" y="70" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">4 calls</text>
</svg>

Debouncing alone does not remove the race. Cancel the in-flight request, or
discard any response that is not the newest one you asked for.

## Discriminated Union

A union where every member carries a literal tag field, so the compiler can
prove which branch you are in and refuse code that reads the wrong one.

Model an API result as `{status:'loading'} | {status:'error', error} |
{status:'ok', data}` and rendering `data` while loading stops being a runtime
crash and becomes a compile error. Model it as one object with everything
optional and the compiler has nothing left to check.

The tag has to be a literal type, not `string`. A field typed `string` narrows
nothing, and the union quietly degrades into a bag of optional properties.
