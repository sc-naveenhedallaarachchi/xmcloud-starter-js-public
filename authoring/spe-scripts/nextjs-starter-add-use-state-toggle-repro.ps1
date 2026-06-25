# Adds UseStateToggleRepro (Default) to the Home page for the nextjsstarter rendering host site.
# Run once in Sitecore CM after the rendering host deploys and metadata syncs the component.
#
# Usage (Sitecore PowerShell Extensions):
#   . .\nextjs-starter-add-use-state-toggle-repro.ps1

Import-Module Sitecore.XA.Foundation.Editing -ErrorAction SilentlyContinue

$renderingHostName = 'nextjsstarter'
$renderingName = 'UseStateToggleRepro'
$placeholderName = 'headless-main'

$siteGrouping = Get-ChildItem -Path 'master:/sitecore/content' -Recurse |
    Where-Object {
        $_.TemplateName -eq 'Site' -and
        $_.'RenderingHost' -eq $renderingHostName
    } |
    Select-Object -First 1

if (-not $siteGrouping) {
    throw "No site found with RenderingHost '$renderingHostName'. Check site grouping settings."
}

$siteItem = Get-Item -Path $siteGrouping.Paths.Parent
$sitePath = $siteItem.Paths.Path
$homeItem = Get-Item -Path "$sitePath/Home" -Language $siteItem.Language

$renderingItem = Get-ChildItem -Path 'master:/sitecore/layout/Renderings' -Recurse |
    Where-Object { $_.'componentName' -eq $renderingName } |
    Select-Object -First 1

if (-not $renderingItem) {
    throw "Rendering '$renderingName' not found. Deploy the nextjsstarter rendering host first."
}

$dataPath = "$sitePath/Data"
if (-not (Test-Path $dataPath)) {
    New-Item -Path $dataPath -ItemType $dataPath.Split('/')[-1] -Language $siteItem.Language | Out-Null
}

$datasourceName = 'Use State Toggle Repro'
$datasourcePath = "$dataPath/$datasourceName"
if (-not (Test-Path $datasourcePath)) {
    $richTextFolder = Get-ChildItem -Path $dataPath -Recurse |
        Where-Object { $_.TemplateName -eq 'Rich Text Folder' } |
        Select-Object -First 1

    if ($richTextFolder) {
        $datasourceItem = New-Item -Path $richTextFolder.Paths.Path -Name $datasourceName -ItemType $richTextFolder.Children[0].TemplateID -Language $siteItem.Language
    } else {
        $datasourceItem = New-Item -Path $dataPath -Name $datasourceName -Language $siteItem.Language
    }

    if ($datasourceItem.Fields['Text']) {
        $datasourceItem.'Text' = '<p>Use State Toggle Repro — edit this text in Pages.</p>'
    } elseif ($datasourceItem.Fields['text']) {
        $datasourceItem.'text' = '<p>Use State Toggle Repro — edit this text in Pages.</p>'
    }

    $datasourceItem.Editing.EndEdit() | Out-Null
} else {
    $datasourceItem = Get-Item -Path $datasourcePath -Language $siteItem.Language
}

$existing = Get-Rendering -Item $homeItem -Rendering $renderingItem -FinalLayout -ErrorAction SilentlyContinue
if ($existing) {
    Write-Host "UseStateToggleRepro is already on Home ($sitePath/Home)."
    return
}

$renderingInstance = $renderingItem | New-Rendering
Add-Rendering -Item $homeItem `
    -PlaceHolder $placeholderName `
    -Instance $renderingInstance `
    -DataSource $datasourceItem.Paths.Path `
    -FinalLayout

Write-Host "Added UseStateToggleRepro to $sitePath/Home (placeholder: $placeholderName)."
