function toggleDetails(serviceElement) {
    const details = serviceElement.querySelector('.details');
    details.style.display = details.style.display === 'none' || details.style.display === '' ? 'block' : 'none';
}
