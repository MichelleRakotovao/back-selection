/**
 * TODO(developer): Uncomment these variables before running the sample.
 */

 const projectId = '114541763132';
 const location = 'us'; // Format is 'us' or 'eu'
 const processorId = '4951bd7eb455aa57'; // Create processor in Cloud Console
 const filePath = 'padftest.pdf';

 const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1beta3;
 const { auth  } = require('google-auth-library');
 const keyFilePath = '../googleCloud/geminieapi-82edd0f72eca.json';
 const keyFile = require(keyFilePath);
 
 // Instantiates a client
 const client = new DocumentProcessorServiceClient({
     credentials:{
         client_email: keyFile.client_email,
         private_key: keyFile.private_key,
     },
 });
 
const processDocument =async(req,res)=>{
const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  const fs = require('fs').promises;
  const imageFile = await fs.readFile(filePath);
  const encodedImage = Buffer.from(imageFile).toString('base64');

  const request = {
    name,
    rawDocument: {
      content: encodedImage,
      mimeType: 'application/pdf',
    },
  };

  // Recognizes text entities in the PDF document
 
  const [result] = await client.processDocument(request);

  console.log('Document processing complete.');
  const {document} = result;
  const {text} = document;
  res.json({
    text: text,
});

  // Read the text recognition output from the processor
  //console.log(`Full document text: ${JSON.stringify(text)}`);
  //console.log(`There are ${document.pages.length} page(s) in this document.`);
  //for (const page of document.pages) {
   /* console.log(`Page ${page.pageNumber}`);
    printPageDimensions(page.dimension);
    printDetectedLanguages(page.detectedLanguages);
    printParagraphs(page.paragraphs, text);
    printBlocks(page.blocks, text);
    printLines(page.lines, text);
    printTokens(page.tokens, text);
  }*/
}

const printPageDimensions = dimension => {
  console.log(`    Width: ${dimension.width}`);
  console.log(`    Height: ${dimension.height}`);
};

const printDetectedLanguages = detectedLanguages => {
  console.log('    Detected languages:');
  for (const lang of detectedLanguages) {
    const code = lang.languageCode;
    const confPercent = lang.confidence * 100;
    console.log(`        ${code} (${confPercent.toFixed(2)}% confidence)`);
  }
};

const printParagraphs = (paragraphs, text) => {
  console.log(`    ${paragraphs.length} paragraphs detected:`);
  const firstParagraphText = getText(paragraphs[0].layout.textAnchor, text);
  console.log(
    `        First paragraph text: ${JSON.stringify(firstParagraphText)}`
  );
  const lastParagraphText = getText(
    paragraphs[paragraphs.length - 1].layout.textAnchor,
    text
  );
  console.log(
    `        Last paragraph text: ${JSON.stringify(lastParagraphText)}`
  );
};

const printBlocks = (blocks, text) => {
  console.log(`    ${blocks.length} blocks detected:`);
  const firstBlockText = getText(blocks[0].layout.textAnchor, text);
  console.log(`        First block text: ${JSON.stringify(firstBlockText)}`);
  const lastBlockText = getText(
    blocks[blocks.length - 1].layout.textAnchor,
    text
  );
  console.log(`        Last block text: ${JSON.stringify(lastBlockText)}`);
};

const printLines = (lines, text) => {
  console.log(`    ${lines.length} lines detected:`);
  const firstLineText = getText(lines[0].layout.textAnchor, text);
  console.log(`        First line text: ${JSON.stringify(firstLineText)}`);
  const lastLineText = getText(
    lines[lines.length - 1].layout.textAnchor,
    text
  );
  console.log(`        Last line text: ${JSON.stringify(lastLineText)}`);
};

const printTokens = (tokens, text) => {
  console.log(`    ${tokens.length} tokens detected:`);
  const firstTokenText = getText(tokens[0].layout.textAnchor, text);
  console.log(`        First token text: ${JSON.stringify(firstTokenText)}`);
  const firstTokenBreakType = tokens[0].detectedBreak.type;
  console.log(`        First token break type: ${firstTokenBreakType}`);
  const lastTokenText = getText(
    tokens[tokens.length - 1].layout.textAnchor,
    text
  );
  console.log(`        Last token text: ${JSON.stringify(lastTokenText)}`);
  const lastTokenBreakType = tokens[tokens.length - 1].detectedBreak.type;
  console.log(`        Last token break type: ${lastTokenBreakType}`);
};

// Extract shards from the text field
const getText = (textAnchor, text) => {
  if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
    return '';
  }

  // First shard in document doesn't have startIndex property
  const startIndex = textAnchor.textSegments[0].startIndex || 0;
  const endIndex = textAnchor.textSegments[0].endIndex;

  return text.substring(startIndex, endIndex);
};

module.exports = {
    processDocument
}