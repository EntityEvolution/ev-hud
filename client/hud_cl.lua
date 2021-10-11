local CreateThread = CreateThread
local PlayerPedId = PlayerPedId
local PlayerId = PlayerId
local Wait = Wait
local GetEntityHealth = GetEntityHealth
local IsEntityDead = IsEntityDead

-- Variables
local isOpen, isPaused, isTalking = nil, nil, false
local whisper, normal, shout = 33, 66, 100
local microphone = Config.voiceDefault
local hunger, thirst, stress = 100.0, 100.0, 0.0

-- Phone vars
local prop, model = 0, -1038739674
local dict, anim = 'cellphone@', 'cellphone_text_in'

local state = GetResourceState('es_extended') == 'started' and 'esx' or GetResourceState('vrp') == 'started' and 'vrp' or GetResourceState('qb-core') == 'started' and 'qbcore' or 'none'
local vMenu = GetResourceState('vMenu') == 'started' or false
local pma = GetResourceState('pma-voice') == 'started' or false
local oxygenMultiplier = 10

if vMenu then
	oxygenMultiplier = 10 / 4
end

if state == 'qbcore' then
	QBCore = exports['qb-core']:GetCoreObject()
end

if state == 'vrp' then
	local Tunnel = module("vrp", "lib/Tunnel")
	local Proxy = module("vrp", "lib/Proxy")
	vRP = Proxy.getInterface("vRP")
end

if state == 'esx' then
	AddEventHandler('esx_status:onTick', function(status)
		if IsPauseMenuActive() and not isPaused then
			isPaused = true
			SendNUIMessage({action = "isPaused"})
		elseif not IsPauseMenuActive() and isPaused then
			isPaused = false
			SendNUIMessage({action = "notPaused"})
		end
		for _, v in pairs(status) do
			if v.name == 'hunger' then hunger = v.percent
			elseif v.name == 'thirst' then thirst = v.percent
			elseif v.name == 'stress' then stress = v.percent
			end
		end
		local ped = PlayerPedId()
		local player = PlayerId()
		if NetworkIsPlayerTalking(player) and not isTalking then
			isTalking = true
			SendNUIMessage({
				action = 'talking',
				talking = true
			})
		elseif not NetworkIsPlayerTalking(player) and isTalking then
			isTalking = false
			SendNUIMessage({
				action = 'talking',
				talking = false
			})
		end
		local minutes, hours = GetClockMinutes(), GetClockHours()
		if minutes <= 9 then minutes = '0' .. minutes end
		if hours <= 9 then hours = '0' .. hours end
		SendNUIMessage({
			action = "hud",
			health = not IsEntityDead(ped) and math.ceil(GetEntityHealth(ped) - 100) or 0,
			armor = GetPedArmour(ped),
			stamina = math.ceil(100 - GetPlayerSprintStaminaRemaining(player)) or 100,
			hunger = hunger or 0,
			thirst = thirst or 0,
			stress = stress or 0,
			oxygen = GetPlayerUnderwaterTimeRemaining(player) * oxygenMultiplier,
			id = GetPlayerServerId(player),
			players = #GetActivePlayers() * 100 / Config.maxPlayers,
			time = hours .. ":" .. minutes
		})
	end)
end

if state ~= 'esx' then
	CreateThread(function()
		while true do
			if IsPauseMenuActive() and not isPaused then
				isPaused = true
				SendNUIMessage({action = "isPaused"})
			elseif not IsPauseMenuActive() and isPaused then
				isPaused = false
				SendNUIMessage({action = "notPaused"})
			end
			local ped = PlayerPedId()
			local player = PlayerId()

			if NetworkIsPlayerTalking(player) and not isTalking then
				isTalking = true
				SendNUIMessage({
					action = 'talking',
					talking = true
				})
			elseif not NetworkIsPlayerTalking(player) and isTalking then
				isTalking = false
				SendNUIMessage({
					action = 'talking',
					talking = false
				})
			end
			local minutes, hours = GetClockMinutes(), GetClockHours()
			if minutes <= 9 then minutes = '0' .. minutes end
			if hours <= 9 then hours = '0' .. hours end
			if state == 'vrp' then
				SendNUIMessage({
					action = "hud",
					health = vRP.getHealth(),
					armor = vRP.getArmour(),
					stamina = math.ceil(100 - GetPlayerSprintStaminaRemaining(player)) or 100,
					hunger = vRP.getHunger(),
					thirst = vRP.getThirst(),
					oxygen = (GetPlayerUnderwaterTimeRemaining(player) * oxygenMultiplier) or 0,
					id = vRP.getUserId(),
					players = #GetActivePlayers() * 100 / Config.maxPlayers,
					time = hours .. ":" .. minutes
				})
			elseif state == 'qbcore' then
				if LocalPlayer.state.isLoggedIn then
					local Player = QBCore.Functions.GetPlayerData()
					SendNUIMessage({
						action = "hud",
						health = GetEntityHealth(ped) - 100,
						armor = Player.metadata['armor'] or 0,
						stamina = math.ceil(100 - GetPlayerSprintStaminaRemaining(player)) or 100,
						hunger = Player.metadata['hunger'] or 100,
						thirst = Player.metadata['thirst'] or 100,
						stress = Player.metadata['stress'] or 0,
						oxygen = (GetPlayerUnderwaterTimeRemaining(player) * oxygenMultiplier) or 0,
						id = GetPlayerServerId(player),
						players = #GetActivePlayers() * 100 / Config.maxPlayers,
						time = hours .. ":" .. minutes
					})
				end
			end
			Wait(Config.waitTime)
		end
	end)
