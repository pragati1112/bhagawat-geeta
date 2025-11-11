const chapter = () => {
  fetch("https://vedicscriptures.github.io/chapters")
    .then((r) => r.json())
    .then((chapters) => {
      const container = document.getElementById("chapter-container");
      container.innerHTML = "";

      chapters.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");

        div.innerHTML = `
          <div class="card h-100 p-3">
            <div class="card-body text-center">
              <h5 class="card-title font2">
                अध्याय ${item.chapter_number}: ${item.name}
              </h5>
              ${
                item.translation
                  ? `<p><strong>Translation:</strong> ${item.translation}</p>`
                  : ""
              }
              ${
                item.transliteration
                  ? `<p><strong>Transliteration:</strong> ${item.transliteration}</p>`
                  : ""
              }
              ${
                item.meaning
                  ? `<p class="fontmy1"><strong>Meaning (EN):</strong> ${item.meaning.en || ""}</p>
                     <p class="fontmy1"><strong>Meaning (HI):</strong> ${item.meaning.hi || ""}</p>`
                  : ""
              }
              <p><strong>Verses Count:</strong> ${item.verses_count}</p>
              ${
                item.summary
                  ? `<button class="btn btn-warning mt-2" onclick="openSummary(${item.chapter_number})">View Summary</button>`
                  : ""
              }
            </div>
          </div>
        `;
        container.appendChild(div);
      });
    })
    .catch((error) => console.error("Error fetching chapters:", error));
};

function openSummary(chapterNumber) {
  fetch("https://vedicscriptures.github.io/chapters")
    .then(r => r.json())
    .then(chapters => {
      const item = chapters.find(c => c.chapter_number == chapterNumber);
      if(item && item.summary){
        document.getElementById("modal-content").innerHTML = `
          <p><strong>English:</strong> ${item.summary.en || ""}</p>
          <p><strong>Hindi:</strong> ${item.summary.hi || ""}</p>
        `;
        document.getElementById("summaryModalLabel").innerText = `Chapter ${item.chapter_number}: ${item.name}`;
        const modal = new bootstrap.Modal(document.getElementById('summaryModal'));
        modal.show();
      }
    });
}
chapter();

