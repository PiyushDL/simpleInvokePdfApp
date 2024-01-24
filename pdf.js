let pdfInstance;
let pdfNumber = ""

function openPdf(value) {
    const pdfPath = './demopdf.pdf';
    pdfNumber = value
    pdfjsLib.getDocument(pdfPath).promise.then(function (pdf) {
        pdfInstance = pdf;
        showAllPages();

        const pdfViewer = document.getElementById('pdfViewer');
        pdfViewer.style.display = 'block';
        pdfViewer.innerHTML = '<div id="redirectButton" class="pdfButtons marginRight" onclick="redirect()">Create RfE Log</div><div id="closePdfButton" class="pdfButtons" onclick="closePdfViewer()">&times;</div>';
    });
}

function showAllPages() {
    for (let pageNumber = 1; pageNumber <= pdfInstance.numPages; pageNumber++) {
        pdfInstance.getPage(pageNumber).then(function (page) {
            const scale = 1.5;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            page.render({
                canvasContext: context,
                viewport: viewport
            });

            const pdfViewer = document.getElementById('pdfViewer');
            pdfViewer.appendChild(canvas);
        });
    }
}

function clearPdfViewer() {
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.innerHTML = '';
}

function redirect() {
    if (pdfNumber === '1') {
        window.open('https://dlzchui.azurewebsites.net/rfelogs/create-rfelog?invokeAppId=789012&lob=Surety%20Bond%20-%20for%20other%20facilities', '_blank')
    } else {
        window.open('https://dlzchui.azurewebsites.net/rfelogs/create-rfelog?invokeAppId=123456&lob=Personal%20Lines', '_blank')
    }
    closePdfViewer()
}

function closePdfViewer() {
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.style.display = 'none';
    clearPdfViewer();
}
