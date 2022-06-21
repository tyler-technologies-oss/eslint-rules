param(
  [Parameter(Mandatory = $true)]
  [string]$VersionNumber,
  [string]$Tag,
  [bool]$BuildAll
)

$ErrorActionPreference = "Stop";

$packageJson = "./publish/package.json";
$release = $false;

# import common functions script from the same folder
$thisScript = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
. ($thisScript + '/CommonFunctions.ps1')

Get-Tags;

Push-Location
Set-Location $(Join-Path $PSScriptRoot ..)

$packages = Get-ChildItem "packages";
Write-Host "======Checking for package changes========"
$workingDirectory = Get-Location
foreach ($package in $packages) {
  $item = $package.name
  $changes = Invoke-Expression "git diff --name-only origin/main HEAD" | Where-Object { $_ -like "packages/$item/*" };
  $hasPackageChanged = $changes.count -gt 0;

   if ($hasPackageChanged -or $BuildAll) {
    Write-Output "The Package $item has changed"
    Write-Output "Updating $item npm package..."
    Invoke-Expression "cd packages/$item"
    Write-Host "Install npm packages..."
    Invoke-Expression "npm install"
    Invoke-Expression "npm run build:publish"
    Write-Output "THIS IS THE VERSION NUMBER BEFORE CHANGE $VersionNumber"
    $VersionNumber = Update-Version-Number-PackageJson $packageJson $VersionNumber $release;
    Write-Host "========== Building Version: $VersionNumber =========="
    Write-Host "##github[buildNumber '$($VersionNumber)']"

    Write-Host "Publishing $item"
    npm publish --access public --registry https://registry.npmjs.org/ ./publish
    Invoke-Expression "cd $workingDirectory"
  }
}

Pop-Location

if ($Tag) {
  Add-Build-Tag "$Tag"
}
