hi george,

built you a working demo before bidding:
live: https://erate-procure-iq.vercel.app
code: https://github.com/exelentshakil/erate-procure-iq
work: https://shakilhq.com

saw your note on avoiding dumb webpage scrapers that break on captcha or get your ip blocked. i built this around official machine-readable public sources: the usac open data soda api for form 470s, texas dir bulk datasets, and oklahoma omes transparency records. 100% public access, 2 req/s throttled, zero auth bypass.

what is already working in the demo:
1. form 470 rfp intelligence: automated retrieval with configurable weights (category, oem, oklahoma city proximity, budget, deadline runway). click any score pill or "why score?" to see the exact mathematical points breakdown explaining why it qualified rather than an opaque black box number.
2. public purchase history: search "tulsa public schools", "austin isd", or "oklahoma county" to pull normalized purchasing history, po numbers, tips/dir contract vehicles, and the 3-year oem hardware refresh timeline.
3. live ai spec analyzer: test raw rfp text to extract itemized fortinet or cisco models, mandatory walkthrough dates, and win probability using native openai gpt-4o-mini with sub-second gemini 2.0 flash failover.

honest gap: the demo runs on our pre-indexed ok/tx dataset and a manual delta sync test. in phase 1 we hook up your automated hourly cron workers and email/slack pursuit alerts.

12+ years building enterprise data pipelines, former lead engineer at legiit ($1m arr command center). based in us timezone.

want to hop on a quick 10-minute call tomorrow to tune the oem scoring weights to your exact vendor partnerships?

shakil
