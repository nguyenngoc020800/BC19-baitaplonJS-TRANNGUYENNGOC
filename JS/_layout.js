// Tạo hàm pop up modal
document.getElementById('shoppingCart').addEventListener('click', () => {
    const sideNav = document.getElementById("sideNav");
    
    sideNav.style.right = "0";
    const cover = document.getElementById('cover');
    cover.style.display = 'block';
});

// Tạo hàm tắt modal

function closeModal () {
    const sideNav = document.getElementById("sideNav");
    sideNav.style.right = "-100%";
    const cover = document.getElementById('cover');
    cover.style.display = 'none';
};
