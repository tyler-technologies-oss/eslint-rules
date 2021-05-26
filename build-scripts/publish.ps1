param(
  [Parameter(Mandatory = $true)]
  [string]$VersionNumber,
  [string]$Tag
)

$BranchName = $Tag.Substring(0, $Tag.IndexOf('-v'))

$ErrorActionPreference = "Stop";

$packageJson = "./publish/package.json";
$release = $false;

# import common functions script from the same folder
$thisScript = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
. ($thisScript + '/CommonFunctions.ps1')

Get-Tags;

Push-Location
Set-Location $(Join-Path $PSScriptRoot ..)

# Write-Host "Building eslint-plugin"
# Invoke-Expression "cd packages/eslint-plugin"



$packages = Get-ChildItem "packages";
Write-Host "======Checking for package changes========"
$workingDirectory = Get-Location
foreach ($package in $packages) {
  $item = $package.name
  $changes = Invoke-Expression "git diff --name-only origin/master HEAD" | Where-Object { $_ -like "packages/$item/*" };
  $hasPackageChanged = $changes.count -gt 0;

  if ($hasPackageChanged) {
    Write-Output "The Package $item has changed"
    Write-Output "Updating $item npm package..."
    Invoke-Expression "cd packages/$item"
    Write-Host "Install npm packages..."
    Invoke-Expression "npm install"
    Invoke-Expression "npm run build:publish"

    $VersionNumber = Update-Version-Number-PackageJson $packageJson $VersionNumber $release;
    Write-Host "========== Building Version: $VersionNumber =========="
    Write-Host "##github[buildNumber '$($VersionNumber)']"

    Write-Host "Publishing" + $item.Substring("packages/")
    npm publish --registry "$env:ARTIFACTORY_NPM_REGISTRY" ./publish
    Invoke-Expression "cd $workingDirectory"
  }
}

Pop-Location

if ($Tag) {
  Add-Build-Tag "$Tag"
}

# Write-Host "Install npm packages..."
# Invoke-Expression "npm install"
# Invoke-Expression "npm run build:publish"

# $VersionNumber = Update-Version-Number-PackageJson $packageJson $VersionNumber $release;
# Write-Host "========== Building Version: $VersionNumber =========="
# Write-Host "##teamcity[buildNumber '$($VersionNumber)']"

# Write-Host "Publishing eslint-plugin"
# npm publish --registry "$env:ARTIFACTORY_NPM_REGISTRY" ./publish

# Pop-Location

# if ($Tag) {
#   Add-Build-Tag "$Tag"
# }