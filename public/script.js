const packages = [
    {
        id: 'basic',
        name: 'Basic Package',
        price: 190.00,
        description: 'Incluye:<br> - 30 minutos de Sesión en Interior<br> - 4 fotografías Digitales Editadas<br> - 1 Escenario de Temporada<br> - No incluye cambios de ropa<br> - Máximo 4 personas, por persona adicional $15.<br><br> • Solo 2 personas adicionales.<br> Se agenda con $20 y es restante al Balance total.<br> “𝗡𝗼 𝗿𝗲𝗲𝗺𝗯𝗼𝗹𝘀𝗮𝗯𝗹𝗲”<br><br> 𝗭𝗘𝗟𝗟𝗘 (914) 564-7682<br><br> 𝗣𝗟𝗘𝗔𝗦𝗘! Llegar 𝐏𝐮𝐧𝐭𝐮𝐚𝐥 ( 𝐚 𝐭𝐢𝐞𝐦𝐩𝐨 )<br> cada 5 minutos tarde tendrá un recargo de $15 dólares.<br> Ya que después existen más sesiones programadas.<br> 𝗚𝗥𝗔𝗖𝗜𝗔𝗦!',
        image: 'images/imagen2.jpg'
    },
    {
        id: 'premium',
        name: 'Premium Package',
        price: 255.00,
        description: 'Incluye:<br> - 1 hora de Sesión en Interior<br> - 8 fotografías Digitales Editadas<br> - 1 Escenario de Temporada<br> - 1 cambio de ropa<br> - Máximo 4 personas, por persona adicional $15.<br> - Extra FONDO Only! Para niños. (Extra cambio solo para este fondo $10 adicional)<br><br> • Solo 2 personas adicionales.<br> Se agenda con $20 y es restante al Balance total.<br> “𝗡𝗼 𝗿𝗲𝗲𝗺𝗯𝗼𝗹𝘀𝗮𝗯𝗹𝗲”<br><br> 𝗭𝗘𝗟𝗟𝗘 (914) 564-7682<br><br> 𝗣𝗟𝗘𝗔𝗦𝗘! Llegar 𝐏𝐮𝐧𝐭𝐮𝐚𝐥 ( 𝐚 𝐭𝐢𝐞𝐦𝐩𝐨 )<br> cada 5 minutos tarde tendrá un recargo de $15 dólares.<br> Ya que después existen más sesiones programadas.<br> 𝗚𝗥𝗔𝗖𝗜𝗔𝗦!',
        image: 'images/imagen1.jpg'
    }
];

let selectedPackage = null;

function renderPackages() {
    const packagesContainer = document.getElementById('packages');
    packagesContainer.innerHTML = '';

    packages.forEach(pkg => {
        const packageElement = document.createElement('div');
        packageElement.className = `package ${selectedPackage === pkg.id ? 'selected' : ''}`;
        packageElement.innerHTML = `
            <div class="checkbox-container">
                <input type="checkbox" id="${pkg.id}" ${selectedPackage === pkg.id ? 'checked' : ''}>
            </div>
            <img src="${pkg.image}" alt="${pkg.name}">
            <div class="package-info">
                <div class="package-header">
                    <label for="${pkg.id}" class="package-name">${pkg.name}</label>
                    <span class="package-price">$${pkg.price.toFixed(2)}</span>
                </div>
                <p class="package-description">${pkg.description}</p>
            </div>
        `;
        packageElement.addEventListener('click', () => selectPackage(pkg.id));
        packagesContainer.appendChild(packageElement);
    });

    updateTotal();
}



function updateTotal() {
    const totalElement = document.getElementById('total-price');
    const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);
    totalElement.textContent = selectedPkg ? `$${selectedPkg.price.toFixed(2)}` : '$0.00';
}

renderPackages();

document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#fechaCita", {
        dateFormat: "d/m/Y",
        minDate: "today",
        maxDate: new Date().fp_incr(90), // Permite seleccionar hasta 30 días en el futuro
        locale: {
            firstDayOfWeek: 1,
            weekdays: {
                shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
            },
            months: {
                shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
            },
        },
        disableMobile: "true", // Esto fuerza el uso del calendario en dispositivos móviles en lugar del selector nativo
        onChange: function(selectedDates, dateStr, instance) {
            // Puedes agregar aquí lógica adicional cuando se selecciona una fecha
            console.log("Fecha seleccionada:", dateStr);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var phoneInput = document.getElementById('telefono');
    
    phoneInput.addEventListener('input', function(e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    phoneInput.addEventListener('keydown', function(e) {
        // Permite: backspace, delete, tab, escape, enter y .
        if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
            // Permite: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Permite: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // No hacer nada
            return;
        }
        // Asegura que sea un número y detiene el keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});