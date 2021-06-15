-- Variables
local isOpen, isPaused
local whisper, normal, shout = 33, 66, 100
local microphone = Config.voiceDefault

-- ESX Initialization
if Config.useESX then
    ESX              = nil
    CreateThread(function()
        while ESX == nil do
            TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
            Wait(250)
        end
    end)
end

if Config.useESX then
	AddEventHandler("esx_status:onTick", function(status)
		TriggerEvent('esx_status:getStatus', 'hunger', function(status)
			hunger = status.val / 10000
		end)
		TriggerEvent('esx_status:getStatus', 'thirst', function(status)
			thirst = status.val / 10000
		end)
		if Config.useStress then
			TriggerEvent('esx_status:getStatus', 'stress', function(status)
				stress = status.val / 10000
			end)
		end
	end)
end

-- Main Thread
CreateThread(function()
	while true do
		local ped 				= PlayerPedId()
		local player 			= PlayerId()
		local health 			= GetEntityHealth(ped) - 100
		local oxygen 			= GetPlayerUnderwaterTimeRemaining(player) * Config.oxygenMax
		local stamina 			= 100 - GetPlayerSprintStaminaRemaining(player)
		local armor, id 		= GetPedArmour(ped), GetPlayerServerId(player)
		local minutes, hours 	= GetClockMinutes(), GetClockHours()
		local players 			= #GetActivePlayers() * 100 / Config.maxPlayers
		if IsEntityDead(ped) then
			health = 0
		end
		if (minutes <= 9) then
			minutes = "0" .. minutes
		end
		if (hours <= 9) then
			hours = "0" .. hours
		end
		if Config.useESX and not Config.useStress then
			SendNUIMessage({
				action = "hud",
				health = health,
				armor = armor,
				stamina = stamina,
				hunger = hunger,
				thirst = thirst,
				oxygen = oxygen,
				id = id,
				players = players,
				time = hours .. ":" .. minutes
			})
		elseif Config.useESX and Config.useStress then
			SendNUIMessage({
				action = "hud",
				health = health,
				armor = armor,
				stamina = stamina,
				hunger = hunger,
				thirst = thirst,
				stress = stress,
				oxygen = oxygen,
				id = id,
				players = players,
				time = hours .. ":" .. minutes
			})
		else
			SendNUIMessage({
				action = "hud",
				health = health,
				armor = armor,
				stamina = stamina,
				oxygen = oxygen,
				id = id,
				players = players,
				time = hours .. ":" .. minutes
			})
		end

		if IsPauseMenuActive() and not isPaused then
			isPaused = true
			SendNUIMessage({action = "isPaused"})
		elseif not IsPauseMenuActive() and isPaused then
			isPaused = false
			SendNUIMessage({action = "notPaused"})
		end
		Wait(Config.waitTime)
	end
end)

CreateThread(function()
    while isOpen do
        DisableControlAction(0, 322, true)
		Wait(500)
    end
end)

-- NUI callbacks
RegisterNUICallback('close', function()
	if isOpen then
		SetNuiFocus(false, false)
		isOpen = false
	end
end)

-- Opening Menu
RegisterCommand(Config.hudCommand, function()
	if not isOpen and not isPaused then
		isOpen = true
		SendNUIMessage({ action = 'show' })
		SetNuiFocus(true, true)
	end
end)

RegisterCommand(Config.voiceCommand, function()
	if (microphone == 33) then
		microphone = normal
		SendNUIMessage({
			action = "microphone",
			microphone = microphone
		})
	elseif (microphone == 66) then
		microphone = shout
		SendNUIMessage({
			action = "microphone",
			microphone = microphone
		})
	elseif (microphone == 100) then
		microphone = whisper
		SendNUIMessage({
			action = "microphone",
			microphone = microphone
		})
	end
end)

RegisterKeyMapping(Config.voiceCommand, Config.voiceDesc, 'keyboard', Config.voiceKey)
if Config.useKeys then
	RegisterKeyMapping(Config.hudCommand, Config.hudDesc, 'keyboard', Config.hudKey)
end

-- Handlers
AddEventHandler('playerSpawned', function()
	Wait(Config.waitSpawn)
	SendNUIMessage({ action = 'startUp' })
end)

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
		Wait(Config.waitResource)
		SendNUIMessage({ action = 'startUp' })
		TriggerEvent('chat:addSuggestion', '/' .. Config.hudCommand, Config.hudDesc, {})
	end
end)