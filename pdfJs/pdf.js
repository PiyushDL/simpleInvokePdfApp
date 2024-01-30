let pdfInstance;
let invokeAppId;
let lobName;

function openPdf(value) {
    const pdfPath = value.path;
    invokeAppId = value.invokeAppId;
    lobName = value.lobName;
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
    window.open(`https://dlzchui.azurewebsites.net/rfelogs/create-rfelog?invokeAppId=${invokeAppId}&lob=${lobName}`, '_blank')
    closePdfViewer()
}

function closePdfViewer() {
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.style.display = 'none';
    clearPdfViewer();
}
