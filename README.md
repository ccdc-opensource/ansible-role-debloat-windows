# ccdc.debloat_windows

[![Ansible Galaxy](https://img.shields.io/badge/ansible--galaxy-ccdc.debloat_windows-blue.svg)](https://galaxy.ansible.com/ccdc/debloat_windows/)
[![Ansible Lint](https://github.com/ccdc-opensource/ansible-role-debloat-windows/actions/workflows/lint-ansible-role.yml/badge.svg)](https://github.com/ccdc-opensource/ansible-role-debloat-windows/actions/workflows/lint-ansible-role.yml)
[![Common CCDC PR Checks](https://github.com/ccdc-opensource/ansible-role-debloat-windows/actions/workflows/common_ccdc_status_checks.yml/badge.svg)](https://github.com/ccdc-opensource/ansible-role-debloat-windows/actions/workflows/common_ccdc_status_checks.yml)

An Ansible role to remove some of the bloat on Windows, used by CCDC to create Vagrant base images.

The actual functionality here is based heavily on [W4RH4WK/Debloat-Windows-10](https://github.com/W4RH4WK/Debloat-Windows-10)
and our own custom scripts, but codified as an Ansible role so it's a bit easier to maintain
and manage than a pile of PowerShell scripts.

## Requirements

This role requires the `[community.windows](https://galaxy.ansible.com/community/windows)` collection.

## Role Variables

Most of the variables for this role are simple booleans to determine which debloating features should be run.
The tasks are grouped by purpose as follows:

### Disable Telemetry

| Variable                     | Default | Comments                                     |
|------------------------------|---------|----------------------------------------------|
| `disable_telemetry_policy`   | `true`  | Disable telemetry via Group Policy           |
| `disable_telemetry_dnsblock` | `true`  | Set up DNS and firewall blocks for telemetry |

### Disable Windows Defender

| Variable                                     | Default | Comments                                      |
|----------------------------------------------|---------|-----------------------------------------------|
| `disable_windows_defender_tasks`             | `true`  | Disable Windows Defender scheduled tasks      |
| `disable_windows_defender_policy`            | `true`  | Disable Windows Defender via Group Policy     |
| `disable_windows_defender_context_menu`      | `true`  | Disable Windows Defender context menu entries |

### GUI setup

| Variable                         | Default     | Comments                                                 |
|--------------------------------------|---------|----------------------------------------------------------|
| `disable_mouse_pointer_hiding`   | `true`      | Disable Windows hiding the mouse pointer when idle       |
| `disable_game_bar`               | `true`      | Disable the Xbox Game Bar and Game DVR                   |
| `disable_keyboard_accessibility` | `true`      | Disable Sticky Keys, Toggle Keys etc.                    |
| `disable_screensaver`            | `true`      | Disable screen saver                                     |
| `disable_display_timeout`        | `true`      | Disable display auto-shutdown                            |
| `disable_edge_shortcut`          | `true`      | Disable creation of MS Edge shortcuts                    |
| `restore_old_volume_slider`      | `true`      | Restore pre-Win10 volume slider                          |
| `disable_aero_shake`             | `true`      | Disable Aero Shake                                       |
| `enable_quickedit`               | `true`      | Enable QuickEdit mode in cmd.exe windows                 |
| `show_run`                       | `true`      | Show Run in Start menu                                   |
| `show_admin_tools`               | `true`      | Show Administrative Tools in Start menu                  |
| `set_explorer_default_this_pc`   | `true`      | Set Explorer as default view for This PC                 |
| `set_folder_view_options`        | `true`      | Set default folder view options (view hidden files, etc) |
| `library_folders`                | [see below] | UUIDs of library folders to remove from "This PC"        |

#### Default values for `library_folders`

The `library_folders` variable contains a list of UUIDs of the Library folders to remove from
Windows' "This PC" view. These map directly to registry keys in
`HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace`.
The variable can be set to a custom list to specify which folders to remove, or an empty one
to skip the task entirely.

```yaml
library_folders:
  - {B4BFCC3A-DB2C-424C-B029-7FE99A87C641}    # Desktop
  - {A8CDFF1C-4878-43be-B5FD-F8091C1C60D0}    # Documents
  - {d3162b92-9365-467a-956b-92703aca08af}    # Documents
  - {374DE290-123F-4565-9164-39C4925E467B}    # Downloads
  - {088e3905-0323-4b02-9826-5d99428e115f}    # Downloads
  - {1CF1260C-4DD0-4ebb-811F-33C572699FDE}    # Music
  - {3dfdf296-dbec-4fb4-81d1-6a3438bcf4de}    # Music
  - {3ADD1653-EB32-4cb0-BBD7-DFA0ABB5ACCA}    # Pictures
  - {24ad3ad4-a569-4530-98e1-ab02f9417aa8}    # Pictures
  - {A0953C92-50DC-43bf-BE83-3742FED03C9C}    # Videos
  - {f86fa3ab-70d2-4fc7-9c99-fcbf05467f3a}    # Videos
  - {0DB7E03F-FC29-4DC6-9020-FF41B59E513A}    # 3D Objects
```

### General Privacy Fixes

| Variable                                     | Default | Comments                                 |
|----------------------------------------------|---------|------------------------------------------|
| `disable_search_web_results`                 | `true`  | Disable web results in Windows menu search |
| `disable_web_language_list_access`           | `true`  | Disable sending language list with web requests |
| `disable_location_aware_printing`            | `true`  | Disable Location Aware Printing |
| `disable_keyboard_telemetry`                 | `true`  | Disable keyboard telemetry |
| `disable_advertising_id`                     | `true`  | Disable shared advertising ID |
| `disable_smartscreen_web_filter`             | `true`  | Disable SmartScreen web filter |
| `disable_microsoft_account_settings_sync`    | `true`  | Disable settings sync to Microsoft Account |
| `disable_cortana_personalization`            | `true`  | Disable Cortana personalization |
| `disable_contact_harvesting`                 | `true`  | Disable contact harvesting |
| `disable_input_personalization`              | `true`  | Disable virtual keyboard/Ink personalization |
| `harden_microsoft_edge`                      | `true`  | Harden MS Edge privacy settings |
| `disable_location_sensor`                    | `true`  | Disable Location sensor for apps |
| `disable_windows_defender_sample_submission` | `true`  | Disable Windows Defender sample submission |
| `disable_default_background_access`          | `true`  | Disable Background Access permission for default apps |
| `disable_unpaired_information_sharing`       | `true`  | Disable information sharing with unpaired devices |

### Disable Windows Update

| Variable                                     | Default | Comments                                 |
|----------------------------------------------|---------|------------------------------------------|
| `disable_autoupdate`                         | `true`  | Disable automatic download+install of Windows updates |
| `disable_delivery_optimization`              | `true`  | Disable Windows Update delivery optimization |
| `disable_driver_updates`                     | `false` | Disable automatic driver updates |
| `disable_update_notification`                | `true`  | Disable "Updates available" notification |

### Remove default apps

| Variable                                     | Default | Comments                                 |
|----------------------------------------------|---------|------------------------------------------|
| `disable_default_app_reinstall`              | `true`  | Prevent default apps from reinstalling |
| `disable_windows_store_autodownload`         | `true`  | Prevent automatic download of Windows Store updates |
| `disable_app_suggestions`                    | `true`  | Disable Suggested Applications |
| `remove_onedrive` | `true`  | Remove OneDrive |
| `remove_default_apps` | [see below] | list | Windows Store app IDs to uninstall |
| `remove_windows_capabilities` | [see below] | list | Capability names to uninstall |
| `remove_windows_optional_features` | [see below] | list | Optional Feature names to uninstall |

#### Default apps to be removed by `remove_default_apps`

The `remove_default_apps` variable contains a list of Windows Store app IDs that will be removed if
they're present. The variable can be set to a custom list to specify which folders to remove, or an
empty one to skip the task entirely.

```yaml
remove_default_apps:
  # default Windows 10 apps
  - "Microsoft.549981C3F5F10"   # Cortana
  - "Microsoft.3DBuilder"
  - "Microsoft.Appconnector"
  - "Microsoft.BingFinance"
  - "Microsoft.BingNews"
  - "Microsoft.BingSports"
  - "Microsoft.BingTranslator"
  - "Microsoft.BingWeather"
  - "Microsoft.FreshPaint"
  - "Microsoft.GamingServices"
  - "Microsoft.Microsoft3DViewer"
  - "Microsoft.MicrosoftOfficeHub"
  - "Microsoft.MicrosoftPowerBIForWindows"
  - "Microsoft.MicrosoftSolitaireCollection"
  - "Microsoft.MicrosoftStickyNotes"
  - "Microsoft.MinecraftUWP"
  - "Microsoft.NetworkSpeedTest"
  - "Microsoft.Office.OneNote"
  - "Microsoft.People"
  - "Microsoft.Print3D"
  - "Microsoft.SkypeApp"
  - "Microsoft.Wallet"
  - "Microsoft.WindowsAlarms"
  - "Microsoft.WindowsCamera"
  - "microsoft.windowscommunicationsapps"
  - "Microsoft.WindowsMaps"
  - "Microsoft.WindowsPhone"
  - "Microsoft.WindowsSoundRecorder"
  - "Microsoft.Xbox.TCUI"
  - "Microsoft.XboxApp"
  - "Microsoft.XboxGameOverlay"
  - "Microsoft.XboxGamingOverlay"
  - "Microsoft.XboxSpeechToTextOverlay"
  - "Microsoft.YourPhone"
  - "Microsoft.ZuneMusic"
  - "Microsoft.ZuneVideo"
  # Threshold 2 apps
  - "Microsoft.CommsPhone"
  - "Microsoft.ConnectivityStore"
  - "Microsoft.GetHelp"
  - "Microsoft.Getstarted"
  - "Microsoft.Messaging"
  - "Microsoft.Office.Sway"
  - "Microsoft.OneConnect"
  - "Microsoft.WindowsFeedbackHub"
  - "Microsoft.Microsoft3DViewer"
  # Redstone apps
  - "Microsoft.BingFoodAndDrink"
  - "Microsoft.BingHealthAndFitness"
  - "Microsoft.BingTravel"
  - "Microsoft.WindowsReadingList"
  # Redstone 5 apps
  - "Microsoft.MixedReality.Portal"
  - "Microsoft.ScreenSketch"
  - "Microsoft.XboxGamingOverlay"
  # non-Microsoft
  - "2FE3CB00.PicsArt-PhotoStudio"
  - "46928bounde.EclipseManager"
  - "4DF9E0F8.Netflix"
  - "613EBCEA.PolarrPhotoEditorAcademicEdition"
  - "6Wunderkinder.Wunderlist"
  - "7EE7776C.LinkedInforWindows"
  - "89006A2E.AutodeskSketchBook"
  - "9E2F88E3.Twitter"
  - "A278AB0D.DisneyMagicKingdoms"
  - "A278AB0D.MarchofEmpires"
  - "ActiproSoftwareLLC.562882FEEB491"
  - "CAF9E577.Plex"
  - "ClearChannelRadioDigital.iHeartRadio"
  - "D52A8D61.FarmVille2CountryEscape"
  - "D5EA27B7.Duolingo-LearnLanguagesforFree"
  - "DB6EA5DB.CyberLinkMediaSuiteEssentials"
  - "DolbyLaboratories.DolbyAccess"
  - "DolbyLaboratories.DolbyAccess"
  - "Drawboard.DrawboardPDF"
  - "Facebook.Facebook"
  - "Fitbit.FitbitCoach"
  - "Flipboard.Flipboard"
  - "GAMELOFTSA.Asphalt8Airborne"
  - "KeeperSecurityInc.Keeper"
  - "NORDCURRENT.COOKINGFEVER"
  - "PandoraMediaInc.29680B314EFC2"
  - "Playtika.CaesarsSlotsFreeCasino"
  - "ShazamEntertainmentLtd.Shazam"
  - "SlingTVLLC.SlingTV"
  - "SpotifyAB.SpotifyMusic"
  - "TheNewYorkTimes.NYTCrossword"
  - "ThumbmunkeysLtd.PhototasticCollage"
  - "TuneIn.TuneInRadio"
  - "WinZipComputing.WinZipUniversal"
  - "XINGAG.XING"
  - "flaregamesGmbH.RoyalRevolt2"
  - "king.com.*"
  - "king.com.BubbleWitch3Saga"
  - "king.com.CandyCrushSaga"
  - "king.com.CandyCrushSodaSaga"
  - "Microsoft.Advertising.Xaml"
```

#### Windows Capabilities to be removed by `remove_windows_capabilities`

The `remove_windows_capabilities` variable contains a list of Capability names that will be removed#
if they're present. You can determine the names of available and installed Capabilities with the
PowerShell command `Get-WindowsCapability -Online`. The variable can be set to a custom list to
specify which features to remove, or an empty one to skip the task entirely.

```yaml
remove_windows_capabilities:
  - Media.WindowsMediaPlayer~~~~0.0.12.0
  - MathRecognizer~~~~0.0.1.0
  - Language.Speech~~~en-US~0.0.1.0
  - Language.OCR~~~en-US~0.0.1.0
  - Language.Handwriting~~~en-US~0.0.1.0
  - Browser.InternetExplorer~~~~0.0.11.0
```

### Optional Features to be removed by `remove_windows_optional_features`

The `remove_windows_optional_features` variable contains a list of Optional Feature names that will
be removed if they're present. You can determine the names of available and installed Optional
Features with the PowerShell command `Get-WindowsOptionalFeature -Online`.  The variable can be set
to a custom list to specify which features to remove, or an empty one to skip the task entirely.

```yaml
remove_windows_optional_features:
  - XPS-Viewer
  - Windows-Defender
```

### Disable Hibernation

| Variable                               | Default | Comments                 |
|----------------------------------------|---------|--------------------------|
| `disable_hibernate`                    | `true`  | Disable Hibernation mode |

### Disable Services

| Variable           | Default     | Type | Comments                     |
|--------------------|-------------|------|------------------------------|
| `disable_services` | [see below] | list | Names of services to disable |

The `disable_services` variable can be overriden in its entirety to provide a custom list of
services to disable, or set to an empty list to skip this task entirely.

```yaml
disable_services:
  - "diagnosticshub.standardcollector.service" # Microsoft (R) Diagnostics Hub Standard Collector Service
  - "DiagTrack"                                # Diagnostics Tracking Service
  - "dmwappushservice"                         # WAP Push Message Routing Service
  - "HomeGroupListener"                        # HomeGroup Listener
  - "HomeGroupProvider"                        # HomeGroup Provider
  - "lfsvc"                                    # Geolocation Service
  - "MapsBroker"                               # Downloaded Maps Manager
  - "NetTcpPortSharing"                        # Net.Tcp Port Sharing Service
  - "RemoteAccess"                             # Routing and Remote Access
  - "RemoteRegistry"                           # Remote Registry
  - "SharedAccess"                             # Internet Connection Sharing (ICS)
  - "TrkWks"                                   # Distributed Link Tracking Client
  - "WbioSrvc"                                 # Windows Biometric Service
  - "WMPNetworkSvc"                            # Windows Media Player Network Sharing Service
  - "wscsvc"                                   # Windows Security Center Service
  - "XblAuthManager"                           # Xbox Live Auth Manager
  - "XblGameSave"                              # Xbox Live Game Save Service
  - "XboxNetApiSvc"                            # Xbox Live Networking Service
  ```

## Example Playbook

```yaml
  - hosts: all
    roles:
      - role: ccdc.debloat_windows
        vars:
          remove_default_apps: []
          disable_services: []
          disable_autoupdate: false
```

## License

See [LICENSE](LICENSE)
