## Windowing: Session windows

- The third type of window is the **Session Window**. 
- Unlike Tumbling and Hopping windows, a Session Window does not have a fixed size. It is dynamic. It groups events by a key (like `userId`), and the window closes when there is a period of inactivity (the gap).

<svg viewBox="0 0 460 140" role="img" aria-label="Session windows. Events are grouped. User A clicks at 1:00, 1:05, 1:10. Gap of 30m. Clicks at 2:00. This forms two dynamic session windows." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 70 L400 70" stroke="#1a1a1a" fill="none" stroke-width="1"/>
  
  <rect x="60" y="40" width="100" height="60" rx="10" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="110" y="30" text-anchor="middle" font-weight="bold">Session 1</text>
  
  <circle cx="80" cy="70" r="4" fill="#1a1a1a"/>
  <text x="80" y="90" text-anchor="middle" font-size="6">1:00</text>
  <circle cx="110" cy="70" r="4" fill="#1a1a1a"/>
  <text x="110" y="90" text-anchor="middle" font-size="6">1:05</text>
  <circle cx="140" cy="70" r="4" fill="#1a1a1a"/>
  <text x="140" y="90" text-anchor="middle" font-size="6">1:10</text>
  
  <path d="M160 70 L280 70" stroke="#b8541a" fill="none" stroke-width="2" stroke-dasharray="2 2"/>
  <text x="220" y="60" text-anchor="middle" font-size="6" fill="#b8541a">> 30 min gap</text>
  
  <rect x="280" y="40" width="100" height="60" rx="10" fill="#e6f2ff" stroke="#1d4e89"/>
  <text x="330" y="30" text-anchor="middle" font-weight="bold">Session 2</text>
  
  <circle cx="300" cy="70" r="4" fill="#1a1a1a"/>
  <text x="300" y="90" text-anchor="middle" font-size="6">2:00</text>
  <circle cx="360" cy="70" r="4" fill="#1a1a1a"/>
  <text x="360" y="90" text-anchor="middle" font-size="6">2:15</text>
</svg>

- If you set a gap of 30 minutes, every click extends the window. If the user puts their phone down for 31 minutes, the window officially closes, and the aggregation (e.g., "pages viewed per session") is output. When they pick up their phone again, a new Session Window begins.

### The failure

- Trying to build user sessions using fixed tumbling windows. A data team wants to analyze user behavior during a single visit to the website. They use a 1-hour Tumbling Window (from 1:00 to 2:00). A user visits the site at 1:55, clicks around, and leaves at 2:05. The Tumbling Window slices this single 10-minute visit perfectly in half. The analytics report shows *two* different visits, both with a 5-minute duration. You must use dynamic Session Windows when analyzing human behavior, as humans do not align their lives to your fixed clock intervals
