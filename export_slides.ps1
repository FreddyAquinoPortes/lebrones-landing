$pptxPath = "C:\Users\Chronos3770\Documents\LEBRONES_SRL\09 - DIRECCION CREATIVA Y GRAFICA\Presentacion_LEBRONES_SERVICES.pptx"
$outDir = "C:\Users\Chronos3770\Documents\LEBRONES_SRL\slide_images"

if (Test-Path $outDir) { Remove-Item $outDir -Recurse -Force }
New-Item -ItemType Directory -Path $outDir | Out-Null

$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse

$pres = $ppt.Presentations.Open($pptxPath, [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)

for ($i = 1; $i -le $pres.Slides.Count; $i++) {
    $slide = $pres.Slides.Item($i)
    $outFile = Join-Path $outDir ("slide-{0}.jpg" -f $i)
    $slide.Export($outFile, "JPG", 1280, 720)
    Write-Output "Exported: $outFile"
}

$pres.Close()
$ppt.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
Write-Output "Done."