end

-- NUI callbacks
RegisterNUICallback('close', function()
	if isOpen then
		isOpen = false
		SetNuiFocus(false, false)
		StopAnim()
	end
end)

-- Opening Menu
RegisterCommand(Config.hudCommand, function()
	if not isOpen and not isPaused then
		isOpen = true
		SendNUIMessage({ action = 'show' })
		SetNuiFocus(true, true)
		StartAnim()
	end
end)

if Config.useKeys then
	RegisterKeyMapping(Config.hudCommand, Config.hudDesc, 'keyboard', Config.hudKey)
end

if not pma then
	RegisterCommand(Config.voiceCommand, function()
		if (microphone == 33) then
			microphone = normal
			SendNUIMessage({
				action = "voiceMode",
				microphone = microphone
			})
		elseif (microphone == 66) then
			microphone = shout
			SendNUIMessage({
				action = "voiceMode",
				microphone = microphone
			})
		elseif (microphone == 100) then
			microphone = whisper
			SendNUIMessage({
				action = "voiceMode",
				microphone = microphone
			})
		end
	end)

	RegisterKeyMapping(Config.voiceCommand, Config.voiceDesc, 'keyboard', Config.voiceKey)
else
	function CurrentVoiceMode(value)
		if (value == 1) then
			SendNUIMessage({
				action = 'voiceMode',
				microphone = 33
			})
		elseif (value == 2) then
			SendNUIMessage({
				action = 'voiceMode',
				microphone = 66
			})
		elseif (value == 3) then
			SendNUIMessage({
				action = 'voiceMode',
				microphone = 100
			})
		end
	end
end

-- Handlers
AddEventHandler('playerSpawned', function()
	Wait(Config.waitSpawn)
	SendNUIMessage({ action = 'startUp' })
	TriggerEvent('chat:addSuggestion', '/' .. Config.hudCommand, Config.hudDesc, {})
end)

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
		TriggerEvent('chat:addSuggestion', '/' .. Config.hudCommand, Config.hudDesc, {})
		Wait(Config.waitResource)
		SendNUIMessage({ action = 'startUp' })
	end
end)

-- Phone animation
function StartAnim()
	local ped = PlayerPedId()
	if IsPedInAnyVehicle(ped, false) then
		dict = "anim@cellphone@in_car@ps"
	end

	RequestModel(model)
	while not HasModelLoaded(model) do
		Wait(10)
	end
	RequestAnimDict(dict)
	while not HasAnimDictLoaded(dict) do
		Wait(10)
	end

	prop = CreateObject(model, 1.0, 1.0, 1.0, 1, 1, 0)
	local bone = GetPedBoneIndex(ped, 28422)
	local isUnarmed = GetCurrentPedWeapon(ped, 1)
	if isUnarmed then
		SetCurrentPedWeapon(ped, GetHashKey("WEAPON_UNARMED"), true)
		AttachEntityToEntity(prop, ped, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
	else
		AttachEntityToEntity(prop, ped, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
	end
	TaskPlayAnim(ped, dict, anim, 3.0, -1, -1, 50, 0, false, false, false)
end

function StopAnim()
	if (prop ~= 0) then
		local ped = PlayerPedId()
		DeleteEntity(prop)
		StopAnimTask(ped, dict, anim, 1.0)
		prop = 0
	end
end
