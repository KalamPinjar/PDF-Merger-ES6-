import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import { static as static_ } from 'express';
import path from 'path';
import multer from 'multer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use('/static', static_('public'));
const port = 3000;

import { mergePdfs } from './merge.js';

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'template/index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
   console.log(req.files);
   try {
      const PDFMerger = await import('pdf-merger-js');
      let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path), PDFMerger);
      res.redirect(`http://localhost:3000/static/${d}.pdf`);
   } catch (error) {
      console.error('Error during PDF merge:', error);
      res.status(500).send('Internal Server Error');
   }
});

app.listen(port, () => {
   console.log(`Example app listening on port http://localhost:${port}`);
});
