import PDFMerger from 'pdf-merger-js';
import path from 'path';

// Define __dirname for use within this module
const __dirname = path.resolve();

async function mergePdfs(p1, p2) {
   try {
      const merger = new PDFMerger();

      await merger.add(p1);
      await merger.add(p2);

      const outputFileName = new Date().getTime().toString();
      const outputPath = path.join(__dirname, 'public', `${outputFileName}.pdf`);

      await merger.save(outputPath);

      return outputFileName;
   } catch (error) {
      console.error('Error during PDF merge:', error);
      throw error;
   }
}

export { mergePdfs };
