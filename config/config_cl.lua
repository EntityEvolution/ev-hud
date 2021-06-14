Config              = {}

-- Variables (HUD)
Config.maxPlayers   = 48 -- Keep same as sv_maxclients within your server.cfg.
Config.oxygenMax    = 10 -- Set to 10 / 4 if using vMenu

-- Wait times
Config.waitTime     = 400  -- Set to 100 so the hud is more fluid. However, performance will be affected.
Config.waitSpawn    = 5000 -- Time to set elements back to saved on spawn
Config.waitResource = 2000 -- Time to set elements back to saved after resource start

-- Variables (Controls)
Config.voiceKey     = 'z' -- Cycles through modes (has to match your voip script key)
Config.keyDesc      = 'Adjust the voice range'

-- Variables (Framework)
Config.useESX       = false -- Change ESX config to true to use ESX (change ./html/js/config.js Config.useESX to true too)
Config.useStress    = false -- Use ESX stress by Utku (https://github.com/utkuali/Stress-System-by-utku)
