-- Optimizations
local showMap, showBars, showArmor, showOxygen, isOpen, cinematicHud, isPaused
local pulseHealth, pulseArmor, pulseStamina, pulseOxygen
local healthActive, armorActive, hungerActive, thirstActive, stressActive, staminaActive, oxygenActive, microphoneActive, timeActive, cinematicActive, idActive
local healthSwitch, armorSwitch, hungerSwitch, thirstSwitch, stressSwitch, staminaSwitch, oxygenSwitch, microphoneSwitch, timeSwitch, cinematicSwitch, idSwitch

-- Variables
local whisper, normal, shout = 33, 66, 100 
local microphone = normal -- Change this for default (whisper, normal, shout)

if Config.useESX then
    ESX              = nil

    CreateThread(function()
        while ESX == nil do
            TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
            Wait(250)
        end
    end)
end

-- Main Thread
CreateThread(function()
	while true do
        local health 			= nil
		local ped 				= PlayerPedId()
		local player 			= PlayerId()
		local oxygen 			= GetPlayerUnderwaterTimeRemaining(player) * Config.oxygenMax
		local stamina 			= 100 - GetPlayerSprintStaminaRemaining(player)
		local armor, id 		= GetPedArmour(ped), GetPlayerServerId(player)
		local minutes, hours 	= GetClockMinutes(), GetClockHours()
		local players 			= #GetActivePlayers() * 100 / Config.maxPlayers

		if IsEntityDead(ped) then
			health = 0
		else
			health = GetEntityHealth(ped) - 100
		end
		if (oxygen <= 0) then
			oxygen = 0
		end
		if (minutes <= 9) then
			minutes = "0" .. minutes
		end
		if (hours <= 9) then
			hours = "0" .. hours
		end
		
		if Config.hideArmor and not cinematicHud and not isPaused then
			if (armor <= 0) then
				if not armorSwitch then
					SendNUIMessage({action = 'armorHide'})
					armorActive = true
					showArmor = true
				else
					SendNUIMessage({action = 'armorShow'})
					armorActive = false
					showArmor = false
				end
			elseif not armorSwitch then
				SendNUIMessage({action = 'armorShow'})
				armorActive = false
				showArmor = false
			end
		end
		if Config.hideOxygen and not cinematicHud and not isPaused then
			if IsEntityInWater(ped) then
				SendNUIMessage({action = 'oxygenShow'})
				oxygenActive = true
				showOxygen = true
			else
				SendNUIMessage({action = 'oxygenHide'})
				oxygenActive = false
				showOxygen = false
			end
		end
		if Config.pulseHud then
			if (health <= Config.pulseStart) and not (health == 0) then
				if not pulseHealth then
					SendNUIMessage({action = 'healthStart'})
					pulseHealth = true
				end
			elseif (health > Config.pulseStart) and pulseHealth then
				SendNUIMessage({action = 'healthStop'})
				pulseHealth = false
			end
			if (armor <= Config.pulseStart) and not (armor == 0) then
				if not pulseArmor then
					SendNUIMessage({action = 'armorStart'})
					pulseArmor = true
				end
			elseif (armor > Config.pulseStart) and pulseArmor then
				SendNUIMessage({action = 'armorStop'})
				pulseArmor = false
			end
			if (stamina <= Config.pulseStart) then 
				if not pulseStamina then
					SendNUIMessage({action = 'staminaStart'})
					pulseStamina = true
				end
			elseif (stamina > Config.pulseStart) and pulseStamina then
				SendNUIMessage({action = 'staminaStop'})
				pulseStamina = false
			end
			if (oxygen <= Config.pulseStart) and not (oxygen == 0) then 
				if not pulseOxygen then
					SendNUIMessage({action = 'oxygenStart'})
					pulseOxygen = true
				end
			elseif (oxygen > Config.pulseStart) and pulseOxygen then
				SendNUIMessage({action = 'staminaStop'})
				pulseStamina = false
			end
		end
		if IsPauseMenuActive() and not isPaused and not isOpen then
			if not healthActive then
				healthActive = true
				SendNUIMessage({action = 'healthHide'})
			end
			if not armorActive then
				armorActive = true
				SendNUIMessage({action = 'armorHide'})
			end
			if not staminaActive then
				staminaActive = true
				SendNUIMessage({action = 'staminaHide'})
			end
			if Config.useESX then
				if not hungerActive then
					hungerActive = true
					SendNUIMessage({action = 'hungerHide'})
				end
				if not thirstActive then
					thirstActive = true
					SendNUIMessage({action = 'thirstHide'})
				end
				if Config.useStress then
					if not stressActive then
						stressActive = true
						SendNUIMessage({action = 'stressHide'})
					end
				end
			end
			if oxygenActive then
				oxygenActive = false
				SendNUIMessage({action = 'oxygenHide'})
			end
			if microphoneActive then
				microphoneActive = false
				SendNUIMessage({action = 'microphoneHide'})
			end
			if timeActive then
				timeActive = false
				SendNUIMessage({action = 'timeHide'})
			end
			if idActive then
				idActive = false
				SendNUIMessage({action = 'idHide'})
			end
			if cinematicActive then
				cinematicActive = false
				SendNUIMessage({action = 'cinematicHide'})
			end
			isPaused = true
		elseif not IsPauseMenuActive() and isPaused and not cinematicHud then
			if healthActive and not healthSwitch then
				healthActive = false
				SendNUIMessage({action = 'healthShow'})
			end
			if armorActive and not armorSwitch and not showArmor then
				armorActive = false
				SendNUIMessage({action = 'armorShow'})
			end
			if staminaActive and not staminaSwitch then
				staminaActive = false
				SendNUIMessage({action = 'staminaShow'})
			end
			if Config.useESX then
				if hungerActive and not hungerSwitch then
					hungerActive = false
					SendNUIMessage({action = 'hungerShow'})
				end
				if thirstActive and not thirstSwitch then
					thirstActive = false
					SendNUIMessage({action = 'thirstShow'})
				end
				if Config.useStress then
					if stressActive and not stressSwitch then
						stressActive = false
						SendNUIMessage({action = 'stressShow'})
					end
				end
			end
			if not oxygenActive and oxygenSwitch and showOxygen then
				oxygenActive = true
				SendNUIMessage({action = 'oxygenShow'})
			end
			if not microphoneActive and microphoneSwitch then
				microphoneActive = true
				SendNUIMessage({action = 'microphoneShow'})
			end
			if not timeActive and timeSwitch then
				timeActive = true
				SendNUIMessage({action = 'timeShow'})
			end
			if not cinematicActive and cinematicSwitch then
				cinematicActive = true
				SendNUIMessage({action = 'cinematicShow'})
			end
			if not idActive and idSwitch then
				idActive = true
				SendNUIMessage({action = 'idShow'})
			end
			isPaused = false
		elseif not IsPauseMenuActive() and cinematicHud and isPaused then
			if not healthActive then
				healthActive = true
				SendNUIMessage({action = 'healthHide'})
			end
			if not armorActive then
				armorActive = true
				SendNUIMessage({action = 'armorHide'})
			end
			if not staminaActive then
				staminaActive = true
				SendNUIMessage({action = 'staminaHide'})
			end
			if Config.useESX then
				if not hungerActive then
					hungerActive = true
					SendNUIMessage({action = 'hungerHide'})
				end
				if not thirstActive then
					thirstActive = true
					SendNUIMessage({action = 'thirstHide'})
				end
				if Config.useStress then
					if not stressActive then
						stressActive = true
						SendNUIMessage({action = 'stressHide'})
					end
				end
			end
			if oxygenActive then
				oxygenActive = false
				SendNUIMessage({action = 'oxygenHide'})
			end
			if microphoneActive then
				microphoneActive = false
				SendNUIMessage({action = 'microphoneHide'})
			end
			if timeActive then
				timeActive = false
				SendNUIMessage({action = 'timeHide'})
			end
			if idActive then
				idActive = false
				SendNUIMessage({action = 'idHide'})
			end
			cinematicActive = true
			SendNUIMessage({action = 'cinematicShow'})
			isPaused = false
		end
		if Config.useESX and not Config.useStress then
			SendNUIMessage({
				action = "hud",
				health = health,
				armor = armor,
				stamina = stamina,
				hunger = hunger,
				thirst = thirst,
				stamina = stamina,
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
				stamina = stamina,
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
				time = hours .. " : " .. minutes
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

-- NUI + Events
RegisterNUICallback('close', function(event)
	SendNUIMessage({ action = 'hide' })
	SetNuiFocus(false, false)
	isOpen = false
end)

RegisterNUICallback('change', function(data)
    TriggerEvent('PE:change', data.action)
end)

RegisterNetEvent('PE:change')
AddEventHandler('PE:change', function(action)
	if Config.useESX then
		if action == "hunger" then
			if not hungerActive then
				hungerActive = true
				hungerSwitch = true
				SendNUIMessage({action = 'hungerHide'})
			else
				hungerActive = false
				hungerSwitch = false
				SendNUIMessage({action = 'hungerShow'})
			end
		elseif action == "thirst" then
			if not thirstActive then
				thirstActive = true
				thirstSwitch = true
				SendNUIMessage({action = 'thirstHide'})
			else
				thirstActive = false
				thirstSwitch = false
				SendNUIMessage({action = 'thirstShow'})
			end
		end
		if Config.useStress then
			if action == "stress" then
				if not stressActive then
					stressActive = true
					stressSwitch = true
					SendNUIMessage({action = 'stressHide'})
				else
					stressActive = false
					stressSwitch = false
					SendNUIMessage({action = 'stressShow'})
				end
			end
		end
	end
    if action == "health" then
		if not healthActive then
			healthActive = true
			healthSwitch = true
			SendNUIMessage({action = 'healthHide'})
		else
			healthActive = false
			healthSwitch = false
			SendNUIMessage({action = 'healthShow'})
		end
    elseif action == "armor" then
		if not armorActive then
			armorActive = true
			armorSwitch = true
			SendNUIMessage({action = 'armorHide'})
		else
			armorActive = false
			armorSwitch = false
			SendNUIMessage({action = 'armorShow'})
		end
    elseif action == "stamina" then
		if not staminaActive then
			staminaActive = true
			staminaSwitch = true
			SendNUIMessage({action = 'staminaHide'})
		else
			staminaActive = false
			staminaSwitch = false
			SendNUIMessage({action = 'staminaShow'})
		end
	elseif action == "oxygen" then
		if not oxygenActive then
			oxygenActive = true
			oxygenSwitch = true
			SendNUIMessage({action = 'oxygenShow'})
		else
			oxygenActive = false
			oxygenSwitch = false
			SendNUIMessage({action = 'oxygenHide'})
		end
	elseif action == "id" then
		if not idActive then
			idActive = true
			idSwitch = true
			SendNUIMessage({action = 'idShow'})
		else
			idActive = false
			idSwitch = false
			SendNUIMessage({action = 'idHide'})
		end
	elseif action == "map" then
		if not showMap then
			showMap = true
			DisplayRadar(true)
		else
			showMap = false
			DisplayRadar(false)
		end
	elseif action == "cinematic" then
		if not cinematicActive then
			cinematicActive = true
			cinematicSwitch = true
			cinematicHud = true
			if not healthActive then
				healthActive = true
				SendNUIMessage({action = 'healthHide'})
			end
			if not armorActive then
				armorActive = true
				SendNUIMessage({action = 'armorHide'})
			end
			if not staminaActive then
				staminaActive = true
				SendNUIMessage({action = 'staminaHide'})
			end
			if Config.useESX then
				if not hungerActive then
					hungerActive = true
					SendNUIMessage({action = 'hungerHide'})
				end
				if not thirstActive then
					thirstActive = true
					SendNUIMessage({action = 'thirstHide'})
				end
				if Config.useStress then
					if not stressActive then
						stressActive = true
						SendNUIMessage({action = 'stressHide'})
					end
				end
			end
			if oxygenActive then
				oxygenActive = false
				SendNUIMessage({action = 'oxygenHide'})
			end
			if microphoneActive then
				microphoneActive = false
				SendNUIMessage({action = 'microphoneHide'})
			end
			if timeActive then
				timeActive = false
				SendNUIMessage({action = 'timeHide'})
			end
			if idActive then
				idActive = false
				SendNUIMessage({action = 'idHide'})
			end
			SendNUIMessage({action = 'cinematicShow'})
		else
			cinematicActive = false
			cinematicSwitch = false
			cinematicHud = false
			if healthActive and not healthSwitch then
				healthActive = false
				SendNUIMessage({action = 'healthShow'})
			end
			if armorActive and not armorSwitch and not showArmor then
				armorActive = false
				SendNUIMessage({action = 'armorShow'})
			end
			if staminaActive and not staminaSwitch then
				staminaActive = false
				SendNUIMessage({action = 'staminaShow'})
			end
			if Config.useESX then
				if hungerActive and not hungerSwitch then
					hungerActive = false
					SendNUIMessage({action = 'hungerShow'})
				end
				if thirstActive and not thirstSwitch then
					thirstActive = false
					SendNUIMessage({action = 'thirstShow'})
				end
				if Config.useStress then
					if stressActive and not stressSwitch then
						stressActive = false
						SendNUIMessage({action = 'stressShow'})
					end
				end
			end
			if not oxygenActive and oxygenSwitch and showOxygen then
				oxygenActive = true
				SendNUIMessage({action = 'oxygenShow'})
			end
			if not microphoneActive and microphoneSwitch then
				microphoneActive = true
				SendNUIMessage({action = 'microphoneShow'})
			end
			if not timeActive and timeSwitch then
				timeActive = true
				SendNUIMessage({action = 'timeShow'})
			end
			if not cinematicActive and cinematicSwitch then
				cinematicActive = true
				SendNUIMessage({action = 'cinematicShow'})
			end
			if not idActive and idSwitch then
				idActive = true
				SendNUIMessage({action = 'idShow'})
			end
			SendNUIMessage({action = 'cinematicHide'})
		end
	elseif action == "time" then
		if not timeActive then
			timeActive = true
			timeSwitch = true
			SendNUIMessage({action = 'timeShow'})
		else
			timeActive = false
			timeSwitch = false
			SendNUIMessage({action = 'timeHide'})
		end
	elseif action == "microphone" then
		if not microphoneActive then
			microphoneActive = true
			microphoneSwitch = true
			SendNUIMessage({action = 'microphoneShow'})
		else
			microphoneActive = false
			microphoneSwitch = false
			SendNUIMessage({action = 'microphoneHide'})
		end
    end
end)

if Config.useESX then
	RegisterNetEvent("esx_status:onTick")
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

-- Opening Menu
RegisterCommand('hud', function()
	if not isOpen and not isPaused then
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

RegisterKeyMapping('hud', 'Open hud menu', 'keyboard', Config.openKey)

RegisterKeyMapping('+levelVoice', 'Adjust just the voice range', 'keyboard', Config.voiceKey)

-- Handler
AddEventHandler('playerSpawned', function()
	DisplayRadar(false)
	Wait(Config.waitSpawn)
	SendNUIMessage({ action = 'setPosition' })
	SendNUIMessage({ action = 'setColors' })
end)

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
		Wait(Config.waitResource)
		SendNUIMessage({ action = 'setPosition' })
		SendNUIMessage({ action = 'setColors' })
	end
end)
