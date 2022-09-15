const fileInput = document.querySelector("input"),
    downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault(); // preventing form from submitting
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a")
        aTag.href = tempUrl;
        //passing filename as download value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click(); //clicking a tag so the file can download
        aTag.remove(); //removing a tag once file downloaded
        URL.revokeObjectURL(tempUrl)
        downloadBtn.innerText = "Download File";
    }).catch(() => {
        downloadBtn.innerText = "Download File";
        alert("Failed to download File!")
    });
}