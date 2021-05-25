param(
    [Parameter(Mandatory=$true)]
    [string]$VersionNumber
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



Write-Host "Building eslint-plugin"
Invoke-Expression "cd packages/eslint-plugin"
Write-Host "Install npm packages..."
Invoke-Expression "npm install"
Invoke-Expression "npm run publish"

$VersionNumber = Update-Version-Number-PackageJson $packageJson $VersionNumber $release;
Write-Host "========== Building Version: $VersionNumber =========="
Write-Host "##teamcity[buildNumber '$($VersionNumber)']"

Write-Host "Publishing eslint-plugin"
npm publish --registry "$env:ARTIFACTORY_NPM_REGISTRY" ./publish

Pop-Location

Add-Build-Tag "v$VersionNumber"
