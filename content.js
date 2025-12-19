/**
 * Content script for Jobfound Job Manager extension
 */

(function() {
    let hiddenJobIds = new Set();

    // Load hidden jobs from storage
    chrome.storage.local.get(['hiddenJobs'], (result) => {
        if (result.hiddenJobs) {
            hiddenJobIds = new Set(result.hiddenJobs);
        }
        init();
    });

    function init() {
        processAllJobs();
        observeChanges();
    }

    function getJobId(jobElement) {
        const link = jobElement.querySelector('a');
        return link ? link.getAttribute('href') : null;
    }

    function processJob(jobElement) {
        if (jobElement.dataset.jobfoundProcessed) return;
        
        const jobId = getJobId(jobElement);
        if (!jobId) return;

        // Mark as processed
        jobElement.dataset.jobfoundProcessed = 'true';

        // If already hidden, apply hidden class
        if (hiddenJobIds.has(jobId)) {
            jobElement.classList.add('jobfound-hidden');
            return;
        }

        // Add hide button
        const btn = document.createElement('button');
        btn.className = 'jobfound-hide-btn';
        btn.innerHTML = '&times;';
        btn.title = 'Hide this job';
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            hideJob(jobId, jobElement);
        });

        jobElement.appendChild(btn);
    }

    function processAllJobs() {
        const jobs = document.querySelectorAll('div[role="button"].py-4');
        jobs.forEach(processJob);
    }

    function hideJob(jobId, jobElement) {
        hiddenJobIds.add(jobId);
        jobElement.classList.add('jobfound-hidden');
        
        // Save to storage
        chrome.storage.local.set({ hiddenJobs: Array.from(hiddenJobIds) });
    }

    function observeChanges() {
        // Observe DOM changes for dynamically loaded jobs
        const observer = new MutationObserver((mutations) => {
            let shouldProcess = false;
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    shouldProcess = true;
                    break;
                }
            }
            if (shouldProcess) {
                processAllJobs();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();
