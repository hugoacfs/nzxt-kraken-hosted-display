$dllPath = Join-Path -Path $PSScriptRoot -ChildPath "LibreHardwareMonitorLib.dll"

Add-Type -Path $dllPath

$computer = New-Object LibreHardwareMonitor.Hardware.Computer
$computer.IsCpuEnabled = $true
$computer.IsGpuEnabled = $true # Enable GPU monitoring
$computer.Open()

$cpuTemp = $gpuTemp = "N/A"

# Fetch CPU Core Temperature
$computer.Hardware | Where-Object { $_.HardwareType -eq "Cpu" } | ForEach-Object {
    $_.Update()
    $coreTempSensor = $_.Sensors | Where-Object { $_.Name -eq "Core (Tctl/Tdie)" }
    if ($coreTempSensor) {
        $cpuTemp = [Math]::Round($coreTempSensor.Value)
    }
}

# Fetch GPU Temperature
$computer.Hardware | Where-Object { $_.HardwareType -eq "GpuNvidia" -or $_.HardwareType -eq "GpuAmd" } | ForEach-Object {
    $_.Update()
    $gpuTempSensor = $_.Sensors | Where-Object { $_.SensorType -eq "Temperature" } | Select-Object -First 1
    if ($gpuTempSensor) {
        $gpuTemp = [Math]::Round($gpuTempSensor.Value)
    }
}

$computer.Close()

# Simplify output for easier parsing
"{`"cpu`": $cpuTemp, `"gpu`": $gpuTemp}"
