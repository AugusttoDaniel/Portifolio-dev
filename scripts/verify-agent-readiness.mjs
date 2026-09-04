#!/usr/bin/env node
// Verifies the agent-readiness fixes against a running deployment.
// Usage: node scripts/verify-agent-readiness.mjs [baseUrl]
// Defaults to the production Vercel URL.

const baseUrl = (process.argv[2] || 'https://portifolio-dev-two-plum.vercel.app').replace(/\/$/, '');

let failures = 0;

function report(name, ok, detail) {
  const mark = ok ? 'PASS' : 'FAIL';
  console.log(`[${mark}] ${name}${detail ? ` - ${detail}` : ''}`);
  if (!ok) failures++;
}

function stripTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function checkContentWithoutJs() {
  const res = await fetch(`${baseUrl}/`);
  const html = await res.text();
  // The build's entry <script> is injected into <head>, not right after
  // #root's closing </div>, so bound the extraction on </body> instead -
  // that stays correct whether the script tag lives in <head> (production
  // build) or at the end of <body> (Vite dev server).
  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = html.indexOf('</body>');
  const inner = rootStart !== -1 && bodyEnd !== -1
    ? html.slice(rootStart + '<div id="root">'.length, bodyEnd)
    : '';
  const text = stripTags(inner);
  report('Content without JS: raw HTML has 500+ chars', text.length >= 500, `${text.length} chars`);
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  report('Content without JS: exactly one <h1> in raw HTML', h1Count === 1, `${h1Count} found`);
}

async function checkAgentFriendly404() {
  const res = await fetch(`${baseUrl}/this-path-does-not-exist-${Date.now()}`);
  report('404: real HTTP 404 status', res.status === 404, `got ${res.status}`);
  const body = await res.text();
  const hasLinks = /sitemap\.xml|llms\.txt/.test(body);
  report('404: body links to sitemap/llms.txt', hasLinks);
}

async function checkMarkdownNegotiation() {
  const res = await fetch(`${baseUrl}/`, { headers: { Accept: 'text/markdown' } });
  const contentType = res.headers.get('content-type') || '';
  const vary = res.headers.get('vary') || '';
  report('Markdown negotiation: Content-Type is text/markdown', contentType.includes('text/markdown'), contentType);
  report('Markdown negotiation: Vary includes Accept', /accept/i.test(vary), `Vary: ${vary || '(none)'}`);
  if (contentType.includes('text/markdown')) {
    const body = await res.text();
    report('Markdown negotiation: body starts with H1', body.trim().startsWith('#'));
  }
}

async function checkLlmsTxt() {
  const res = await fetch(`${baseUrl}/llms.txt`);
  report('llms.txt: reachable (200)', res.status === 200, `got ${res.status}`);
  if (res.status === 200) {
    const body = await res.text();
    report('llms.txt: has H1 title', /^# /.test(body.trim()));
    report('llms.txt: has blockquote summary', /^>/m.test(body));
    report('llms.txt: has when-to-use guidance', /recomendar|quando/i.test(body));
    report('llms.txt: has explicit "When to use this" heading', /^## When to use this/im.test(body));
    report('llms.txt: has ## Optional section', /^## Optional/m.test(body));
  }
}

async function checkTrustAnchorPages() {
  for (const path of ['/about', '/contact', '/privacy']) {
    const res = await fetch(`${baseUrl}${path}`);
    report(`Trust anchor ${path}: reachable (200)`, res.status === 200, `got ${res.status}`);
    if (res.status === 200) {
      const html = await res.text();
      const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/);
      const text = bodyMatch ? stripTags(bodyMatch[1]) : '';
      report(`Trust anchor ${path}: 500+ chars`, text.length >= 500, `${text.length} chars`);
    }
  }
}

async function checkContactPointSchema() {
  const res = await fetch(`${baseUrl}/`);
  const html = await res.text();
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) {
    report('JSON-LD: present', false);
    return;
  }
  const data = JSON.parse(match[1]);
  const person = (data['@graph'] || []).find((n) => n['@type'] === 'Person');
  report('JSON-LD: Person has contactPoint', !!person?.contactPoint);
}

async function checkRobotsAndSitemap() {
  const robots = await fetch(`${baseUrl}/robots.txt`);
  report('robots.txt: reachable (200)', robots.status === 200);
  const sitemap = await fetch(`${baseUrl}/sitemap.xml`);
  report('sitemap.xml: reachable (200)', sitemap.status === 200);
}

async function main() {
  console.log(`Verifying agent readiness against ${baseUrl}\n`);
  await checkContentWithoutJs();
  await checkAgentFriendly404();
  await checkMarkdownNegotiation();
  await checkLlmsTxt();
  await checkTrustAnchorPages();
  await checkContactPointSchema();
  await checkRobotsAndSitemap();
  console.log(`\n${failures === 0 ? 'All checks passed.' : `${failures} check(s) failed.`}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error('Verification script crashed:', err);
  process.exit(1);
});
