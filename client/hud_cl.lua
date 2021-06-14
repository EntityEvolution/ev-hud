-- Variables
local isOpen
local whisper, normal, shout = 33, 66, 100
local microphone = normal -- Change this for default (whisper, normal, shout)

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
				time = hours .. " : " .. minutes
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
				time = hours .. " : " .. minutes
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
		Wait(Config.waitTime)
	end
end)

CreateThread(function()
    while isOpen do
        Wait(500)
        DisableControlAction(0, 322, true)
    end
end)

-- NUI callbacks
RegisterNUICallback('close', function()
	SetNuiFocus(false, false)
	isOpen = false
end)

RegisterNUICallback('change', function(data)
    TriggerEvent('PE:change', data.action)
end)

-- Opening Menu
RegisterCommand('hud', function()
	if not isOpen then
		isOpen = true
		SendNUIMessage({ action = 'show' })
		SetNuiFocus(true, true)
	end
end)

RegisterCommand('+levelVoice', function()
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

RegisterKeyMapping('+levelVoice', 'Adjust just the voice range', 'keyboard', Config.voiceKey)

-- Handlers
AddEventHandler('playerSpawned', function()
	Wait(Config.waitSpawn)
	SendNUIMessage({ action = 'startUp' })
end)

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
		if Config.useESX then
			SendNUIMessage({ action = 'startESX' })
			if Config.useStress then
				SendNUIMessage({ action = 'startStress' })
			end
		end
		Wait(Config.waitResource)
		SendNUIMessage({ action = 'startUp' })
	end
end)
