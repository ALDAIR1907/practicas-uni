// Datos de asistencia (simulados aquí para propósito de prueba)
let attendanceData = {
    "20241": {
        "marzo": [],
        "abril": [],
        "mayo": [],
        "junio": []
    },
    "20242": {
        "agosto": [],
        "septiembre": [],
        "octubre": [],
        "noviembre": [],
        "diciembre": []
    }
};

// Inicializar la interfaz
document.addEventListener('DOMContentLoaded', () => {
    const semestreSelect = document.getElementById('semestre');
    const mesSelect = document.getElementById('mes');
    const markEntryButton = document.getElementById('mark-entry');
    const markExitButton = document.getElementById('mark-exit');
    const takeAttendanceButton = document.getElementById('take-attendance');
    const requestRecoveryButton = document.getElementById('request-recovery');

    function updateMonthOptions() {
        const semestre = semestreSelect.value;
        const mes = mesSelect.value;
        mesSelect.innerHTML = ''; // Limpiar opciones

        const meses = Object.keys(attendanceData[semestre]);
        meses.forEach(m => {
            const option = document.createElement('option');
            option.value = m;
            option.textContent = m.charAt(0).toUpperCase() + m.slice(1);
            mesSelect.appendChild(option);
        });

        if (meses.length > 0) {
            mesSelect.value = meses[0];
            loadAttendanceData();
        }
    }

    function loadAttendanceData() {
        const semestre = semestreSelect.value;
        const mes = mesSelect.value;
        const recordTableBody = document.getElementById('attendance-record');
        recordTableBody.innerHTML = ''; // Limpiar tabla

        const records = attendanceData[semestre][mes] || [];
        records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.date}</td>
                <td>${record.entryTime}</td>
                <td>${record.exitTime}</td>
                <td class="${record.status}">${record.status}</td>
            `;
            recordTableBody.appendChild(row);
        });
    }

    function markEntry() {
        const date = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString();
        const semestre = semestreSelect.value;
        const mes = mesSelect.value;

        const record = {
            date: date,
            entryTime: time,
            exitTime: '',
            status: 'P'
        };

        attendanceData[semestre][mes].push(record);
        saveAttendanceData();
        loadAttendanceData();
        markExitButton.disabled = false;
    }

    function markExit() {
        const date = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString();
        const semestre = semestreSelect.value;
        const mes = mesSelect.value;

        const records = attendanceData[semestre][mes];
        const lastRecord = records[records.length - 1];
        if (lastRecord && !lastRecord.exitTime) {
            lastRecord.exitTime = time;
            saveAttendanceData();
            loadAttendanceData();
            markExitButton.disabled = true;
        }
    }

    function saveAttendanceData() {
        // Guardar datos en JSON (esto simula un guardado en localStorage en lugar de un archivo real)
        localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
    }

    function loadAttendanceDataFromLocalStorage() {
        const data = localStorage.getItem('attendanceData');
        if (data) {
            attendanceData = JSON.parse(data);
        }
    }

    semestreSelect.addEventListener('change', updateMonthOptions);
    mesSelect.addEventListener('change', loadAttendanceData);
    markEntryButton.addEventListener('click', markEntry);
    markExitButton.addEventListener('click', markExit);
    takeAttendanceButton.addEventListener('click', () => {
        alert('Tomar asistencia de alumnos');
    });
    requestRecoveryButton.addEventListener('click', () => {
        alert('Solicitar recuperación/justificación');
    });

    // Cargar datos iniciales
    loadAttendanceDataFromLocalStorage();
    updateMonthOptions();
});
