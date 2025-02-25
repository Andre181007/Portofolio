export class PortfolioManager {
  constructor() {
    this.projects = JSON.parse(localStorage.getItem('projects')) || [];
  }

  displayProjects() {
    // Project display logic...
  }

  addProject(project) {
    // Add project logic...
  }

  // Other portfolio methods...
}

document.addEventListener('DOMContentLoaded', function() {
    const portfolioContainer = document.querySelector('#portfolioProjects');
    if (portfolioContainer) {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const activeProjects = projects.filter(p => p.status === 'active');
        
        portfolioContainer.innerHTML = activeProjects.map(project => `
            <div class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] p-4">
                <div class="bg-white dark:bg-slate-700 rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
                    <!-- Image Container dengan aspect ratio tetap -->
                    <div class="relative pt-[60%]">
                        <img src="${project.image}" 
                             alt="${project.title}" 
                             class="absolute top-0 left-0 w-full h-full object-cover">
                    </div>
                    
                    <!-- Content Container -->
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="font-semibold text-xl text-slate-900 dark:text-white mb-3 truncate">
                            ${project.title}
                        </h3>
                        <p class="font-medium text-base text-slate-500 dark:text-slate-300 mb-4 line-clamp-3 flex-grow">
                            ${project.description}
                        </p>
                        <div class="mt-auto">
                            <p class="font-medium text-sm text-teal-500 mb-4">
                                ${project.technologies}
                            </p>
                            ${project.url ? `
                            <a href="${project.url}" 
                               target="_blank" 
                               class="inline-block w-full text-center font-medium text-sm text-white bg-teal-500 py-2 px-4 rounded-lg hover:opacity-80 transition duration-300">
                               View Project
                            </a>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}); 