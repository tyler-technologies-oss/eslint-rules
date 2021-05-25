$vswhere = "./build-scripts/vswhere.exe";

function Exit-On-Error() {
    if ( -not $?) {
        exit 1;
    }
}

function Log-Message($message) {
    $count = $message.Length;
    Write-Host "`n`n";
    Write-Host "".PadRight($count+4, '*');
    Write-Host "$("* ".PadRight($count+3, ' '))*";
    Write-Host "$("* $message".PadRight($count+3, ' '))*";
    Write-Host "$("* ".PadRight($count+3, ' '))*";
    Write-Host "".PadRight($count+4, '*');
    #Write-Host "========== $message ==========";
}

function Validate-Version-Number($version) {
    # check to make sure there is a 3 part octet
    if($version.Split(".").Length -ne 3) {
        throw "Invalid VersionNumber argument ($version).  VersionNumber must be in the form of `"major.minor.build[-dev]`"";
    }
}

function Is-Windows() {
    $result = $true;
    $os = ($PSVersionTable).OS;
    if ($os) {
        $result= $os.Contains("Windows");
    }
    Log-Message "IsWindows: $result";
    return $result;
}
function Get-Tags() {
    git fetch --tags;
}

function Is-Release() {
    $release = $false;
    $tags = & git tag --points-at HEAD;
    Write-Host "Tags: $tags";
    if ($tags) {
        if ($tag -is [array]) {
            $release = $tags.split(" ").contains("release");
        } else {
            $release = $tags -eq "release";
        }
    }    
    Log-Message "Is Release Build: $release"
    return $release;
}

function Get-Version-Number-PackageJson($packageJson, $version) {
    if (Test-Path $packageJson) {
        $buildNumber = $version;
        if ($version -like "*.*") {
            $segments = $version.Split(".");
            $buildNumber = $segments[$segments.Length - 1];
        }
        $packageJsonContents = (Get-Content $packageJson) -join "`n" | ConvertFrom-Json;
        $versionSegments = $packageJsonContents.version.Split(".");
        $versionSegments[2] = $buildNumber;

        $version = [string]::Join(".", $versionSegments);
    }
    Exit-On-Error;
    return $version;
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

function Remove-Folder($folder) {
    if (Test-Path $folder) {
        Remove-Item -Recurse $folder;
    }
}

function Remove-Tag($tag) {
    $oldtag = & git tag -l $tag;
    if ($oldtag) {
        git tag -d $tag;
        git push origin :refs/tags/$tag;
    }
}

function Get-VisualStudio-Path() {
    $vsinstall_path = & "$vswhere" -latest -property installationPath;
    Write-Host "Visual Studio Install Path :$vsinstall_path";
    Exit-On-Error;
    return $vsinstall_path;
}

function Get-VSTest() {
    $vsinstall_path = Get-VisualStudio-Path;
    $vstest = "$vsinstall_path\Common7\IDE\CommonExtensions\Microsoft\TestWindow\vstest.console.exe";
    return $vstest;
}

function Get-MSBuild() {
    $msbuild_path = & "$vswhere" -latest -products * -requires Microsoft.Component.MSBuild -property installationPath;
    Write-Host "MSBuild Install Path: $msbuild_path";
    Exit-On-Error;
    return "$msbuild_path\MSBuild\15.0\Bin\MSBuild.exe";
}

function Restore-NuGet-Packages($csproj) {
    Log-Message  "Restore NuGet packages for $csproj";
    .\build-scripts\nuget.exe restore $csproj -PackagesDirectory packages -Verbosity quiet;
    Exit-On-Error;
}

function Restore-DotNetCore-Packages($csproj) {
    Log-Message "Restore DotNetCore packages for $csproj";
    dotnet restore $csproj;
    Exit-On-Error;
}

function Build-DotNetCore($csproj, $configuration, [bool] $shouldRestore = $false) {
    Log-Message "Building $csproj";
    if ($shouldRestore) {
        dotnet build $csproj -c $configuration;
    } else {
        dotnet build --no-restore $csproj -c $configuration;
    }
    Exit-On-Error;
}

function Build-MSBuild($csproj, $configuration) {
    Log-Message "Building $csproj";
    $msbuild = Get-MSBuild;
    . $msbuild /p:Configuration=$configuration $csproj;
    Exit-On-Error;
}

function Run-VSTest($dll) {
    Log-Message "Running .NET Framework tests for $dll";
    $vstest = Get-VSTest;
    . $vstest $dll;
    Exit-On-Error;
}

function Run-DotNetCore-Test($csproj, $configuration, [bool] $shouldBuild = $false) {
    Log-Message "Testing $csproj";
    if ($shouldBuild) {
        dotnet test $csproj -c $configuration;
    } else {
        dotnet test --no-build $csproj -c $configuration;
    }
    Exit-On-Error;
}

function Package-DotNetCore-NuGet($csproj, $configuration, $version, $outputFolder, [bool] $shouldBuild = $false) {
    Log-Message "Packaging $csproj";
    if ($shouldBuild) {
        dotnet pack $csproj -c $configuration /p:PackageVersion=$version -o $(Join-Path "../" $outputFolder);
    } else {
        dotnet pack $csproj -c $configuration --no-build /p:PackageVersion=$version -o $(Join-Path "../" $outputFolder);
    }    
    Exit-On-Error;
}

function Publish-DotNetCore-Package($nupkg, $endpoint, $apiKey) {
    Log-Message "Pushing Nuget $nupkg";
    dotnet nuget push $nupkg --source $endpoint --api-key $apiKey;
    Exit-On-Error;
}

function Add-Build-Tag($version) {
    Log-Message "Changing `"release`" tag to `"$VersionNumber`"";
    $tag = "$version";
    Remove-Tag $tag;
    git tag -a $tag -m "tagged by build";
    git push origin $tag;
}
