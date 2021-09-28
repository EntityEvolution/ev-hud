## ev-hud
A simple HUD with multiple customization options.

[ESX Optimized Version](https://github.com/EntityEvolution/ev-hud/tree/esx)

### [Discord](https://discord.com/invite/u4zk4tVTkG)
### [Donations](https://www.buymeacoffee.com/bombayV)

# License
This project does not contain a license, therefore you are not allowed to add one and claim it as yours. You are not allowed to sell this nor re-distribute it. You are not allowed to change/add a license. If you want to modify or make an agreement, you can contact me. Pull requests are accepted as long as they do not contain breaking changes. You can read more [HERE](https://opensource.stackexchange.com/questions/1720/what-can-i-assume-if-a-publicly-published-project-has-no-license) 

## Framework
- PMA-voice ~ Go to your pma-voice, and between 194-195, add the following `exports['ev-hud']:CurrentVoiceMode(voiceMode)`
- ESX ~ Set config to true and config.js framework to true.
- VRP ~ Uncomment fxmanifest, set config to true and config.js framework to true.
- QBCore ~ Uncomment fxmanifest, set config to true (stress available too) and config.js framework to true (stress to true if using it). Stress is not handled by the hud, it just displays the stress.

## Features
 - Color picker
 - Reset hud elements
 - Hide when paused
 - Save colors, position, and switches
 - Cinematic bars, id, and status
 - Visual microphone
 - Config for ESX and [Stress](https://github.com/utkuali/Stress-System-by-utku) `(config.lua and config.js)`
 - Config for VRP (by Synter) `(config.lua, config.js and fxmanifest)`
 - Config for QBCore `(config.lua, config.js and fxmanifest)`

## Screenshot
![Image](https://imgur.com/kcnEUhe.png)

### Acknowledgement
- [Progress Circle](https://github.com/nafing/esx_nafing_hud/blob/master/html/main.js#L59)
- [Regex](https://stackoverflow.com/a/3627747)
