hi george,

built you a working demo before bidding:
live: https://erate-procure-iq.vercel.app
code: https://github.com/exelentshakil/erate-procure-iq
work: https://shakilhq.com

saw your note on avoiding brittle scrapers that break on captcha or get blocked. i built this on official machine-readable public sources: usac open data soda api for form 470s, texas dir bulk datasets, and oklahoma omes records. 100% public access, 2 req/s throttled, zero auth bypass.

working in the demo:
1. form 470 rfp intelligence: automated retrieval with configurable weights (category, oem, oklahoma city proximity, budget, runway). click any score pill or "why score?" to see the exact points breakdown explaining why it qualified instead of a black box number.
2. public purchase history: search "tulsa public schools", "austin isd", or "oklahoma county" for normalized purchase history, po numbers, tips/dir contracts, and 3-year oem hardware refresh cycles.
3. live ai spec analyzer: test raw rfp text to extract itemized fortinet or cisco models, mandatory walkthroughs, and win probability via openai gpt-4o-mini with sub-second gemini 2.0 flash failover.

honest gap: demo runs on pre-indexed ok/tx data. in phase 1 we hook up automated hourly cron workers and alerts.

12+ years building enterprise data pipelines, former lead engineer at legiit (m arr). based in us timezone.

want to hop on a quick 10-minute call tomorrow to tune the oem scoring weights to your exact vendor partnerships?

shakil