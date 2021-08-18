local CreateThread = CreateThread
local PlayerPedId = PlayerPedId
local PlayerId = PlayerId
local Wait = Wait
local GetEntityHealth = GetEntityHealth

-- Variables
local isOpen, isPaused
local whisper, normal, shout = 33, 66, 100
local microphone = Config.voiceDefault

-- Phone vars
local prop, model = 0, -1038739674
local dict, anim = 'cellphone@', 'cellphone_text_in'

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

-- vRP Initialization
if Config.usevRP then
	local Tunnel = module("vrp","lib/Tunnel")
	local Proxy = module("vrp","lib/Proxy")
	vRP = Proxy.getInterface("vRP")
end

if Config.useESX then
	AddEventHandler("esx_status:onTick", function(status)
		local hunger, thirst, stress
		for k, v in pairs(status) do
			if v.name == 'hunger' then hunger = v.percent
			elseif v.name == 'thirst' then thirst = v.percent
			elseif Config.useStress and v.name == 'stress' then stress = v.percent
			end
		end
	end)
end

if Config.useQBCOre and Config.useStress then
	RegisterNetEvent('hud:client:UpdateStress', function(newStress)
		stress = newStress
	end)
end

-- Main Thread
CreateThread(function()
	while true do
		local ped = PlayerPedId()
		local player = PlayerId()
		local health = GetEntityHealth(ped) - 100
		local oxygen = GetPlayerUnderwaterTimeRemaining(player) * Config.oxygenMax
		local stamina = 100 - GetPlayerSprintStaminaRemaining(player)
		local armor, id = GetPedArmour(ped), GetPlayerServerId(player)
		local minutes, hours = GetClockMinutes(), GetClockHours()
		local players = #GetActivePlayers() * 100 / Config.maxPlayers
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
		elseif Config.usevRP then
			SendNUIMessage({
				action = "hud",
				health = vRP.getHealth(),
				armor = vRP.getArmour(),
				stamina = stamina,
				hunger = vRP.getHunger(),
				thirst = vRP.getThirst(),
				oxygen = oxygen,
				id = vRP.getUserId(),
				players = players,
				time = hours .. ":" .. minutes
			})
		elseif Config.useQBCore and not Config.useStress then
			local Player = QBCore.Functions.GetPlayerData()
			SendNUIMessage({
				action = "hud",
				health = health,
				armor = Player.metadata['armor'],
				stamina = stamina,
				hunger = Player.metadata['hunger'],
				thirst = Player.metadata['thirst'],
				oxygen = oxygen,
				id = Player.cid,
				players = players,
				time = hours .. ":" .. minutes
			})
		elseif Config.useQBCore and Config.useStress then
			local Player = QBCore.Functions.GetPlayerData()
			SendNUIMessage({
				action = "hud",
				health = health,
				armor = Player.metadata['armor'],
				stamina = stamina,
				hunger = Player.metadata['hunger'],
				thirst = Player.metadata['thirst'],
				stress = Player.metadata['stress'],
				oxygen = oxygen,
				id = Player.cid,
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
    end
end)

if Config.useQBCore and Config.useStress then
	-- Code from the qb-hud
	CreateThread(function()
		while true do
			if QBCore ~= nil then
				local ped = PlayerPedId()
				if IsPedInAnyVehicle(ped, false) then
					local speed = GetEntitySpeed(GetVehiclePedIsIn(ped, false)) * 2.237 --mph
					if speed >= Config.MinimumSpeed then
						TriggerServerEvent('hud:server:GainStress', math.random(2, 4))
					end
				end
			end
			Wait(20000)
		end
	end)
	
	CreateThread(function()
		while true do
			if QBCore ~= nil then
				if IsPedShooting(PlayerPedId()) then
					local StressChance = math.random(1, 40) -- Generate Random # between 1-40
					local odd = math.random(1, 40) -- Generate Random # between 1-40
					if StressChance == odd then -- If Those Two Numbers Match Then
						local PlusStress = math.random(1, 3) / 100
						TriggerServerEvent('hud:server:GainStress', PlusStress)
					end
				end
			end
			Wait(6)
		end
	end)
	
	-- Stress Screen Effects
	
	CreateThread(function()
		while true do
			local ped = PlayerPedId()
			local Wait = GetEffectInterval(stress)
			if stress >= 100 then
				local ShakeIntensity = GetShakeIntensity(stress)
				local FallRepeat = math.random(2, 4)
				local RagdollTimeout = (FallRepeat * 1750)
				ShakeGameplayCam('SMALL_EXPLOSION_SHAKE', ShakeIntensity)
				SetFlash(0, 0, 500, 3000, 500)
	
				if not IsPedRagdoll(ped) and IsPedOnFoot(ped) and not IsPedSwimming(ped) then
					local player = PlayerPedId()
					SetPedToRagdollWithFall(player, RagdollTimeout, RagdollTimeout, 1, GetEntityForwardVector(player), 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
				end
	
				Wait(500)
				for i = 1, FallRepeat, 1 do
					Wait(750)
					DoScreenFadeOut(200)
					Wait(1000)
					DoScreenFadeIn(200)
					ShakeGameplayCam('SMALL_EXPLOSION_SHAKE', ShakeIntensity)
					SetFlash(0, 0, 200, 750, 200)
				end
			elseif stress >= Config.MinimumStress then
				local ShakeIntensity = GetShakeIntensity(stress)
				ShakeGameplayCam('SMALL_EXPLOSION_SHAKE', ShakeIntensity)
				SetFlash(0, 0, 500, 2500, 500)
			end
			Wait(Wait)
		end
	end)
	
	function GetShakeIntensity(stresslevel)
		local retval = 0.05
		for k, v in pairs(Config.Intensity['shake']) do
			if stresslevel >= v.min and stresslevel < v.max then
				retval = v.intensity
				break
			end
		end
		return retval
	end
	
	function GetEffectInterval(stresslevel)
		local retval = 60000
		for k, v in pairs(Config.EffectInterval) do
			if stresslevel >= v.min and stresslevel < v.max then
				retval = v.timeout
				break
			end
		end
		return retval
	end
end

-- NUI callbacks
RegisterNUICallback('close', function()
	if isOpen then
		isOpen = false
		SetNuiFocus(false, false)
		stopAnim()
	end
end)

-- Opening Menu
RegisterCommand(Config.hudCommand, function()
	if not isOpen and not isPaused then
		isOpen = true
		SendNUIMessage({ action = 'show' })
		SetNuiFocus(true, true)
		startAnim()
	end
end)

if not Config.usePMAvoice then
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
else
	function currentVoiceMode(value)
		print(value)
		SendNUIMessage({
			action = 'voiceMode',
			microphone = value
		})
	end
	exports('currentVoiceMode', value)
end

-- Handlers
AddEventHandler('playerSpawned', function()
	Wait(Config.waitSpawn)
	if Config.activateMap then
		DisplayRadar(false)
	end
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
function startAnim()
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

function stopAnim()
	if (prop ~= 0) then
		local ped = PlayerPedId()
		DeleteEntity(prop)
		StopAnimTask(ped, dict, anim, 1.0)
		prop = 0
	end
end
