// // Import Raphael and JustGage
// import Raphael from 'raphael';
// window.Raphael = Raphael; // Make Raphael globally available for JustGage
// import JustGage from 'justgage';

// document.addEventListener('DOMContentLoaded', () => {
//     let sunny = 

//     // Initialize two JustGage gauges for CPU and GPU
//     const cpuTemperatureGauge = new JustGage({
//         id: "cpuGauge",
//         value: 0,
//         min: 0,
//         max: 100,
//         title: "CPU Temperature",
//         label: "°C"
//     });

//     const gpuTemperatureGauge = new JustGage({
//         id: "gpuGauge",
//         value: 0,
//         min: 0,
//         max: 100,
//         title: "GPU Temperature",
//         label: "°C"
//     });

//     // Function to fetch temperature data from the server
//     function fetchTemperature() {
//         fetch('/temperatures')
//             .then(response => response.json())
//             .then(data => {
//                 // Update the gauges with CPU and GPU temperatures
//                 updateTemperature(cpuTemperatureGauge, data.cpu);
//                 updateTemperature(gpuTemperatureGauge, data.gpu);
//             })
//             .catch(error => console.error("Failed to fetch temperature:", error));
//     }

//     // Function to update a gauge with a new temperature value
//     function updateTemperature(gauge, newVal) {
//         gauge.refresh(newVal);
//     }

//     // Fetch temperature data immediately and then every 2 seconds
//     // fetchTemperature();
//     setInterval(fetchTemperature, 2000);
// });
