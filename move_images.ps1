$source = "C:\Users\Safak\.gemini\antigravity\brain\43e6c2a1-dfe8-4f14-9e3d-a01b6a5b55a7"
$dest = "C:\Users\Safak\.gemini\antigravity\scratch\sanper-vision-astro\public\images\products"

if (-not (Test-Path $dest)) {
    New-Item -ItemType Directory -Force -Path $dest | Out-Null
}

$mapping = @{
    "product_guillotine_cleaning" = "guillotine-cleaning.png"
    "product_guillotine_glass" = "guillotine-glass.png"
    "product_bioclimatic_pergola" = "bioclimatic-pergola.png"
    "product_single_motor_pergola" = "single-motor-pergola.png"
    "product_rolling_roof" = "rolling-roof.png"
    "product_cassette_awning" = "cassette-awning.png"
    "product_wintent_awning" = "wintent-awning.png"
    "product_zip_screen" = "zip-screen.png"
    "product_zip_roof_awning" = "zip-roof-awning.png"
    "product_piston_zip_awning" = "piston-zip-awning.png"
    "product_ceiling_roller_blind" = "ceiling-roller-blind.png"
    "product_transparent_zip_blind" = "transparent-zip-blind.png"
    "product_transparent_shutter" = "transparent-shutter.png"
    "product_glass_windbreaker" = "glass-windbreaker.png"
    "product_sun_louvers" = "sun-louvers.png"
    "product_winter_garden" = "winter-garden.png"
    "product_acoustic_curtain" = "acoustic-curtain.png"
    "product_divider_curtain" = "divider-curtain.png"
    "product_stage_curtain" = "stage-curtain.png"
    "product_projection_screen" = "projection-screen.png"
    "product_home_cinema" = "home-cinema.png"
    "product_pergola_arc" = "pergola-arc.png"
}

foreach ($key in $mapping.Keys) {
    $pattern = "$key*.png"
    $targetName = $mapping[$key]
    $file = Get-ChildItem -Path $source -Filter $pattern | Sort-Object LastWriteTime -Descending | Select-Object -First 1
    
    if ($file) {
        $targetPath = Join-Path $dest $targetName
        Move-Item -Path $file.FullName -Destination $targetPath -Force
        Write-Host "Moved $($file.Name) to $targetName"
    } else {
        Write-Warning "Could not find file matching pattern: $pattern"
    }
}
