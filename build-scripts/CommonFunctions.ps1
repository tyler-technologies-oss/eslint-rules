function Exit-On-Error() {
    if ( -not $?) {
        exit 1;
    }
}

function Get-Tags() {
    git fetch --tags;
}

function Write-PackageJson($packageJson, $version) {
    $packageJsonContents = Get-Content $packageJson -raw | ConvertFrom-Json
    $packageJsonContents.version = $version
    $packageJsonContents | ConvertTo-Json  | set-content $packageJson
    Exit-On-Error;
}

function Update-Version-Number-PackageJson($packageJson, $version, $release) {
    Write-PackageJson $packageJson $version;
    Exit-On-Error;
    return $version;
}

function Remove-Tag($tag) {
    $oldtag = & git tag -l $tag;
    if ($oldtag) {
        git tag -d $tag;
        git push origin :refs/tags/$tag;
    }
}

function Add-Build-Tag($version) {
    $tag = "$version";
    Remove-Tag $tag;
    git tag -a $tag -m "tagged by build";
    git push origin $tag;
}