Config              = {}

-- Variables (HUD)
Config.maxPlayers   = 48 -- Keep same as sv_maxclients within your server.cfg.

-- Wait times
Config.waitTime     = 400  -- Set to 100 so the hud is more fluid. However, performance will be affected.
Config.waitSpawn    = 3000 -- Time to set elements back to saved on spawn
Config.waitResource = 2000 -- Time to set elements back to saved after resource start

-- Variables (Controls)
Config.hudCommand   = 'hud' -- Open hud menu
Config.hudDesc      = 'Open the hud panel' -- Description for opening
Config.useKeys      = false -- Use keymapping for opening hud panel
Config.hudKey       = 'f7' -- If useKeys true, it will use this key for opening hud panel

-- If not using pma-voice
Config.voiceCommand = 'levelVoice' -- Voice cycle command name
Config.voiceKey     = 'h' -- Cycles through modes (has to match your voip script key)
Config.voiceDesc    = 'Adjust the voice range' -- Keybind description
Config.voiceDefault = 66 -- Whisper: 33, Normal: 66, Shout: 100,