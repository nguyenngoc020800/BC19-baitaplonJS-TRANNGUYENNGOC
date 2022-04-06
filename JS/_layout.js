// Tạo hàm pop up modal
document.getElementById('shoppingCart').addEventListener('click', () => {
    const sideNav = document.querySelector('.cart');
    
    sideNav.style.right = "-30px";
    const cover = document.getElementById('cover');
    cover.style.display = 'block';
});

// Tạo hàm tắt modal

function closeModal () {
    const sideNav = document.querySelector('.cart');
    sideNav.style.right = "-100%";
    const cover = document.getElementById('cover');
    cover.style.display = 'none';
};
