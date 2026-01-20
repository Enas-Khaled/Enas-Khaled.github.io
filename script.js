async function loadProjects() {
	const res = await fetch("projects.json");
	const projects = await res.json();
  
	const container = document.getElementById("project-list");
	container.innerHTML = "";
  
	projects.forEach(p => {
	  const card = document.createElement("div");
	  card.className = "project-card";
  
	  card.innerHTML = `
		<img src="${p.image}" alt="${p.title}">
		<h3>${p.title}</h3>
		<p>${p.description}</p>
		<p><strong>Tech:</strong> ${p.tech}</p>
		<a href="${p.repoUrl}" target="_blank">GitHub Repo</a> | 
		<a href="${p.demoUrl}" target="_blank">Demo</a>
	  `;
	  container.appendChild(card);
	});
  }
  
  loadProjects();



  function toggleProjects() {
    const extraProjects = document.querySelectorAll('.extra-project');
    const btn = document.getElementById('viewMoreProjectsBtn');

    const isHidden = extraProjects[0].style.display === '' || extraProjects[0].style.display === 'none';

    extraProjects.forEach(project => {
      project.style.display = isHidden ? 'block' : 'none';
    });

    btn.textContent = isHidden ? 'View Less' : 'View More';
  }




  function toggleCertificates() {
    const extraCerts = document.querySelectorAll('.extra-cert');
    const btn = document.getElementById('viewMoreBtn');

    const isHidden = extraCerts[0].style.display === '' || extraCerts[0].style.display === 'none';

    extraCerts.forEach(cert => {
      cert.style.display = isHidden ? 'block' : 'none';
    });

    btn.textContent = isHidden ? 'View Less' : 'View More';
  }

