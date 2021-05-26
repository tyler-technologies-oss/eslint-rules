# $any = Invoke-Expression "git diff --name-only master...add-eslint-rules" | Where-Object { $_ -like "packages/*" }

# $test = $any.count -gt 0

# Write-Output($test)
Write-Output "add-eslint-rules-v0.0.7".Substring(0, "add-eslint-rules-v0.0.7".IndexOf("-v"))

$packages = Get-ChildItem "packages";

foreach ($item in $packages) {
    $changes = Invoke-Expression "git diff --name-only master...add-eslint-rules" | Where-Object { $_ -like "packages/$item/*" };
    $hasPackageChanged = $changes.count -gt 0;

    if ($hasPackageChanged) {
        Write-Output "The Package $item has changed"
        Write-Output "Updating $item npm package..."
    }
}