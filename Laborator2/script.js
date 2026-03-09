fetch("resources.json")
  .then(response => response.json())
  .then(data => {
    const resourceList = document.getElementById("resource-list");
    const studyList = document.getElementById("study-list");
    const tagsList = document.getElementById("tags-list");

    if (resourceList) {
      data.forEach(resource => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
          <h3>${resource.name}</h3>
          <p><strong>Tip:</strong> ${resource.type}</p>
          <p><strong>Locatie:</strong> ${resource.location}</p>
          <p><strong>Program:</strong> ${resource.program}</p>
        `;
        resourceList.appendChild(div);
      });
    }

    if (studyList) {
      const studyResources = data.filter(resource => resource.type === "studiu");

      studyResources.forEach(resource => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
          <h3>${resource.name}</h3>
          <p>${resource.location}</p>
        `;
        studyList.appendChild(div);
      });
    }

    if (tagsList) {
      const allTags = data.flatMap(resource => resource.tags);
      const uniqueTags = [...new Set(allTags)];

      uniqueTags.forEach(tag => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        tagsList.appendChild(span);
      });
    }
  })
  .catch(error => {
    console.error("Eroare la incarcarea JSON-ului:", error);
  });