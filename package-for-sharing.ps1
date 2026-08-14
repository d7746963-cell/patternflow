$ErrorActionPreference = "Stop"

$projectDir = "C:\Users\HP\OneDrive\Desktop\project-J"
$tempDir = "C:\Users\HP\OneDrive\Desktop\ChartAnalyzer-Package"
$zipPath = "C:\Users\HP\OneDrive\Desktop\ChartAnalyzer.zip"

# Cleanup old files
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

# Create folder structure
New-Item -ItemType Directory -Path "$tempDir\backend\routes" -Force | Out-Null
New-Item -ItemType Directory -Path "$tempDir\backend\db" -Force | Out-Null
New-Item -ItemType Directory -Path "$tempDir\frontend" -Force | Out-Null

# Copy README
Copy-Item "$projectDir\README.txt" "$tempDir\"

# Copy backend files (excluding node_modules)
Copy-Item "$projectDir\backend\.env" "$tempDir\backend\"
Copy-Item "$projectDir\backend\.gitignore" "$tempDir\backend\"
Copy-Item "$projectDir\backend\server.js" "$tempDir\backend\"
Copy-Item "$projectDir\backend\package.json" "$tempDir\backend\"
Copy-Item "$projectDir\backend\package-lock.json" "$tempDir\backend\"
Copy-Item "$projectDir\backend\routes\*" "$tempDir\backend\routes\" -Recurse
Copy-Item "$projectDir\backend\db\*" "$tempDir\backend\db\" -Recurse

# Copy frontend files (excluding node_modules and dist)
Get-ChildItem "$projectDir\frontend" -Exclude "node_modules","dist" | Copy-Item -Destination "$tempDir\frontend" -Recurse

# Create zip
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -Force

# Cleanup temp folder
Remove-Item $tempDir -Recurse -Force

Write-Host "Done! ChartAnalyzer.zip created on Desktop"
