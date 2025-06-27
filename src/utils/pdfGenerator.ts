import { jsPDF } from 'jspdf';

interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const generatePdf = async (htmlContent: string, filename: string, margins?: Margins, title?: string) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  pdf.setDocumentProperties({ title: title || filename });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const marginL = margins ? margins.left : 20;
  const marginR = margins ? margins.right : 20;
  const marginT = margins ? margins.top : 15;
  const marginB = margins ? margins.bottom : 15;

  let cursorY = marginT;

  const addText = (text: string, x: number, y: number, options?: any) => {
    pdf.text(text, x, y, options);
  };

  const addPageIfNeeded = (lineHeight: number) => {
    if (cursorY + lineHeight > pdfHeight - marginB) {
      pdf.addPage();
      cursorY = marginT;
    }
  };

  // Parse HTML content
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const body = doc.body;

  // Set default font and size
  pdf.setFont('times'); // Changed to Times for serif font
  pdf.setFontSize(12); // Reverted default text size

  // Process nodes
  const processNode = (node: ChildNode) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      const text = node.textContent.trim();
      if (text) {
        addPageIfNeeded(5);
        addText(text, marginL, cursorY);
        cursorY += 5;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      switch (element.tagName) {
        case 'H1':
          addPageIfNeeded(15); // Increased spacing
          pdf.setFontSize(20); // Reverted H1 font size
          pdf.setFont('times', 'bold');
          const h1Text = element.textContent || '';
          const splitH1Text = pdf.splitTextToSize(h1Text, pdfWidth - marginL - marginR);
          splitH1Text.forEach((line: string) => {
            addText(line, pdfWidth / 2, cursorY, { align: 'center' });
            cursorY += 8; // Line height for H1
          });
          cursorY += 7; // Additional spacing after H1
          pdf.setFontSize(12); // Reset to default text size
          pdf.setFont('times', 'normal');
          break;
        case 'H2':
          addPageIfNeeded(15); // Increased spacing before H2
          pdf.setFontSize(16); // Reverted H2 font size
          pdf.setFont('times', 'bold');
          addText(element.textContent || '', marginL, cursorY);
          cursorY += 10; // Line height for H2
          pdf.setFontSize(12); // Reset to default text size
          pdf.setFont('times', 'normal');
          break;
        case 'P':
          addPageIfNeeded(5);
          const pText = element.textContent || '';
          const splitPText = pdf.splitTextToSize(pText, pdfWidth - marginL - marginR);
          splitPText.forEach((line: string) => {
            addText(line, marginL, cursorY);
            cursorY += 5;
          });
          cursorY += 3; // Additional spacing after P
          break;
        case 'STRONG':
          pdf.setFont('times', 'bold');
          processChildren(element);
          pdf.setFont('times', 'normal');
          break;
        case 'UL':
          processChildren(element);
          cursorY += 3; // Additional spacing after UL
          break;
        case 'LI':
          addPageIfNeeded(5);
          const liText = `- ${element.textContent || ''}`;
          const splitLiText = pdf.splitTextToSize(liText, pdfWidth - marginL - marginR - 10);
          splitLiText.forEach((line: string) => {
            addText(line, marginL + 5, cursorY);
            cursorY += 5;
          });
          break;
        case 'BLOCKQUOTE':
          addPageIfNeeded(10);
          pdf.setFontSize(10); // Reverted blockquote font size
          pdf.setTextColor(100);
          const blockquoteText = element.textContent || '';
          const splitBlockquoteText = pdf.splitTextToSize(blockquoteText, pdfWidth - marginL - marginR - 10);
          splitBlockquoteText.forEach((line: string) => {
            addText(line, marginL + 5, cursorY);
            cursorY += 4;
          });
          pdf.setFontSize(12); // Reset to default text size
          pdf.setTextColor(0);
          cursorY += 6; // Additional spacing after BLOCKQUOTE
          break;
        case 'HR':
          // Removed drawing horizontal lines
          break;
        case 'TABLE':
          if (element.classList.contains('data-table')) {
            // Handle data tables (Contratante/Contratado)
            element.querySelectorAll('tr').forEach(row => {
              const cells = row.querySelectorAll('td');
              if (cells.length === 2) {
                addPageIfNeeded(5);
                const label = cells[0].textContent || '';
                const value = cells[1].textContent || '';

                pdf.setFont('times', 'bold');
                addText(label, marginL, cursorY);
                pdf.setFont('times', 'normal');
                addText(value, marginL + (pdfWidth - marginL - marginR) / 3, cursorY); // Adjust position as needed
                cursorY += 5;
              }
            });
            cursorY += 5; // Additional spacing after the table
          } else {
            // Handle signature table
            const rows = element.querySelectorAll('tr');
            if (rows.length >= 2) { // Changed to >= 2 to accommodate the new row
              addPageIfNeeded(100); // Ensure enough space for signatures
              cursorY += 30; // Reduced space before signatures

              const halfWidth = (pdfWidth - marginL - marginR) / 2;

              // Signature lines
              pdf.line(marginL + halfWidth / 2 - 30, cursorY, marginL + halfWidth / 2 + 30, cursorY); // Line 1
              pdf.line(marginL + halfWidth + halfWidth / 2 - 30, cursorY, marginL + halfWidth + halfWidth / 2 + 30, cursorY); // Line 2
              cursorY += 5;

              // Names
              pdf.setFontSize(10); // Reverted signature names font size
              const td3 = rows[1].querySelectorAll('td')[0];
              const td4 = rows[1].querySelectorAll('td')[1];
              addText(td3.textContent || '', marginL + halfWidth / 2, cursorY, { align: 'center' });
              addText(td4.textContent || '', marginL + halfWidth + halfWidth / 2, cursorY, { align: 'center' });
              pdf.setFontSize(12); // Reset to default text size
              cursorY += 10;

              // City and Date (newly added)
              if (rows.length === 3) {
                const cityDateCell = rows[2].querySelectorAll('td')[0];
                addPageIfNeeded(5);
                pdf.setFontSize(10); // Reverted city/date font size
                addText(cityDateCell.textContent || '', pdfWidth / 2, cursorY, { align: 'center' });
                pdf.setFontSize(12); // Reset to default text size
                cursorY += 5;
              }
            }
          }
          break;
        default:
          processChildren(element);
          break;
      }
    }
  };

  const processChildren = (element: HTMLElement) => {
    element.childNodes.forEach(child => processNode(child));
  };

  processChildren(body);

  pdf.save(filename);
};