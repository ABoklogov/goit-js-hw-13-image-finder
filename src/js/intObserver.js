const callback = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(entry)
           
        }
    })
};

const options = {
  rootMargin: '20px',
}

export const observer = new IntersectionObserver(callback, options);

const sentinelEl = document.querySelector('#sentinel');
observer.observe(sentinelEl);