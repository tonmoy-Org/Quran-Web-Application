const { serve } = require('@hono/node-server');
const { Hono } = require('hono');
const { cors } = require('hono/cors');
const fs = require('fs/promises');
const path = require('path');

const app = new Hono();

app.use('*', cors());

let quranData = null;

async function loadData() {
  if (!quranData) {
    const filePath = path.join(__dirname, 'data', 'quran.json');
    const data = await fs.readFile(filePath, 'utf8');
    quranData = JSON.parse(data);
  }
  return quranData;
}


app.get('/surahs', async (c) => {
  try {
    const data = await loadData();
    const surahList = data.map(surah => ({
      id: surah.id,
      name: surah.name,
      transliteration: surah.transliteration,
      translation: surah.translation,
      total_verses: surah.total_verses,
      type: surah.type
    }));
    return c.json(surahList);
  } catch (err) {
    return c.json({ error: 'Failed to load surahs' }, 500);
  }
});


app.get('/surahs/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = await loadData();
    const surah = data.find(s => s.id === id);
    if (!surah) return c.json({ error: 'Surah not found' }, 404);
    return c.json(surah);
  } catch (err) {
    return c.json({ error: 'Failed to load surah' }, 500);
  }
});


app.get('/search', async (c) => {
  try {
    const query = c.req.query('q');
    if (!query) return c.json([]);

    const data = await loadData();
    const results = [];
    const lowerQuery = query.toLowerCase();

    for (const surah of data) {
      for (const verse of surah.verses) {
        if (verse.translation.toLowerCase().includes(lowerQuery)) {
          results.push({
            surah_id: surah.id,
            surah_name: surah.transliteration,
            verse_id: verse.id,
            text: verse.text,
            translation: verse.translation
          });
        }
        if (results.length > 50) break;
      }
      if (results.length > 50) break;
    }

    return c.json(results);
  } catch (err) {
    return c.json({ error: 'Search failed' }, 500);
  }
});

const port = 3001;
console.log(`Server is running on port ${port}`);

app.get('/', (c) => {
  return c.json({ status: `Server is running on port ${port}` });
});

serve({
  fetch: app.fetch,
  port
});
